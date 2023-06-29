import React, { useState, useEffect } from 'react';
import {
    Form,
    Input,
    InputNumber,
    ColorPicker,
} from 'antd';
import { StepProps } from '../../../lib/types';

const { TextArea } = Input;

const StepOne = (props: StepProps) => {
    const { updateItemDetails, item } = props;
    const [name, setItemName] = useState<string>();
    const [colour, setItemColour] = useState<string>();
    const [quantity, setItemQuantity] = useState<number>();
    const [description, setItemDescription] = useState<string>();
    useEffect(() => {
        updateItemDetails({
            ...item,
            name,
            description,
            quantity,
            colour
        })
    }, [name, description, quantity, colour])
    return (
        <Form
            layout="vertical"
            name="generalInformationForm"
            autoComplete="off"
            style={{ maxWidth: 600 }}
        >
            <Form.Item label="Name">
                <Input defaultValue={item?.name} onChange={e => setItemName(e?.target?.value)} />
            </Form.Item>
            <Form.Item label="Description">
                <TextArea defaultValue={item?.description} rows={4} onChange={e => setItemDescription(e?.target?.value)} />
            </Form.Item>
            <Form.Item label="Quantity">
                <InputNumber min={1} defaultValue={item?.quantity} onChange={e => setItemQuantity(Number(e))} />
            </Form.Item>
            <Form.Item label="Colour">
                <ColorPicker defaultValue={item?.colour} onChange={e => setItemColour(e?.toHexString() || '#ffffff')} />
            </Form.Item>
        </Form>
    )
};

export default StepOne;
