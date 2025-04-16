import TransactionCard, {
  TransactionCardProps,
} from "@/components/Transaction/TransactionCard";

export interface TransactionTableProps {
  transactions: TransactionCardProps[];
}

function indexTransactions(transactions: TransactionCardProps[]) {
  const indexed_transactions = transactions.map((t, i, arr) => {
    const indexed = i == 0 || arr[i].date != arr[i - 1].date;
    return { ...t, indexed };
  });

  return indexed_transactions;
}

function formatDateLabel(date: Date) {
  const month = date.toLocaleString("en-US", { month: "long"});
  const day = date.getDate();
  const year = date.getFullYear();
  const now = new Date();

  if (year != now.getFullYear()) return `${month}, ${day}. ${year}`;
  else return `${month}, ${day}`;
}

const TransactionTable = ({ transactions }: TransactionTableProps ) => {
  const i_transactions = indexTransactions(transactions);

  return (
    <div>
      <div className="bg-white hidden sticky top-40 z-10 font-normal italic border shadow-sm rounded-md md:flex md:py-2 md:mb-1 md:mx-1 lg:max-w-xl">
        <div className="w-32 px-2">Date</div>
        <div className="w-40 px-8">Category</div>
        <div className="flex-1 w-40 px-1">Description</div>
        <div className="w-28 px-8">Amount</div>
      </div>
      {i_transactions.map((transaction, key) => (
        <div key={key}>
          {transaction.indexed && (
            <div className="font-normal text-md p-2 md:hidden">
              {formatDateLabel(transaction.date)}
            </div>
          )}
          <TransactionCard
            amount={transaction.amount}
            category={transaction.category}
            description={transaction.description}
            icon={transaction.icon}
            date={transaction.date}
          />
        </div>
      ))}
    </div>
  );
};

export default TransactionTable;
