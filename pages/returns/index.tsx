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
    List
} from 'antd';

const { Header, Content, Footer, Sider } = Layout;


const Returns = () => {

    const {
        token: { colorBgContainer },
    } = theme.useToken();
    const [open, setOpen] = useState(false);


    const handleShowCreateItemModal = () => {
        setOpen(true);
    };


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

    const data = [
        {
          title: 'Title 1',
        },
        {
          title: 'Title 2',
        },
        {
          title: 'Title 3',
        },
        {
          title: 'Title 4',
        },
        {
          title: 'Title 5',
        },
        {
          title: 'Title 6',
        },
      ];

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
                        grid={{
                            gutter: 16,
                            xs: 1,
                            sm: 2,
                            md: 4,
                            lg: 4,
                            xl: 6,
                            xxl: 3,
                        }}
                        dataSource={data}
                        renderItem={(item) => (
                            <List.Item>
                                <Card title={item.title}>Card content</Card>
                            </List.Item>
                        )}
                    />
                </Content>
                <Footer style={{ textAlign: 'center' }}>IOTA - Logistics</Footer>
            </Layout>
        </Layout>
    )
};

export default Returns;