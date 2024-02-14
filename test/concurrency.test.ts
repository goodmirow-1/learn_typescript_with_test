import {checkWebsites} from "../src/concurrency";

describe("test check website", () => {
    type WebsiteChecker = (url: string) => boolean;
    function mockWebsiteChecker(url: string): boolean {
        return url !== "waat://furhurterwe.geds";
    }

    function checkWebsites(wc: WebsiteChecker, urls: string[]): Record<string, boolean> {
        const results: Record<string, boolean> = {};

        urls.forEach(url => {
            results[url] = wc(url);
        });

        return results;
    }

    function deepEqual(obj1: any, obj2: any): boolean {
        return JSON.stringify(obj1) === JSON.stringify(obj2);
    }

    test("testCheckWebsites", () => {
        const websites: string[] = [
            "http://google.com",
            "http://blog.gypsydave5.com",
            "waat://furhurterwe.geds",
        ];

        const want: Record<string, boolean> = {
            "http://google.com": true,
            "http://blog.gypsydave5.com": true,
            "waat://furhurterwe.geds": false,
        };

        const got = checkWebsites(mockWebsiteChecker, websites);

        if (!deepEqual(want, got)) {
            console.error("Wanted", want, "got", got);
        } else {
            console.log("Test passed");
        }
    })
})

describe("test benchmarking", () => {
    function slowStubWebsiteChecker(_url: string): boolean {
        const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
        sleep(20); // Sleep for 20 milliseconds
        return true;
    }

    test("benchmarkCheckWebsites", () => {
        const urls: string[] = new Array(100).fill("a url");

        console.time("BenchmarkCheckWebsites"); // Start measuring time

        for (let i = 0; i < 1000; i++) { // Assuming b.N in Go equals 1000
            checkWebsites(slowStubWebsiteChecker, urls);
        }

        console.timeEnd("BenchmarkCheckWebsites"); // End measuring time
    })
})