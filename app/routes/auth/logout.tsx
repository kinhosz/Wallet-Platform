import { createCookie, LoaderFunction, redirect } from "@remix-run/node";

export const loader: LoaderFunction = async () => {
  const authCookie = createCookie('authToken');
  return redirect('/', {
    headers: {
      'Set-Cookie': await authCookie.serialize('', { expires: new Date(0) })
    }
  });
};

function Logout() {
  return null;
}

export default Logout;
