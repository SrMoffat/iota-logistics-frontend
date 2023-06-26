import React from 'react';
import type { MenuProps } from 'antd';
import {
    AppstoreOutlined,
    BarChartOutlined,
    CloudOutlined,
    ShopOutlined,
    TeamOutlined,
    UploadOutlined,
    UserOutlined,
    VideoCameraOutlined,
} from '@ant-design/icons';
import { Divider, Steps, Layout, Menu, theme } from 'antd';

const { Header, Content, Footer, Sider } = Layout;


const items: MenuProps['items'] = [
    UserOutlined,
    VideoCameraOutlined,
    UploadOutlined,
    BarChartOutlined,
    CloudOutlined,
    AppstoreOutlined,
    TeamOutlined,
    ShopOutlined,
].map((icon, index) => ({
    key: String(index + 1),
    icon: React.createElement(icon),
    label: `nav ${index + 1}`,
}));

const Product = () => {
    const {
        token: { colorBgContainer },
    } = theme.useToken();
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
                <Menu theme="dark" mode="inline" defaultSelectedKeys={['4']} items={items} />
            </Sider>
            <Layout className="site-layout" style={{ marginLeft: 200 }}>
                <Header style={{ padding: 0, background: colorBgContainer }} />
                <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
                    <Steps
                        progressDot
                        current={1}
                        items={[
                            {
                                title: 'Finished',
                                description: 'This is a description.',
                            },
                            {
                                title: 'In Progress',
                                description: 'This is a description.',
                            },
                            {
                                title: 'Waiting',
                                description: 'This is a description.',
                            },
                        ]}
                    />
                    <Divider />
                    <Steps
                        progressDot
                        current={1}
                        direction="vertical"
                        items={[
                            {
                                title: 'Finished',
                                description: 'This is a description. This is a description.',
                            },
                            {
                                title: 'Finished',
                                description: 'This is a description. This is a description.',
                            },
                            {
                                title: 'In Progress',
                                description: 'This is a description. This is a description.',
                            },
                            {
                                title: 'Waiting',
                                description: 'This is a description.',
                            },
                            {
                                title: 'Waiting',
                                description: 'This is a description.',
                            },
                        ]}
                    />
                </Content>
                <Footer style={{ textAlign: 'center' }}>Ant Design ©2023 Created by Ant UED</Footer>
            </Layout>
        </Layout>
    );
};

export default Product;
