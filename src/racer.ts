export async function Racer(a: string, b: string): Promise<string> {
       const aDuration = await measureResponseTime(a);
       const bDuration = await measureResponseTime(b);

       if (aDuration < bDuration) {
           return a;
       }

       return b;
}

async function measureResponseTime(url: string) : Promise<number> {
    const start = Date.now();
    await fetch(url);
    return Date.now() - start;
}