import React, { createContext, useContext, useEffect, useState } from 'react';

type ItemProviderProps = {
    item: string;
    updateItemDetails: () => void;
    createSupplyChainItem: () => void;
}

const ItemContext = createContext<Partial<ItemProviderProps>>({})

export const useAuthContext = (): Partial<ItemProviderProps> => useContext(ItemContext)

const ItemProvider = ({ children }) => {
    const [item, setItem] = useState()
    const updateItemDetails = () => {
    }
    const createSupplyChainItem = async () => {
        try {

        } catch (error) {
            throw error
        }
    }
    useEffect(() => {
    }, [item])
    return (
        <ItemContext.Provider
            value={{
                item,
                updateItemDetails,
                createSupplyChainItem
            }}
        >
            {children}
        </ItemContext.Provider>
    )
}

export default ItemProvider
