import { redirect, ActionFunctionArgs } from "@remix-run/node";
import Base from "../services/base.server";
import GetAuthToken from "~/services/getAuthToken.server";
import { Outlet, useLoaderData, useLocation } from "@remix-run/react";
import { Context } from "~/types/context";
import TabSheet from "~/components/tabsheet";
import { BR } from "country-flag-icons/react/3x2";
import { MdChevronRight } from "react-icons/md";
import { useEffect, useState } from "react";
import { FiUser } from "react-icons/fi";
import Sidebar from "../components/sidebar";

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
      <Sidebar
        isOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
        userName={context.user.name}
      />
      <main className={isSidebarOpen ? 'filter blur-sm' : ''}>
        <Outlet />
      </main>
    </div>
  );
}
