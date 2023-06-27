import React from 'react';
import { ColorPicker } from 'antd';

import {
    Form,
    Input,
    InputNumber,
    Select,
} from 'antd';

const { TextArea } = Input;

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
