import { Category } from "./category";

export interface PeriodSummary {
    initial_balance: number;
    final_balance: number;
    startDate: string;
    endDate: string;
    expense: Category[];
    income: Category[];
}
