import { redirect, LoaderFunction } from '@remix-run/node';
import { Links, Meta, Outlet, Scripts, ScrollRestoration } from '@remix-run/react';
import styles from './tailwind.css?url';
import GetAuthToken from './services/getAuthToken.server';

export const links = () => [
  { rel: 'stylesheet', href: styles },
];

export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);
  const token = await GetAuthToken(request);

  // Allows authentication-free access to /login and /signup
  if (!token && ['/login', '/signup'].includes(url.pathname)) {
    return null;
  }

  // Redirects to /overview if user is authenticated and tries to access /login or /signup
  if (token && ['/login', '/signup'].includes(url.pathname)) {
    return redirect('/overview');
  }

  // Redirects to /login if the user is not authenticated and tries to access any other page
  if (!token && !['/login', '/signup'].includes(url.pathname)) {
    return redirect('/login');
  }

  return null;
};

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Wallet Platform</title>
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}
