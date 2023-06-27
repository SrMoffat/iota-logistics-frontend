import { get } from 'lodash';

import { fetchJwt } from './users';
import { UserLoginDetails } from '../lib/types';
import { GENERAL_CONSTANTS, HTTP_ERRORS } from './constants';

export async function fetchCategories(): Promise<void> {
    try {
        const res = await fetch(`${GENERAL_CONSTANTS.API_BASE_URL}/categories`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${fetchJwt()}`
            },
        });
        const data = await res.json();
        const hasErrors = get(data, 'error');
        if (hasErrors) {
            const status = get(hasErrors, 'status');
            const errorMessage = get(hasErrors, 'message') || get(HTTP_ERRORS[Number(status)], 'message')
            throw new Error(errorMessage)
        } else {
            const response = get(data, 'data');
            return response
        }
    } catch (error) {
        throw new Error(error)
    }
}

export async function fetchCurrencies(): Promise<void> {
    try {
        const res = await fetch(`${GENERAL_CONSTANTS.API_BASE_URL}/currencies`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${fetchJwt()}`
            },
        });
        const data = await res.json();
        const hasErrors = get(data, 'error');
        if (hasErrors) {
            const status = get(hasErrors, 'status');
            const errorMessage = get(hasErrors, 'message') || get(HTTP_ERRORS[Number(status)], 'message')
            throw new Error(errorMessage)
        } else {
            const response = get(data, 'data');
            return response
        }
    } catch (error) {
        throw new Error(error)
    }
}

export async function fetchEvents(): Promise<void> {
    try {
        const res = await fetch(`${GENERAL_CONSTANTS.API_BASE_URL}/events`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${fetchJwt()}`
            },
        });
        const data = await res.json();
        const hasErrors = get(data, 'error');
        if (hasErrors) {
            const status = get(hasErrors, 'status');
            const errorMessage = get(hasErrors, 'message') || get(HTTP_ERRORS[Number(status)], 'message')
            throw new Error(errorMessage)
        } else {
            const response = get(data, 'data');
            return response
        }
    } catch (error) {
        throw new Error(error)
    }
}

export async function fetchItems(): Promise<void> {
    try {
        const res = await fetch(`${GENERAL_CONSTANTS.API_BASE_URL}/items`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${fetchJwt()}`
            },
        });
        const data = await res.json();
        const hasErrors = get(data, 'error');
        if (hasErrors) {
            const status = get(hasErrors, 'status');
            const errorMessage = get(hasErrors, 'message') || get(HTTP_ERRORS[Number(status)], 'message')
            throw new Error(errorMessage)
        } else {
            const response = get(data, 'data');
            return response
        }
    } catch (error) {
        throw new Error(error)
    }
}

export async function fetchMilestones(): Promise<void> {
    try {
        const res = await fetch(`${GENERAL_CONSTANTS.API_BASE_URL}/stages`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${fetchJwt()}`
            },
        });
        const data = await res.json();
        const hasErrors = get(data, 'error');
        if (hasErrors) {
            const status = get(hasErrors, 'status');
            const errorMessage = get(hasErrors, 'message') || get(HTTP_ERRORS[Number(status)], 'message')
            throw new Error(errorMessage)
        } else {
            const response = get(data, 'data');
            return response
        }
    } catch (error) {
        throw new Error(error)
    }
}

export async function fetchUsers(): Promise<void> {
    try {
        const res = await fetch(`${GENERAL_CONSTANTS.API_BASE_URL}/users`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${fetchJwt()}`
            },
        });
        const data = await res.json();
        const hasErrors = get(data, 'error');
        if (hasErrors) {
            const status = get(hasErrors, 'status');
            const errorMessage = get(hasErrors, 'message') || get(HTTP_ERRORS[Number(status)], 'message')
            throw new Error(errorMessage)
        } else {
            const response = get(data, 'data');
            return response
        }
    } catch (error) {
        throw new Error(error)
    }
}