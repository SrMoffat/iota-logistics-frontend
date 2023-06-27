import React from 'react';
import { theme, Layout, Button } from 'antd';

const { Header } = Layout;

const GeneralHeader = (props) => {
    const { handleShowCreateItemModal, text } = props;
    const {
        token: { colorBgContainer },
    } = theme.useToken();
    return (
        <Header style={{ padding: 0, background: colorBgContainer }}>
            <Button size="large" type="primary" shape="round" onClick={handleShowCreateItemModal}>
                {text}
            </Button>
        </Header>
    )
};
export default GeneralHeader;
