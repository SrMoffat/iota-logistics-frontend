import React, { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { List, message, Spin, ColorPicker, Button, Col, Row, theme } from 'antd';
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
                            dataSource={products}
                            renderItem={(item) => (
                                <List.Item
                                    style={{ border: `1px solid ${colorBgContainer}`, borderRadius: 8 }}
                                    key={item?.title}
                                    actions={[
                                        <IconText icon={CodeSandboxOutlined} text={`${item?.quantity} units`} key="list-vertical-star-o" />,
                                        <Button onClick={() => push(`${item?.href}`)}>View</Button>
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
