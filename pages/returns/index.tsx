import React, { useState, useEffect } from 'react';

import { get } from 'lodash';
import { Card, Empty, Spin, Row, Col, Tag, ColorPicker, Button } from 'antd';

import GeneralLayout from '../../components/Layout/General';

import { fetchMilestones } from '../../lib/statistics';
import { fetchItemsByMilestone } from '../../lib/items';
import { useRouter } from 'next/router';

const { Meta } = Card;

const Returns = () => {
    const { push } = useRouter();
    const [loading, setLoading] = useState(false);
    const [returnedStageId, setReturnedStageId] = useState();
    const [milestoneItems, setMilestoneItems] = useState([]);
    useEffect(() => {
        const fetchMilestonesData = async () => {
            setLoading(true);
            const res = await fetchMilestones()
            const returnedStage = res?.filter(({ id, name }) => name === 'Returned');
            if (returnedStage?.length) {
                const retrunedStage = returnedStage[0];
                const returnedStageId = get(retrunedStage, 'id');
                setReturnedStageId(returnedStageId);
            }
        }
        fetchMilestonesData();
        setLoading(false);
    }, [])
    useEffect(() => {
        const fetchItemsDetails = async (id) => {
            const res = await fetchItemsByMilestone(id)
            const massagedEvents = res?.map(({ data, stage, status }) => ({ data, stage, status }))
            setMilestoneItems(massagedEvents);
        }
        if (returnedStageId) {
            fetchItemsDetails(returnedStageId);
        }
    }, [returnedStageId]);
    return (
        <GeneralLayout handleShowCreateItemModal={() => { }} hasCta={false}>
            {
                loading
                    ? <Spin />
                    : !milestoneItems?.length
                        ? <Empty description="No active returns found" />
                        :
                        <Row gutter={[16, 16]}>
                            {milestoneItems?.map(({ data, stage, status }) => (
                                <Col span={8}>
                                    <Card
                                        bordered={false}
                                        style={{ width: 300 }}
                                        actions={[
                                            <Tag color="red">{stage?.name}</Tag>,
                                            <Tag color="orange">{status?.name}</Tag>,
                                            <Button onClick={() => push(`/products/${data?.id}`)} size="small">View</Button>
                                        ]}
                                    >
                                        <Meta
                                            avatar={<ColorPicker value={data?.colour} />}
                                            title={data?.name}
                                            description={data?.description}
                                        />
                                    </Card>
                                </Col>
                            ))}
                        </Row>
            }
        </GeneralLayout>
    )
};

export default Returns;
