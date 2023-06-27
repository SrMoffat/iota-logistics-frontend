import React, { useState, useEffect } from 'react';
import {
    Form,
    Select,
    InputNumber,
} from 'antd';
import { StepProps } from '../../../lib/types';

const StepThree = (props: StepProps) => {
    const { updateItemDetails, item } = props;
    const [units, setUnits] = useState<string>();
    const [width, setItemWidth] = useState<number>();
    const [height, setItemHeight] = useState<number>();
    const [length, setItemLength] = useState<number>();
    useEffect(() => {
        updateItemDetails({
            ...item,
            dimensions: {
                height,
                length,
                width,
                units
            }
        })
    }, [height, length, width, units])
    return (
        <Form
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 20 }}
            layout="horizontal"
            style={{ maxWidth: 600 }}
        >
            <Form.Item label="Height">
                <InputNumber defaultValue={item?.dimensions?.height} onChange={e => setItemHeight(Number(e))} />
            </Form.Item>
            <Form.Item label="Width">
                <InputNumber defaultValue={item?.dimensions?.width}  onChange={e => setItemWidth(Number(e))} />
            </Form.Item>
            <Form.Item label="Length">
                <InputNumber defaultValue={item?.dimensions?.length}  onChange={e => setItemLength(Number(e))} />
            </Form.Item>
            <Form.Item label="Units">
                <Select defaultValue={item?.dimensions?.units}  onChange={e => setUnits(e)}>
                    <Select.Option value="Centimeters">Centimeters</Select.Option>
                    <Select.Option value="Milimieters">Milimieters</Select.Option>
                    <Select.Option value="Meters">Meters</Select.Option>
                </Select>
            </Form.Item>
        </Form>
    )
}

export default StepThree;