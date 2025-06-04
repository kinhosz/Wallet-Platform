import ApiRequest from "../apiRequest.server";

export default async function DeleteTransaction(
  token: string,
  uuid: string,
) {
  await ApiRequest(
    `finance/transactions/${uuid}`,
    'DELETE',
    { "Content-Type": "application/json", Authorization: token }
  );
}
