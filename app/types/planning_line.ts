import { Category } from "./category";

export interface PlanningLine {
    category: Category;
    planned: number;
    real: number;
}
