import React from 'react';
import { useRouter } from 'next/navigation';
import { CodeSandboxOutlined } from '@ant-design/icons';
import { List, ColorPicker, Button, Col, Row, theme } from 'antd';

import IconText from '../../../components/IconText';
import { ProductDetails } from '../../../lib/types';

const ProductDetails = (props: ProductDetails) => {
    const { products, itemStatusRequested } = props;
    const { push } = useRouter();
    const {
        token: { colorBgContainer },
    } = theme.useToken();
    return (
        <List
            itemLayout="horizontal"
            size="small"
            grid={{ column: 2, gutter: 8 }}
            pagination={{
                onChange: (page) => {
                    console.log(page);
                },
                pageSize: 10,
            }}
            dataSource={products.reverse()}
            renderItem={(item) => (
                <List.Item
                    style={{ border: `1px solid ${colorBgContainer}`, borderRadius: 8 }}
                    key={item?.title}
                    actions={[
                        <IconText icon={CodeSandboxOutlined} text={`${item?.quantity} units`} key="list-vertical-star-o" />,
                        <Button onClick={() => push(`${item?.href}`)}>View</Button>,
                        // <Button onClick={() => itemStatusRequested(item?.id)}>Status</Button>
                    ]}
                >
                    <List.Item.Meta
                        avatar={<ColorPicker value={item?.colour} />}
                        title={<a href={item?.href}>{item?.title}</a>}
                        description={item?.description}
                    />
                    <Col span={12} style={{ marginTop: 10 }}>
                        <Row>
                            <Col span={10}>Tracking ID:</Col>
                            <Col span={14}>{item?.trackingId}</Col>
                        </Row>
                        <Row>
                            <Col span={10}>Supplier:</Col>
                            <Col span={14}>{item?.supplier}</Col>
                        </Row>
                        <Row>
                            <Col span={10}>Manufacturer:</Col>
                            <Col span={14}>{item?.manufacturer}</Col>
                        </Row>
                    </Col>
                </List.Item>
            )}
        />
    )
};
export default ProductDetails;
