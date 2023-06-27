import React from 'react';
import { Button, Modal, Steps, theme, message } from 'antd';

import { ITEM_CREATION_STEPS } from '../../lib/constants';
import { StepOne, StepTwo, StepThree } from './steps';

const steps = ITEM_CREATION_STEPS.map(({ title, content }) => ({ key: title, title, content }));

const AddItemModal = (props) => {
    const { token } = theme.useToken();
    const {
        open,
        prev,
        next,
        current,
        handleOk,
        handleCancel,
        confirmLoading
    } = props;
    const contentStyle: React.CSSProperties = {
        lineHeight: '260px',
        textAlign: 'center',
        color: token.colorTextTertiary,
        backgroundColor: token.colorFillAlter,
        borderRadius: token.borderRadiusLG,
        border: `1px dashed ${token.colorBorder}`,
        marginTop: 16,
        padding: 16,
    };
    const renderSteps = (current: number) => {
        switch (current) {
            case 0:
                return <StepOne />
            case 1:
                return <StepTwo />
            case 2:
                return <StepThree />
            case 3:
                return <StepThree />
        }
    }
    return (
        <Modal
            title="Create Item"
            open={open}
            footer={null}
            onOk={handleOk}
            onCancel={handleCancel}
            confirmLoading={confirmLoading}
        >
            <Steps current={current} items={steps} />
            <div style={contentStyle}>
                {renderSteps(current)}
            </div>
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