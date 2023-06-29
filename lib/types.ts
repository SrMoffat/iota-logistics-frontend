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
    updateSupplyChainItemStatus: (details: ItemEventsInputs) => Promise<void>;
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
export interface Product {
    id: string;
    href: string;
    name: string;
    title: string;
    colour: string;
    trackingId: string;
    description: string;
    manufacturer: string;
    supplier: string;
    quantity: string;
}
export interface EventDetails {
    status: string;
    statusId: string;
    statusDescription: string;
    stage: string;
    stageId: string;
    stageDescription: string;
    updatedAt: string;
    itemName: string;
    itemUpdatedAt: string;
    itemTrackingId: string;
    username: string;
    userEmail: string;
}

export interface ProductDetails {
    products: Product[];
    itemStatusRequested: (id: string | number) => void
}

export interface Status {
    name: string;
    id: string | number;
    description: string;
    createdAt: string;
    updatedAt: string;
}
export interface Stage {
    description: string;
    name: string;
    id: string | number;
    statuses: Status[]
}
export interface GroupedMilestone {
    [key: number | string]: Stage[]
}

export interface StatusSummary {
    description: string;
    label: string;
    value: string | number;
}
export interface StageOrStatusSummary {
    id: string | number;
    name: string | number;
}
export interface ItemEventsInputs {
    id: string | number;
    stage: StageOrStatusSummary
    status: StageOrStatusSummary
}

export interface ItemDetailsSummary {
    name: string;
    trackingId: string;
    updatedAt: string;
}


