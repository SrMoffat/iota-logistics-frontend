import React, { useState } from 'react';

import { omit } from 'lodash';
import { useMutation } from '@tanstack/react-query';
import { Button, Modal, Steps, theme, message, Spin } from 'antd';

import { ITEM_CREATION_STEPS } from '../../lib/constants';
import { useItemContext } from '../../contexts/ItemProvider';
import { StepOne, StepTwo, StepThree, StepFour } from './steps';
import { ItemDetails } from '../../lib/types';

const steps = ITEM_CREATION_STEPS.map(({ title, content }) => ({ key: title, title, content }));

const AddItemModal = (props) => {
    const {
        open,
        prev,
        next,
        current,
        handleOk,
        handleCancel,
        confirmLoading
    } = props;
    const [error, setError] = useState('');
    const { token } = theme.useToken();
    const { updateItemDetails, item, createSupplyChainItem } = useItemContext();
    const isLastStep = steps.length - 1 == current;
    const contentStyle: React.CSSProperties = {
        color: token.colorTextTertiary,
        backgroundColor: token.colorFillAlter,
        borderRadius: token.borderRadiusLG,
        border: `1px dashed ${token.colorBorder}`,
        marginTop: 10,
        padding: 16,
    };
    const { mutateAsync, isLoading } = useMutation({
        mutationFn: async (details: ItemDetails) => {
            return await createSupplyChainItem(details);
        },
        onError: (error: Error) => {
            setError(error.message)
        },
        onSuccess: () => {
            message.success('Supply chain item created successfully.')
            handleCancel()
        },
    })
    const renderSteps = (current: number) => {
        const stepProps = {
            updateItemDetails,
            item
        };
        switch (current) {
            case 0:
                return <StepOne {...stepProps} />
            case 1:
                return <StepTwo {...stepProps} />
            case 2:
                return <StepThree {...stepProps} />
            case 3:
                return <StepFour {...item} />
        }
    }
    const updateItem = () => {
        next()
    }

    const createSupplyItem = async () => {
        await mutateAsync(item)
    };

    return (
        <Modal
            title="Create Item"
            open={open}
            width={600}
            footer={null}
            onOk={handleOk}
            onCancel={handleCancel}
            confirmLoading={confirmLoading}
            style={{ padding: 20 }}
        >
            <Steps current={current} items={steps} />
            <div style={isLastStep ? omit(contentStyle, ['backgroundColor', 'border']) : contentStyle}>
                {isLoading && <Spin />}
                {renderSteps(current)}
            </div>
            <div style={{ marginTop: 24 }}>
                {current < steps.length - 1 && (
                    <Button type="primary" onClick={updateItem}>
                        Next
                    </Button>
                )}
                {isLastStep && (
                    <Button loading={isLoading} type="primary" onClick={createSupplyItem}>
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