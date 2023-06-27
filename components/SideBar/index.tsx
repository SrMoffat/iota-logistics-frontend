import React, { useState } from 'react';
import Link from 'next/link';

import { get } from 'lodash';
import { Menu, Layout } from 'antd';
import type { MenuProps } from 'antd';
import { useRouter } from 'next/navigation';

import { SIDE_MENU_ITEMS } from '../../lib/constants';
import { useAuthContext } from '../../contexts/AuthProvider';

const { Sider } = Layout;

const SideBar = () => {
    const { push } = useRouter();
    const { logout } = useAuthContext();
    const [current, setCurrent] = useState('Dashboard');

    const onClickMenu: MenuProps['onClick'] = (e) => {
        const itemKey = get(e, 'key');
        setCurrent(itemKey)
        switch (itemKey) {
            case 'Logout':
                logout();
                push('/signin');
                break;
        }
    };
    const menuOptions = SIDE_MENU_ITEMS.map(option => {
        const { icon, href, title } = option;
        return (
            <Menu.Item key={href}>
                <Link href={href} passHref style={{ textDecoration: 'none' }}>
                    {React.createElement(icon)} <span style={{ fontSize: 14 }}>{title}</span>
                </Link>
            </Menu.Item>
        )
    })
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
            <Menu onClick={onClickMenu} theme="dark" mode="inline" selectedKeys={[current]} defaultSelectedKeys={['Dashboard']}>
                {menuOptions}
            </Menu>
        </Sider>

    )
};

export default SideBar;
