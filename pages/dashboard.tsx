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
    Space
} from 'antd';
const Dashboard = () => {
    const { Header, Content, Footer, Sider } = Layout;

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

    const IconText = ({ icon, text }: { icon: React.FC; text: string }) => (
        <Space>
            {React.createElement(icon)}
            {text}
        </Space>
    );

    const data = Array.from({ length: 23 }).map((_, i) => ({
        href: 'https://ant.design',
        title: `ant design part ${i}`,
        avatar: `https://xsgames.co/randomusers/avatar.php?g=pixel&key=${i}`,
        description:
            'Ant Design, a design language for background applications, is refined by Ant UED Team.',
        content:
            'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
    }));

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
                </Content>
                <Footer style={{ textAlign: 'center' }}>IOTA - Logistics</Footer>
            </Layout>
        </Layout>
    );
};

export default Dashboard;
