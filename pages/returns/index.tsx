import React, { useState, useEffect } from 'react';

import { get } from 'lodash';
import { Card, List } from 'antd';
import { useQuery } from '@tanstack/react-query';

import GeneralLayout from '../../components/Layout/General';

import { fetchMilestones } from '../../lib/statistics';
import { fetchItemsByMilestone } from '../../lib/items';

const Returns = () => {
    const [returnedStageId, setReturnedStageId] = useState();
    const [milestoneItems, setMilestoneItems] = useState([]);
    const data = [
        {
            title: 'Title 1',
        },
        {
            title: 'Title 2',
        },
        {
            title: 'Title 3',
        },
        {
            title: 'Title 4',
        },
        {
            title: 'Title 5',
        },
        {
            title: 'Title 6',
        },
    ];
    useEffect(() => {
        const fetchMilestonesData = async () => {
            const res = await fetchMilestones()
            const returnedStage = res?.filter(({ id, name }) => name === 'Returned');
            if (returnedStage?.length) {
                const retrunedStage = returnedStage[0];
                const returnedStageId = get(retrunedStage, 'id');
                setReturnedStageId(returnedStageId);
            }
        }
        fetchMilestonesData();
    }, [])
    useEffect(() => {
        const fetchItemsDetails = async (id) => {
            console.log("Fetch items", id)
            // const res = await fetchItemsByMilestone(id)
            // // const res = await fetchItemsByMilestone(id)
            // setMilestoneItems(res);
        }
        if (returnedStageId) {
            fetchItemsDetails(returnedStageId);;
        }

    }, [returnedStageId])


    return (
        <GeneralLayout handleShowCreateItemModal={() => { }} hasCta={false}>
            <List
                grid={{
                    gutter: 16,
                    xs: 1,
                    sm: 2,
                    md: 4,
                    lg: 4,
                    xl: 6,
                    xxl: 3,
                }}
                dataSource={data}
                renderItem={(item) => (
                    <List.Item>
                        <Card title={item.title}>Card content</Card>
                    </List.Item>
                )}
            />
        </GeneralLayout>
    )
};

export default Returns;
