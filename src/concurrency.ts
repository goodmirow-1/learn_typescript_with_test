type WebsiteChecker = (url: string) => boolean;

interface Result {
    url: string;
    success: boolean;
}

export function checkWebsites(wc: WebsiteChecker, urls: string[]): Record<string, boolean> {
    const results: Record<string, boolean> = {};
    const resultChannel: Result[] = [];

    urls.forEach(url => {
        // 비동기 작업을 수행하는 대신 결과를 resultChannel 배열에 추가
        resultChannel.push({ url, success: wc(url) });
    });

    // resultChannel 배열을 순회하면서 결과를 저장
    resultChannel.forEach(result => {
        results[result.url] = result.success;
    });

    return results;
}