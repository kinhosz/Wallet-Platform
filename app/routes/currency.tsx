import { ActionFunctionArgs, createCookie, LoaderFunction, redirect } from "@remix-run/node";

export const action = async ({ request }: ActionFunctionArgs) => {
    const formData = await request.formData();
    const currency = formData.get('currency');

    const currencyCookie = createCookie('currency', {
        httpOnly: true,
        secure: true,
        sameSite: 'lax',
        path: '/',
    });

    return redirect('/', {
        headers: {
        'Set-Cookie': await currencyCookie.serialize(currency),
        },
    });
};

export const loader: LoaderFunction = async () => {
    return redirect('/');
};

function Logout() {
    return null;
}

export default Logout;
