export async function Racer(a: string, b: string): Promise<string> {
           const winner = await Promise.race([ping(a), ping(b)]);
           return winner;
}

function ping(url: string): Promise<string> {
   return new Promise(resolve => {
       fetch(url)
           .then(() => resolve(url))
           .catch(() => resolve('')); // or you can resolve with some error value
   });
}