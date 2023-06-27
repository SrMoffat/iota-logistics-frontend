import React, { useState } from 'react';
import {
    Form,
    Input,
    InputNumber,
    Select,
    Tag,
    Typography,
    ColorPicker,
    Descriptions
} from 'antd';
import FormComponent from '../Form/Form';
import FormFields from '../Form/Fields';
import { FORM_ITEMS } from '../../lib/constants';

const { TextArea } = Input;
const { Title } = Typography;

export const StepOne = () => {
    const [name, setItemName] = useState<string>();
    const [colour, setItemColour] = useState<string>();
    const [quantity, setItemQuantity] = useState<number>();
    const [description, setItemDescription] = useState<string>();
    console.log({
        name,
        description,
        quantity,
        colour
    })
    return (
        <Form
            layout="vertical"
            name="generalInformationForm"
            autoComplete="off"
            style={{ maxWidth: 600 }}
        >
            <Form.Item label="Name">
                <Input onChange={e => setItemName(e?.target?.value)} />
            </Form.Item>
            <Form.Item label="Description">
                <TextArea rows={4} onChange={e => setItemDescription(e?.target?.value)} />
            </Form.Item>
            <Form.Item label="Quantity">
                <InputNumber onChange={e => setItemQuantity(Number(e))} />
            </Form.Item>
            <Form.Item label="Color">
                <ColorPicker onChange={e => setItemColour(e?.toHexString())} />
            </Form.Item>
        </Form>
    )
}
export const StepTwo = () => {
    const [handling, setItemHandling] = useState<string>();
    const [supplier, setItemSupplier] = useState<string>();
    const [manufacturer, setItemManufacturer] = useState<string>();
    const [category, setItemCategory] = useState<string | number>();
    const [instructions, setItemHandlingInstructions] = useState<string>();
    console.log({
        category,
        handling,
        manufacturer,
        supplier,
        instructions
    })
    return (
        <Form
            layout="vertical"
            name="specificInformationForm"
            autoComplete="off"
            style={{ maxWidth: 600 }}
        >
            <Form.Item label="Category">
                <Select onChange={e => setItemCategory(e)}>
                    <Select.Option value="1">Demo</Select.Option>
                    <Select.Option value="2">Electronics</Select.Option>
                    <Select.Option value="3">Automotive</Select.Option>
                    <Select.Option value="4">Household</Select.Option>
                </Select>
            </Form.Item>
            <Form.Item label="Supplier">
                <Input onChange={e => setItemSupplier(e?.target?.value)} />
            </Form.Item>
            <Form.Item label="Manufacturer">
                <Input onChange={e => setItemManufacturer(e?.target?.value)} />
            </Form.Item>
            <Form.Item label="Handling">
                <Select onChange={e => setItemHandling(e?.target?.value)}>
                    <Select.Option value="fragile">Fragile</Select.Option>
                    <Select.Option value="harzardous">Harzardous</Select.Option>
                    <Select.Option value="normal">Normal</Select.Option>
                </Select>
            </Form.Item>
            <Form.Item label="Handling Instructions">
                <TextArea rows={4} onChange={e => setItemHandlingInstructions(e?.target?.value)} />
            </Form.Item>
        </Form>
    )
}
export const StepThree = () => {
    const [height, setItemHeight] = useState<number>();
    const [length, setItemLength] = useState<number>();
    const [width, setItemWidth] = useState<number>();
    const [units, setUnits] = useState<string>();
    console.log({
        height,
        length,
        width,
        units
    })
    return (
        <Form
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 14 }}
            layout="horizontal"
            style={{ maxWidth: 600 }}
        >
            <Form.Item label="Height">
                <InputNumber onChange={e => setItemHeight(Number(e))}/>
            </Form.Item>
            <Form.Item label="Width">
                <InputNumber onChange={e => setItemWidth(Number(e))} />
            </Form.Item>
            <Form.Item label="Length">
                <InputNumber onChange={e => setItemLength(Number(e))} />
            </Form.Item>
            <Form.Item label="Units">
                <Select onChange={e => setUnits(e)}>
                    <Select.Option value="Centimeters">Centimeters</Select.Option>
                    <Select.Option value="Milimieters">Milimieters</Select.Option>
                    <Select.Option value="Meters">Meters</Select.Option>
                </Select>
            </Form.Item>
        </Form>
    )
}
export const StepFour = () => {
    return (
        <>
            <Title level={5}>
                General Information
            </Title>
            <Descriptions bordered size="middle" column={2} style={{ margin: -24 }}>
                <Descriptions.Item label="Name" span={2}>
                    Item Name
                </Descriptions.Item>
                <Descriptions.Item span={2} label="Description">
                    Item Descriotion
                </Descriptions.Item>
                <Descriptions.Item label="Quantity" span={2}>
                    <Tag color="green">
                        2 units
                    </Tag>
                </Descriptions.Item>
                <Descriptions.Item label="Color" span={2}>
                    <ColorPicker disabled />
                </Descriptions.Item>
            </Descriptions>
            <Title level={5}>
                Specific Information
            </Title>
            <Descriptions bordered size="middle" column={2} style={{ margin: -24 }}>
                <Descriptions.Item label="Height" span={2}>
                    Height
                </Descriptions.Item>
                <Descriptions.Item span={2} label="Width">
                    Width
                </Descriptions.Item>
                <Descriptions.Item label="Length" span={2}>
                    Length
                </Descriptions.Item>
                <Descriptions.Item label="Units" span={2}>
                    Units
                </Descriptions.Item>
            </Descriptions>

            <Title level={5}>
                Logistics Information
            </Title>
            <Descriptions bordered size="middle" column={2} style={{ margin: -24 }}>
                <Descriptions.Item label="Category" span={2}>
                    Electronics
                </Descriptions.Item>
                <Descriptions.Item span={2} label="Supplier">
                    Supplier
                </Descriptions.Item>
                <Descriptions.Item label="Manufacturer" span={2}>
                    Manufacturer
                </Descriptions.Item>
                <Descriptions.Item label="Handling" span={2}>
                    Manufacturer: ManufacturerManufacturerManufacturerManufacturerManufacturerManufacturerManufacturerManufacturer
                </Descriptions.Item>
            </Descriptions>

        </>
    )
}
