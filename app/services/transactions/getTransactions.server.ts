import ApiRequest from "../apiRequest.server";
import { Transaction } from "@/types/transaction";
import { RawTransaction } from "./RawTransaction";

export default async function GetTransactions(token: string, currency: string) {
  const response = await ApiRequest(
    `finance/transactions?currency=${currency}`,
    "GET",
    { "Content-Type": "application/json", Authorization: token }
  );

  const raw_transactions = await response?.json();
  const transactions: Transaction[] = raw_transactions.map(
    (t: RawTransaction) => {
      return {
        description: t.description,
        date: new Date(t.occurred_at),
        amount: Number(t.value),
        currency: t.currency,
        category: t.category_name,
        icon: Number(t.category_icon),
        uuid: t.uuid,
      };
    }
  );
  return transactions;
}
