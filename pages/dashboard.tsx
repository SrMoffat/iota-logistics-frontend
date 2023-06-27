import React, { useState } from 'react';
import {
    Col,
    Row,
    Card,
    Space,
    Avatar,
    Statistic,
    Segmented,
} from 'antd';
import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';

import GeneralLayout from '../components/Layout/General';
import AddItemModal from '../components/Modal/AddItemModal';

import { UserOutlined } from '@ant-design/icons';

const Dashboard = () => {
    const [open, setOpen] = useState(false);
    const [current, setCurrent] = useState(0);
    const [confirmLoading, setConfirmLoading] = useState(false);

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
        console.log('Clicked cancel button');
        setOpen(false);
    };

    const next = () => {
        setCurrent(current + 1);
    };
    const prev = () => {
        setCurrent(current - 1);
    };

    return (
        <>
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
                <Row gutter={16}>
                    <Col span={4}>
                        <Card bordered={false}>
                            <Statistic
                                title="Categories"
                                value={11.28}
                                precision={2}
                                valueStyle={{ color: '#3f8600' }}
                                prefix={<ArrowUpOutlined />}
                                suffix="%"
                            />
                        </Card>
                    </Col>
                    <Col span={4}>
                        <Card bordered={false}>
                            <Statistic
                                title="Currencies"
                                value={9.3}
                                precision={2}
                                valueStyle={{ color: '#cf1322' }}
                                prefix={<ArrowDownOutlined />}
                                suffix="%"
                            />
                        </Card>
                    </Col>
                    <Col span={4}>
                        <Card bordered={false}>
                            <Statistic
                                title="Events"
                                value={11.28}
                                precision={2}
                                valueStyle={{ color: '#3f8600' }}
                                prefix={<ArrowUpOutlined />}
                                suffix="%"
                            />
                        </Card>
                    </Col>
                    <Col span={4}>
                        <Card bordered={false}>
                            <Statistic
                                title="Items"
                                value={9.3}
                                precision={2}
                                valueStyle={{ color: '#cf1322' }}
                                prefix={<ArrowDownOutlined />}
                                suffix="%"
                            />
                        </Card>
                    </Col>
                    <Col span={4}>
                        <Card bordered={false}>
                            <Statistic
                                title="Milestones"
                                value={11.28}
                                precision={2}
                                valueStyle={{ color: '#3f8600' }}
                                prefix={<ArrowUpOutlined />}
                                suffix="%"
                            />
                        </Card>
                    </Col>
                    <Col span={4}>
                        <Card bordered={false}>
                            <Statistic
                                title="Users"
                                value={9.3}
                                precision={2}
                                valueStyle={{ color: '#cf1322' }}
                                prefix={<ArrowDownOutlined />}
                                suffix="%"
                            />
                        </Card>
                    </Col>
                </Row>
                <Row style={{ marginTop: 10 }}>
                    <Col span={24}>
                        <Segmented
                            block
                            options={[
                                {
                                    label: (
                                        <div style={{ padding: 4 }}>
                                            <Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel" />
                                            <div>Warehousing</div>
                                        </div>
                                    ),
                                    value: 'user1',
                                },
                                {
                                    label: (
                                        <div style={{ padding: 4 }}>
                                            <Avatar style={{ backgroundColor: '#f56a00' }}>K</Avatar>
                                            <div>Processing</div>
                                        </div>
                                    ),
                                    value: 'user2',
                                },
                                {
                                    label: (
                                        <div style={{ padding: 4 }}>
                                            <Avatar style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />} />
                                            <div>Transit</div>
                                        </div>
                                    ),
                                    value: 'user3',
                                },
                                {
                                    label: (
                                        <div style={{ padding: 4 }}>
                                            <Avatar style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />} />
                                            <div>Delivery</div>
                                        </div>
                                    ),
                                    value: 'user4',
                                },
                                {
                                    label: (
                                        <div style={{ padding: 4 }}>
                                            <Avatar style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />} />
                                            <div>Returned</div>
                                        </div>
                                    ),
                                    value: 'user7',
                                },
                                {
                                    label: (
                                        <div style={{ padding: 4 }}>
                                            <Avatar style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />} />
                                            <div>Recovery</div>
                                        </div>
                                    ),
                                    value: 'user5',
                                },
                                {
                                    label: (
                                        <div style={{ padding: 4 }}>
                                            <Avatar style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />} />
                                            <div>Termination</div>
                                        </div>
                                    ),
                                    value: 'user6',
                                },
                            ]}
                        />
                    </Col>
                </Row>
            </GeneralLayout>
        </>
    );
};

export default Dashboard;
