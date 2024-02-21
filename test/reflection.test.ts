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
        test(`Test case: ${struct.Name}`, async() => {
            let got: string[] = [];
            await walk(struct.Input, (input: string) => {
                got.push(input);
            });
            expect(got).toEqual(struct.ExpectedCalls);
        });
    });
})

describe('with channel', () => {
    interface Profile {
        age: number;
        city: string;
    }

    // Simulating asynchronous data stream using a Promise
    function getData(): Promise<Profile[]> {
        return new Promise((resolve) => {
            // Simulate asynchronous data streaming
            setTimeout(() => {
                resolve([
                    { age: 33, city: "Berlin" },
                    { age: 34, city: "Katowice" }
                ]);
            }, 1000); // Simulating delay of 1 second
        });
    }

    test('test case channel', async () => {
        const aChannel = getData();

        let got: string[] = [];
        const want: string[] = ["Berlin", "Katowice"];

        await walk(aChannel, (input) => {
            got.push(input);
        });

        expect(got).toEqual(want);
    })
})

test('test function', async() => {
    const aFunction = (): [any, any] => {
        return [{ id: 33, city: "Berlin" }, { id: 34, city: "Katowice" }];
    };

    const got: string[] = [];
    const want: string[] = ["Berlin", "Katowice"];

    await walk(aFunction, (input: string) => {
        got.push(input);
    });

    expect(got).toEqual(want);
})