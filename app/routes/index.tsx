import { redirect } from "@remix-run/node";

export async function loader() {
  return redirect("/overview");
}

export default function Index() {
  return null;
}
