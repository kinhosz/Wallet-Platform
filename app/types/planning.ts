import { PlanningLine } from "./planning_line";

export interface Planning {
    uuid: string;
    initial_balance: number;
    final_balance: number;
    startDate: string;
    endDate: string;
    expense: PlanningLine[];
    income: PlanningLine[];
}
