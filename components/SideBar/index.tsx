import React, { useState } from 'react';
import { get } from 'lodash';
import { useRouter } from 'next/navigation';
import type { MenuProps } from 'antd';
import {
    UserOutlined,
    BellOutlined,
    LogoutOutlined,
    ArrowUpOutlined,
    AppstoreOutlined,
    ArrowDownOutlined,
    CodeSandboxOutlined,
    NodeCollapseOutlined,
    DeploymentUnitOutlined,
} from '@ant-design/icons';
import {
    Col,
    Card,
    Row,
    Menu,
    theme,
    Space,
    Layout,
    Button,
    Statistic,
} from 'antd';
import { useAuthContext } from '../../contexts/AuthProvider';


const { Header, Content, Footer, Sider } = Layout;


const SideBar = () => {

    const { push } = useRouter();
    const { logout } = useAuthContext();
    const [current, setCurrent] = useState('Dashboard');

    const siderOptions = [
        {
            icon: <AppstoreOutlined />,
            label: 'Dashboard'
        },
        {
            icon: <CodeSandboxOutlined />,
            label: 'Products'
        },
        // {
        //     icon: <DeploymentUnitOutlined />,
        //     label: 'Shippments'
        // },
        // {
        //     icon: <BellOutlined />,
        //     label: 'Notifications'
        // },
        // {
        //     icon: <NodeCollapseOutlined />,
        //     label: 'Returns'
        // },
        // {
        //     icon: <UserOutlined />,
        //     label: 'Profile'
        // },
        // {
        //     icon: <LogoutOutlined />,
        //     label: 'Logout'
        // }
    ];
    const items = siderOptions.map((entry, index) => {
        return {
            key: entry.label,
            icon: entry.icon,
            label: entry.label,
        };
    });

    const onClickMenu: MenuProps['onClick'] = (e) => {
        const itemKey = get(e, 'key');
        setCurrent(itemKey)
        switch (itemKey){
            // case 'Dashboard':
            //     push('/dashboard');
            //     break;
            // case 'Products':
            //     push('/products');
            //     break;
            // case 'Shippments':
            //     push('/shippments');
            //     break;
            // case 'Notifications':
            //     push('/notifications');
            //     break;
            // case 'Returns':
            //     push('/returns');
            //     break;
            // case 'Profile':
            //     push('/profile');
            //     break;
            case 'Logout':
                logout();
                push('/signin');
                break;
        }
      };
    return (
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
            <Menu onClick={onClickMenu} theme="dark" mode="inline" selectedKeys={[current]} defaultSelectedKeys={['Dashboard']} items={items} />
        </Sider>

    )
};

export default SideBar;
