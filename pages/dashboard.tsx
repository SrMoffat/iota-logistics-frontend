import React, { useState, useEffect } from 'react';
import type { ColumnsType } from 'antd/es/table';
import { useQuery } from '@tanstack/react-query';
import {
    Tag,
    Space,
    Empty,
    message,
} from 'antd';

import CustomTable from '../components/Table';
import StatisticsCards from '../components/Statistics';
import MilestoneCards from '../components/Milestones';
import GeneralLayout from '../components/Layout/General';
import AddItemModal from '../components/Modal/AddItemModal';

import { ItemProvider } from '../contexts'
import { DataType } from '../lib/types';
import {
    fetchItems,
    fetchUsers,
    fetchEvents,
    fetchCurrencies,
    fetchMilestones,
    fetchCategories,
} from '../lib/statistics';
import { fetchItemsByMilestone } from '../lib/items';

const data: DataType[] = [
    {
        key: '1',
        name: 'John Brown',
        age: 32,
        address: 'New York No. 1 Lake Park',
        tags: ['nice', 'developer'],
    },
    {
        key: '2',
        name: 'Jim Green',
        age: 42,
        address: 'London No. 1 Lake Park',
        tags: ['loser'],
    },
    {
        key: '3',
        name: 'Joe Black',
        age: 32,
        address: 'Sydney No. 1 Lake Park',
        tags: ['cool', 'teacher'],
    },
];
const columns: ColumnsType<DataType> = [
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        render: (text) => <a>{text}</a>,
    },
    {
        title: 'Age',
        dataIndex: 'age',
        key: 'age',
    },
    {
        title: 'Address',
        dataIndex: 'address',
        key: 'address',
    },
    {
        title: 'Tags',
        key: 'tags',
        dataIndex: 'tags',
        render: (_, { tags }) => (
            <>
                {tags.map((tag) => {
                    let color = tag.length > 5 ? 'geekblue' : 'green';
                    if (tag === 'loser') {
                        color = 'volcano';
                    }
                    return (
                        <Tag color={color} key={tag}>
                            {tag.toUpperCase()}
                        </Tag>
                    );
                })}
            </>
        ),
    },
    {
        title: 'Action',
        key: 'action',
        render: (_, record) => (
            <Space size="middle">
                <a>Invite {record.name}</a>
                <a>Delete</a>
            </Space>
        ),
    },
];
const Dashboard = () => {
    const [open, setOpen] = useState(false);
    const [current, setCurrent] = useState(0);
    const [milestone, setMilestone] = useState();
    const [milestoneItems, setMilestoneItems] = useState();
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
    const { isLoading: eventsLoading, data: events, error: eventsError } = useQuery({
        queryKey: ['events'],
        queryFn: async () => {
            const res = await fetchEvents()
            return {
                events: res
            }
        },
    })
    const { isLoading: itemsLoading, data: items, error: itemsError } = useQuery({
        queryKey: ['items'],
        queryFn: async () => {
            const res = await fetchItems()
            return {
                items: res
            }
        },
    })
    const { isLoading: milestonesLoading, data: milestones, error: milestonesError } = useQuery({
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
    }, [milestone])

    console.log({
        milestoneItems
    })
    return (
        <ItemProvider>
            <AddItemModal
                open={open}
                next={next}
                prev={prev}
                current={current}
                handleOk={handleOk}
                handleCancel={handleCancel}
                confirmLoading={confirmLoading}
            />
            <GeneralLayout handleShowCreateItemModal={handleShowCreateItemModal} hasCta ctaText="Create Item">
                <StatisticsCards mapping={mapping} />
                <MilestoneCards
                    milestone={milestone}
                    setMilestone={setMilestone}
                    milestones={milestones?.milestones}
                />
                {!milestone ? (
                    <Empty
                        description={
                            <span>
                                Select a milestone above to view items
                            </span>
                        }
                    />
                ) : (
                    <CustomTable
                        columns={columns}
                        data={data}
                    />
                )}
                {/* {!milestone ? (
                    <Empty
                        description={
                            <span>
                                Select a milestone above to view items
                            </span>
                        }
                    />
                ) : milestoneEventsLoading
                    ? <Spin /> :
                    (
                        <CustomTable
                            columns={columns}
                            data={data}
                        />
                    )} */}
            </GeneralLayout>
        </ItemProvider>
    );
};

export default Dashboard;
