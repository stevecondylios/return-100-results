chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === 'loading' && changeInfo.url) {
        const url = new URL(changeInfo.url);
        // Only update the URL if the num parameter is not already set to 100

        // Regex to match Google Search paths in a way that avoids false-positives (like google.com/search-console)
        // webhp is a shorthand URL that Google has retained, likely for compatibility and historical reasons
        const searchPathRegex = /^\/(search|webhp)(\?|$)/;

        // Only update the URL if it is a Google search and 'num' is not already set to 100
        if ((url.hostname.endsWith('google.com') || url.hostname.match(/google\.\w{2,}$/)) && searchPathRegex.test(url.pathname) && url.searchParams.get('num') !== '100') {
            url.searchParams.set('num', '100');
            chrome.tabs.update(tabId, { url: url.toString() });
        }
    }
});
