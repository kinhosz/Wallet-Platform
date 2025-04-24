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
  const [showEndPlanningForm, setShowEndPlanningForm] = useState(false);
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
            <button onClick={() => setShowEndPlanningForm(true)} className="border border-gray-500 bg-red-300 rounded-md text-left px-3 py-2 hover:bg-red-400 text-rd-600">
              End Planning
            </button>
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
      {showEndPlanningForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center z-50">
          <div className="bg-white p-6 round-lg shadow-lg w-11/12 max-w-md relative">
            <button className="absolute top-2 right-2 text-gray-500 hover:text-black" onClick={() => setShowEndPlanningForm(false)}>
              X
            </button>
            <h2 className="text-x1 text-orange-600 font-bold mb-4">Are you sure you want ciose this planning?</h2>
            <h3 className='italic text-sm text-gray-500'>This action cannot be undone</h3>
              <div className="mb-4">
              </div>
              <div className="flex gap-4">
                <button type='submit' className="w-1/2 bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded">
                  Cancel
                </button>
                <button type='submit' className="w-1/2 bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded">
                  End planning
                </button>
              </div>
          </div>
        </div>
      )}
  </div>
  );
}
