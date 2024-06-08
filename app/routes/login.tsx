import { useFetcher } from '@remix-run/react';
import { ActionFunctionArgs, json, redirect } from '@remix-run/node';

export const action = async ({
    request,
}: ActionFunctionArgs) => {
    const formData = await request.formData();
    const user = Object.fromEntries(formData);

    try {
        const response = await fetch('http://localhost:3001/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ user: user }),
        });

        if (response.ok) {
            return redirect('/');
        } else {
            return json({}, { status: response.status });
        }
    } catch(error) {
        return redirect('/error');
    }
}

function Signup() {
    const fetcher = useFetcher();

    return (
        <div className='bg-wallet_blue w-screen h-screen flex items-center justify-center font-wallet_primary'>
            <div className='flex flex-col space-y-8 md:w-[calc(100%/5)] min-w-16'>
                <h1 className='text-4xl font-bold text-white text-center'>Login</h1>
                <fetcher.Form method="post" action="/signup" className='flex flex-col space-y-4'>
                    <input name="email" type="email" placeholder="Email" className='rounded-xl text-sm p-2 w-full placeholder-text-base'/>
                    <input name="password" type="password" placeholder="Password" className='rounded-xl text-sm p-2 w-full placeholder-text-base'/>
                    <div className='flex justify-center'>
                        <button type="submit" className='bg-wallet_orange rounded-xl text-bold text-sm text-white py-2 px-8'>
                            Submit
                        </button>
                    </div>
                </fetcher.Form>
            </div>
        </div>
    );
}

export default Signup;
