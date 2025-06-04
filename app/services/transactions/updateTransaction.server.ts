import ApiRequest from "../apiRequest.server";

interface UpdateTransactionRequest {
  currency: string,
  occurred_at: string,
  value: number,
  category: string,
  description: string,
}

export default async function UpdateTransaction(
  token: string,
  uuid: string,
  currency: string,
  occurred_at: string,
  value: number,
  category: string,
  description: string
): Promise<string> {
  const transaction_request: UpdateTransactionRequest = {
    currency, occurred_at, value, category, description
  }

  const response = await ApiRequest(
    `finance/transactions/${uuid}`,
    'PATCH',
    { "Content-Type": "application/json", Authorization: token },
    JSON.stringify({ transaction: transaction_request })
  );

  return (response?.status == 204 ? "success" : "error");
}
