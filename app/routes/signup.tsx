import { useActionData, Form } from '@remix-run/react';
import { ActionFunctionArgs, json, redirect } from '@remix-run/node';
import React, { useState } from 'react';
import WarningField from '../components/warning';

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
            const data = await response.json();
            const errorMessage = data.status ? data.status.message : 'Unknown error';
            return json({ error: errorMessage });
        }
    } catch(error) {
        return redirect('/error');
    }
}

function Signup() {
    const data = useActionData<typeof action>();

    const [isEmailOnFocus, setIsEmailOnFocus] = useState(false);
    const [isValidEmail, setIsValidEmail] = useState(false);
    const [isPasswordOnFocus, setIsPasswordOnFocus] = useState(false);
    const [atLeast6Characters, setAtLeast6Characters] = useState(false);
    const [isNameOnFocus, setIsNameOnFocus] = useState(false);
    const [isValidName, setIsValidName] = useState(false);

    const validateEmail = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    const handleEmailChange = (email: string) => {
        setIsValidEmail(validateEmail(email));
    };
    const handlePasswordChange = (password: string) => {
        setAtLeast6Characters(password.length >= 6);
    };
    const handleNameChange = (name: string) => {
        setIsValidName(name.length != 0);
    }

    return (
        <div className='bg-wallet_blue w-screen h-screen flex items-center justify-center font-wallet_primary'>
            <div className='flex flex-col space-y-8 md:w-[calc(100%/5)] min-w-16'>
                <h1 className='text-4xl font-bold text-white text-center'>Signup</h1>
                <Form method="post" action="/signup" className='flex flex-col space-y-4'>
                    <input
                        className={`rounded-xl text-sm p-2 w-full placeholder-text-base ${
                                !isValidName ? 'focus:border-wallet_red focus:border-2 focus:outline-none' : ''
                            }
                        `}
                        name="name" type="text" placeholder="Name" onChange={(e) => handleNameChange(e.target.value)}
                        onFocus={() => setIsNameOnFocus(true)} onBlur={() => setIsNameOnFocus(false)}
                    />
                    <WarningField
                        condition={!isValidName && isNameOnFocus}
                        message="Empty name"
                    />
                    <input
                        className={`rounded-xl text-sm p-2 w-full placeholder-text-base ${
                                !isValidEmail ? 'focus:border-wallet_red focus:border-2 focus:outline-none' : ''
                            }
                        `}
                        name="email" type="email" placeholder="Email" onChange={(e) => handleEmailChange(e.target.value)}
                        onFocus={() => setIsEmailOnFocus(true)} onBlur={() => setIsEmailOnFocus(false)}
                    />
                    <WarningField
                        condition={!isValidEmail && isEmailOnFocus}
                        message="Invalid email"
                    />
                    <input
                        className={`rounded-xl text-sm p-2 w-full placeholder-text-base ${
                                !atLeast6Characters ? 'focus:border-wallet_red focus:border-2 focus:outline-none' : ''
                            }
                        `}
                        name="password" type="password" placeholder="Password" onChange={(e) => handlePasswordChange(e.target.value)}
                        onFocus={() => setIsPasswordOnFocus(true)} onBlur={() => setIsPasswordOnFocus(false)}
                    />
                    <WarningField
                        condition={!atLeast6Characters && isPasswordOnFocus}
                        message="Minimum is 6 characters"
                    />
                    { data && data.error && (
                        <div className="p-2 text-sm text-red-700 bg-red-100 rounded-lg" role="alert">
                            <span>{data.error}</span>
                        </div>
                    )}
                    <div className='flex justify-center'>
                        <button 
                            className={`bg-wallet_orange rounded-xl text-bold text-sm text-white py-2 px-8 button
                                        hover:bg-wallet_orange_dark active:bg-wallet_orange_light focus:ring-2 
                                        focus:ring-wallet_orange focus:ring-opacity-50 transition duration-150 ease-in-out ${
                                    !(isValidEmail && atLeast6Characters && isValidName) ? 'button-disabled' : ''
                                }
                            `}
                            type="submit" disabled={!isValidEmail}
                        >
                            Submit
                        </button>
                    </div>
                </Form>
            </div>
        </div>
    );
}

export default Signup;
