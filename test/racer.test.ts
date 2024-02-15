import { Racer } from '../src/racer'

test("test racer", () => {
    const slowURL = "http://www.facebook.com";
    const fastURL = "http://www.quii.co.uk";

    const want = fastURL;
    const got = Racer(slowURL, fastURL);

    expect(got).toBe(want);
})