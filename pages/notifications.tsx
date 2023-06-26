import React, { useState } from 'react';
import {
    AppstoreOutlined,
    DeploymentUnitOutlined,
    UserOutlined,
    BellOutlined,
    NodeCollapseOutlined,
    CodeSandboxOutlined,
    ArrowDownOutlined,
    ArrowUpOutlined,
} from '@ant-design/icons';
import {
    Layout,
    Menu,
    theme,
    Button,
    Col,
    Card,
    Statistic,
    Row,
    Space,
    List,
    Avatar
} from 'antd';

const { Header, Content, Footer, Sider } = Layout;

const Notifications = () => {
    const data = [
        {
            title: 'Ant Design Title 1',
        },
        {
            title: 'Ant Design Title 2',
        },
        {
            title: 'Ant Design Title 3',
        },
        {
            title: 'Ant Design Title 4',
        },
    ];
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
                    <List
                        itemLayout="horizontal"
                        dataSource={data}
                        renderItem={(item, index) => (
                            <List.Item>
                                <List.Item.Meta
                                    avatar={<Avatar src={`https://xsgames.co/randomusers/avatar.php?g=pixel&key=${index}`} />}
                                    title={<a href="https://ant.design">{item.title}</a>}
                                    description="Ant Design, a design language for background applications, is refined by Ant UED Team"
                                />
                            </List.Item>
                        )}
                    />
                </Content>
                <Footer style={{ textAlign: 'center' }}>IOTA - Logistics</Footer>
            </Layout>
        </Layout>
    )
};

export default Notifications;