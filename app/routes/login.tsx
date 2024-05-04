import React from 'react';

function LoginPage() {
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const email = formData.get('email') as string;
        const password = formData.get('password') as string;

        try {
            const response = await fetch('http://localhost:3001/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ user: { email, password } }),
            });

            console.log("body", JSON.stringify({ user: { email, password } }));

            if (response.ok) {
                console.log('ok');
            }
            else {
                const responseData = await response.json();
                console.log('erro de autenticacao', responseData);
            }
        } catch (error) {
            console.error('Erro', error);
        }
    }

    return (
        <div>
            <h1>Signup</h1>
            <form onSubmit={handleSubmit}>
                <input type="email" name="email" placeholder="Email" />
                <input type="password" name="password" placeholder="Password" />
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default LoginPage;
