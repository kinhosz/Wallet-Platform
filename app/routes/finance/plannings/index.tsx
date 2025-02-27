import { LoaderFunction, redirect } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import PlanningBox from "~/components/Planning/PlanningBox";
import GetAuthToken from "~/services/getAuthToken.server";
import getCurrencyFromCookie from "~/services/getCurrencyToken";
import GetPlannings from "~/services/plannings/getPlannings.server";
import { Planning } from "~/types/planning";

export const loader: LoaderFunction = async ({ request }) => {
    const token = await GetAuthToken(request);
    if (!token) return redirect('/login');
    const currency = await getCurrencyFromCookie(request);
    const plannings = GetPlannings(token, currency);
    return plannings;
}

export default function Main() {
    const plannings = useLoaderData<typeof loader>();

    return (
        <div className="flex justify-center flex-col">
            <div className="flex-col">
                <p className="text-lg text-center">Plannings</p>
                <p className="text-base italic font-normal text-center">Select a Planning to see more details</p>
            </div>
            <div>
                { plannings.map((planning: Planning, uuid: string) => (
                    <div className="flex justify-center"> 
                        <PlanningBox 
                            key={uuid} 
                            uuid={planning.uuid} 
                            startDate={planning.startDate}
                            endDate={planning.endDate}
                            final_balance={planning.final_balance}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}