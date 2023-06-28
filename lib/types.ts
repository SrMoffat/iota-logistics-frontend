export interface UserDetails {
    email: string;
    username: string;
    password: string;
}
export interface UserData {
    id: number;
    email: string;
    username: string;
    provider: string;
    blocked: boolean;
    clearance: string;
    createdAt: string;
    updatedAt: string;
    confirmed: boolean;
}
export interface LoggedInUserDetails {
    jwt: string;
    user: UserData
}
export type UserLoginDetails = {
    password: string;
    identifier: string;
    rememberMe?: boolean;
}
export interface Weight {
    unit: string;
    value: number;
}
export interface Dimensions {
    width: number;
    units: string;
    length: number;
    height: number;
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
    colour?: string;
    weight?: Weight;
    quantity?: number;
    supplier?: string;
    handling?: Handling;
    description?: string;
    manufacturer?: string;
    dimensions?: Dimensions;
    compliance?: Compliance;
    category?: string | number;
}
export interface DataType {
    key: string;
    name: string;
    stage: string;
    status: string;
    supplier: string;
    category: string;
    colour: string;
    quantity: number;
    description: string;
    manufacturer: string;
}
export type ItemProviderProps = {
    item: ItemDetails;
    updateItemDetails: (details: ItemDetails) => void;
    createSupplyChainItem: (details: ItemDetails) => Promise<Object>;
    setItem: React.Dispatch<React.SetStateAction<ItemDetails | undefined>>
}

export interface SelectOptions {
    value: string | number;
    name: string;
}
export interface Category {
    id: string | number;
    attributes: {
        name: string;
        description: string;
        updatedAt: string;
        createdAt: string;
    }
}
export interface StepProps {
    item: ItemDetails;
    categories: Category[];
    updateItemDetails: (details: ItemDetails) => void
}