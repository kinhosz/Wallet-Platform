export default async function Base(
    url: string,
    method: string,
    headers: Record<string, string>,
    body?: string,
) {
    const base_url = 'http://localhost:3001/';
    try {
        const response = await fetch(base_url + url, {
            method: method,
            headers: headers,
            body: body !== undefined ? body : undefined,
        });

        return response;
    } catch(error) {
        return null;
    }
}
