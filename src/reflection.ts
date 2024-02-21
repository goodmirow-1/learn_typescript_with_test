
export async function walk(x: { [key: string]: any }, callback: (input: string) => void) {
    const val = await getValue(x);

    let numberOfValues = 0;
    let getField: ((index: number) => any) | null = null;

    switch (typeof val) {
        case 'object':
            if (Array.isArray(val)){
                numberOfValues = val.length;
                getField = (index) => val[index];
            }
            else{
                numberOfValues = Object.keys(val).length;
                getField = (index) => Object.values(val)[index];
            }

            for(let i = 0 ; i < numberOfValues ; ++i){
                await walk(getField(i), callback);
            }

            break;
        case 'string':
            callback(val);
            break;
    }
}

async function getValue(x: { [key: string]: any}) : Promise<any> {
    if(x instanceof Promise){
        return x.then((resolvedValue) => {
            return resolvedValue;
        }).catch((error) => {
            console.error("Error occurred while resolving Promise:", error);
            throw error;
        });
    }

    if (typeof x === 'object' && x !== null && !Array.isArray(x)) {
        return Object.values(x);
    } else {
        return x;
    }
}