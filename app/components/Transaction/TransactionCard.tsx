import Monetary from "../monetary";
import { CategoryIcon } from "@/components/CategoryIcon";

interface TransactionCardProps {
  amount: number;
  category: string;
  description: string;
  icon: number;
}

const TransactionCard = ({ amount, category, description, icon }: TransactionCardProps) => {
  return (
    <div className="bg-white flex mx-1 md:max-w-sm lg:max-w-md h-14 border rounded-lg drop-shadow-sm hover:border-gray-400">
      <div className="w-10 flex justify-center items-center">
        <div className="bg-wallet_gray p-2 rounded-full">
          <CategoryIcon id={icon} size={20} />
        </div>
      </div>
      <div className="flex-1 w-36 flex flex-col p-1 justify-center">
        <div className="h-8 flex items-center">
          <p className="text-base truncate block font-normal">{description}</p>
        </div>
        <div className="flex grow">
          <div className="w-24 flex-1">
            <p className="text-xs font-sans truncate block font-normal italic">{category}</p>
          </div>
        </div>
      </div>
      <div className="w-28 flex items-center justify-end px-1">
        <Monetary value={amount} decorate={amount > 0.0}/>
      </div>
    </div>
  );
};

export default TransactionCard;
