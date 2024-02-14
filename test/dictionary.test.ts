import {Search, MyDictionary, IDictionary, ErrNotFound, ErrWordExists, ErrWordDoesNotExist} from "../src/dictionary";

describe("testSearch flow", () => {

    const myDict: IDictionary = {
        "test" : "this is just a test"
    }

    let dictionary : MyDictionary = new MyDictionary(myDict);
    function assertStrings(got:string|undefined, want:string){

        expect(got).toBe(want)
    }

    function assertError(got:Error|null, want:Error|null){
        expect(got).toBe(want)
    }

    function assertDefinition(pDictionary:MyDictionary, word:string,definition:string){
        const  [got,error] = pDictionary.Search("test")

        if(error != null){
            console.log(`should find added word: ${error}`)
        }

        expect(definition).toBe(got)
    }

    test("testSearch", () => {
        let dictionary = new Map([["test", "this is just a test"]]);

        const got = Search(dictionary, "test")
        const want = "this is just a test"

        assertStrings(got,want)
    })

    test("unknown word", () => {
        const  [got,error] = dictionary.Search("test")
        const want = "this is just a test"

        if(error != null){
            console.log(`should find added word: ${error}`)
        }

        expect(got).toBe(want)
    })

    test("test add", () => {
        const tempDictionary = new MyDictionary({})
        const word = "test"
        const definition = "this is just a test"

        const error = tempDictionary.Add(word, definition)

        assertError(error,null)
        assertDefinition(tempDictionary, word, definition)
    })

    test("existing word", () => {
        const word = "test"
        const definition = "this is just a test"
        const tempDictionary = new MyDictionary({})
        tempDictionary.Add(word, definition)
        const error = tempDictionary.Add(word, "new test")

        assertError(error,ErrWordExists)
        assertDefinition(tempDictionary, word, definition)
    })

    test("test update", () => {
        const word = "test"
        const definition = "this is just a test"
        const tempDictionary = new MyDictionary({})
        tempDictionary.Add(word, definition)
        const newDefinition = "new definition"

        const error = tempDictionary.Update(word, newDefinition)

        assertError(error,null)
        assertDefinition(tempDictionary, word, newDefinition)
    })

    test("new word", () => {
        const word = "test"
        const definition = "this is just a test"
        const tempDictionary = new MyDictionary({})

        const error = tempDictionary.Update(word, definition)

        assertError(error,ErrWordDoesNotExist)
    })

    test("test delete", () => {
        const word = "test"
        const definition = "this is just a test"
        const tempDictionary = new MyDictionary({})
        tempDictionary.Add(word, definition)

        tempDictionary.Delete(word)

        const [got, error] = tempDictionary.Search(word)
        expect(error).toBe(ErrNotFound)
    })
})
