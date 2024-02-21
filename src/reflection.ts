
export function walk(x: { [key: string]: any }, callback: (input: string) => void) {
    const keys = Object.keys(x);

    for(let i = 0 ; i < keys.length ; ++i){
        if(typeof keys[i] == 'string'){
            callback(x[keys[i]]);
        }

        if(typeof keys[i] == 'object'){
            walk(x[keys[i]], callback);
        }
    }
}