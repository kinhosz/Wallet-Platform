import { Category } from "~/types/category";
import ApiRequest from "../apiRequest.server";

export default async function UpsertCategory(
    token: string,
    category: Category
): Promise<Category> {
    const response = await ApiRequest(
        `finance/categories/upsert`,
        'POST', { 'Content-Type': 'application/json', 'Authorization': token, },
        JSON.stringify({ category: category }),
    );

    return await response?.json();
}
