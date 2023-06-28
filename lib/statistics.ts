import { get } from 'lodash';

import { fetchJwt } from './users';
import { GENERAL_CONSTANTS, HTTP_ERRORS } from './constants';

const BASE_URL = GENERAL_CONSTANTS.API_BASE_URL;

interface RequestDetails {
    url: string;
    method: 'POST' | 'PUT' | 'PATCH' | 'DELETE' | 'GET';
    body?: Object;
}

export const makeRequest = async (details: RequestDetails) => {
    const { url, method } = details;
    const res = await fetch(`${url}`, {
        method,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${fetchJwt()}`
        },
    });
    return await res.json();
};
export const makeRequestWithBody = async (details: RequestDetails) => {
    const { url, method, body } = details;
    const res = await fetch(`${url}`, {
        method,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${fetchJwt()}`
        },
        body: JSON.stringify(body)
    });
    return res;
};
export const handleResponse = (data: Object) => {
    const hasErrors = get(data, 'error');
    const isSystemError = get(data, 'status');
    if (hasErrors) {
        const status = get(hasErrors, 'status');
        const errorMessage = get(hasErrors, 'message') || get(HTTP_ERRORS[Number(status)], 'message')
        throw new Error(errorMessage)
    } else if (isSystemError) {
        const errorMessage = get(HTTP_ERRORS[Number(isSystemError)], 'message')
        throw new Error(errorMessage)
    } else {
        const response = get(data, 'data');
        return response
    }
};
export async function fetchCategories(): Promise<void> {
    try {
        const data = await makeRequest({
            url: `${BASE_URL}/categories`,
            method: 'GET'
        });
        const response = handleResponse(data);
        return response
    } catch (error) {
        throw new Error(error)
    }
}
export async function fetchCurrencies(): Promise<void> {
    try {
        const data = await makeRequest({
            url: `${BASE_URL}/currencies`,
            method: 'GET'
        });
        const response = handleResponse(data);
        return response
    } catch (error) {
        throw new Error(error)
    }
}

export async function fetchEvents(): Promise<void> {
    try {
        const data = await makeRequest({
            url: `${BASE_URL}/events`,
            method: 'GET'
        });
        const response = handleResponse(data);
        return response
    } catch (error) {
        throw new Error(error)
    }
}

export async function fetchItems(): Promise<void> {
    try {
        const data = await makeRequest({
            url: `${BASE_URL}/items`,
            method: 'GET'
        });
        const response = handleResponse(data);
        return response
    } catch (error) {
        throw new Error(error)
    }
}

export async function fetchMilestones(): Promise<void> {
    try {
        const data = await makeRequest({
            url: `${BASE_URL}/stages`,
            method: 'GET'
        });
        const response = handleResponse(data);
        return response
    } catch (error) {
        throw new Error(error)
    }
}

export async function fetchUsers(): Promise<void> {
    try {
        const data = await makeRequest({
            url: `${BASE_URL}/users`,
            method: 'GET'
        });
        const response = handleResponse(data);
        return response
    } catch (error) {
        throw new Error(error)
    }
}