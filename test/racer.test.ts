import { Racer } from '../src/racer'

test("test racer", async () => {
    const slowURL = "http://www.facebook.com";
    const fastURL = "http://www.naver.com";

    const want = fastURL;
    const got = await Racer(slowURL, fastURL);

    expect(got).toBe(want);
})