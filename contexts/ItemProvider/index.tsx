import React, { createContext, useContext, useState } from 'react';

import { ItemProviderProps, ItemDetails } from '../../lib/types';
import { createSupplyChainItem as createItem } from '../../lib/items';

const ItemContext = createContext<Partial<ItemProviderProps>>({})

export const useItemContext = (): Partial<ItemProviderProps> => useContext(ItemContext)

const ItemProvider = ({ children }) => {
    const [item, setItem] = useState<ItemDetails>()
    const updateItemDetails = (details: ItemDetails) => {
        setItem({
            ...item,
            ...details
        })
    }
    const createSupplyChainItem = async (details: ItemDetails) => {
        try {
            const response = await createItem(details);
            console.log("response", response);
        } catch (error) {
            throw error
        }
    }
    return (
        <ItemContext.Provider
            value={{
                item,
                setItem,
                updateItemDetails,
                createSupplyChainItem
            }}
        >
            {children}
        </ItemContext.Provider>
    )
}

export default ItemProvider
