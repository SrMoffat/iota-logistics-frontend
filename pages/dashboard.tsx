import React, { useState, useEffect } from 'react';

import { Empty, message } from 'antd';
import { useQuery } from '@tanstack/react-query';

import CustomTable from '../components/Table/ItemTable';
import StatisticsCards from '../components/Statistics';
import MilestoneCards from '../components/Milestones';
import GeneralLayout from '../components/Layout/General';
import AddItemModal from '../components/Modal/ItemModal';

import {
    fetchItems,
    fetchUsers,
    fetchEvents,
    fetchCurrencies,
    fetchMilestones,
    fetchCategories,
} from '../lib/statistics';
import { fetchItemsByMilestone } from '../lib/items';

const Dashboard = () => {
    const [open, setOpen] = useState(false);
    const [current, setCurrent] = useState(0);
    const [milestone, setMilestone] = useState();
    const [milestoneItems, setMilestoneItems] = useState([]);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const { isLoading: categoriesLoading, data: categories, error: categoryError } = useQuery({
        queryKey: ['categories'],
        queryFn: async () => {
            const res = await fetchCategories()
            return {
                categories: res
            }
        },
    })
    const { isLoading: currenciesLoading, data: currencies, error: currencyError } = useQuery({
        queryKey: ['currencies'],
        queryFn: async () => {
            const res = await fetchCurrencies()
            return {
                currencies: res
            }
        },
    })
    const { isLoading: eventsLoading, data: events, error: eventsError, refetch: refetchEvents } = useQuery({
        queryKey: ['events'],
        queryFn: async () => {
            const res = await fetchEvents()
            return {
                events: res
            }
        },
    })
    const { isLoading: itemsLoading, data: items, error: itemsError, refetch: refetchItems } = useQuery({
        queryKey: ['items'],
        queryFn: async () => {
            const res = await fetchItems()
            return {
                items: res
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
    const { isLoading: usersLoading, data: usersData, error: usersError } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await fetchUsers()
            return {
                users: res
            }
        },
    })
    const mapping = {
        'Categories': {
            value: categories?.categories?.length,
            loading: currenciesLoading,
        },
        'Currencies': {
            value: currencies?.currencies?.length,
            loading: categoriesLoading,
        },
        'Events': {
            value: events?.events?.length,
            loading: eventsLoading,
        },
        'Items': {
            value: items?.items?.length,
            loading: itemsLoading,
        },
        'Milestones': {
            value: milestones?.milestones?.length,
            loading: milestonesLoading,
        },
        'Users': {
            value: usersData?.users?.length,
            loading: usersLoading,
        },
    }
    const handleShowCreateItemModal = () => {
        setOpen(true);
    };
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
    const next = () => {
        setCurrent(current + 1);
    };
    const prev = () => {
        setCurrent(current - 1);
    };
    useEffect(() => {
        const error = categoryError as Error
        error && message.error(error?.message)
    }, [categoryError])
    useEffect(() => {
        const error = currencyError as Error
        error && message.error(error?.message)
    }, [currencyError])
    useEffect(() => {
        const error = eventsError as Error
        error && message.error(error?.message)
    }, [eventsError])
    useEffect(() => {
        const error = itemsError as Error
        error && message.error(error?.message)
    }, [itemsError])
    useEffect(() => {
        const error = milestonesError as Error
        error && message.error(error?.message)
    }, [milestonesError])
    useEffect(() => {
        const error = usersError as Error
        error && message.error(error?.message)
    }, [usersError])
    useEffect(() => {
        const fetchItemsData = async (id) => {
            const res = await fetchItemsByMilestone(id)
            setMilestoneItems(res);
        }
        if (milestone) {
            fetchItemsData(milestone);
        }
    }, [milestone]);
    const milestonesMutated = milestoneItems?.map(({ stage, status, data }) => ({ stage, status, data }));
    const itemsData = milestonesMutated?.map(({ stage, status, data }) => {
        return {
            key: `${data.uuid}:${Math.random()}`,
            name: data.name,
            colour: data.colour,
            status: status.name,
            manufacturer: data.manufacturer,
            supplier: data.supplier,
            category: data.category.name,
            stage: stage.name,
            description: data.description,
            quantity: data.quantity,
        }
    })
    return (
        <>
            <AddItemModal
                open={open}
                next={next}
                prev={prev}
                current={current}
                title="Create Item"
                handleOk={handleOk}
                setCurrent={setCurrent}
                handleCancel={handleCancel}
                refetchItems={refetchItems}
                setMilestone={setMilestone}
                refetchEvents={refetchEvents}
                confirmLoading={confirmLoading}
                categories={categories?.categories}
                refetchMilestones={refetchMilestones}
            />
            <GeneralLayout handleShowCreateItemModal={handleShowCreateItemModal} hasCta ctaText="Create Item">
                <StatisticsCards mapping={mapping} />
                <MilestoneCards
                    milestone={milestone}
                    itemsData={itemsData}
                    setMilestone={setMilestone}
                    milestones={milestones?.milestones}
                />
                {
                    !milestone
                        ? <Empty description="Select a milestone above to view items" />
                        : !milestoneItems?.length
                            ? <Empty description="No items exists for this milestone" />
                            : <CustomTable data={itemsData.reverse()} />
                }
            </GeneralLayout>
        </>

    );
};

export default Dashboard;
