import { redirect, ActionFunctionArgs } from "@remix-run/node";
import Base from "../services/base.server";
import GetAuthToken from "~/services/getAuthToken.server";
import { Outlet, useLoaderData, useLocation } from "@remix-run/react";
import { Context } from "~/types/context";
import TabSheet from "~/components/tabsheet";
import { BR } from "country-flag-icons/react/3x2";
import { MdChevronRight } from "react-icons/md";
import { useEffect, useState } from "react";
import { FiUser, FiLogOut } from "react-icons/fi";

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

  if (!response.ok) return redirect('/login');

  const user = await response.json();
  const context: Context = {
    user: user,
    currency: 'BRL',
  };
  return context;
}

export default function Index() {
  const location = useLocation();
  const context = useLoaderData<typeof loader>();
  const [activePath, setActivePath] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const rootPath = location.pathname.split('/')[1];
    setActivePath(rootPath);
  }, [location.pathname]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="font-bold relative">
      <nav className="bg-wallet_blue text-white">
        <div className="grid grid-cols-3 p-8">
          <div className="flex items-center text-xl text-start">
            <button
              className="w-8 h-8 flex items-center justify-center rounded-full mr-2 cursor-pointer bg-white text-wallet_blue p-1"
              onClick={toggleSidebar}
            >
              <FiUser />
            </button>
            Hello, {context.user.name}!
          </div>
          <div className="text-3xl text-center">Wallet</div>
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
          <TabSheet active={activePath == 'transactions'} title={'Transactions'} to={'/transactions'} />
          <TabSheet active={activePath == 'overview'} title={'Overview'} to={'/overview'} />
          <TabSheet active={activePath == 'planning'} title={'Planning'} to={'/planning'} />
          <TabSheet active={activePath == 'charts'} title={'Charts'} to={'/charts'} />
        </div>
      </nav>
      {isSidebarOpen && (
        <>
          <button
            className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-40"
            onClick={toggleSidebar}
          ></button>
          <div className="fixed top-0 left-0 h-full w-64 bg-white shadow-lg z-50 flex flex-col justify-between">
            <div className="p-4">
              <h2 className="text-xl font-bold text-blue-600">Hello, {context.user.name}!</h2>
              <ul className="mt-4">
                <li className="py-2">
                  <a href="/settings" className="font-normal">Settings and Privacy</a>
                </li>
              </ul>
            </div>
            <a href="/logout" className="p-4 flex items-center justify-between cursor-pointer hover:bg-gray-100">
              <span className="text-red-600">Logout</span>
              <FiLogOut className="text-red-600" size={20} />
            </a>
            <button onClick={toggleSidebar} className="absolute top-4 right-4 text-xl">X</button>
          </div>
        </>
      )}
      <main className={isSidebarOpen ? 'filter blur-sm' : ''}>
        <Outlet />
      </main>
    </div>
  );
}
