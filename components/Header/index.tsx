import React from 'react';
import { theme, Layout, Button } from 'antd';

const { Header } = Layout;

const GeneralHeader = (props) => {
    const { handleShowCreateItemModal, ctaText, hasCta } = props;
    const {
        token: { colorBgContainer },
    } = theme.useToken();
    return (
        <Header style={{ padding: 3, background: colorBgContainer }}>
            {hasCta && (
                <Button size="large" type="primary" shape="round" onClick={handleShowCreateItemModal}>
                    {ctaText}
                </Button>
            )}
        </Header>
    )
};
export default GeneralHeader;
