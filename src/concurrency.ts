type WebsiteChecker = (url: string) => boolean;

export async function checkWebsites(wc: WebsiteChecker, urls: string[]): Promise<Record<string, boolean>> {
    const results: Record<string, boolean> = {};

    // Promise 배열을 만들어 각 비동기 작업을 추적할 수 있도록 함
    const promises: Promise<void>[] = [];

    // 각 URL에 대해 비동기로 작업을 처리
    urls.forEach(url => {
        // Promise를 생성하고 배열에 추가
        const promise = new Promise<void>((resolve, reject) => {
            // 비동기로 작업 수행
            setTimeout(() => {
                results[url] = wc(url);
                resolve(); // 작업 완료 후 Promise를 해결(resolve)
            }, 0); // 고루틴의 sleep과 유사한 효과를 위해 0ms 후에 실행됨
        });
        promises.push(promise); // 배열에 Promise 추가
    });

    // 모든 비동기 작업이 완료될 때까지 대기하고 결과 반환
    await Promise.all(promises);
    return results;
}