import React from 'react';
import {
    Tag,
    Typography,
    ColorPicker,
    Descriptions
} from 'antd';

import { ItemDetails } from '../../../lib/types';
const { Title } = Typography;

const StepFour = (props: ItemDetails) => {
    const {
        name,
        description,
        quantity,
        dimensions,
        manufacturer,
        handling,
        supplier,
        category,
        colour
    } = props;
    const { height, width, length, units } = dimensions;
    const { type, instructions } = handling;
    return (
        <>
            <Title level={5}>
                General Information
            </Title>
            <Descriptions bordered size="middle" column={2} style={{ margin: -24 }}>
                <Descriptions.Item label="Name" span={2}>
                    {name}
                </Descriptions.Item>
                <Descriptions.Item span={2} label="Description">
                    {description}
                </Descriptions.Item>
                <Descriptions.Item label="Quantity" span={2}>
                    <Tag color="green">
                        {`${quantity} units`}
                    </Tag>
                </Descriptions.Item>
                <Descriptions.Item label="Color" span={2}>
                    <ColorPicker disabled value={colour} />
                </Descriptions.Item>
            </Descriptions>
            <Title level={5}>
                Specific Information
            </Title>
            <Descriptions bordered size="middle" column={2} style={{ margin: -24 }}>
                <Descriptions.Item label="Height" span={2}>
                    {height}
                </Descriptions.Item>
                <Descriptions.Item span={2} label="Width">
                    {width}
                </Descriptions.Item>
                <Descriptions.Item label="Length" span={2}>
                    {length}
                </Descriptions.Item>
                <Descriptions.Item label="Units" span={2}>
                    {units}
                </Descriptions.Item>
            </Descriptions>

            <Title level={5}>
                Logistics Information
            </Title>
            <Descriptions bordered size="middle" column={2} style={{ margin: -24 }}>
                <Descriptions.Item label="Category" span={2}>
                    {category}
                </Descriptions.Item>
                <Descriptions.Item span={2} label="Supplier">
                    {supplier}
                </Descriptions.Item>
                <Descriptions.Item label="Manufacturer" span={2}>
                    {manufacturer}
                </Descriptions.Item>
                <Descriptions.Item label="Handling" span={2}>
                    {`${type}: ${instructions}`}
                </Descriptions.Item>
            </Descriptions>

        </>
    )
};

export default StepFour;
