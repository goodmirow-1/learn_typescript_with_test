export async function Racer(a: string, b: string): Promise<string> {
    const [responseA, responseB] = await Promise.all([ping(a), ping(b)]);
    return responseA ? a : b;
}

export function ping(url: string): Promise<boolean> {
    return new Promise(resolve => {
        fetch(url)
            .then(() => resolve(true))
            .catch(() => resolve(false));
    });
}