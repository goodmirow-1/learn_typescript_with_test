
export function walk(x: { [key: string]: any }, callback: (input: string) => void) {
    const keys = Object.keys(x);
    if(keys.length > 0){
        const firstKey = keys[0];
        const firstValue = x[firstKey];
        if (typeof firstValue === 'string') {
            callback(firstValue);
        }
    }
}