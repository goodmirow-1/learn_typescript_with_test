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

    expect(got[0]).toBe(expected);
})

interface struct {
    Name: string;
    Input: { [key: string]: any};
    ExpectedCalls: string[];
}

const cases: struct[] = [
    {
        Name: "Struct with one string field",
        Input: { Name: "Chris" },
        ExpectedCalls: ["Chris"],
    },
    {
        Name: "Struct with two string field",
        Input: { Name: "Chris", City: "London" },
        ExpectedCalls: ["Chris", "London"],
    }
];

describe('test walk', () => {
    cases.forEach( struct => {
        test(`Test case: ${struct.Name}`, () => {
            let got: string[] = [];
            walk(struct.Input, (input: string) => {
                got.push(input);
            });
            expect(got).toEqual(struct.ExpectedCalls);
        });
    });
})