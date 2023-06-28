import React, { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { List, message, Spin, ColorPicker, Button, Col, Row, theme, Drawer, Descriptions, Tag } from 'antd';
import { CodeSandboxOutlined } from '@ant-design/icons';

import IconText from '../../components/IconText';
import GeneralLayout from '../../components/Layout/General';

import { fetchItems } from '../../lib/statistics';

interface Product {
    href: string;
    title: string;
    colour: string;
    trackingId: string;
    description: string;
    manufacturer: string;
    supplier: string;
    quantity: string;

}

const Products = () => {
    const [open, setOpen] = useState(false);
    const { push } = useRouter();
    const {
        token: { colorBgContainer },
    } = theme.useToken();
    const { isLoading: itemsLoading, data: items, error: itemsError } = useQuery({
        queryKey: ['items'],
        queryFn: async () => {
            const res = await fetchItems()
            return {
                items: res
            }
        },
    })
    const showDrawer = () => {
        setOpen(true);
    };
    const onClose = () => {
        setOpen(false);
    };
    useEffect(() => {
        const error = itemsError as Error
        error && message.error(error?.message)
    }, [itemsError])
    const products: Product[] = items?.items?.map(({ id, attributes }) => {
        return {
            href: `/products/${id}`,
            title: attributes?.name,
            colour: attributes?.colour,
            trackingId: attributes?.trackingId,
            description: attributes?.description,
            manufacturer: attributes?.manufacturer,
            supplier: attributes?.supplier,
            quantity: attributes?.quantity,
        }
    });
    return (
        <GeneralLayout handleShowCreateItemModal={() => { }} hasCta={false}>
            <Drawer
                title="Recent Event"
                placement="bottom"
                closable={false}
                onClose={onClose}
                open={open}
                key="topper"
            >
                <Descriptions
                    bordered
                    column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}
                >
                    <Descriptions.Item label="Stage"><Tag color='green'>Warehousing</Tag></Descriptions.Item>
                    <Descriptions.Item label="Status"><Tag color='geekblue'>Stocked</Tag></Descriptions.Item>
                    <Descriptions.Item label="Last Updated">2 hours ago</Descriptions.Item>
                    <Descriptions.Item label="Updated By">Zurich Jalakov</Descriptions.Item>
                    <Descriptions.Item label="Item Info">
                        <Row>
                            <Col span={4} style={{ fontWeight: "bold" }}>Name:</Col>
                            <Col span={12}>Mac Boock Pro</Col>
                        </Row>
                        <Row>
                            <Col span={4} style={{ fontWeight: "bold" }}>Description:</Col>
                            <Col span={12}>Mac Boock Pro</Col>
                        </Row>
                        <Row>
                            <Col span={4} style={{ fontWeight: "bold" }}>Manufacturer:</Col>
                            <Col span={12}>Mac Boock Pro</Col>
                        </Row>
                        <Row>
                            <Col span={4} style={{ fontWeight: "bold" }}>Supplier:</Col>
                            <Col span={12}>Supplier</Col>
                        </Row>
                        <Row>
                            <Col span={4} style={{ fontWeight: "bold" }}>Tracking ID:</Col>
                            <Col span={12}>Mac Boock Pro</Col>
                        </Row>
                    </Descriptions.Item>
                </Descriptions>
            </Drawer>
            {
                itemsLoading
                    ? <Spin />
                    : (
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
                                        <Button onClick={() => showDrawer()}>Status</Button>
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

                    )}

        </GeneralLayout>
    );
};

export default Products;
