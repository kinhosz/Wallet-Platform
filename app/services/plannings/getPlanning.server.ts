import ApiRequest from "../apiRequest.server";
import { Planning } from "~/types/planning";
import { PlanningLine } from "~/types/planning_line";

interface RawResponse {
    uuid: string,
    start_date: string,
    end_date: string,
    initial_balance: number,
    monthly_balance: number,
    planning_lines: PlanningLine[],
}

export default async function GetPlanning(token: string, currency: string): Promise<Planning> {
    const response = await ApiRequest(
        `finance/plannings/current?currency=${currency}`,
        'GET', { 'Content-Type': 'application/json', 'Authorization': token, },
    );

    const raw_response: RawResponse = await response?.json();
    const balance: Planning = {
        uuid: raw_response.uuid ?? '',
        initial_balance: raw_response.initial_balance ?? 0.0,
        final_balance: raw_response.initial_balance + raw_response.monthly_balance,
        startDate: raw_response.start_date ?? "No data",
        endDate: raw_response.end_date ?? "No data",
        expense: (raw_response.planning_lines ?? []).filter((line) => {
            return line.planned <= 0.0;
        }),
        income: (raw_response.planning_lines ?? []).filter((line) => {
            return line.planned > 0.0;
        })
    }
    return balance;
}
