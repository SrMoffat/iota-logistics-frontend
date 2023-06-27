import { UserDetails, UserLoginDetails } from '../lib/types';

import { GENERAL_CONSTANTS } from './constants';
import { makeRequest, handleResponse } from './statistics';

const BASE_URL = GENERAL_CONSTANTS.API_BASE_URL;

export async function fetchItemsByMilestone(milestoneId: string | number): Promise<void> {
    try {
        const data = await makeRequest({
            url: `${BASE_URL}/stages/${milestoneId}/events`,
            method: 'GET'
        });
        const response = handleResponse(data);
        return response
    } catch (error) {
        throw new Error(error)
    }
}

export async function createSupplyChainItem(values: UserDetails): Promise<void> {
    try {
       
    } catch (error) {
        throw new Error(error)
    }
}

export async function updateSupplyChainItem(details: UserLoginDetails): Promise<void> {
    try {
       
    } catch (error) {
        throw new Error(error)
    }
}

export async function addSupplyChainItemEvent(details: UserLoginDetails): Promise<void> {
    try {
       
    } catch (error) {
        throw new Error(error)
    }
}

export async function fetchSupplyChainItemEvents(details: UserLoginDetails): Promise<void> {
    try {
       
    } catch (error) {
        throw new Error(error)
    }
}

export async function fetchSupplyChainItemRecentEvents(details: UserLoginDetails): Promise<void> {
    try {
       
    } catch (error) {
        throw new Error(error)
    }
}