import Monetary from "../monetary";

interface SummaryProps {
    initial_balance: number;
    final_balance: number;
}

export default function Summary({ initial_balance, final_balance }: SummaryProps) {
    const percentage = (((final_balance / initial_balance) - 1.0) * 100).toFixed(0);
    const balance = (final_balance - initial_balance);
    const message = (balance < 0 ? "Reduction" : "Increase")

    return (
        <div className="flex items-center wx-2">
            <div className="flex md:flex-none justify-center items-center w-screen h-auto md:w-auto">
                <div className="bg-wallet_gray p-2 text-sm">
                    <div className="px-16 py-2 border-b-2 border-gray-400">
                        <div className="font-sans text-center">{percentage}%</div>
                        <div className="text-center">Overall Savings {message}</div>
                    </div>
                    <div className="px-16 py-2">
                        <Monetary value={balance} className="text-center"/>
                        <div className="text-center">Monthly Savings</div>
                    </div>
                </div>
            </div>
        </div>
    );
}
