import React from 'react';
import { Layout } from 'antd';

import Header from '../Header';
import SideBar from '../SideBar';

const GeneralLayout = (props) => {
    const { children, handleShowCreateItemModal, hasCta, ctaText } = props;
    const { Content, Footer } = Layout;
    return (
        <Layout hasSider>
           <SideBar />
            <Layout className="site-layout" style={{ marginLeft: 200 }}>
              <Header hasCta={hasCta} ctaText={hasCta ? ctaText : ""} handleShowCreateItemModal={handleShowCreateItemModal} />
                <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
                    {children}
                </Content>
                <Footer style={{ textAlign: 'center' }}>IOTA - Logistics</Footer>
            </Layout>
        </Layout>
    )
};

export default GeneralLayout;
