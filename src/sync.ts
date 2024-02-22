

test('incrementing the counter 3 times leaves it at 3', () => {
    const counter = Counter();
    counter.Inc();
    counter.Inc();
    counter.Inc();

    const got = counter.Value();
    const want = 3;

    expect(got).toBe(want);
})