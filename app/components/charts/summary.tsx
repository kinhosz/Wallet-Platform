import Monetary from "../monetary";

interface SummaryProps {
    beginning: number;
    ending: number;
}

export default function Summary({ beginning, ending }: SummaryProps) {
    const percentage = (((ending / beginning) - 1.0) * 100).toFixed(0);
    const balance = (ending - beginning);
    const message = (balance < 0 ? "Reduction" : "Increase")

    return (
        <div className="bg-wallet_gray p-4">
            <div className="px-16 py-4 border-b-2 border-gray-400">
                <div className="font-sans text-center text-md">{percentage}%</div>
                <div className="text-center">Overall Savings {message}</div>
            </div>
            <div className="px-16 py-4">
                <Monetary value={balance} className="text-center"/>
                <div className="text-center">Monthly Savings</div>
            </div>
        </div>
    );
}
