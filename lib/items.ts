import { ItemDetails } from '../lib/types';
import { GENERAL_CONSTANTS } from './constants';
import { makeRequest, makeRequestWithBody, handleResponse } from './statistics';

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

export async function createSupplyChainItem(values: ItemDetails): Promise<Object> {
    try {
        const data = await makeRequestWithBody({
            url: `${BASE_URL}/supply-items`,
            method: 'POST',
            body: values
        });
        const response = handleResponse(data);
        return response
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

export async function fetchSupplyChainItemEvents(id: string | number): Promise<Object> {
    try {
        const data = await makeRequest({
            url: `${BASE_URL}/supply-items/${id}/events`,
            method: 'GET'
        });
        const response = handleResponse(data);
        return response;
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