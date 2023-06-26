import React, { useState } from 'react';
import {
    Menu,
    Badge,
    theme,
    Button,
    Layout,
    Descriptions,
} from 'antd';
import {
    UserOutlined,
    BellOutlined,
    AppstoreOutlined,
    CodeSandboxOutlined,
    NodeCollapseOutlined,
    DeploymentUnitOutlined,
} from '@ant-design/icons';

const { Sider, Header, Content, Footer } = Layout;

const Profile = () => {
    const siderOptions = [
        {
            icon: <AppstoreOutlined />,
            label: 'Dashboard'
        },
        {
            icon: <CodeSandboxOutlined />,
            label: 'Products'
        },
        {
            icon: <DeploymentUnitOutlined />,
            label: 'Shippments'
        },
        {
            icon: <BellOutlined />,
            label: 'Notifications'
        },
        {
            icon: <NodeCollapseOutlined />,
            label: 'Returns'
        },
        {
            icon: <UserOutlined />,
            label: 'Profile'
        }
    ];
    const items = siderOptions.map((entry, index) => {
        const key = index + 1;
        return {
            key,
            icon: entry.icon,
            label: entry.label,
        };
    });
    const {
        token: { colorBgContainer },
    } = theme.useToken();
    const [open, setOpen] = useState(false);
    const handleShowCreateItemModal = () => {
        setOpen(true);
    };
    return (
        <Layout hasSider>
            <Sider
                style={{
                    overflow: 'auto',
                    height: '100vh',
                    position: 'fixed',
                    left: 0,
                    top: 0,
                    bottom: 0,
                }}
            >
                <div className="demo-logo-vertical" />
                <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']} items={items} />
            </Sider>
            <Layout className="site-layout" style={{ marginLeft: 200 }}>
                <Header style={{ padding: 0, background: colorBgContainer }}>
                    <Button size="large" type="primary" shape="round" onClick={handleShowCreateItemModal}>
                        Create Item
                    </Button>
                </Header>
                <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
                    <Descriptions title="User Info" layout="vertical" bordered>
                        <Descriptions.Item label="Product">Cloud Database</Descriptions.Item>
                        <Descriptions.Item label="Billing Mode">Prepaid</Descriptions.Item>
                        <Descriptions.Item label="Automatic Renewal">YES</Descriptions.Item>
                        <Descriptions.Item label="Order time">2018-04-24 18:00:00</Descriptions.Item>
                        <Descriptions.Item label="Usage Time" span={2}>
                            2019-04-24 18:00:00
                        </Descriptions.Item>
                        <Descriptions.Item label="Status" span={3}>
                            <Badge status="processing" text="Running" />
                        </Descriptions.Item>
                        <Descriptions.Item label="Negotiated Amount">$80.00</Descriptions.Item>
                        <Descriptions.Item label="Discount">$20.00</Descriptions.Item>
                        <Descriptions.Item label="Official Receipts">$60.00</Descriptions.Item>
                        <Descriptions.Item label="Config Info">
                            Data disk type: MongoDB
                            <br />
                            Database version: 3.4
                            <br />
                            Package: dds.mongo.mid
                            <br />
                            Storage space: 10 GB
                            <br />
                            Replication factor: 3
                            <br />
                            Region: East China 1
                            <br />
                        </Descriptions.Item>
                    </Descriptions>
                </Content>
                <Footer style={{ textAlign: 'center' }}>IOTA - Logistics</Footer>
            </Layout>
        </Layout>
    )
};

export default Profile;
