import { LoaderFunction } from "@remix-run/node";
import { Form, Link, useLoaderData, useActionData, useFetcher } from "@remix-run/react";
import { useEffect, useRef, useState } from "react";
import { FaTrashAlt } from "react-icons/fa";
import { FiEdit } from "react-icons/fi";
import { GoEyeClosed } from "react-icons/go";
import { ActionFunctionArgs, redirect } from "react-router";
import CategoriesSearch from "~/components/category/categoriesSearch";
import { CategoryIcon } from "~/components/CategoryIcon";
import { Monetary, MonetaryInput } from "~/components/Monetary";
import GetAuthToken from "~/services/getAuthToken.server";
import getCurrencyFromCookie from "~/services/getCurrencyToken";
import GetPlanning from "~/services/plannings/getPlanning.server";
import GetTransaction from "~/services/transactions/getTransaction.server";
import UpdateTransaction from "~/services/transactions/updateTransaction.server";
import { PlanningLine } from "~/types/planning_line";

export const action = async ({ request, params }: ActionFunctionArgs) => {
  const token = await GetAuthToken(request);
  if (!token) return redirect('/login');
  const currency = await getCurrencyFromCookie(request);
  const formData = await request.formData();

  const notification = await UpdateTransaction(
    token,
    params.uuid!,
    currency,
    String(formData.get('date')),
    Number(formData.get('amount')),
    String(formData.get('category')),
    String(formData.get('description'))
  );

  return { notification };
}

export const loader: LoaderFunction = async ({ request, params }) => {
  const token = await GetAuthToken(request);
  if (!token) return redirect('/login');
  const transaction = await GetTransaction(token, params.uuid!);
  const planning = await GetPlanning(token, 'current', transaction.currency);

  return { transaction, planning };
}

export default function Transaction() {
  const { transaction, planning } = useLoaderData<typeof loader>();
  const actionData = useActionData<typeof action>();
  const fetcher = useFetcher();

  const categories = [...planning.expense, ...planning.income].map(
    (line: PlanningLine) => line.category
  );
  const originalCategory = categories.find((c) => c.name === transaction.category)!;
  const [category, setCategory] = useState(originalCategory);

  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);

  const [date, setDate] = useState(transaction.date.toISOString().split("T")[0]);
  const [showCategorySelection, setShowCategorySelection] = useState(false);
  const [footerState, setFooterState] = useState<'options' | 'deleting' | 'editing' | 'blocked'>(
    (new Date(planning.startDate) > transaction.date ? 'blocked' : 'options')
  );
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      const timeout = setTimeout(() => {
        setVisible(true);
      }, 10);
      return () => clearTimeout(timeout);
    }
  }, [mounted]);
  if (!mounted) return null;

  const today = new Date();

  const handleCategorySelectionFocus = () => {
    if (footerState != 'editing') return null;
    setShowCategorySelection(true);
  }

  const handleCategorySelectionBlur = () => {
    setTimeout(() => {
      setShowCategorySelection(false);
    }, 150);
  }

  const handleDatePicker = (value: string) => {
    setDate(value);
  }

  const handleCategorySelection = (name: string) => {
    setCategory(categories.find((c) => c.name === name)!);
  }

  const handleCancelDeleting = () => {
    setFooterState('options');
  }

  const handleCancelEditing = () => {
    formRef.current?.reset();
    setFooterState('options');
    setCategory(originalCategory);
    setDate(transaction.date.toISOString().split("T")[0]);
  }

  const handleSave = () => {
    setFooterState('options');
  }

  return (
    <div
      className={`
        transition-all duration-500 ease-out transform
        ${visible ? "opacity-100 scale-100" : "opacity-0 scale-95"}
        bg-gray-100 p-4 rounded shadow lg:max-w-xl lg:mx-auto flex flex-col
      `}
    >
      <Link to={'/transactions'} className="inline-flex ml-auto p-2">
        <span className="text-xs italic underline mx-2">Hide transaction details</span>
        <GoEyeClosed size={18}/>
      </Link>
      <Form method="post" ref={formRef} onSubmit={handleSave}
        className="bg-white m-1 py-1 px-3 border border-gray-400 rounded-lg font-normal text-lg">
        <div className="flex justify-between">
          <div className="flex flex-col">
            <span className="font-medium px-1 m-1">Date</span>
            <input className="bg-gray-200 rounded-lg font-sans p-1 mx-1"
              type="date" name="date" value={date} disabled={ footerState != 'editing' }
              onChange={(e) => handleDatePicker(e.target.value)}
              min={planning.startDate}
              max={today.toISOString().split("T")[0]}/>
          </div>
          <div className="">
            <span className="font-medium  p-1 m-1">Amount</span>
            <div className="bg-gray-200 rounded-lg p-2 font-sans mt-2 text-sm">
              { footerState != 'editing' && <Monetary className="font-bold" value={transaction.amount} decorate={true} /> }
              { footerState == 'editing' && <MonetaryInput name="amount" defaultValue={transaction.amount} /> }
            </div>
          </div>
        </div>
        <div className="">
          <span className="font-medium p-1 m-1">Category</span>
          <button className="bg-gray-200 rounded-lg p-2 m-1 flex w-full"
            onFocus={handleCategorySelectionFocus} onBlur={handleCategorySelectionBlur} type="button">
            <CategoryIcon id={category.icon} size={24} />
            <span className="pl-2">{category.name}</span>
          </button>
          <input type="hidden" name="category" value={category.uuid} />
          { showCategorySelection && (
            <CategoriesSearch name={""} onSelect={handleCategorySelection} categories={categories} />
          )}
        </div>
        <div className="">
          <span className="font-medium p-1 m-1">Description</span>
          <textarea defaultValue={transaction.description} readOnly={footerState != 'editing'} name="description"
            className="bg-gray-200 rounded-lg p-2 m-1 flex break-all w-full"/>
        </div>
        { footerState == 'blocked' && (
          <span className="italic text-sm text-wallet_orange">This transaction is archived. You can&apos;t edit it.</span>
        )}
        { footerState == 'options' && (
          <div className="flex justify-between mt-4 p-4">
            <button className="border border-gray-400 shadow rounded p-1 active:shadow-inner active:bg-gray-100 hover:border-red-500"
              onClick={() => setFooterState('deleting')}>
              <FaTrashAlt size={30} className="text-red-600"/>
            </button>
            <button className="border border-gray-400 shadow rounded p-1 active:shadow-inner active:bg-gray-100 hover:border-green-500"
              onClick={() => setFooterState('editing')}>
              <FiEdit size={30} />
            </button>
          </div>
        )}
        { footerState == 'deleting' && (
          <div className="flex justify-between mt-4 p-4">
            <div>
              <p className="text-sm font-bold italic text-red-500">Are you sure you want to delete this transaction?</p>
              <p className="text-xs italic">This action cannot be undone</p>
            </div>
            <div className="flex text-xs font-bold">
              <button className="bg-green-300 hover:bg-green-200 p-2 rounded-lg border border-gray-400 mx-1
              shadow active:shadow-inner" onClick={handleCancelDeleting}>
                Cancel
              </button>
              <fetcher.Form method="post" action="/transactions/delete">
                <input type="hidden" name="uuid" value={transaction.uuid} />
                <button className="bg-red-300 hover:bg-red-200 p-2 rounded-lg border border-gray-400 mx-1 shadow
                  active:shadow-inner" type="submit">
                  Delete
                </button>
              </fetcher.Form>
            </div>
          </div>
        )}
        { footerState == 'editing' && (
          <div className="flex justify-between mt-4 p-4">
            <p className="text-sm font-bold italic text-red-500">Do you want to save the changes?</p>
            <div className="flex text-xs font-bold">
              <button className="bg-red-300 hover:bg-red-200 p-2 rounded-lg border border-gray-400 mx-1 shadow
              active:shadow-inner" onClick={handleCancelEditing}>
                Cancel
              </button>
              <button className="bg-green-300 hover:bg-green-200 p-2 rounded-lg border border-gray-400 mx-1 shadow active:shadow-inner"
                type="submit">
                Save
              </button>
            </div>
          </div>
        )}
        { !!actionData && (actionData.notification == "success" ? (
          <span className="text-green-300 italic text-sm">Saved successfully</span>
        ) : (
          <span className="text-red-300 italic text-sm">An error occurred</span>
        ))}
      </Form>
    </div>
  );
}
