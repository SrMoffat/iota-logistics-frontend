import React, { useState } from 'react';

import { omit } from 'lodash';
import { useMutation } from '@tanstack/react-query';
import { Button, Modal, Steps, theme, message, Spin, Alert } from 'antd';

import { ItemDetails } from '../../lib/types';
import { ITEM_CREATION_STEPS } from '../../lib/constants';
import { useItemContext } from '../../contexts/ItemProvider';
import { StepOne, StepTwo, StepThree, StepFour } from './AddItemSteps';

const steps = ITEM_CREATION_STEPS.map(({ title, content }) => ({ key: title, title, content }));

const AddItemModal = (props) => {
    const {
        open,
        prev,
        next,
        current,
        handleOk,
        categories,
        setCurrent,
        refetchItems,
        handleCancel,
        refetchEvents,
        confirmLoading,
        refetchMilestones
    } = props;
    const [error, setError] = useState<string>();
    const { token } = theme.useToken();
    const { updateItemDetails, item, createSupplyChainItem, setItem } = useItemContext();
    const isLastStep = steps.length - 1 == current;
    const contentStyle: React.CSSProperties = {
        color: token.colorTextTertiary,
        backgroundColor: token.colorFillAlter,
        borderRadius: token.borderRadiusLG,
        border: `1px dashed ${token.colorBorder}`,
        marginTop: 10,
        padding: 16,
    };
    const { mutateAsync, isLoading, isError } = useMutation({
        mutationFn: async (details: ItemDetails) => {
            return await createSupplyChainItem(details);
        },
        onError: (error: Error) => {
            setError(error.message);
            message.error(error.message);
        },
        onSuccess: () => {
            message.success('Supply chain item created successfully.');
            setCurrent(0)
            handleCancel();
            refetchItems();
            refetchEvents()
            setItem(undefined);
            refetchMilestones();
            updateItemDetails({
                category: undefined,
                colour: undefined,
                description: undefined,
                dimensions: {
                    height: undefined,
                    length: undefined,
                    units: undefined,
                    width: undefined
                },
                handling: {
                    type: undefined,
                    instructions: undefined
                },
                manufacturer: undefined,
                name: undefined,
                quantity: undefined,
                supplier: undefined,
                weight: {
                    unit: undefined,
                    value: undefined
                },
                compliance: {
                    certificates: undefined,
                    customs: undefined,
                    regulatory: undefined
                }
            })
        },
    })
    const renderSteps = (current: number) => {
        const stepProps = {
            updateItemDetails,
            item,
            categories
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
    const createSupplyItem = async (data: ItemDetails) => {
        await mutateAsync(data)
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
                {isError && <Alert type="error" showIcon message={error} />}
                {renderSteps(current)}
            </div>
            <div style={{ marginTop: 24 }}>
                {current < steps.length - 1 && (
                    <Button type="primary" onClick={updateItem}>
                        Next
                    </Button>
                )}
                {isLastStep && (
                    <Button loading={isLoading} type="primary" onClick={() => createSupplyItem(item)}>
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