import React, { useState, useEffect } from 'react';
import type { ColumnsType } from 'antd/es/table';
import { useQuery } from '@tanstack/react-query';
import {
    Tag,
    Space,
    Empty,
    message,
    ColorPicker
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
        quantity: 2,
        name: 'BMW X6',
        colour: '#000000',
        status: 'Stocked',
        manufacturer: 'BMW',
        stage: 'Warehousing',
        category: 'Automobile',
        supplier: 'Awesome Automobile',
        description: 'Modern BMW model',
    },
    {
        key: '2',
        quantity: 3,
        name: 'Mac Book Pro',
        colour: '#dadefa',
        status: 'Stocked',
        manufacturer: 'BMW',
        stage: 'Warehousing',
        category: 'Automobile',
        supplier: 'Awesome Automobile',
        description: 'Mac Book Pro 2023 with m2 chip',
    },
    {
        key: '3',
        quantity: 10,
        name: 'BMW X6',
        colour: '#ff0000',
        status: 'Stocked',
        manufacturer: 'BMW',
        stage: 'Warehousing',
        category: 'Automobile',
        supplier: 'Awesome Automobile',
        description: 'Modern BMW model',
    },
    // {
    //     key: '2',
    //     name: 'Jim Green',
    //     age: 42,
    //     address: 'London No. 1 Lake Park',
    //     tags: ['loser'],
    // },
    // {
    //     key: '3',
    //     name: 'Joe Black',
    //     age: 32,
    //     address: 'Sydney No. 1 Lake Park',
    //     tags: ['cool', 'teacher'],
    // },
];
const columns: ColumnsType<DataType> = [
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        // render: (text) => <a>{text}</a>,
    },
    {
        title: 'Description',
        dataIndex: 'description',
        key: 'description',
    },
    {
        title: 'Category',
        dataIndex: 'category',
        key: 'category',
    },
    {
        title: 'Supplier',
        dataIndex: 'supplier',
        key: 'supplier',
    },
    {
        title: 'Manufacturer',
        dataIndex: 'manufacturer',
        key: 'manufacturer',
    },
    {
        title: 'Stage',
        dataIndex: 'stage',
        key: 'stage',
        render: (_, { stage }) => (
            <Tag color='geekblue' key={stage}>
                {stage.toUpperCase()}
            </Tag>
        ),
    },
    {
        title: 'Status',
        key: 'status',
        dataIndex: 'status',
        render: (_, { status }) => (
            <Tag color='green' key={status}>
                {status.toUpperCase()}
            </Tag>
        ),
    },
    {
        title: 'Colour',
        dataIndex: 'colour',
        key: 'colour',
        render: (_, { colour }) => (
            <ColorPicker value={colour} disabled />
        ),
    },
    {
        title: 'Quantity',
        dataIndex: 'quantity',
        key: 'age',
    },
    // {
    //     title: 'Action',
    //     key: 'action',
    //     render: (_, record) => (
    //         <Space size="middle">
    //             <a>Invite {record.name}</a>
    //             <a>Delete</a>
    //         </Space>
    //     ),
    // },
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
    }, [milestone]);

    const milestonesMutated = milestoneItems?.map(({ stage, status, data }) => ({ stage, status, data }));

    console.log({
        milestonesMutated
    })

    const itemsData = milestonesMutated?.map(({ stage, status, data }) => {
        return {
            key: data.uuid,
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
                        description="Select a milestone above to view items"
                    />
                ) : !milestoneItems?.length ? (
                    <Empty
                        description="No items exists for this milestone"
                    />
                ) : (
                    <CustomTable
                        columns={columns}
                        data={itemsData}
                    />
                )}
            </GeneralLayout>
        </ItemProvider>
    );
};

export default Dashboard;
