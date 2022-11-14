console.log("onInstalled.addListener")

const temporaryData = {}

chrome.runtime.onInstalled.addListener(function(details){
    const exampleValue = {
        captions: [
            {
                speaker: "John Doe",
                document: "abc",
                unix: Date.now(),
                textNew: null,
                caption: "Mispellings and grammatical errors can effect your credibility. The same goes for misused commas, and other types of punctuation . Not only will Grammarly underline these issues in red, it will also showed you how to correctly write the sentence."
            },
            {
                speaker: "Jane Doe",
                document: "abc",
                unix: Date.now(),
                textNew: null,
                caption: "Underlines that are blue indicate that Grammarly has spotted a sentence that is unnecessarily wordy. You'll find suggestions that can possibly help you revise a wordy sentence in an effortless manner"
            },
        ]
    }

    chrome.storage.local.set({example: exampleValue})
    chrome.storage.local.set({list: [
            {
                "meetName": "Example",
                "link":     "example",
                "date":     Date.now(),
                "status":   "stopped"
            }
    ]})
    temporaryData['example'] = exampleValue

    console.log("first run!! =)")
});


let dashBoardPort = null

// content PORT listeners
chrome.runtime.onConnect.addListener(port => {
    console.log("add content listener: ", port)

    port.onMessage.addListener(function(msg) {
        console.log("content message: ", msg)
        if (msg.kind === 'load') {
            let data = temporaryData[msg.room]
            if (data === null || data === undefined) {
                data = {
                    unix:     Date.now(),
                    captions: []
                }
            }
            return port.postMessage({
                kind: 'load',
                data: data,
            });
        }
        if (msg.kind === 'transmit') {
            temporaryData[msg.room] = msg.data

            if (dashBoardPort != null) {
                console.log("post message to port: ", port, msg)
                return dashBoardPort.postMessage(msg);
            }
        }
    })

})


// dashboard PORT listeners
chrome.runtime.onConnectExternal.addListener(function(port) {
    console.log("connect: ", port)
    if (dashBoardPort != null) {
        dashBoardPort.disconnect()
    }
    dashBoardPort = port

    port.onMessage.addListener(function(msg) {
        if (msg.kind === 'load') {
            return dashBoardPort.postMessage({
                kind: 'transmit',
                data: temporaryData[msg.room],
            });
        }
        if (msg.kind === 'list') {
            chrome.storage.local.get(['list'], function(result) {
                dashBoardPort.postMessage({
                    kind: 'list',
                    data: {
                        list: result.list
                    }
                })
            });
        }
    })
    port.onDisconnect.addListener(function (port) {
        dashBoardPort = null
        console.log("disconnected: ", port)
    })
})
