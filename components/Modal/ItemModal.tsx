import React, { useState } from 'react';
import { omit } from 'lodash';

import { useMutation } from '@tanstack/react-query';
import { Modal, message, Tabs, Steps, Spin, Alert, theme } from 'antd';

import ModalFooter from './ModalFooter';
import UpdateItemStatus from './UpdateItemStatus';

import { ItemDetails, Stage, Status } from '../../lib/types';
import { ITEM_CREATION_STEPS, GENERAL_CONSTANTS } from '../../lib/constants';
import { useItemContext } from '../../contexts/ItemProvider';
import { StepOne, StepTwo, StepThree, StepFour } from './AddItemSteps';

const updateModes = GENERAL_CONSTANTS.ITEM_EDIT_MODES;

const steps = ITEM_CREATION_STEPS.map(({ title, content }) => ({ key: title, title, content }));

const FakeStep = () => {
    return 'Planes';
}

const AddItemModal = (props) => {
    const {
        open,
        prev,
        next,
        title,
        current,
        handleOk,
        editMode,
        categories,
        setCurrent,
        refetchItems,
        handleCancel,
        setMilestone,
        refetchEvents,
        confirmLoading,
        refetchMilestones
    } = props;
    const { token } = theme.useToken();
    const [error, setError] = useState<string>();
    const [selectedStatus, setSelectedStatus] = useState<Status>();
    const [selectedMilestone, setSelectedMilestone] = useState<Stage>();
    const [currentEditTab, setCurrentEditTab] = useState<string>(updateModes?.STATUS);
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
            setCurrent(0);
            handleCancel();
            refetchItems();
            refetchEvents();
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
    const renderCreateSteps = (current: number) => {
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
    const renderEditSteps = (current: number) => {
        const stepProps = {
            updateItemDetails,
            item,
            categories
        };
        switch (current) {
            case 0:
                return <FakeStep />
            case 1:
                return <FakeStep />
            case 2:
                return <FakeStep />
            case 3:
                return <FakeStep />
        }
    }
    const updateItem = () => {
        if (!editMode) {
            next();
        } else {
            if (currentEditTab === GENERAL_CONSTANTS.ITEM_EDIT_MODES.DETAILS) {
                console.log("Details")
            } else if (currentEditTab === GENERAL_CONSTANTS.ITEM_EDIT_MODES.STATUS) {
                console.log("Status")
                console.log({
                    stage: {
                        id: selectedMilestone?.id,
                        name: selectedMilestone?.name
                    },
                    status: {
                        id: selectedStatus?.id,
                        name: selectedStatus?.name
                    }
                })
            }
        }
    }
    const createSupplyItem = async (data: ItemDetails) => {
        await mutateAsync(data)
    };
    const onChange = (key: string) => {
        setCurrentEditTab(key)
    };


    const editTabItems = [
        {
            label: "Update Status",
            key: "status",
            children: <UpdateItemStatus updateStage={setSelectedMilestone} updateStatus={setSelectedStatus} />,
        },
        {
            label: "Update Details",
            key: "details",
            children: `Update Details`,
        }
    ]

    const renderModalContent = () => {
        return (
            <>
                {!editMode && <Steps current={current} items={steps} />}
                {
                    editMode
                        ? <Tabs
                            onChange={onChange}
                            type="card"
                            items={editTabItems}
                        >
                        </Tabs>
                        : (
                            <div style={isLastStep ? omit(contentStyle, ['backgroundColor', 'border']) : contentStyle}>
                                {isLoading && <Spin />}
                                {isError && <Alert type="error" showIcon message={error} />}
                                {renderCreateSteps(current)}
                            </div>
                        )
                }
            </>
        )
    };
    return (
        <Modal
            title={title}
            open={open}
            width={600}
            footer={null}
            destroyOnClose
            onOk={handleOk}
            onCancel={handleCancel}
            style={{ padding: 20 }}
            confirmLoading={confirmLoading}
        >
            {renderModalContent()}
            <ModalFooter
                prev={prev}
                item={item}
                steps={steps}
                editMode={editMode}
                current={current}
                isLoading={isLoading}
                isLastStep={isLastStep}
                updateItem={updateItem}
                currentEditTab={currentEditTab}
                createSupplyItem={createSupplyItem}
            />
        </Modal>
    );
};

export default AddItemModal;