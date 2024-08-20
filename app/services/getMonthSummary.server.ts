import ApiRequest from "./apiRequest.server";
import { Category } from "~/types/category";
import { PeriodSummary } from "~/types/planning";

interface RawResponse {
    start_date: string,
    end_date: string,
    initial_balance: number,
    monthly_balance: number,
    categories: Category[],
}

export default async function GetMonthSummary(token: string, currency: string): Promise<PeriodSummary> {
    const response = await ApiRequest(
        `finance/plannings/current?currency=${currency}`,
        'GET', { 'Content-Type': 'application/json', 'Authorization': token, },
    );

    const raw_response: RawResponse = await response?.json();
    const balance: PeriodSummary = {
        initial_balance: raw_response.initial_balance ?? 0.0,
        final_balance: raw_response.initial_balance + raw_response.monthly_balance,
        startDate: raw_response.start_date ?? "No data",
        endDate: raw_response.end_date ?? "No data",
        expense: (raw_response.categories ?? []).filter((category) => {
            return category.planned <= 0.0;
        }).map((category) => {
            return {
                ...category,
                planned: -category.planned,
                real: -category.real,
            }
        }),
        income: (raw_response.categories ?? []).filter((category) => {
            return category.planned > 0.0;
        })
    }
    return balance;
}
