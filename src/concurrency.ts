type WebsiteChecker = (url: string) => boolean;

export function checkWebsites(wc: WebsiteChecker, urls: string[]): Record<string, boolean> {
    const results: Record<string, boolean> = {};

    urls.forEach(url => {
        results[url] = wc(url);
    });

    return results;
}