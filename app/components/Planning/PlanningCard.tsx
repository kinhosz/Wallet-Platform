import { PlanningLine } from "~/types/planning_line";
import { useState } from "react";
import { Category } from "~/types/category";
import SecondaryButton from "../secondaryButton";
import PlanningLinesTable from "./PlanningLinesTable";
import AddCategoryModal from "../modal/addCategory";
import PlanningBarChart from "./planningBarChart";
import PieChart from "./pieChart";

interface PlanningCardProps {
    lines: PlanningLine[];
    allCategories: Category[];
    planningUuid: string;
}

const PlanningCard = ({ lines, allCategories, planningUuid }: PlanningCardProps) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const totalPlanned = lines.reduce((total, line) => total + line.planned, 0);
    const totalReal = lines.reduce((total, line) => total + line.real, 0);
    const title = totalPlanned < 0 ? 'Expenses' : 'Incomes';

    return (
        <div>
            <div className="w-screen md:max-w-md">
                <div className="flex justify-between m-1">
                    <div className="text-bold text-lg font-bold">{title}</div>
                    <SecondaryButton onClick={()=>setIsModalOpen(true)}>
                        Add category
                    </SecondaryButton>
                </div>
                <PlanningBarChart
                    planned={totalPlanned}
                    real={totalReal}
                />
                <PlanningLinesTable lines={lines} />
                <PieChart planningLines={lines} />
            </div>
            { isModalOpen && (
                <AddCategoryModal
                    onClose={() => setIsModalOpen(false)}
                    isIncome={totalPlanned > 0}
                    categories={allCategories}
                    planning={planningUuid}
                />
            )}
        </div>
    );
}

export default PlanningCard;
