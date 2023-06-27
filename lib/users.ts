import { get } from 'lodash';

import { GENERAL_CONSTANTS, HTTP_ERRORS } from './constants';
import { UserDetails, UserLoginDetails, LoggedInUserDetails } from '../lib/types';

export async function signupUser(values: UserDetails): Promise<LoggedInUserDetails> {
    try {
        const res = await fetch(`${GENERAL_CONSTANTS.API_BASE_URL}/auth/local/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(values)
        });
        const data = await res.json();
        const hasErrors = get(data, 'error');
        if (hasErrors) {
            const status = get(hasErrors, 'status');
            const errorMessage = get(hasErrors, 'message') || get(HTTP_ERRORS[Number(status)], 'message')
            throw new Error(errorMessage)
        } else {
            return data
        }
    } catch (error) {
        throw new Error(error)
    }
}

export async function loginUser(details: UserLoginDetails): Promise<LoggedInUserDetails> {
    try {
        const res = await fetch(`${GENERAL_CONSTANTS.API_BASE_URL}/auth/local`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(details)
        });
        const data = await res.json();
        const hasErrors = get(data, 'error');
        if (hasErrors) {
            const status = get(hasErrors, 'status');
            const errorMessage = get(hasErrors, 'message') || get(HTTP_ERRORS[Number(status)], 'message')
            throw new Error(errorMessage)
        } else {
            return data
        }
    } catch (error) {
        throw new Error(error)
    }
}