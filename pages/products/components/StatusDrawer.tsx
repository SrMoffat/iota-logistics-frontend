import React from 'react';
import { get } from 'lodash';
import { Col, Row, Drawer, Descriptions, Tag } from 'antd';

import { StatusDrawerProps } from '../../../lib/types';

const StatusDrawer = (props: StatusDrawerProps) => {
    const { open, onClose, item, status } = props;
    return (
        <Drawer
            open={open}
            key="topper"
            closable={false}
            placement="bottom"
            onClose={onClose}
            title="Recent Event"
        >
            <Descriptions
                bordered
                column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}
            >
                <Descriptions.Item label="Stage"><Tag color='green'>{get(status, 'stage')}</Tag></Descriptions.Item>
                <Descriptions.Item label="Status"><Tag color='geekblue'>{get(status, 'status')}</Tag></Descriptions.Item>
                <Descriptions.Item label="Last Updated">{get(status, 'lastUpdated')}</Descriptions.Item>
                <Descriptions.Item label="Updated By">{get(status, 'updatedBy')}</Descriptions.Item>
                <Descriptions.Item label="Item Info">
                    <Row>
                        <Col span={4} style={{ fontWeight: "bold" }}>Name:</Col>
                        <Col span={12}>{get(item, 'name')}</Col>
                    </Row>
                    <Row>
                        <Col span={4} style={{ fontWeight: "bold" }}>Description:</Col>
                        <Col span={12}>{get(item, 'description')}</Col>
                    </Row>
                    <Row>
                        <Col span={4} style={{ fontWeight: "bold" }}>Manufacturer:</Col>
                        <Col span={12}>{get(item, 'manufacturer')}</Col>
                    </Row>
                    <Row>
                        <Col span={4} style={{ fontWeight: "bold" }}>Supplier:</Col>
                        <Col span={12}>{get(item, 'supplier')}</Col>
                    </Row>
                    <Row>
                        <Col span={4} style={{ fontWeight: "bold" }}>Tracking ID:</Col>
                        <Col span={12}>{get(item, 'trackingId')}</Col>
                    </Row>
                </Descriptions.Item>
            </Descriptions>
        </Drawer>
    )
};

export default StatusDrawer