import React from 'react';
import { Layout } from 'antd';

import SideBar from '../SideBar';
import Header from '../Header';

const GeneralLayout = (props) => {
    const { children, handleShowCreateItemModal } = props;
    const { Content, Footer } = Layout;

    return (
        <Layout hasSider>
           <SideBar />
            <Layout className="site-layout" style={{ marginLeft: 200 }}>
              <Header text="Create Item" handleShowCreateItemModal={handleShowCreateItemModal} />
                <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
                    {children}
                </Content>
                <Footer style={{ textAlign: 'center' }}>IOTA - Logistics</Footer>
            </Layout>
        </Layout>
    )
};

export default GeneralLayout;
