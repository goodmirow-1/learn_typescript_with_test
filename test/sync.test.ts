import {Counter} from "../src/sync";

function assertCounter(got:Counter, want:number ){

    expect(got.Value()).toBe(want);
}
test('incrementing the counter 3 times leaves it at 3', () => {
    const counter = new Counter();
    counter.Inc();
    counter.Inc();
    counter.Inc();

    assertCounter(counter,3)
})


test('it runs safely concurrently', async() => {
    const wantedCount: number = 1000;
    const counter: Counter = new Counter();

    const promises: Promise<void>[] = [];

    for (let i: number = 0; i < wantedCount; i++) {
        promises.push((async () => {
            counter.Inc();
        })());
    }

    await Promise.all(promises);

    assertCounter(counter,wantedCount)
})