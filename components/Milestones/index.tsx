import React from 'react';
import {
    Col,
    Row,
    Avatar,
    Segmented,
} from 'antd';
import {
    CarFilled,
    ShopFilled,
    GiftFilled,
    NodeExpandOutlined,
    FolderOpenFilled,
    InteractionFilled,
    WalletFilled,
} from '@ant-design/icons';

const MilestoneCards = () => {
    return (
        <Row style={{ marginTop: 20 }}>
            <Col span={24}>
                <Segmented
                    block
                    options={[
                        {
                            label: (
                                <div style={{ padding: 4 }}>
                                    <Avatar icon={<ShopFilled />} />
                                    <div>Warehousing</div>
                                </div>
                            ),
                            value: 'user1',
                        },
                        {
                            label: (
                                <div style={{ padding: 4 }}>
                                    <Avatar icon={<FolderOpenFilled />} />
                                    <div>Processing</div>
                                </div>
                            ),
                            value: 'user2',
                        },
                        {
                            label: (
                                <div style={{ padding: 4 }}>
                                    <Avatar icon={<CarFilled />} />
                                    <div>Transit</div>
                                </div>
                            ),
                            value: 'user3',
                        },
                        {
                            label: (
                                <div style={{ padding: 4 }}>
                                    <Avatar icon={<GiftFilled />} />
                                    <div>Delivery</div>
                                </div>
                            ),
                            value: 'user4',
                        },
                        {
                            label: (
                                <div style={{ padding: 4 }}>
                                    <Avatar icon={<InteractionFilled />} />
                                    <div>Returned</div>
                                </div>
                            ),
                            value: 'user7',
                        },
                        {
                            label: (
                                <div style={{ padding: 4 }}>
                                    <Avatar icon={<NodeExpandOutlined />} />
                                    <div>Recovery</div>
                                </div>
                            ),
                            value: 'user5',
                        },
                        {
                            label: (
                                <div style={{ padding: 4 }}>
                                    <Avatar icon={<WalletFilled />} />
                                    <div>Termination</div>
                                </div>
                            ),
                            value: 'user6',
                        },
                    ]}
                />
            </Col>
        </Row>
    )
}

export default MilestoneCards;
