import { Link } from "@remix-run/react";
import { Monetary } from "~/components/Monetary";
import { CategoryIcon } from "@/components/CategoryIcon";

export interface TransactionCardProps {
  amount: number;
  category: string;
  description: string;
  icon: number;
  date: string;
  uuid: string;
  className?: string;
}

const TransactionCard = ({ amount, category, description, icon, date, uuid, className }: TransactionCardProps) => {
  const date_date = new Date(date);
  function getUrl() {
    return `/transactions/${uuid}`;
  }

  return (
    <Link to={getUrl()} className={`${className} bg-white flex lg:max-w-xl h-14 border
      rounded-lg drop-shadow-sm hover:border-gray-400`}>
      <div className="hidden md:w-28 md:flex md:justify-start md:items-center p-1">
        <p className="text-base truncate block font-normal">{date_date.toLocaleDateString("pt-BR")}</p>
      </div>
      <div className="w-10 flex justify-center items-center">
        <div className="bg-wallet_gray p-2 rounded-full">
          <CategoryIcon id={icon} size={20} />
        </div>
      </div>
      <div className="hidden md:w-32 md:flex md:justify-start md:items-center p-1">
        <p className="text-base truncate block font-normal">{category}</p>
      </div>
      <div className="flex-1 w-36 flex flex-col p-1 justify-center">
        <div className="h-8 flex items-center">
          <p className="text-base truncate block font-normal">{description}</p>
        </div>
        <div className="flex grow md:hidden">
          <div className="w-24 flex-1">
            <p className="text-xs font-sans truncate block font-normal italic">{category}</p>
          </div>
        </div>
      </div>
      <div className="w-28 flex items-center justify-end px-1">
        <Monetary value={amount} decorate={true} />
      </div>
    </Link>
  );
};

export default TransactionCard;
