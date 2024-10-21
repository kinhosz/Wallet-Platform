import { Category } from "~/types/category";
import AddCategoryModal from "../modal/addCategory";
import Monetary from "../monetary";
import SecondaryButton from "../secondaryButton";
import PieChart from "./pieChart";
import PlanningBarChart from "./planningBarChart";
import { useState } from "react";
import { PlanningLine } from "~/types/planning_line";

interface TableProps {
    planningLines: PlanningLine[];
    isIncome?: boolean;
    allCategories: Category[];
    planningUuid: string;
}

export default function TableComponent({ planningLines, isIncome=false, allCategories, planningUuid }: TableProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const title = isIncome ? 'Incomes' : 'Expenses';
    const mult = isIncome ? -1 : 1;

    return (
        <div className="xl:w-screen">
            { isModalOpen && (
                <AddCategoryModal
                    onClose={() => setIsModalOpen(false)}
                    isIncome={isIncome}
                    categories={allCategories}
                    planning={planningUuid}
                />
            )}
            <div className="flex flex-col items-center m-4 xl:flex-shrink-0">
                <div className="max-w-lg mx-2">
                    <div className="flex justify-between mr-2">
                        <div className="text-bold text-lg font-bold">{title}</div>
                        <SecondaryButton onClick={()=>setIsModalOpen(true)}>
                            Add category
                        </SecondaryButton>
                    </div>
                    <PlanningBarChart
                        planned={planningLines.reduce((total, line) => total + line.planned, 0)}
                        real={planningLines.reduce((total, line) => total + line.real, 0)}
                    />
                    <div className="p-2 mx-2">
                        {/* HEAD */}
                        <div className="col-span-4 grid grid-cols-4 font-normal italic mb-1">
                            <span>Category</span>
                            <span>Planned</span>
                            <span>Real</span>
                            <span>Difference</span>
                        </div>
                        {/* BODY */}
                        { planningLines.map((item, index) => (
                            <div key={index} className="col-span-4 grid grid-cols-4 text-sm border">
                                <button
                                    className="col-span-2 grid grid-cols-2 bg-wallet_gray rounded-full border
                                        border-gray-400 items-center hover:shadow-md active:border-white"
                                    onClick={()=>{}}
                                >
                                    <div className="col-span-1 px-2 truncate overflow-hidden whitespace-nowrap max-w-32 text-start text-xs xl:text-sm">
                                        {item.category.name}
                                    </div>
                                    <div className="flex xl:justify-between px-2">
                                        <Monetary value={item.planned} className="px-2 text-xs xl:text-sm whitespace-nowrap"/>
                                        <div className=" text-wallet_orange px-2 hidden xl:block">&gt;</div>
                                    </div>
                                </button>
                                <Monetary value={item.real} className="p-2 text-xs xl:text-sm whitespace-nowrap"/>
                                <Monetary value={mult * (item.planned - item.real)} className="p-2 text-xs xl:text-sm whitespace-nowrap"/>
                            </div>
                        ))}
                    </div>
                </div>
                <PieChart className="w-screen xl:w-auto" planningLines={planningLines} />
            </div>
        </div>
    );
}
