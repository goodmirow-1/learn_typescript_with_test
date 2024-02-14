const repeatCount = 5

export function repeat(char: string) : string{
    let res = '';

    for(var i = 0 ; i < repeatCount ; ++i){
        res += char;
    }

    return res;
}