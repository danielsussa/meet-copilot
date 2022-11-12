let adjustedObserver = false

const docTitle = document.documentURI.split("?")[0].split("/").at(-1)
console.log("new document: ", docTitle)

if (docTitle.length > 0) {
    const port = chrome.runtime.connect({name: docTitle});
    port.onMessage.addListener(function(message) {
        if (message.kind === 'load') {
            isMeeting(message.data)
        }
    })
}


function isMeeting(meetData) {

    let observer = new MutationObserver(function(mutations) {
        let last = mutations[mutations.length-1]
        if (mutations.length === 3 && last.target.nodeName.toLowerCase() === 'span') {
            if (!adjustedObserver) {
                adjustedObserver = true
                observer.disconnect()

                observer.observe(document.querySelector(`.${mutations[0].target.className}`), {
                    subtree:       true,
                    childList:     true,
                    characterData: true,
                    characterDataOldValue: true
                });
            }

            meetData.captions.push({
                speaker: mutations[0].addedNodes.item(0).innerText.split('\n')[0],
                caption: last.addedNodes.item(0).textContent,
                unix:    Date.now()
            })


        }else if (last.target.nodeName.toLowerCase() === 'span') {
            console.log(mutations)
            const oldText = last.removedNodes?.item(0)?.textContent
            const newText = last.addedNodes.item(0).textContent
            console.log(meetData.captions[meetData.captions.length-1].caption, ' || ', oldText, ' || ', newText)

            meetData.captions[meetData.captions.length-1].caption =
                replace(meetData.captions[meetData.captions.length-1].caption, oldText, newText)

            chrome.runtime.sendMessage({data: meetData, kind: 'transmit', meetName: docTitle}, null);

        }
    });

    observer.observe(document.querySelector("body"), {
        subtree:       true,
        childList:     true,
        characterData: true,
        characterDataOldValue: true
    });
}

function replace(text, oldSub, newSub){
    if (oldSub === undefined) {
        return text + newSub
    }
    const idx = text.lastIndexOf(oldSub)
    if (idx === -1) {
        return text
    }
    text = text.substring(0, idx)
    return text + newSub
}
