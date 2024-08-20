import { ActionFunctionArgs, createCookie, json, LoaderFunction, redirect } from '@remix-run/node';
import { useActionData, Form, useNavigate } from '@remix-run/react';
import WarningField from '../components/warning';
import ApiRequest from '../services/apiRequest.server';
import GetAuthToken from '~/services/getAuthToken.server';

export const loader: LoaderFunction = async ({ request }) => {
    const token = await GetAuthToken(request);
    if (token) {
      return redirect('/overview');
    }
    return null;
};

export const action = async ({ request }: ActionFunctionArgs) => {
    const formData = await request.formData();
    const user = Object.fromEntries(formData);

    const response = await ApiRequest(
        'login',
        'POST',
        { 'Content-Type': 'application/json' },
        JSON.stringify({ user: user }),
    );
    if (!response) return redirect('/error');

    if (response.ok) {
        const token = response.headers.get('Authorization');
        if (!token) {
            return json({ error: 'Failed to retrieve token.' }, { status: 401 });
        }

        const authCookie = createCookie("authToken", {
            httpOnly: true,
            secure: true,
            sameSite: 'lax',
            path: '/',
        });

        return redirect('/overview', {
            headers: {
                'Set-Cookie': await authCookie.serialize(token),
            },
        });
    } else {
        const errorMessage = response.status === 401 ? 'Invalid email or password.' : 'Unknown error occurred.';

        return json({ error: errorMessage }, { status: response.status });
    }
};

function Login() {
    const actionData = useActionData<typeof action>();
    const navigate = useNavigate();

    const handleSignUpClick = () => {
        navigate('/signup');
    };

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
                    <div className='flex justify-center'>
                        <p className='text-white text-sm'>
                            Don&apos;t have an account? Click{' '}
                            <button onClick={handleSignUpClick} className='font-bold underline text-wallet_orange cursor-pointer'>
                                here
                            </button>
                        </p>
                    </div>
                </Form>
            </div>
        </div>
    );
}

export default Login;
