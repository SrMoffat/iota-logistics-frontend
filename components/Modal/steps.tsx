import React from 'react';
import { ColorPicker, Descriptions } from 'antd';

import {
    Form,
    Input,
    InputNumber,
    Select,
    Tag,
    Popconfirm,
    Button,
    Typography
} from 'antd';

const { TextArea } = Input;
const { Title, Text } = Typography;

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
        <Form>
            <Title>
                General Information
            </Title>
            <Descriptions bordered size="middle" column={2} style={{ margin: -24 }}>
                <Descriptions.Item label="Status" span={1}>
                    {true ? (
                        <Tag color="green">
                            OPEN
                        </Tag>
                    ) : (
                        <Tag color="red">
                            CLOSED
                        </Tag>
                    )}
                </Descriptions.Item>
                <Descriptions.Item span={1} label="Update">
                    {true ? (
                        <Popconfirm
                            trigger="click"
                            title="Closing will make operation readonly"
                            onConfirm={() => {
                                console.log("here")
                            }}
                            placement="bottom"
                        >
                            <Button size="middle" type="primary" shape="round">
                                Close
                            </Button>
                        </Popconfirm>
                    ) : (
                        <Popconfirm
                            trigger="click"
                            title="Related entities will be reactivated"
                            onConfirm={() => {
                                console.log("here")
                            }}
                            placement="bottom"
                        >
                            <Button size="middle" shape="round">
                                Reopen
                            </Button>
                        </Popconfirm>
                    )}
                </Descriptions.Item>
                <Descriptions.Item label="Description" span={2}>
                    Descrojnscnkjscnksdcnkncjsnkjnsdc
                </Descriptions.Item>
                <Descriptions.Item label="Targets" span={2}>
                    The team identified 10suspects
                </Descriptions.Item>
            </Descriptions>
        </Form>
    )
}
