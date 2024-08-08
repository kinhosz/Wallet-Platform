import MainButton from "~/components/button";
import Budget from "~/components/planning/budget";
import Summary from "~/components/planning/summary";
import 'tailwindcss/tailwind.css';
import TableComponent from "~/components/planning/table";
import { useLoaderData } from "@remix-run/react";

interface Category {
  title: string;
  planned: number;
  real: number;
}

interface PeriodSummary {
  beginning: number;
  ending: number;
  startDate: string;
  endDate: string;
  expense: Category[];
  income: Category[];
}

export async function loader() {
  const period: PeriodSummary = {
    beginning: 400,
    ending: 200,
    startDate: (new Date(2024, 6, 14)).toLocaleDateString("pt-BR"),
    endDate: (new Date()).toLocaleDateString("pt-BR"),
    expense: [
      {
        title: "Alimentação",
        planned: 200,
        real: 158,
      },
      {
        title: "Saúde",
        planned: 150,
        real: 197,
      },
      {
        title: "Esporte",
        planned: 400,
        real: 400,
      }
    ],
    income: [
      {
        title: "Salário",
        planned: 500,
        real: 498,
      },
      {
        title: "pagamento",
        planned: 400,
        real: 440
      },
    ],
  }

  return period;
}

export default function Main() {
  const monthSummary = useLoaderData<typeof loader>();

  return (
    <div>
      <div className="m-4 flex flex-row justify-between">
        <Budget beginning={monthSummary.beginning} ending={monthSummary.ending} />
        <Summary beginning={monthSummary.beginning} ending={monthSummary.ending} />
        <div>
          <MainButton onClick={()=>{}}>Close the month</MainButton>
          <div className="my-4">
            <div className="text-md">Current Period</div>
            <div className="text-sm font-sans">{monthSummary.startDate} - {monthSummary.endDate}</div>
          </div>
        </div>
      </div>
      <div className="bg-green-400 flex justify-around">
        <div className="bg-white">
          <div className="flex justify-between">
            <div className="text-bold text-2xl font-bold">Expenses</div>
            <div className="border-2 border-wallet_orange rounded-full px-4 mx-2">
              <span className="text-xs font-bold text-wallet_orange">
                Add new category
              </span>
            </div>
          </div>
          <div className="flex">
            <div>div1</div>
            <div>div1</div>
            <div>div1</div>
          </div>
          <TableComponent categories={monthSummary.expense}/>
        </div>
        <div className="bg-white">
          <div className="flex justify-between">
            <div className="text-bold text-2xl font-bold">Expenses</div>
            <div className="border-2 border-wallet_orange rounded-full px-4 mx-2">
              <span className="text-xs font-bold text-wallet_orange">
                Add new category
              </span>
            </div>
          </div>
          <div className="flex">
            <div>div1</div>
            <div>div1</div>
            <div>div1</div>
          </div>
          <TableComponent categories={monthSummary.income}/>
        </div>
      </div>
    </div>
  );
}
