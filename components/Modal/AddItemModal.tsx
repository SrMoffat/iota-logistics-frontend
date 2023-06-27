import React from 'react';
import { Button, Modal, Steps, theme, message } from 'antd';

import { CREATE_ITEM_STEPS } from '../../lib/constants';

const steps = CREATE_ITEM_STEPS.map(({ title, content }) => ({ key: title, title, content }));

const AddItemModal = (props) => {
    const { token } = theme.useToken();
    const {
        open,
        prev,
        next,
        current,
        handleOk,
        handleCancel,
        confirmLoading,
    } = props;
    const contentStyle: React.CSSProperties = {
        lineHeight: '260px',
        textAlign: 'center',
        color: token.colorTextTertiary,
        backgroundColor: token.colorFillAlter,
        borderRadius: token.borderRadiusLG,
        border: `1px dashed ${token.colorBorder}`,
        marginTop: 16,
    };
    return (
        <Modal
            title="Title"
            open={open}
            onOk={handleOk}
            confirmLoading={confirmLoading}
            onCancel={handleCancel}
        >
            <Steps current={current} items={steps} />
            <div style={contentStyle}>{steps[current].content}</div>
            <div style={{ marginTop: 24 }}>
                {current < steps.length - 1 && (
                    <Button type="primary" onClick={() => next()}>
                        Next
                    </Button>
                )}
                {current === steps.length - 1 && (
                    <Button type="primary" onClick={() => message.success('Processing complete!')}>
                        Done
                    </Button>
                )}
                {current > 0 && (
                    <Button style={{ margin: '0 8px' }} onClick={() => prev()}>
                        Previous
                    </Button>
                )}
            </div>
        </Modal>
    );
};

export default AddItemModal;