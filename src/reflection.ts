
export function walk(x: { [key: string]: any }, callback: (input: string) => void) {
    const keys = Object.keys(x);

    for(let i = 0 ; i < keys.length ; ++i){
        callback(x[keys[i]]);
    }
}