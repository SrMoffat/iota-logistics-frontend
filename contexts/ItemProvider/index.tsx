import React, { createContext, useContext, useEffect, useState } from 'react';

export interface Weight {
    value: number;
    unit: string;
}
export interface Dimensions {
    length: number;
    width: number;
    height: number;
    units: string;
}
export interface Handling {
    type: string;
    instructions: string;
}
export interface Compliance {
    customs: string;
    regulatory: string;
    certificates: string[];
}
export interface ItemDetails {
    name?: string;
    quantity?: number;
    supplier?: string;
    description?: string;
    manufacturer?: string;
    colour?: string;
    category?: string | number;
    weight?: Weight;
    dimensions?: Dimensions;
    handling?: Handling;
    compliance?: Compliance;
}

type ItemProviderProps = {
    item: ItemDetails;
    updateItemDetails: (details: ItemDetails) => void;
    createSupplyChainItem: () => void;
    setItem: React.Dispatch<React.SetStateAction<ItemDetails | undefined>>
}

const ItemContext = createContext<Partial<ItemProviderProps>>({})

export const useItemContext = (): Partial<ItemProviderProps> => useContext(ItemContext)

const ItemProvider = ({ children }) => {
    const [item, setItem] = useState<ItemDetails>()
    const updateItemDetails = (details: ItemDetails) => {
        console.log("Update details", {
            ...item,
            ...details
        });
        setItem({
            ...item,
            ...details
        })
    }
    const createSupplyChainItem = async () => {
        try {

        } catch (error) {
            throw error
        }
    }
    // useEffect(() => {
    //     console.log("Updat====>", item);
    // }, [item])
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
