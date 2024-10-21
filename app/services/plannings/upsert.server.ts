import ApiRequest from "../apiRequest.server";

export interface UpsertPlanningLineRequest {
    category: string;
    value: number;
}

interface UpsertPlanningLineResponse {
    value: number,
    category: string,
    planning: string,
}

export default async function UpsertPlanningLine(
    token: string,
    planning: string,
    line: UpsertPlanningLineRequest,
): Promise<UpsertPlanningLineResponse> {
    const response = await ApiRequest(
        `finance/plannings/${planning}/upsert_line`,
        'POST', { 'Content-Type': 'application/json', 'Authorization': token, },
        JSON.stringify({ planning_line: line }),
    );

    return await response?.json();
}
