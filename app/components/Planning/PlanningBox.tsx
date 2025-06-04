import { Monetary } from "~/components/Monetary";
import { Link } from '@remix-run/react';

interface PlanningBoxProps {
    uuid: string;
    startDate: string;
    endDate: string;
    final_balance: number;
}

const PlanningBox = ({uuid, startDate, endDate, final_balance}: PlanningBoxProps) => {
    
    const planningDetailsPath = () => {
        return `/plannings/${uuid}`
    }

    return (
       <Link to={planningDetailsPath()} className="w-[calc(100vw-8px)] m-1 flex flex-row border rounded-lg drop-shadow-sm hover:border-gray-400 md:w-2/5">
            <div className="w-3/5">
                <p className="p-1 text-lg font-normal italic truncate overflow-hidden whitespace-nowrap">
                    Planning #{uuid}
                </p>
                <div className="text-xs p-1 font-normal">
                    {startDate} - {endDate}
                </div>
            </div>
            <div className="bg-white font-bold w-2/5 flex justify-end p-2 items-center">
                <Monetary decorate={true} value={final_balance}/>
            </div>
        </Link>
         
    );
}

export default PlanningBox;
