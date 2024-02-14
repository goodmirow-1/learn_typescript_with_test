export interface IDictionary{
    [key:string] : string;
}

class DictionaryErr extends  Error{
    constructor(message: string) {
        super(message);
        this.name = 'DictionaryError'
    }
}
export const ErrNotFound = new DictionaryErr("could not find the word you were looking for")
export const ErrWordExists = new DictionaryErr("cannot add word because it already exists")
export const  ErrWordDoesNotExist = new DictionaryErr("cannot update word because it does not exist")
// @ts-ignore
export class MyDictionary implements IDictionary{
    data: IDictionary;

    constructor(data: IDictionary) {
        this.data = data;
    }

    Search(word:string): [string, Error | null]{
        const def = this.data[word];

        if(def === undefined) {
            return ["", ErrNotFound]
        }

        return [def, null];
    }

    Add(word:string, definition:string){
        const [got, error] = this.Search(word)

        switch(error){
            case ErrNotFound:
            {
                this.data[word] = definition;
                break;
            }
            case null: return ErrWordExists
            default: return error
        }

        return null
    }

    Update(word:string, definition:string){
        const [got, error] = this.Search(word)

        switch(error){
            case ErrNotFound: return ErrWordDoesNotExist
            case null:
            {
                this.data[word] = definition;
                break;
            }
            default: return error
        }

        return null
    }

    Delete(word:string){
        delete this.data[word]
    }
}
export function Search(dictionary:Map<string,string>, word:string) : string|undefined {
    return dictionary.get(word)
}