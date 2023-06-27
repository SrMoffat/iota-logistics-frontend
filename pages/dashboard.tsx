import React, { useState, useEffect } from 'react';
import type { ColumnsType } from 'antd/es/table';
import { useQuery } from '@tanstack/react-query';
import {
    Col,
    Row,
    Space,
    Table,
    Tag,
    message
} from 'antd';


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
    console.log("Datcategoriesa==>", categories);
    console.log("Datacurrencies==>", currencies);
    console.log("Dataevents==>", events);
    console.log("Dataitems==>", items);
    console.log("Datamilestoness==>", milestones);
    console.log("Datamiusers==>", usersData);
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
                <StatisticsCards />
                <MilestoneCards />
                <Row style={{ marginTop: 20 }}>
                    <Col span={24}>
                        <Table columns={columns} dataSource={data} />
                    </Col>
                </Row>
            </GeneralLayout>
        </ItemProvider>
    );
};

export default Dashboard;
