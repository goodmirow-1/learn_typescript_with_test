import {Counter} from "../src/sync";


test('incrementing the counter 3 times leaves it at 3', () => {
    const counter = new Counter();
    counter.Inc();
    counter.Inc();
    counter.Inc();

    const got = counter.Value();
    const want = 3;

    expect(got).toBe(want);
})

describe('incrementing the counter 3 times leaves it at 3', () => {

    function assertCounter(got:Counter, want:number ){

        expect(got.Value()).toBe(want);
    }

    test('test call', () => {
        const counter = new Counter();
        counter.Inc();
        counter.Inc();
        counter.Inc();

        assertCounter(counter,3)
    })
})