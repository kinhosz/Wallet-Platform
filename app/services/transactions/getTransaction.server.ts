import ApiRequest from "../apiRequest.server";
import { RawTransaction } from "./RawTransaction";

export default async function GetTransaction(token: string, uuid: string) {
  const response = await ApiRequest(`finance/transactions/${uuid}`, "GET", {
    "Content-Type": "application/json",
    Authorization: token,
  });

  const t: RawTransaction = await response?.json();
  return {
    description: t.description,
    date: t.occurred_at,
    amount: Number(t.value),
    currency: t.currency,
    category: t.category_name,
    icon: Number(t.category_icon),
    uuid: t.uuid,
  };
}
