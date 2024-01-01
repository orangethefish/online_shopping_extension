chrome.runtime.onMessage.addListener(function(request, sender) {
    chrome.tabs.update(sender.tab.id, {url: request.redirect});
    console.log(`Redirecting to: ${request.redirect}`);
});