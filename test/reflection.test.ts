import {walk} from "../src/reflection";


test('test reflection', () => {
    const expected:string = 'Chris';
    const got : string[] = [];

    const x = {
        Name: expected
    }

    walk(x, (input: string) => {
        got.push(input);
    })

    expect(got.length).toBe(1);
})