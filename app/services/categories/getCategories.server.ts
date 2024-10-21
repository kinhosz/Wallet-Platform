import { Category } from "~/types/category";
import ApiRequest from "../apiRequest.server";

export default async function GetCategories(token: string): Promise<Category[]> {
    const response = await ApiRequest(
        `finance/categories`,
        'GET', { 'Content-Type': 'application/json', 'Authorization': token, },
    );

    return await response?.json();
}
