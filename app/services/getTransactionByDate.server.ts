import ApiRequest from "./apiRequest.server";
import { Transaction } from "~/types/transactions";

export default async function GetTransactionsByDate(token: string, startDate: string): Promise<Transaction[]> {
  const response = await ApiRequest(
    `finance/transactions/filter_by_date?start_date=${startDate}`,
    'GET', { 'Content-Type': 'application/json', 'Authorization': token, },
  );

  const rawResponse: any[] = await response?.json();

  const transactions: Transaction[] = rawResponse.map((transaction) => ({
    description: transaction.description,
    occurred_at: transaction.occurred_at,
    value: parseFloat(transaction.value),
    category_name: transaction.category_name
  }));

  return transactions;
}
