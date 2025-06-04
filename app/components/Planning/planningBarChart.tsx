// eslint-disable-next-line import/no-named-as-default
import Chart from "react-google-charts";
import theme from "tailwind.config";
import { Monetary } from "~/components/Monetary";

interface BudgetProps {
    planned: number;
    real: number;
    className?: string;
}

export default function PlanningBarChart({ planned, real, className }: BudgetProps) {
    const abs_planned = Math.abs(planned);
    const abs_real = Math.abs(real);
    const data = [
        ['', '', { role: "style" }],
        ["Planned", abs_planned, theme.theme.extend.colors.wallet_blue],
        ["Real", abs_real, theme.theme.extend.colors.wallet_orange],
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
                max: Math.max(abs_planned, abs_real) * 1.1,
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
        <div className="m-1 flex text-xs sm:text-sm">
            <div className="w-fit px-2">
                <div>Planned</div>
                <div>Real</div>
            </div>
            <div className="w-fit px-2">
                <Monetary value={abs_planned} className="text-wallet_blue text-bold"/>
                <Monetary value={abs_real} className="text-wallet_orange_light text-bold"/>
            </div>
            <div className="w-fit px-2">
                <Chart
                    chartType="BarChart"
                    data={data}
                    options={options}
                    className={className}
                    height="100%"
                />
            </div>
        </div>
    );
}
