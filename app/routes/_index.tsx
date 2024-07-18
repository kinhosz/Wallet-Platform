import { redirect, type MetaFunction, ActionFunctionArgs } from "@remix-run/node";
import Base from "../services/base.server"
import GetAuthToken from "~/services/getAuthToken.server";
import { Outlet, useLoaderData } from "@remix-run/react";
import { Context } from "~/types/context";
import TabSheet from "~/components/tabsheet";
import { BR } from "country-flag-icons/react/3x2";
import { MdChevronRight } from "react-icons/md";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export async function loader({ request }: ActionFunctionArgs) {
  const token = await GetAuthToken(request);

  if (!token) {
    return redirect('/error');
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

  if (!response.ok) return redirect('/login');

  const user = await response.json();
  const context: Context = {
    user: user,
    month: 'June',
    currency: 'BRL',
  };
  return context;
}

export default function Index() {
  const context = useLoaderData<typeof loader>();

  return (
    <div className="font-bold">
      <nav className="bg-wallet_blue text-white">
        <div className="grid grid-cols-3 p-8">
          <div className="text-xl text-start">Hello, {context.user.name}!</div>
          <div className="text-3xl text-center">{context.month}</div>
          <div className="flex ml-auto">
            <div className="bg-wallet_orange text-xl p-2 rounded-xl grid grid-cols-3 
              border border-black shadow-lg hover:bg-wallet_orange_dark active:shadow-inner
              active:border-white">
              <BR title="Brazil" className="rounded-full"/>
              <div>{context.currency}</div>
              <MdChevronRight size={26} color="white" />
            </div>
          </div>
        </div>
        <div className="flex mt-8">
          <TabSheet active={false} title={'Transactions'} to={'/overview'} />
          <TabSheet active={true} title={'Overview'} to={'/overview'} />
          <TabSheet active={false} title={'Planning'} to={'/overview'} />
          <TabSheet active={false} title={'Charts'} to={'/overview'} />
        </div>
      </nav>
      <main>
        <Outlet />
      </main>
    </div>
  );
}
