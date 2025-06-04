// eslint-disable-next-line import/no-named-as-default
import Chart from "react-google-charts";
import theme from "tailwind.config";
import { Monetary } from "~/components/Monetary";

interface BudgetProps {
    initial_balance: number;
    final_balance: number;
    className?: string;
}
  
export default function Budget({ initial_balance, final_balance, className }: BudgetProps) {
    const data = [
        ['', '', { role: "style" }],
        ["initial_balance", initial_balance, theme.theme.extend.colors.wallet_blue],
        ["final_balance", final_balance, theme.theme.extend.colors.wallet_orange],
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
                max: Math.max(initial_balance, final_balance) * 1.1,
            },
        },
        legend: { position: 'none' },
        bars: 'vertical',
        height: 120,
        width: 160,
    };

    return (
        <div className="wx-2">
            <div className="text-wallet_orange text-lg text-center">Budget</div>
            <div className="m-2 flex flex-row w-screen md:w-auto justify-center">
                <div className="content-center text-xs md:base">
                    <div className="p-2 text-center text-wallet_blue">
                        Initial Balance:{' '}
                        <Monetary value={initial_balance} className="text-wallet_blue"/>
                    </div>
                    <div className="p-2 text-center text-wallet_orange">
                        Final Balance:{' '}
                        <Monetary value={final_balance} className="text-wallet_orange"/>
                    </div>
                </div>
                <div className="flex justify-center">
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
