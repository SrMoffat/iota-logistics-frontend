import React, { useState } from 'react';
import { Col, Card, Row, Statistic } from 'antd';
import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';

import GeneralLayout from '../components/Layout/General';
import AddItemModal from '../components/Modal/AddItemModal';

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
            <GeneralLayout handleShowCreateItemModal={handleShowCreateItemModal}>
                <Row gutter={16}>
                    <Col span={12}>
                        <Card bordered={false}>
                            <Statistic
                                title="Active"
                                value={11.28}
                                precision={2}
                                valueStyle={{ color: '#3f8600' }}
                                prefix={<ArrowUpOutlined />}
                                suffix="%"
                            />
                        </Card>
                    </Col>
                    <Col span={12}>
                        <Card bordered={false}>
                            <Statistic
                                title="Idle"
                                value={9.3}
                                precision={2}
                                valueStyle={{ color: '#cf1322' }}
                                prefix={<ArrowDownOutlined />}
                                suffix="%"
                            />
                        </Card>
                    </Col>
                </Row>
            </GeneralLayout>
        </>
    );
};

export default Dashboard;
