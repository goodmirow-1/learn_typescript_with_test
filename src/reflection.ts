
export function walk(x: { [key: string]: any }, callback: (input: string) => void) {
    if (Array.isArray(x)) {
        x.forEach((item: any) => {
            walk(item, callback);
        });
        return;
    }

    const keys = Object.keys(x);

    for(let i = 0 ; i < keys.length ; ++i){
        const value = x[keys[i]];

        switch(typeof value){
            case 'string': callback(value); break;
            case 'object': walk(value, callback); break;
            default: break;
        }
    }
}