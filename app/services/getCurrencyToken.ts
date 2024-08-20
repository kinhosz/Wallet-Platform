import { createCookie } from "@remix-run/node";

export default async function getCurrencyFromCookie(request: Request) {
    const cookieHeader = request.headers.get('Cookie');
    const currencyCookie = createCookie('currency');
    const currency = (await currencyCookie.parse(cookieHeader)) || 'BRL';
    return currency;
}
