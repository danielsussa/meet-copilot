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

let meetPorts = {}
let dashBoardPort = null

// content PORT listeners
chrome.runtime.onConnect.addListener(port => {
    if (meetPorts[port.name]) {
        meetPorts[port.name].disconnect()
    }
    meetPorts[port.name] = port

    port.onMessage.addListener(function(msg) {
        if (msg.kind === 'load') {
            let data = temporaryData[port.name]
            if (data === null) {
                data = {
                    unix:     Date.now(),
                    captions: []
                }
            }
            return port.postMessage({
                kind: 'transmit',
                data: data,
            });
        }
        if (msg.kind === 'transmit') {
            const port = meetPorts[msg.meetName]
            if (port != null) {
                return port.postMessage(msg);
            }
        }
    })

    port.onDisconnect.addListener(function (port) {
        meetPorts[port.name] = null
        console.log("disconnected: ", port)
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
        console.log(meetPorts[port.name])
        console.log("message from: ", msg)
        if (msg.kind === 'load') {
            return port.postMessage({
                kind: 'transmit',
                data: temporaryData[msg.room],
            });
        }
        if (msg.kind === 'list') {
            chrome.storage.local.get(['list'], function(result) {
                port.postMessage({
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
