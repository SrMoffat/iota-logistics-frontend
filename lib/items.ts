import { ItemDetails, UserLoginDetails } from '../lib/types';

import { GENERAL_CONSTANTS } from './constants';
import { makeRequest, handleResponse } from './statistics';

const BASE_URL = GENERAL_CONSTANTS.API_BASE_URL;

export async function fetchItemsByMilestone(milestoneId: string | number): Promise<void> {
    try {
        const data = await makeRequest({
            url: `${BASE_URL}/stages/${milestoneId}/events`,
            method: 'GET'
        });
        // const response = handleResponse(data);
        return data
    } catch (error) {
        throw new Error(error)
    }
}

export async function createSupplyChainItem(values: ItemDetails): Promise<void> {
    try {
        const data = await makeRequest({
            url: `${BASE_URL}/supply-items`,
            method: 'POST',
            body: JSON.stringify(values)
        });
        console.log('Data', data);

    } catch (error) {
        throw new Error(error)
    }
}

export async function updateSupplyChainItem(details: ItemDetails): Promise<void> {
    try {

    } catch (error) {
        throw new Error(error)
    }
}

export async function addSupplyChainItemEvent(details: ItemDetails): Promise<void> {
    try {

    } catch (error) {
        throw new Error(error)
    }
}

export async function fetchSupplyChainItemEvents(details: ItemDetails): Promise<void> {
    try {

    } catch (error) {
        throw new Error(error)
    }
}

export async function fetchSupplyChainItemRecentEvents(details: ItemDetails): Promise<void> {
    try {

    } catch (error) {
        throw new Error(error)
    }
}