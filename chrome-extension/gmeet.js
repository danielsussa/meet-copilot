let adjustedObserver = false

const docTitle = document.documentURI.split("?")[0].split("/").at(-1)
console.log("new document: ", docTitle)

if (docTitle.length > 0) {
    isMeeting()
}



function isMeeting() {
    const channel = new BroadcastChannel('gmeet-messages');

    let observer = new MutationObserver(function(mutations) {
        let last = mutations[mutations.length-1]
        if (mutations.length === 3 && last.target.nodeName.toLowerCase() === 'span') {
            console.log("configured!")
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


            channel.postMessage(JSON.stringify({
                kind: "speaker",
                name: mutations[0].addedNodes.item(0).innerText.split('\n')[0],
                document: docTitle
            }))
            channel.postMessage(JSON.stringify({
                kind: "text",
                old : last.removedNodes?.item(0)?.textContent,
                new: last.addedNodes.item(0).textContent,
                document: docTitle
            }))


        }else if (last.target.nodeName.toLowerCase() === 'span') {
            channel.postMessage(JSON.stringify({
                kind: "text",
                old : last.removedNodes?.item(0)?.textContent,
                new: last.addedNodes.item(0).textContent,
                document: docTitle
            }))
        }
    });

    observer.observe(document.querySelector("body"), {
        subtree:       true,
        childList:     true,
        characterData: true,
        characterDataOldValue: true
    });
}



// TESTS
chrome.runtime.sendMessage({greeting: "hello"}, function(response) {
    console.log(response.farewell);
});