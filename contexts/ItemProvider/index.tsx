import React, { createContext, useContext, useState } from 'react';

import { ItemProviderProps, ItemDetails, ItemEventsInputs } from '../../lib/types';
import {
    createSupplyChainItem as createItem,
    addSupplyChainItemEvent as updateItemStatus
} from '../../lib/items';

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
            return response;
        } catch (error) {
            throw error
        }
    }
    const updateSupplyChainItemStatus = async (details: ItemEventsInputs) => {
        try {
            const response = await updateItemStatus(details);
            return response;
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
                createSupplyChainItem,
                updateSupplyChainItemStatus
            }}
        >
            {children}
        </ItemContext.Provider>
    )
}

export default ItemProvider
