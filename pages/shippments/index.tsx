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
    Avatar,
    Table, Tag 
} from 'antd';

import type { ColumnsType } from 'antd/es/table';

const { Header, Content, Footer, Sider } = Layout;

interface DataType {
    key: string;
    name: string;
    age: number;
    address: string;
    tags: string[];
  }

const Shippment = () => {
    const data: DataType[] = [
        {
          key: '1',
          name: 'John Brown',
          age: 32,
          address: 'New York No. 1 Lake Park',
          tags: ['nice', 'developer'],
        },
        {
          key: '2',
          name: 'Jim Green',
          age: 42,
          address: 'London No. 1 Lake Park',
          tags: ['loser'],
        },
        {
          key: '3',
          name: 'Joe Black',
          age: 32,
          address: 'Sydney No. 1 Lake Park',
          tags: ['cool', 'teacher'],
        },
      ];

    const columns: ColumnsType<DataType> = [
        {
          title: 'Name',
          dataIndex: 'name',
          key: 'name',
          render: (text) => <a>{text}</a>,
        },
        {
          title: 'Age',
          dataIndex: 'age',
          key: 'age',
        },
        {
          title: 'Address',
          dataIndex: 'address',
          key: 'address',
        },
        {
          title: 'Tags',
          key: 'tags',
          dataIndex: 'tags',
          render: (_, { tags }) => (
            <>
              {tags.map((tag) => {
                let color = tag.length > 5 ? 'geekblue' : 'green';
                if (tag === 'loser') {
                  color = 'volcano';
                }
                return (
                  <Tag color={color} key={tag}>
                    {tag.toUpperCase()}
                  </Tag>
                );
              })}
            </>
          ),
        },
        {
          title: 'Action',
          key: 'action',
          render: (_, record) => (
            <Space size="middle">
              <a>Invite {record.name}</a>
              <a>Delete</a>
            </Space>
          ),
        },
      ];
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
                <Table columns={columns} dataSource={data} />
                    {/* <List
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
                    /> */}
                </Content>
                <Footer style={{ textAlign: 'center' }}>IOTA - Logistics</Footer>
            </Layout>
        </Layout>
    )
};

export default Shippment;