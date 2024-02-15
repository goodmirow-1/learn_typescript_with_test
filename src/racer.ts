export async function Racer(a: string, b: string): Promise<string> {
       const startA = Date.now();
       await fetch(a);
       const aDuration = Date.now() - startA;

       const startB = Date.now();
       await fetch(b);
       const bDuration = Date.now() - startB;

       if (aDuration < bDuration) {
           return a;
       }

       return b;
}
