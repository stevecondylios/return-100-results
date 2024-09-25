chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === 'loading' && changeInfo.url) {
        const url = new URL(changeInfo.url);
        // Only update the URL if the num parameter is not already set to 100
        if ((url.hostname.endsWith('google.com') || url.hostname.match(/google\.\w{2,}$/)) && url.pathname.startsWith('/search') && url.searchParams.get('num') !== '100') {
            url.searchParams.set('num', '100');
            chrome.tabs.update(tabId, { url: url.toString() });
        }
    }
});
