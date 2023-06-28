import React, { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { List, message, Spin, ColorPicker } from 'antd';
import { CodeSandboxOutlined } from '@ant-design/icons';

import IconText from '../../components/IconText';
import GeneralLayout from '../../components/Layout/General';

import { fetchItems } from '../../lib/statistics';

const Products = () => {
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
    const products = items?.items?.map(({ id, attributes }) => {
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
                            itemLayout="vertical"
                            size="large"
                            pagination={{
                                onChange: (page) => {
                                    console.log(page);
                                },
                                pageSize: 3,
                            }}
                            dataSource={products}
                            renderItem={(item) => (
                                <List.Item
                                    key={item?.title}
                                    actions={[
                                        <IconText icon={CodeSandboxOutlined} text={item?.quantity} key="list-vertical-star-o" />,
                                        // <Tag color="geekblue">
                                        //     {`ddd units`}
                                        // </Tag>,
                                        // <Tag color="green">
                                        //     {`ddd units`}
                                        // </Tag>
                                    ]}
                                >
                                    <List.Item.Meta
                                        avatar={<ColorPicker value={item?.colour} />}
                                        title={<a href={item?.href}>{item?.title}</a>}
                                        description={item?.description}
                                    />
                                    <div>{item?.content}</div>
                                    <div>{item?.trackingId}</div>
                                    <div>{item?.supplier}</div>
                                    <div>{item?.manufacturer}</div>
                                </List.Item>
                            )}
                        />

                    )}

        </GeneralLayout>
    );
};

export default Products;
