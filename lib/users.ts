import { get } from 'lodash';
import { UserDetails, UserLoginDetails } from '../lib/types';

import { API_BASE_URL, HTTP_ERRORS } from '../lib/constants';

export async function signupUser(values: UserDetails) {
    try {
        const res = await fetch(`${API_BASE_URL}/auth/local/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(values)
        });
        const data = await res.json();
        const hasErrors = get(data, 'error');
        if (hasErrors) {
            const status = get(hasErrors, 'status');
            const errorMessage = get(HTTP_ERRORS[Number(status)], 'message')
            throw new Error(errorMessage)
        } else {
            return data
        }
    } catch (error) {
        throw new Error(error)
    }
}

export async function loginUser(details: UserLoginDetails) {
    try {
        console.log('Login User');

    } catch (error) {
        throw new Error(`Something went wrong: loginUser`, error)
    }
}