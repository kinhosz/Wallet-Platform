import React, { useState } from 'react';
import WarningField from '../components/warning';

function Login() {
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);
        const user = {
            email: formData.get('email') as string,
            password: formData.get('password') as string,
        };

        try {
            const response = await fetch('http://localhost:3001/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ user }),
            });

            if (response.ok) {
                window.location.href = '/'; 
            } else if (response.status === 401) {
                setError('Invalid email or password.');
            } else {
                setError('Failed to login. Please try again later.');
            }
        } catch (error) {
            console.error('Error:', error);
            setError('Failed to login. Please try again later.');
        }
    };

    return (
        <div className='bg-wallet_blue w-screen h-screen flex items-center justify-center font-wallet_primary'>
            <div className='flex flex-col space-y-8 md:w-[calc(100%/5)] min-w-16'>
                <h1 className='text-4xl font-bold text-white text-center'>Login</h1>
                <form onSubmit={handleSubmit} className='flex flex-col space-y-4'>
                    <input name="email" type="email" placeholder="Email" className='rounded-xl text-sm p-2 w-full placeholder-text-base'/>
                    <input name="password" type="password" placeholder="Password" className='rounded-xl text-sm p-2 w-full placeholder-text-base'/>
                    <WarningField condition={!!error} message={error || ''} />
                    <div className='flex justify-center'>
                        <button type="submit" className='bg-wallet_orange rounded-xl text-bold text-sm text-white py-2 px-8'>
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;
