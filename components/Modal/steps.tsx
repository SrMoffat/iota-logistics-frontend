import React from 'react';
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

const { TextArea } = Input;
const { Title } = Typography;

export const StepOne = () => {
    return (
        <Form
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 14 }}
            layout="horizontal"
            style={{ maxWidth: 600 }}
        >
            <Form.Item label="Name">
                <Input />
            </Form.Item>
            <Form.Item label="Description">
                <TextArea rows={4} />
            </Form.Item>
            <Form.Item label="Quantity">
                <InputNumber />
            </Form.Item>
            <Form.Item label="Color">
                <ColorPicker />
            </Form.Item>
        </Form>
    )
}
export const StepTwo = () => {
    return (
        <Form
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 14 }}
            layout="horizontal"
            style={{ maxWidth: 600 }}
        >
            <Form.Item label="Category">
                <Select>
                    <Select.Option value="demo">Demo</Select.Option>
                    <Select.Option value="demo">Electronics</Select.Option>
                    <Select.Option value="demo">Automotive</Select.Option>
                    <Select.Option value="demo">Household</Select.Option>
                </Select>
            </Form.Item>
            <Form.Item label="Supplier">
                <Input />
            </Form.Item>
            <Form.Item label="Manufacturer">
                <Input />
            </Form.Item>
            <Form.Item label="Handling">
                <Select>
                    <Select.Option value="demo">Fragile</Select.Option>
                    <Select.Option value="demo">Harzardous</Select.Option>
                    <Select.Option value="demo">Normal</Select.Option>
                </Select>
            </Form.Item>
        </Form>
    )
}
export const StepThree = () => {
    return (
        <Form
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 14 }}
            layout="horizontal"
            style={{ maxWidth: 600 }}
        >
            <Form.Item label="Height">
                <InputNumber />
            </Form.Item>
            <Form.Item label="Weight">
                <InputNumber />
            </Form.Item>
            <Form.Item label="Length">
                <InputNumber />
            </Form.Item>
            <Form.Item label="Units">
                <Select>
                    <Select.Option value="demo">Centimeters</Select.Option>
                    <Select.Option value="demo">Milimieters</Select.Option>
                    <Select.Option value="demo">Meters</Select.Option>
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
