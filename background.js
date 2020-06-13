chrome.tabs.onUpdated.addListener(() => {
    chrome.tabs.query({ currentWindow: true, active: true }, (tabs) => {
        const currentTab = tabs[0];
        replaceDutchWithFrench(currentTab.url);
    });
});

function replaceDutchWithFrench(url) {
    console.debug(`${replaceDutchWithFrench.name} | url = ${url}`);

    const patterns = ['\/be-nl', '\/be_nl', '\/nl'];

    for (const pattern of patterns) {
        const included = url.toLowerCase().includes(pattern);

        console.debug(`${replaceDutchWithFrench.name} | current pattern = ${pattern}`);
        console.debug(`${replaceDutchWithFrench.name} | includes = ${included}`);

        if (included) {
            const replacedUrl = url.replace(pattern, pattern.replace('nl', 'fr'));

            console.debug(`${replaceDutchWithFrench.name} | replacedUrl = ${replacedUrl}`);

            chrome.tabs.update({ url: replacedUrl });
            return;
        }
    }
}

//TODO: Check if url exists before redirect