import { ActionFunctionArgs, redirect } from "react-router";
import GetAuthToken from "~/services/getAuthToken.server";
import DeleteTransaction from "~/services/transactions/deleteTransaction.server";

export const action = async ({ request }: ActionFunctionArgs) => {
  const token = await GetAuthToken(request);
  if (!token) return redirect('/login');
  const formData = await request.formData();
  await DeleteTransaction(token, String(formData.get('uuid')));

  return redirect('/transactions');
}

export default function Delete() {
  return null;
}
