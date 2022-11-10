var extension_url = 'chrome-extension://'+location.host+'/index.html';


function isOptionsUrl(url) {
    if(url == extension_url) {
        return true;
    }
    return false;
}
// Find options page in all opened tabs
function goToOptions() {
    chrome.tabs.getAllInWindow(undefined, function(tabs) {
        for (var i = 0, tab; tab = tabs[i]; i++) {
            if (tab.url && isOptionsUrl(tab.url)) {
                chrome.tabs.update(tab.id, {selected: true});
                return;
            }
        }
        chrome.tabs.create({url: extension_url});
    });
}
// Called when the user clicks on the browser action.
chrome.browserAction.onClicked.addListener(function(tab) {
    goToOptions();
});

chrome.runtime.onInstalled.addListener(function(details){
    const exampleValue = {
        captions: [
            {
                speaker: "John Doe",
                document: "abc",
                unix: 100,
                text: "Mispellings and grammatical errors can effect your credibility. The same goes for misused commas, and other types of punctuation . Not only will Grammarly underline these issues in red, it will also showed you how to correctly write the sentence."
            },
            {
                speaker: "Jane Doe",
                document: "abc",
                unix: 100,
                text: "Underlines that are blue indicate that Grammarly has spotted a sentence that is unnecessarily wordy. You'll find suggestions that can possibly help you revise a wordy sentence in an effortless manner"
            },
        ]
    }
    chrome.storage.sync.set({example: exampleValue}, function(){});

    console.log("first run!!")
});