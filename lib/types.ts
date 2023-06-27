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