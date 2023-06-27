export interface UserDetails {
    username: string;
    email: string;
    password: string;
}
export interface UserData {
    id: number;
    username: string;
    email: string;
    provider: string;
    confirmed: boolean;
    blocked: boolean;
    clearance: string;
    createdAt: string;
    updatedAt: string;
} 
export interface LoggedInUserDetails {
    jwt: string;
    user: UserData
}
export type UserLoginDetails =  {
    identifier: string;
    password: string;
    rememberMe?: boolean;
}
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
export interface DataType {
    key: string;
    name: string;
    age: number;
    address: string;
    tags: string[];
}
export type ItemProviderProps = {
    item: ItemDetails;
    updateItemDetails: (details: ItemDetails) => void;
    createSupplyChainItem: () => void;
    setItem: React.Dispatch<React.SetStateAction<ItemDetails | undefined>>
}