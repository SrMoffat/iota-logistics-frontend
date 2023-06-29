import React, { useEffect, useState } from 'react';

import { get, groupBy } from 'lodash';
import { useRouter } from 'next/router';
import { useQuery } from '@tanstack/react-query';
import { format, parseISO, formatDistance } from 'date-fns';
import { Divider, Steps, Spin, Timeline, Descriptions, Empty, Button } from 'antd';

import GeneralLayout from '../../components/Layout/General';
import AddItemModal from '../../components/Modal/AddItemModal';

import { fetchMilestones } from '../../lib/statistics';
import { fetchSupplyChainItemEvents } from '../../lib/items';

interface Event {
    status: string;
    statusId: string;
    statusDescription: string;
    stage: string;
    stageId: string;
    stageDescription: string;
    updatedAt: string;
    itemName: string;
    itemUpdatedAt: string;
    itemTrackingId: string;
}

const Product = () => {
    const router = useRouter()
    const [current, setCurrent] = useState(0);
    const [events, setEvents] = useState<{ [key: number | string]: Event[] }>();
    const [currentStageStatuses, setCurrentStageStatuses] = useState<Event[]>();
    const { isLoading: milestonesLoading, data: milestones } = useQuery({
        queryKey: ['milestones'],
        queryFn: async () => {
            const res = await fetchMilestones()
            return {
                milestones: res
            }
        },
    })
    const milestonesArray = milestones?.milestones
    const milestonesMutated = milestonesArray?.map(({ id, attributes }) => ({ id, title: attributes?.name, description: attributes?.description }));
    useEffect(() => {
        if (router.isReady) {
            const fetchDetails = async () => {
                const itemID = router.query.id;
                const res = await fetchSupplyChainItemEvents(itemID as string)
                const massagedEvents = res?.events?.map(({ status, updatedAt, stage, data }) => ({
                    status: status?.name,
                    statusId: status?.id,
                    statusDescription: status?.description,
                    stage: stage?.name,
                    stageId: stage?.id,
                    stageDescription: stage?.description,
                    updatedAt,
                    itemName: data?.name,
                    itemUpdatedAt: data?.updatedAt,
                    itemTrackingId: data?.trackingId
                }));
                const groupedStuff = groupBy(massagedEvents, 'stageId')
                setEvents(groupedStuff)
            }
            fetchDetails().catch(console.error);
        }
    }, [router.isReady])
    useEffect(() => {
        if (events && milestonesMutated?.length) {
            const initialState = milestonesMutated[current]
            const stateId = get(initialState, 'id');
            setCurrentStageStatuses(events[stateId])
        }
    }, [events])
    useEffect(() => {
        if (current) {
            const newState = milestonesMutated[current]
            const stageId = get(newState, 'id');
            if (events[stageId]) {
                setCurrentStageStatuses(events[stageId])
            }
        }
    }, [current])
    const onChange = (value: number) => {
        console.log('onChange:', value);
        setCurrent(value);
    };
    const entries = currentStageStatuses?.map(({ status, statusDescription, updatedAt }) => ({
        color: 'green',
        children: (
            <div style={{ padding: 0, lineHeight: 0.5 }}>
                <p style={{ fontWeight: "bold", marginTop: "5px" }}>{status}</p>
                <p>{statusDescription}</p>
                <p style={{ fontSize: '11px', fontStyle: 'italic' }}>{format(parseISO(updatedAt), 'LLLL d, yyyy')}</p>
            </div>
        ),

    }))

    const handleShowUpdateItemModal = () => {
        console.log("Modal");
        setOpen(true);
    };
    const next = () => {
        setCurrent(current + 1);
    };
    const prev = () => {
        setCurrent(current - 1);
    };
    const [open, setOpen] = useState(false);
    const [milestone, setMilestone] = useState();
    const [milestoneItems, setMilestoneItems] = useState([]);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const handleOk = () => {
        setConfirmLoading(true);
        setTimeout(() => {
            setOpen(false);
            setConfirmLoading(false);
        }, 2000);
    };
    const handleCancel = () => {
        setOpen(false);
    };
    return (
        <GeneralLayout handleShowCreateItemModal={handleShowUpdateItemModal} hasCta ctaText="Update Item">
            <AddItemModal
                open={open}
                next={next}
                prev={prev}
                current={current}
                handleOk={handleOk}
                setCurrent={setCurrent}
                handleCancel={handleCancel}
                // refetchItems={refetchItems}
                setMilestone={setMilestone}
                // refetchEvents={refetchEvents}
                confirmLoading={confirmLoading}
            // categories={categories?.categories}
            // refetchMilestones={refetchMilestones}
            />
            {milestonesLoading ? <Spin /> : (
                <>
                    {currentStageStatuses && (
                        <Descriptions
                            bordered
                            column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}
                            style={{ marginBottom: 20 }}
                        >
                            <Descriptions.Item label="Name">{currentStageStatuses[0]?.itemName}</Descriptions.Item>
                            <Descriptions.Item label="Tracking ID">{currentStageStatuses[0]?.itemTrackingId}</Descriptions.Item>
                            <Descriptions.Item label="Last Updated">
                                {`${formatDistance(parseISO(currentStageStatuses[0]?.itemUpdatedAt), new Date())} ago`}
                            </Descriptions.Item>
                        </Descriptions>

                    )}
                    <Steps
                        progressDot
                        current={current}
                        onChange={onChange}
                        items={milestonesMutated}
                    />
                    <Divider />
                    {
                        entries?.length
                            ? (<Timeline
                                mode="alternate"
                                items={entries} />)
                            : <Empty description="No status updated for this stage" />

                    }

                </>
            )}
        </GeneralLayout>
    );
};

export default Product;
