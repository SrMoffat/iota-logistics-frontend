import React, { useEffect, useState } from 'react';

import { get, groupBy } from 'lodash';
import { useRouter } from 'next/router';
import { useQuery } from '@tanstack/react-query';
import { parseISO, formatDistance } from 'date-fns';
import { Divider, Steps, Spin, Timeline, Descriptions, Empty } from 'antd';

import GeneralLayout from '../../components/Layout/General';
import UpdateItemModal from '../../components/Modal/ItemModal';

import { EventDetails } from '../../lib/types';
import { fetchMilestones } from '../../lib/statistics';
import { fetchSupplyChainItemEvents } from '../../lib/items';

interface ItemDetailsSummary {
    name: string;
    trackingId: string;
    updatedAt: string;
}

const Product = () => {
    const router = useRouter()
    const [itemId, setItemId] = useState<string>();
    const [current, setCurrent] = useState(0);
    const [itemDetails, setItemDetails] = useState<ItemDetailsSummary>();
    const [events, setEvents] = useState<{ [key: number | string]: EventDetails[] }>();
    const [currentStageStatuses, setCurrentStageStatuses] = useState<EventDetails[]>();
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
    const milestonesMutated = milestonesArray?.map(({ id, name, description }) => ({ id, title: name, description }));
    useEffect(() => {
        if (router.isReady) {
            const fetchDetails = async () => {
                const itemID = router.query.id;
                const res = await fetchSupplyChainItemEvents(itemID as string)
                const massagedEvents = res?.events?.map(({ status, updatedAt, stage, data, user }) => ({
                    status: status?.name,
                    statusId: status?.id,
                    statusDescription: status?.description,
                    stage: stage?.name,
                    stageId: stage?.id,
                    stageDescription: stage?.description,
                    updatedAt,
                    itemName: data?.name,
                    itemUpdatedAt: data?.updatedAt,
                    itemTrackingId: data?.trackingId,
                    username: user?.username,
                    userEmail: user?.email
                }));
                const groupedStuff = groupBy(massagedEvents, 'stageId')
                setEvents(groupedStuff)
                setItemId(itemID as string);
            }
            fetchDetails().catch(console.error);
        }
    }, [router.isReady])
    useEffect(() => {
        if (events && milestonesMutated?.length) {
            const initialState = milestonesMutated[current]
            const stateId = get(initialState, 'id');
            const itemData = events[stateId][0];
            setCurrentStageStatuses(events[stateId]);
            setItemDetails({
                name: itemData?.itemName,
                trackingId: itemData?.itemTrackingId,
                updatedAt: itemData?.itemUpdatedAt
            });
        }
    }, [events])
    useEffect(() => {
        if (current) {
            const newState = milestonesMutated[current]
            const stageId = get(newState, 'id');
            if (events[stageId]) {
                setCurrentStageStatuses(events[stageId]);
            } else {
                setCurrentStageStatuses(undefined);
            }
        }
    }, [current])
    const onChange = (value: number) => {
        setCurrent(value);
        if (!value) {
            if (events && milestonesMutated?.length) {
                const initialState = milestonesMutated[value]
                const stateId = get(initialState, 'id');
                setCurrentStageStatuses(events[stateId]);
            }
        }
    };
    const entries = currentStageStatuses?.map(({ status, statusDescription, updatedAt, username }) => ({
        color: 'green',
        children: (
            <div style={{ padding: 0, lineHeight: 0.5 }}>
                <p style={{ fontWeight: "bold", marginTop: "5px" }}>{status}</p>
                <p>{statusDescription}</p>
                <p style={{ fontSize: '11px', fontWeight: 'bold' }}>
                    {`${formatDistance(parseISO(updatedAt), new Date())} ago`}
                </p>
                <p style={{ fontSize: '11px', fontStyle: 'italic' }}>
                    {`Updated By: ${username}`}
                </p>
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
    const productRecentUpdateTimestamp = currentStageStatuses
        ? currentStageStatuses[0]?.itemUpdatedAt
        : itemDetails?.updatedAt
    return (
        <GeneralLayout handleShowCreateItemModal={handleShowUpdateItemModal} hasCta ctaText="Update Item">
            <UpdateItemModal
                editMode
                open={open}
                next={next}
                prev={prev}
                current={current}
                handleOk={handleOk}
                setCurrent={setCurrent}
                handleCancel={handleCancel}
                setMilestone={setMilestone}
                // refetchItems={refetchItems}
                // refetchEvents={refetchEvents}
                confirmLoading={confirmLoading}
                // categories={categories?.categories}
                // refetchMilestones={refetchMilestones}
                itemId={itemId}
                title={`Update ${currentStageStatuses ? currentStageStatuses[0]?.itemName : "Item"}`}
            />
            {milestonesLoading ? <Spin /> : (
                <>
                    {currentStageStatuses?.length && (
                        <Descriptions
                            bordered
                            column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}
                            style={{ marginBottom: 20 }}
                        >
                            <Descriptions.Item label="Name">
                                {currentStageStatuses[0]?.itemName || itemDetails?.name}
                            </Descriptions.Item>
                            <Descriptions.Item label="Tracking ID">
                                {currentStageStatuses[0]?.itemTrackingId || itemDetails?.trackingId}
                            </Descriptions.Item>
                            <Descriptions.Item label="Last Updated">
                                {`${formatDistance(parseISO(productRecentUpdateTimestamp), new Date())} ago`}
                            </Descriptions.Item>
                        </Descriptions>
                    )}
                    <Descriptions
                        bordered
                        column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}
                        style={{ marginBottom: 20 }}
                    >
                        <Descriptions.Item label="Name">
                            {itemDetails?.name}
                        </Descriptions.Item>
                        <Descriptions.Item label="Tracking ID">
                            {itemDetails?.trackingId}
                        </Descriptions.Item>
                        {/* <Descriptions.Item label="Last Updated">
                            {`${formatDistance(parseISO(
                                currentStageStatuses
                                ? currentStageStatuses[0]?.itemUpdatedAt
                                : itemDetails
                                    ? itemDetails?.updatedAt
                                    : 
                                itemDetails?.updatedAt),
                                new Date()
                            )} ago`}
                        </Descriptions.Item> */}
                    </Descriptions>
                    {/* {currentStageStatuses?.length && (
                        <Descriptions
                            bordered
                            column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}
                            style={{ marginBottom: 20 }}
                        >
                            <Descriptions.Item label="Name">
                                {currentStageStatuses[0]?.itemName || itemDetails?.name}
                            </Descriptions.Item>
                            <Descriptions.Item label="Tracking ID">
                                {currentStageStatuses[0]?.itemTrackingId || itemDetails?.trackingId}
                            </Descriptions.Item>
                            <Descriptions.Item label="Last Updated">
                                {`${formatDistance(parseISO(currentStageStatuses[0]?.itemUpdatedAt
                                    || itemDetails?.updatedAt), new Date())} ago`}
                            </Descriptions.Item>
                        </Descriptions>

                    )} */}
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
