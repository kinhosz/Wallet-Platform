import { PlanningLine } from "~/types/planning_line";
import PlanningLineCard from "./PlanningLineCard";

interface PlanningLinesTableProps {
    lines: PlanningLine[];
}

const PlanningLinesTable = ({ lines }: PlanningLinesTableProps) => {
    return (
        <div>
            <div className="hidden sm:m-1 sm:flex md:max-w-lg">
                {/* icon */}
                <div className="sm:w-1/12 md:w-20" /> 
                <div className="font-normal italic sm:w-11/12 sm:flex">
                    <div className="sm:w-1/4">Category</div>
                    <div className="sm:w-1/4">Planned</div>
                    <div className="sm:w-1/4">Real</div>
                    <div className="sm:w-1/4">Difference</div>
                </div>
            </div>
            { lines.map((line, index) => (
                <PlanningLineCard key={index} line={line} />
            ))}
        </div>
    );
}

export default PlanningLinesTable;
