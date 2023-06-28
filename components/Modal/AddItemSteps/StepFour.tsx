import React from 'react';
import { get } from 'lodash'
import {
    Tag,
    ColorPicker,
    Descriptions,
    Typography
} from 'antd';

import { ItemDetails } from '../../../lib/types';

const StepFour = (props: ItemDetails) => {
    return (
        <>
        <Typography.Title level={5}>General Information</Typography.Title>
            <Descriptions bordered size="middle" column={2} style={{ margin: -24 }}>
                <Descriptions.Item label="Name" span={2}>
                    {get(props, 'name')}
                </Descriptions.Item>
                <Descriptions.Item span={2} label="Description">
                    {get(props, 'description')}
                </Descriptions.Item>
                <Descriptions.Item label="Quantity" span={2}>
                    <Tag color="green">
                        {`${get(props, 'quantity')} units`}
                    </Tag>
                </Descriptions.Item>
                <Descriptions.Item label="Color" span={2}>
                    <ColorPicker disabled value={get(props, 'colour')} />
                </Descriptions.Item>
            </Descriptions>
            <Typography.Title level={5}>Specific Information</Typography.Title>
            <Descriptions  bordered size="middle" column={2} style={{ margin: -24 }}>
                <Descriptions.Item label="Height" span={2}>
                    {get(props.dimensions, 'height')}
                </Descriptions.Item>
                <Descriptions.Item span={2} label="Width">
                    {get(props.dimensions, 'width')}
                </Descriptions.Item>
                <Descriptions.Item label="Length" span={2}>
                    {get(props.dimensions, 'length')}
                </Descriptions.Item>
                <Descriptions.Item label="Units" span={2}>
                    {get(props.dimensions, 'units')}
                </Descriptions.Item>
            </Descriptions>
            <Typography.Title level={5}>Logistics Information</Typography.Title>
            <Descriptions  bordered size="middle" column={2} style={{ margin: -24 }}>
                <Descriptions.Item label="Category" span={2}>
                    {get(props, 'category')}
                </Descriptions.Item>
                <Descriptions.Item span={2} label="Supplier">
                    {get(props, 'supplier')}
                </Descriptions.Item>
                <Descriptions.Item label="Manufacturer" span={2}>
                    {get(props, 'manufacturer')}
                </Descriptions.Item>
                <Descriptions.Item label="Handling" span={2}>
                    {`${get(props?.handling, 'type')}: ${get(props?.handling, 'instructions')}`}
                </Descriptions.Item>
            </Descriptions>

        </>
    )
};

export default StepFour;
