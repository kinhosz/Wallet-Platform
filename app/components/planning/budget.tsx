// eslint-disable-next-line import/no-named-as-default
import Chart from "react-google-charts";
import theme from "tailwind.config";
import Monetary from "../monetary";

interface BudgetProps {
    beginning: number;
    ending: number;
    className?: string;
}
  
export default function Budget({ beginning, ending, className }: BudgetProps) {
    const data = [
        ['', '', { role: "style" }],
        ["Beginning", beginning, theme.theme.extend.colors.wallet_blue],
        ["Ending", ending, theme.theme.extend.colors.wallet_orange],
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
            textPosition: 'none',
            gridlines: { count: 0 },
        },
        vAxis: {
            textPosition: 'none',
            gridlines: { count: 0 },
            viewWindow: {
                min: 0,
                max: Math.max(beginning, ending) * 1.1,
            },
        },
        legend: { position: 'none' },
        bars: 'vertical',
        height: 120,
        width: 160,
    };

    return (
        <div>
            <div className="text-wallet_orange text-xl text-center">Budget</div>
            <div className="m-2 flex flex-row">
                <div className="content-center">
                    <div className="p-2 text-center text-wallet_blue text-sm">
                        Beginning Balance:{' '}
                        <Monetary value={beginning} className="text-wallet_blue"/>
                    </div>
                    <div className="p-2 text-center text-wallet_orange text-sm">
                        Ending Balance:{' '}
                        <Monetary value={ending} className="text-wallet_orange"/>
                    </div>
                </div>
                <div className="flex justify-center m-2">
                    <Chart
                        chartType="ColumnChart"
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
