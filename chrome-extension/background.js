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

let ports = {}

chrome.runtime.onInstalled.addListener(function(details){
    const exampleValue = {
        captions: [
            {
                speaker: "John Doe",
                document: "abc",
                unix: 100,
                textNew: null,
                text: "Mispellings and grammatical errors can effect your credibility. The same goes for misused commas, and other types of punctuation . Not only will Grammarly underline these issues in red, it will also showed you how to correctly write the sentence."
            },
            {
                speaker: "Jane Doe",
                document: "abc",
                unix: 100,
                textNew: null,
                text: "Underlines that are blue indicate that Grammarly has spotted a sentence that is unnecessarily wordy. You'll find suggestions that can possibly help you revise a wordy sentence in an effortless manner"
            },
        ]
    }
    localStorage.setItem("example", JSON.stringify(exampleValue))


    console.log("first run!!")
});


chrome.runtime.onMessage.addListener( function(request, sender, sendResponse) {
    if (request.kind === 'load') {
        console.log("load data from: ", sender)
        const data = localStorage.getItem(request.meetName)
        if (data === null) {
            console.log('return new data')

            return sendResponse({
                unix:     Date.now(),
                captions: []
            });
        }
        console.log("data exist: ", data)
        return sendResponse(data);
    }
    if (request.kind === 'transmit') {
        localStorage.setItem(request.meetName, JSON.stringify(request.data))
        const port = ports[request.meetName]
        if (port != null) {
            return port.postMessage(request);
        }
    }
});


chrome.runtime.onConnectExternal.addListener(function(port) {
    if (ports[port.name]) {
        ports[port.name].disconnect()
    }
    ports[port.name] = port
    port.onMessage.addListener(function(msg) {
        if (msg.kind === 'load') {
            const item = localStorage.getItem(port.name)
            console.log(port.name, item)
            let data = null
            if (item !== null && item !== undefined) {
                data = JSON.parse(item)
            }
            return port.postMessage({
                kind: 'transmit',
                data: data,
            });
        }
    })
    port.onDisconnect.addListener(function (port) {
        ports[port.name] = null
        console.log("disconnected: ", port)
    })
})
