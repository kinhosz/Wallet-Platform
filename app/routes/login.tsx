import { ActionFunctionArgs, json, redirect } from '@remix-run/node';
import { useActionData, Form } from '@remix-run/react';
import WarningField from '../components/warning';

export const action = async ({ 
    request 
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
            const token = response.headers.get('Authorization');
            if (token) {
                return redirect('/', {
                    headers: {
                        'Set-Cookie': `token=${token}; Path=/; HttpOnly`,
                    },
                });
            } else {
                return json({ error: 'Failed to retrieve token.' }, { status: 401 });
            }
        } else {
            const errorMessage = response.status === 401 ? 'Invalid Email Or Password' : 'Unknow Error';

            return json({ error: errorMessage }, { status: response.status });
        }
    } catch (error) {
        return json({ error: 'An unexpected error occurred. Please try again later.' }, { status: 500 });
    }
};

function Login() {
    const actionData = useActionData<typeof action>();

    return (
        <div className='bg-wallet_blue w-screen h-screen flex items-center justify-center font-wallet_primary'>
            <div className='flex flex-col space-y-8 md:w-[calc(100%/5)] min-w-16'>
                <h1 className='text-4xl font-bold text-white text-center'>Login</h1>
                <Form method="post" className='flex flex-col space-y-4'>
                    <input name="email" type="email" placeholder="Email" className='rounded-xl text-sm p-2 w-full placeholder-text-base' />
                    <input name="password" type="password" placeholder="Password" className='rounded-xl text-sm p-2 w-full placeholder-text-base' />
                    <WarningField condition={!!actionData?.error} message={actionData?.error || ''} />
                    <div className='flex justify-center'>
                        <button type="submit" className='bg-wallet_orange rounded-xl text-bold text-sm text-white py-2 px-8'>
                            Submit
                        </button>
                    </div>
                </Form>
            </div>
        </div>
    );
}

export default Login;
