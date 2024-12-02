import { CategoryIcon } from "@/components/CategoryIcon";
import Monetary from "@/components/monetary";
import { PlanningLine } from "@/types/planning_line";

interface PlanningLineCardProps {
    line: PlanningLine;
    key?: number;
}

const PlanningLineCard = ({ line }: PlanningLineCardProps) => {
    const difference = line.real - line.planned;
    return (
        <div className="flex mx-1 border rounded-lg drop-shadow-sm hover:border-gray-400 md:max-w-lg">
            <div className="w-2/12 flex justify-center items-center sm:w-1/12 sm:py-1 md:p-1 md:w-20">
                <div className="bg-wallet_gray p-2 rounded-full sm:hidden">
                    <CategoryIcon id={line.category.icon} size={28} />
                </div>
                <div className="hidden bg-wallet_gray p-2 rounded-full sm:block">
                    <CategoryIcon id={line.category.icon} size={24} />
                </div>
            </div>
            <div className="w-10/12 sm:w-11/12 sm:flex sm:flex-row">
                <div className="sm:w-1/4 sm:flex sm:items-center">
                    <p className="font-normal text-base truncate block px-1">{line.category.name}</p>
                </div>
                <div className="m-1 text-sm font-normal sm:m-0 sm:w-3/4">
                    <div className="flex italic sm:hidden">
                        <div className="w-1/3">Planned</div>
                        <div className="w-1/3">Real</div>
                        <div className="w-1/3">Difference</div>
                    </div>
                    <div className="flex font-semibold text-xs sm:text-base sm:h-full">
                        <div className="w-1/3 sm:flex sm:items-center">
                            <Monetary value={line.planned} />
                        </div>
                        <div className="w-1/3 sm:flex sm:items-center">
                            <Monetary value={line.real} />
                        </div>
                        <div className="w-1/3 sm:flex sm:items-center">
                            <Monetary value={difference} decorate={true} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PlanningLineCard;
