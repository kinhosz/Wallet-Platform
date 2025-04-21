import 'tailwindcss/tailwind.css';
import { Link, useLoaderData } from "@remix-run/react";
import Carousel from "~/components/carousel";
import { ActionFunctionArgs, LoaderFunction, redirect } from "@remix-run/node";
import GetAuthToken from "~/services/getAuthToken.server";
import getCurrencyFromCookie from "~/services/getCurrencyToken";
import getCategories from "~/services/categories/getCategories.server";
import { Category } from "~/types/category";
import UpsertCategory from "~/services/categories/upsert.server";
import UpsertPlanningLine, { UpsertPlanningLineRequest } from "~/services/plannings/upsert.server";
import GetPlanning from "~/services/plannings/getPlanning.server";
import PlanningCard from "@/components/Planning/PlanningCard";
import Budget from "~/components/Planning/budget";
import Summary from "~/components/Planning/summary";
import { useState } from "react";
import { useNavigate } from "@remix-run/react";
import { MdMenu } from 'react-icons/md';

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
  return redirect('/plannings');
};

export const loader: LoaderFunction = async ({ request, params }) => {
  const token = await GetAuthToken(request);
  if (!token) return redirect('/login');
  const currency = await getCurrencyFromCookie(request);
  const categories = getCategories(token);
  const planning = GetPlanning(token, params.uuid!, currency);

  return {
    allCategories: await categories,
    planning:  await planning,
  }
}

export default function Main() {
  const { allCategories, planning } = useLoaderData<typeof loader>();
  const [showOptions, setShowOptions] = useState(false);
  const Navigate = useNavigate();

  return (
    <div>
      <div className="my-4 flex flex-col md:flex-row-reverse md:justify-between md:items-start">
        <div className="flex justify-between flex-row-reverse md:flex-col mx-2 relative">
          <button onClick={() => setShowOptions(!showOptions)}>
          <div className="flex items-center justify-between gap-2 border border-gray-500 rounded-md px-3 py-2 bg-gray-300 hover:bg-gray-400">
          <span className="hidden md:inline text-md font-semibold">Options</span>
            <MdMenu size={20} className='' />
          </div>
        </button>

        {showOptions && (
          <div className="absolute right-0 top-full mt-1 text-xs flex flex-col bg-white shadow-md rounded-md overflow-hidden">
            <Link to={"/plannings"} className="border border-gray-500 bg-gray-300 rounded-md text-left px-3 py-2 hover:bg-gray-400 text-rd-600">
              See All Plannings
            </Link>
            <Link to={"/plannings"} className="border border-gray-500 bg-red-300 rounded-md text-left px-3 py-2 hover:bg-red-400 text-rd-600">
              End Planning
            </Link>
          </div>
        )}
        <div className={`mx-2 ${showOptions ? 'md:hidden' : ''}`}>
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
        <div className="w-screen shrink-0 flex justify-center">
          <PlanningCard lines={planning.expense} allCategories={allCategories} planningUuid={planning.uuid} />
        </div>
        <div className="w-screen shrink-0 flex justify-center">
          <PlanningCard lines={planning.income} allCategories={allCategories} planningUuid={planning.uuid} />
        </div>
      </Carousel>
      <div className="hidden xl:flex xl:justify-around">
        <PlanningCard lines={planning.expense} allCategories={allCategories} planningUuid={planning.uuid} />
        <PlanningCard lines={planning.income} allCategories={allCategories} planningUuid={planning.uuid} />
      </div>
  </div>
  );
}
