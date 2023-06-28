import React from 'react';
import type { ColumnsType } from 'antd/es/table';
import { Tag, ColorPicker } from 'antd';

import { DataType } from '../../lib/types';

const columns: ColumnsType<DataType> = [
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: 'Description',
        dataIndex: 'description',
        key: 'description',
    },
    {
        title: 'Category',
        dataIndex: 'category',
        key: 'category',
    },
    {
        title: 'Supplier',
        dataIndex: 'supplier',
        key: 'supplier',
    },
    {
        title: 'Manufacturer',
        dataIndex: 'manufacturer',
        key: 'manufacturer',
    },
    {
        title: 'Stage',
        dataIndex: 'stage',
        key: 'stage',
        render: (_, { stage }) => (
            <Tag color='geekblue' key={stage}>
                {stage.toUpperCase()}
            </Tag>
        ),
    },
    {
        title: 'Status',
        key: 'status',
        dataIndex: 'status',
        render: (_, { status }) => (
            <Tag color='green' key={status}>
                {status.toUpperCase()}
            </Tag>
        ),
    },
    {
        title: 'Colour',
        dataIndex: 'colour',
        key: 'colour',
        render: (_, { colour }) => (
            <ColorPicker value={colour} disabled />
        ),
    },
    {
        title: 'Quantity',
        dataIndex: 'quantity',
        key: 'age',
    },
];

export default columns;
