import Monetary from "../monetary";

interface PlanningBoxProps {
    index: number;
    startDate: string;
    endDate: string;
    final_balance: number;
}

const PlanningBox = ({index, startDate, endDate, final_balance}: PlanningBoxProps) => {
    
    return (
       <div className="m-1 flex flex-row border rounded-lg drop-shadow-sm hover:border-gray-400 md:max-w-md">
            <div className="grow">
                <div className="p-1 text-lg font-normal italic">
                    Planning #{index}
                </div>
                <div className="text-xs p-1 font-normal">
                    {startDate} - {endDate}
                </div>
            </div>
            <div className="bg-white font-bold w-32 flex justify-end p-2 items-center">
                <Monetary decorate={true} value={final_balance}/>
            </div>
        </div>
         
    );
}

export default PlanningBox;
