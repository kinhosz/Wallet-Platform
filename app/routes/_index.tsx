import { redirect, type MetaFunction, json, ActionFunctionArgs } from "@remix-run/node";
import Base from "../services/base.server"
import GetAuthToken from "~/services/getAuthToken.server";
import { useLoaderData } from "@remix-run/react";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export async function loader({ request }: ActionFunctionArgs) {
  const token = await GetAuthToken(request);

  if (!token) {
    return json({ user: null }, { status: 401 });
  }

  const response = await Base(
    'users/show',
    'GET',
    {
      'Content-Type': 'application/json',
      'Authorization': token,
    },
  );
  if (!response) return redirect('/error');

  if (!response.ok) {
    return json({ user: null }, { status: response.status });
  }

  const user = await response.json();
  return { user: user };
}

export default function Index() {
  const { user } = useLoaderData<typeof loader>();

  return (
    <div className="rounded-lg bg-gray-200 p-4">
      <p>Feito com <span className="text-red-500">&hearts;</span> por Você</p>
      { user ? (
        <div>
          <p>Welcome {user.name}!</p>
          <p>Your email is: {user.email}</p>
        </div>
      ) : (
        <p>Logged out!</p>
      )
      }
    </div>
  );
}
