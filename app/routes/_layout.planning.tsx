import MainButton from "~/components/mainButton";
import Budget from "~/components/planning/budget";
import Summary from "~/components/planning/summary";
import 'tailwindcss/tailwind.css';
import TableComponent from "~/components/planning/table";
import { useLoaderData } from "@remix-run/react";
import Carousel from "~/components/carousel";
import { ActionFunctionArgs, LoaderFunction, redirect } from "@remix-run/node";
import GetAuthToken from "~/services/getAuthToken.server";
import getCurrencyFromCookie from "~/services/getCurrencyToken";
import getCategories from "~/services/categories/getCategories.server";
import { Category } from "~/types/category";
import UpsertCategory from "~/services/categories/upsert.server";
import UpsertPlanningLine, { UpsertPlanningLineRequest } from "~/services/plannings/upsert.server";
import GetPlanning from "~/services/plannings/getPlanning.server";

export const action = async ({ request }: ActionFunctionArgs) => {
  const token = await GetAuthToken(request);
  if (!token) return redirect('/login');

  const formData = await request.formData();

  const planning_uuid = String(formData.get('planning'));

  const category: Category = {
    name: String(formData.get('name')),
    description: String(formData.get('description')),
    icon: Number(formData.get('icon')),
    uuid: formData.get('uuid') ? String(formData.get('uuid')) : undefined,
  }

  if (!category.uuid) category.uuid = (await UpsertCategory(token, category)).uuid;
  else UpsertCategory(token, category);

  const line: UpsertPlanningLineRequest = {
    category: category.uuid!,
    value: Number(formData.get('planned')),
  }

  await UpsertPlanningLine(token, planning_uuid, line);
  return redirect('/planning');
};

export const loader: LoaderFunction = async ({ request }) => {
  const token = await GetAuthToken(request);
  if (!token) return redirect('/login');
  const currency = await getCurrencyFromCookie(request);

  const categories = getCategories(token);
  const planning = GetPlanning(token, currency);

  return {
    allCategories: await categories,
    planning:  await planning,
  }
}

export default function Main() {
  const { allCategories, planning } = useLoaderData<typeof loader>();

  return (
    <div>
      <div className="my-4 flex flex-col md:flex-row-reverse md:justify-between md:items-start">
        <div className="flex justify-between flex-row-reverse md:flex-col mx-2">
          <MainButton onClick={()=>{}}>Close month</MainButton>
          <div className="mx-2">
            <div className="text-md whitespace-nowrap">Current Period</div>
            <div className="text-sm font-sans">{planning.startDate}</div>
            <div className="text-sm font-sans">{planning.endDate}</div>
          </div>
        </div>
        <div className="my-4 md:hidden">
          <Carousel>
            <Budget initial_balance={planning.initial_balance} final_balance={planning.final_balance} />
            <Summary initial_balance={planning.initial_balance} final_balance={planning.final_balance} />
          </Carousel>
        </div>
        <div className="my-4 hidden md:block w-full">
          <div className="flex justify-around">
            <Budget initial_balance={planning.initial_balance} final_balance={planning.final_balance} />
            <Summary initial_balance={planning.initial_balance} final_balance={planning.final_balance} />
          </div>
        </div>
      </div>
      <Carousel className="xl:hidden">
        <TableComponent planningLines={planning.expense} allCategories={allCategories} planningUuid={planning.uuid}/>
        <TableComponent planningLines={planning.income} isIncome={true} allCategories={allCategories} planningUuid={planning.uuid}/>
      </Carousel>
      <div className="hidden xl:flex">
        <TableComponent planningLines={planning.expense} allCategories={allCategories} planningUuid={planning.uuid}/>
        <TableComponent planningLines={planning.income} isIncome={true} allCategories={allCategories} planningUuid={planning.uuid}/>
      </div>
      <div>
    </div>
  </div>
  );
}
