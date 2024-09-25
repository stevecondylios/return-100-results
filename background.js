chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.url && changeInfo.url.includes('google.')) {
        const url = new URL(changeInfo.url);
        // Determine if the URL is a Google domain
        const domainParts = url.hostname.split('.');
        const googleDomainIndex = domainParts.indexOf('google');
        if (googleDomainIndex !== -1 && (domainParts[googleDomainIndex + 1].length === 2 || domainParts[googleDomainIndex + 1] === 'com')) {
            // Set 'num' parameter to 100 regardless of its current value
            url.searchParams.set('num', '100');
            chrome.tabs.update(tabId, { url: url.toString() });
        }
    }
});
