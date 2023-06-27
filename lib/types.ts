export interface UserDetails {
    username: string;
    email: string;
    password: string;
}
export type UserLoginDetails = Omit<UserDetails, 'username'>