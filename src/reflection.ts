
export function walk(x: { [key: string]: any }, callback: (input: string) => void) {
    const val = getValue(x);

    let numberOfValues = 0;
    let getField: ((index: number) => any) | null = null;

    switch (typeof val) {
        case 'object':
            if (Array.isArray(val)){
                numberOfValues = val.length;
                getField = (index) => val[index];
            }else{
                numberOfValues = Object.keys(val).length;
                getField = (index) => Object.values(val)[index];
            }

            for(let i = 0 ; i < numberOfValues ; ++i){
                walk(getField(i), callback);
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