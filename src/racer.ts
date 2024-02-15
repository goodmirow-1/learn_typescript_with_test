import axios from 'axios';

const tenSecondTimeout = 10 * 1000; // 밀리초로 변환

export async function Racer(a: string, b: string): Promise<[string, Error | null]> {
    return ConfigurableRacer(a, b, tenSecondTimeout);
}

export async function ConfigurableRacer(a: string, b: string, timeout: number): Promise<[ string, Error | null]> {

    const resA = await ping(a);
    const resB = await ping(b);

    if((resA <= resB ? resA : resB) >= timeout){
        return [ "", new Error(`timed out waiting for $ ${a} and ${b}`)]
    }

    return [ resA <= resB ? a : b, null ];

}

async function ping(url: string): Promise<number> {
    const start = Date.now();
    await fetch(url);
    return Date.now() - start;
}