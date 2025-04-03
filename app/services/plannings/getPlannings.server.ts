import ApiRequest from "../apiRequest.server";

interface RawResponse {
   plannings: RawPlanning[]
};

interface RawPlanning {
    uuid: string,
    start_date: string,
    end_date: string,
    balance: number
};

export default async function GetPlannings(token: string, currency: string) {
    const response = await ApiRequest(`finance/plannings?currency=${currency}`, "GET", 
        { 'Content-Type': 'application/json', 'Authorization': token });

    const raw_plannings: RawResponse = await response?.json();
    const plannings = raw_plannings.plannings.map((planning)=>{
        return {
            uuid: planning.uuid,
            startDate: planning.start_date,
            endDate: planning.end_date,
            final_balance: planning.balance
        }
    });
    return plannings;
}