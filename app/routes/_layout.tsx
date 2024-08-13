import { redirect, ActionFunctionArgs } from "@remix-run/node";
import Base from "../services/base.server";
import GetAuthToken from "~/services/getAuthToken.server";
import { Outlet, useLoaderData, useLocation } from "@remix-run/react";
import { Context } from "~/types/context";
import TabSheet from "~/components/tabsheet";
import { useEffect, useState } from "react";
import { FiUser } from "react-icons/fi";
import Sidebar from "../components/sidebar";
import CurrencySelector from "~/components/currencySelector";
import { CurrencyContext } from "~/context/currency";
import { UserContext } from "~/context/user";

export async function loader({ request }: ActionFunctionArgs) {
  const token = await GetAuthToken(request);

  if (!token) return redirect('/login');

  const response = await Base(
    'users/show',
    'GET',
    {
      'Content-Type': 'application/json',
      'Authorization': token,
    },
  );
  if (!response) return redirect('/error');

  if (!response.ok) return redirect('/logout');

  const user = await response.json();
  const context: Context = {
    user: user,
    currency: 'BRL',
  };
  return context;
}

export default function Layout() {
  const location = useLocation();
  const context = useLoaderData<typeof loader>();
  const [activePath, setActivePath] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [currencyCode, setCurrencyCode] = useState(context.currency);

  const saveCurrencyCode = (code: string) => {
    setCurrencyCode(code);
  };

  useEffect(() => {
    const rootPath = location.pathname.split('/')[1];
    setActivePath(rootPath);
  }, [location.pathname]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <UserContext.Provider value={context.user}>
      <CurrencyContext.Provider value={currencyCode}>
        <div className="font-semibold relative">
          <nav className="sticky top-0 left-0 right-0 z-20 bg-wallet_blue text-white">
            <div className="flex justify-between px-4 py-8 items-center">
              <div className="flex text-start">
                <button
                  className="w-8 h-8 flex items-center justify-center rounded-full mr-2 cursor-pointer bg-white text-wallet_blue p-1"
                  onClick={toggleSidebar}
                >
                  <FiUser />
                </button>
                <p className="hidden sm:block">Hello, {context.user.name}!</p>
              </div>
              <div className="flex-1 text-2xl text-center">Wallet</div>
              <div className="flex ml-auto">
                <CurrencySelector currency={currencyCode} saveCurrencyCode={saveCurrencyCode} />
              </div>
            </div>
            <div className="flex mt-2">
              <TabSheet active={activePath == 'transactions'} title={'Transactions'} to={'/transactions'} />
              <TabSheet active={activePath == 'overview'} title={'Overview'} to={'/overview'} />
              <TabSheet active={activePath == 'planning'} title={'Planning'} to={'/planning'} />
              <TabSheet active={activePath == 'charts'} title={'Charts'} to={'/charts'} />
            </div>
            <div className="bg-white h-2" />
          </nav>
          <Sidebar
            isOpen={isSidebarOpen}
            toggleSidebar={toggleSidebar}
            userName={context.user.name}
          />
          <main className={isSidebarOpen ? 'filter blur-sm mt-16' : ''}>
            <Outlet />
          </main>
        </div>
      </CurrencyContext.Provider>
    </UserContext.Provider>
  );
}
