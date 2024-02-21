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
    ExpectedCalls: any[];
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
    },
    {
        Name: "Struct with non string field",
        Input: { Name: "Chris", Age: 33 },
        ExpectedCalls: ["Chris"],
    },
    {
        Name: "Nested fields",
        Input: {
            Name: "Chris",
            Profile: {
                Age: 33,
                City: "London"
            }
        },
        ExpectedCalls: ["Chris","London"],
    },
    {
        Name: "slices or arrays",
        Input: [{Age : 33, City: "London"}, {Age: 34, City: "Reykjavík"}],
        ExpectedCalls: ["London", "Reykjavík"],
    },
    {
        Name: "Maps",
        Input: {
            Foo: "Bar",
            Baz: "Boz",
        },
        ExpectedCalls: ["Bar", "Boz"],
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