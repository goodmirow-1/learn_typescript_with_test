import { Racer,  ConfigurableRacer } from '../src/racer'
/*
test("test racer", async () => {
    const slowURL = "http://www.facebook.com";
    const fastURL = "http://www.naver.com";

    const want = fastURL;
    const got = await Racer(slowURL, fastURL);

    expect(got).toBe(want);
})
*/
// 지연된 서버를 만드는 함수입니다.
function makeDelayedServer(delay: number): Promise<{ url: string, close: () => void }> {
    return new Promise(resolve => {
        const server = require('http').createServer((req: any, res: any) => {
            setTimeout(() => {
                res.writeHead(200);
                res.end();
            }, delay);
        });

        server.listen(0, () => {
            const port = (server.address() as any).port;
            const url = `http://localhost:${port}`;
            resolve({
                url,
                close: () => server.close()
            });
        });
    });
}

describe('Racer', () => {
    test('should return the URL of the faster server', async () => {
        // 지연된 서버를 생성합니다.
        const slowServer   = await makeDelayedServer(2 * 1000);
        const fastServer   = await makeDelayedServer(1 * 1000);

        const want = fastServer.url
        const [got, error] = await Racer(slowServer.url, fastServer.url)

        if( error != null){
            throw new Error('did not expect an error but got one error')
        }

        if( got != want ) {
            console.error("Wanted", want, "got", got);
        }

        slowServer.close();
        fastServer.close();
    });

    test('returns an error if a server doesnt respond within 10s', async () => {
        const server = await makeDelayedServer(3 * 1000);

        const [got, error] = await ConfigurableRacer(server.url, server.url, 8 * 1000)

        if( error != null){
            throw new Error(`did not expect an error but got one error ${error}`)
        }

        server.close();
    });
});

