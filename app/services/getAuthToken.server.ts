import { createCookie } from "@remix-run/node";

export default async function GetAuthToken(request: Request) {
    const cookieHeader = request.headers.get('Cookie');
    const authCookie = createCookie('authToken');
    const token = (await authCookie.parse(cookieHeader)) || null;
    return token;
}
