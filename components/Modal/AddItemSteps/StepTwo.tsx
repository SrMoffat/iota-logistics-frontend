import React, { useState, useEffect } from 'react';
import { Form, Input, Select } from 'antd';

import { StepProps, SelectOptions } from '../../../lib/types';

const { TextArea } = Input;

const StepTwo = (props: StepProps) => {
    const { updateItemDetails, item, categories } = props;
    const [handling, setItemHandling] = useState<string>();
    const [supplier, setItemSupplier] = useState<string>();
    const [manufacturer, setItemManufacturer] = useState<string>();
    const [category, setItemCategory] = useState<string | number>();
    const [instructions, setItemHandlingInstructions] = useState<string>();
    useEffect(() => {
        updateItemDetails({
            ...item,
            category,
            handling: {
                type: handling,
                instructions
            },
            manufacturer,
            supplier
        })
    }, [handling, supplier, manufacturer, category, instructions])
    const massagedCategories = categories?.map(({ id, attributes }) => ({ value: id, name: attributes?.name })) as SelectOptions[];
    return (
        <Form
            layout="vertical"
            name="specificInformationForm"
            autoComplete="off"
            style={{ maxWidth: 600 }}
        >
            <Form.Item label="Category">
                <Select defaultValue={item?.category} onChange={e => setItemCategory(e)}>
                    {massagedCategories?.map(({ value, name }) => (
                        <Select.Option key={`${value}-${name}`} value={value}>{name}</Select.Option>
                    ))}
                </Select>
            </Form.Item>
            <Form.Item label="Supplier">
                <Input defaultValue={item?.supplier} onChange={e => setItemSupplier(e?.target?.value)} />
            </Form.Item>
            <Form.Item label="Manufacturer">
                <Input defaultValue={item?.manufacturer} onChange={e => setItemManufacturer(e?.target?.value)} />
            </Form.Item>
            <Form.Item label="Handling">
                <Select defaultValue={item?.handling?.type} onChange={e => setItemHandling(e)}>
                    <Select.Option value="fragile">Fragile</Select.Option>
                    <Select.Option value="hazardous">Harzardous</Select.Option>
                    <Select.Option value="general">Normal</Select.Option>
                </Select>
            </Form.Item>
            <Form.Item label="Handling Instructions">
                <TextArea defaultValue={item?.handling?.instructions} rows={4} onChange={e => setItemHandlingInstructions(e?.target?.value)} />
            </Form.Item>
        </Form>
    )
};

export default StepTwo;
