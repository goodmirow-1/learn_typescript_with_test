
export function walk(x: { [key: string]: any }, callback: (input: string) => void) {
    const val = getValue(x);

    switch (typeof val) {
        case 'object':
            if (Array.isArray(val)){ val.forEach((item: any) => walk(item, callback)); break;}

            for (const key in val) {
                if (val.hasOwnProperty(key)) {
                    walk(val[key], callback);
                }
            }

            break;
        case 'string':
            callback(val);
            break;
    }
}

function getValue(x: { [key: string]: any}) : any {
    if (typeof x === 'object' && x !== null && !Array.isArray(x)) {
        return Object.values(x);
    } else {
        return x;
    }
}