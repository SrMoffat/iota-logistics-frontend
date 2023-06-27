import React from 'react';
import {
    Col,
    Row,
    Table,
} from 'antd';

const CustomTable = (props) => {
    return (
        <Row style={{ marginTop: 20 }}>
        <Col span={24}>
            <Table columns={props.columns} dataSource={props.data} />
        </Col>
    </Row>
    )
};

export default CustomTable;
