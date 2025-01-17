import PlanningBox from "~/components/Planning/PlanningBox";


function getdata () {
    const plannings = [
        {
            index: 100,
            startDate: "01/01/0111",
            endDate: "01/01/0011",
            final_balance: 100,
        },
        {
            index: 100,
            startDate: "01/01/0111",
            endDate: "01/01/0011",
            final_balance: -700,
        },
        {
            index: 100,
            startDate: "01/01/0111",
            endDate: "01/01/0011",
            final_balance: 600,
        },
        {
            index: 200,
            startDate: "01/01/0111",
            endDate: "04/01/0011",
            final_balance: -100,
        },
    ];
    return plannings;
}

export default function Main() {
    const plannings = getdata();

    return (
        <div className="flex justify-center flex-col">
            <div className="flex-col">
                <p className="text-lg text-center">Plannings</p>
                <p className="text-base italic font-normal text-center">Select a Planning to see more details</p>
            </div>
            <div>
                { plannings.map((planning, index) => (
                    <div className="flex justify-center"> 
                        <PlanningBox 
                            key={index} 
                            index={planning.index} 
                            startDate={planning.startDate}
                            endDate={planning.endDate}
                            final_balance={planning.final_balance}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}