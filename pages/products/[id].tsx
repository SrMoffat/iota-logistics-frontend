import React, { useEffect } from 'react';
import { ClockCircleOutlined } from '@ant-design/icons';
import { Divider, Steps, message, Spin, Timeline } from 'antd';
import { usePathname } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';

import GeneralLayout from '../../components/Layout/General';
import { fetchSupplyChainItemEvents } from '../../lib/items';
import { fetchMilestones } from '../../lib/statistics';

const Product = () => {
    const pathname = usePathname()

    const { isLoading: eventsLoading, data: events, error: eventsError } = useQuery({
        queryKey: ['itemMilestones'],
        queryFn: async () => {
            const res = await fetchSupplyChainItemEvents(pathname?.split('/products/')[1])
            return {
                itemMilestones: res
            }
        },
    })
    const { isLoading: milestonesLoading, data: milestones, error: milestonesError, refetch: refetchMilestones } = useQuery({
        queryKey: ['milestones'],
        queryFn: async () => {
            const res = await fetchMilestones()
            return {
                milestones: res
            }
        },
    })
    useEffect(() => {
        const error = eventsError as Error
        const error2 = milestonesError as Error
        error && message.error(error?.message)
        error2 && message.error(error2?.message)
    }, [eventsError, milestonesError])


    const eventsArray = events?.itemMilestones?.events
    const milestonesArray = milestones?.milestones

    const milestonesMutated = milestonesArray?.map(({ id, attributes }) => ({ id, title: attributes?.name, description: attributes?.description }));


    console.log("eventsArray==>", eventsArray)
    console.log("milestonesArray==>", milestonesMutated)
    return (
        <GeneralLayout handleShowCreateItemModal={() => { }} hasCta={false}>
            {eventsLoading || milestonesLoading && <Spin />}
            <Steps
                progressDot
                current={1}
                items={milestonesMutated}
            />
            <Divider />
            <Timeline
                mode="alternate"
                items={[
                    {
                        children: 'Create a services site 2015-09-01',
                    },
                    {
                        children: 'Solve initial network problems 2015-09-01',
                        color: 'green',
                    },
                    {
                        dot: <ClockCircleOutlined style={{ fontSize: '16px' }} />,
                        children: `Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.`,
                    },
                    {
                        color: 'red',
                        children: 'Network problems being solved 2015-09-01',
                    },
                    {
                        children: 'Create a services site 2015-09-01',
                    },
                    {
                        dot: <ClockCircleOutlined style={{ fontSize: '16px' }} />,
                        children: 'Technical testing 2015-09-01',
                    },
                ]}
            />
        </GeneralLayout>
    );
};

export default Product;
