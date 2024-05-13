import { useFetcher } from '@remix-run/react';
import { ActionFunctionArgs, json, redirect } from '@remix-run/node';

export const action = async ({
    request,
}: ActionFunctionArgs) => {
    const formData = await request.formData();
    const user = Object.fromEntries(formData);

    try {
        const response = await fetch('http://localhost:3001/signup', {
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
        <div>
            <h1>Signup</h1>
            <fetcher.Form method="post" action="/signup">
                <input name="email" type="email" placeholder="Email" />
                <input name="password" type="password" placeholder="Password" />
                <button type="submit">Submit</button>
            </fetcher.Form>
        </div>
    );
}

export default Signup;
