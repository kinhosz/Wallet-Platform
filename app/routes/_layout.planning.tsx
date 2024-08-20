import MainButton from "~/components/mainButton";
import Budget from "~/components/planning/budget";
import Summary from "~/components/planning/summary";
import 'tailwindcss/tailwind.css';
import TableComponent from "~/components/planning/table";
import { useLoaderData } from "@remix-run/react";
import Carousel from "~/components/carousel";
import GetMonthSummary from "~/services/getMonthSummary.server";
import { LoaderFunction, redirect } from "@remix-run/node";
import GetAuthToken from "~/services/getAuthToken.server";
import getCurrencyFromCookie from "~/services/getCurrencyToken";

export const loader: LoaderFunction = async ({ request }) => {
  const token = await GetAuthToken(request);
  const currency = await getCurrencyFromCookie(request);
  if (!token) return redirect('/login');

  return await GetMonthSummary(token, currency);
}

export default function Main() {
  const monthSummary = useLoaderData<typeof loader>();

  return (
    <div>
      <div className="my-4 flex flex-col md:flex-row-reverse md:justify-between md:items-start">
        <div className="flex justify-between flex-row-reverse md:flex-col mx-2">
          <MainButton onClick={()=>{}}>Close month</MainButton>
          <div className="mx-2">
            <div className="text-md whitespace-nowrap">Current Period</div>
            <div className="text-sm font-sans">{monthSummary.startDate}</div>
            <div className="text-sm font-sans">{monthSummary.endDate}</div>
          </div>
        </div>
        <div className="my-4 md:hidden">
          <Carousel>
            <Budget initial_balance={monthSummary.initial_balance} final_balance={monthSummary.final_balance} />
            <Summary initial_balance={monthSummary.initial_balance} final_balance={monthSummary.final_balance} />
          </Carousel>
        </div>
        <div className="my-4 hidden md:block w-full">
          <div className="flex justify-around">
            <Budget initial_balance={monthSummary.initial_balance} final_balance={monthSummary.final_balance} />
            <Summary initial_balance={monthSummary.initial_balance} final_balance={monthSummary.final_balance} />
          </div>
        </div>
      </div>
      <Carousel className="xl:hidden">
        <TableComponent categories={monthSummary.expense}/>
        <TableComponent categories={monthSummary.income} isIncome={true}/>
      </Carousel>
      <div className="hidden xl:flex">
        <TableComponent categories={monthSummary.expense}/>
        <TableComponent categories={monthSummary.income} isIncome={true}/>
      </div>
      <div>
    </div>
  </div>
  );
}
