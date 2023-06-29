import React, { useEffect, useState } from 'react';

import { message, Spin } from 'antd';
import { useQuery } from '@tanstack/react-query';

import StatusDrawer from './components/StatusDrawer';
import ProductDetails from './components/ProductDetails';
import GeneralLayout from '../../components/Layout/General';

import { Product } from '../../lib/types';
import { fetchItems } from '../../lib/statistics';

const Products = () => {
    const [open, setOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<Product>();
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
            id,
            name: attributes?.name,
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
    const itemStatusRequested = (id: string | number) => {
        const productDetails = products?.filter((entry) => `${id}` === `${entry.id}`);
        const selectedProduct = productDetails[0];
        setSelectedProduct(selectedProduct);
        showDrawer();
    };
    return (
        <GeneralLayout handleShowCreateItemModal={() => { }} hasCta={false}>
            <StatusDrawer open={open} onClose={onClose}
                item={selectedProduct}
                status={{
                    lastUpdated: "ssss",
                    stage: "ssss",
                    status: "ssss",
                    updatedBy: "ssss"
                }}
            />
            {
                itemsLoading
                    ? <Spin />
                    : <ProductDetails
                        itemStatusRequested={itemStatusRequested}
                        products={products.reverse()}
                    />
            }
        </GeneralLayout>
    );
};

export default Products;
