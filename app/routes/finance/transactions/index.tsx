import { LoaderFunction, redirect } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { TransactionTable } from "~/components/Transaction";
import GetAuthToken from "~/services/getAuthToken.server";
import getCurrencyFromCookie from "~/services/getCurrencyToken";
import GetTransactions from "~/services/transactions/getTransactions.server";

export const loader: LoaderFunction = async ({ request }) => {
  const token = await GetAuthToken(request);
  if (!token) return redirect('/login');
  const currency = await getCurrencyFromCookie(request);
  const transactions = await GetTransactions(token, currency);
  return transactions;
}

export default function Transactions() {
  const transactions = useLoaderData<typeof loader>();

  return (
    <TransactionTable transactions={transactions} />
  );
}
