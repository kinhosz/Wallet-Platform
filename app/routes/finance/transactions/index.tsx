import { LoaderFunction, redirect } from "@remix-run/node";
import { Outlet, useLoaderData, useParams } from "@remix-run/react";
import GetAuthToken from "~/services/getAuthToken.server";
import getCurrencyFromCookie from "~/services/getCurrencyToken";
import GetTransactions from "~/services/transactions/getTransactions.server";

import TransactionCard, {
  TransactionCardProps,
} from "@/components/Transaction/TransactionCard";
import { formatLongMonth } from "~/helper/dateFormatter/formatLongMonth";

export const loader: LoaderFunction = async ({ request }) => {
  const token = await GetAuthToken(request);
  if (!token) return redirect('/login');
  const currency = await getCurrencyFromCookie(request);
  const transactions = await GetTransactions(token, currency);
  return transactions;
}

function indexTransactions(transactions: TransactionCardProps[]) {
  const indexed_transactions = transactions.map((t, i, arr) => {
    const indexed = i == 0 || formatLongMonth(arr[i].date) != formatLongMonth(arr[i - 1].date);
    return { ...t, indexed };
  });

  return indexed_transactions;
}

export default function Transactions() {
  const transactions = useLoaderData<typeof loader>();
  const params = useParams();
  const active_uuid = params.uuid ? params.uuid : '';
  const i_transactions = indexTransactions(transactions);

  return (
    <div>
      <div className="bg-white hidden sticky top-40 z-10 font-normal italic border shadow-sm
        rounded-md md:flex md:py-2 md:mb-1 md:mx-1 lg:max-w-xl lg:mx-auto">
        <div className="w-32 px-2">Date</div>
        <div className="w-40 px-8">Category</div>
        <div className="flex-1 w-40 px-1">Description</div>
        <div className="w-28 px-8">Amount</div>
      </div>
      {i_transactions.map((transaction, key) => (
        <div key={key}>
          {transaction.indexed && (
            <div className="font-normal text-md p-2 md:hidden">
              {formatLongMonth(transaction.date)}
            </div>
          )}
          <TransactionCard className={`lg:mx-auto ${ active_uuid == transaction.uuid ? 'border-wallet_orange': '' }`}
            amount={transaction.amount}
            category={transaction.category}
            description={transaction.description}
            icon={transaction.icon}
            date={transaction.date}
            uuid={transaction.uuid}
          />
          { active_uuid == transaction.uuid && <Outlet /> }
        </div>
      ))}
    </div>
  );
}
