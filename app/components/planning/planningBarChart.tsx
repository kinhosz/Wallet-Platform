// eslint-disable-next-line import/no-named-as-default
import Chart from "react-google-charts";
import theme from "tailwind.config";
import Monetary from "../monetary";

interface BudgetProps {
    planned: number;
    real: number;
    className?: string;
}

export default function PlanningBarChart({ planned, real, className }: BudgetProps) {
    const data = [
        ['', '', { role: "style" }],
        ["Planned", planned, theme.theme.extend.colors.wallet_blue],
        ["Real", real, theme.theme.extend.colors.wallet_orange],
    ];

    const options = {
        chartArea: {
            width: '100%',
            height: '100%',
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
        },
        hAxis: {
            viewWindow: {
                min: 0,
                max: Math.max(planned, real) * 1.1,
            },
            textPosition: 'none',
            gridlines: { count: 0 },
        },
        vAxis: {
            textPosition: 'none',
            gridlines: { count: 0 },
        },
        legend: { position: 'none' },
        bars: 'horizontal',
        width: 160,
        height: 40,
    };

    return (
        <div className="mr-4 md:mr-0">
            <div className="m-2 grid grid-cols-4 text-xs md:text-sm mr-2">
                <div>
                    <div>Planned</div>
                    <div>Real</div>
                </div>
                <div>
                    <Monetary value={planned} className="text-wallet_blue text-bold"/>
                    <Monetary value={real} className="text-wallet_orange_light text-bold"/>
                </div>
                <div className="col-span-2">
                    <Chart
                        chartType="BarChart"
                        data={data}
                        options={options}
                        className={className}
                        height="100%"
                    />
                </div>
            </div>
        </div>
    );
}
