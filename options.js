function save() {
    let arr = document.getElementById("keywords").value.split(",").map(function(item) {
        return item.trim();
    });
    chrome.storage.sync.set({
        'keywords': arr,
        'showMatched': document.getElementById("show-matched").checked,
        'showMeta': document.getElementById("show-meta").checked
    }, function() {
        document.getElementById("keywords").value = String(arr);
        document.getElementById("save-btn").disabled = true;
        document.getElementById("keywords").disabled = true;
        document.getElementById("show-matched").disabled = true;
        document.getElementById("show-meta").disabled = true;

        a = document.getElementById('message');
        a.innerHTML = "Saved. Refresh page.";
        a.classList.add("hide")

    });
    setTimeout(function() {
        a.innerHTML = "";
        a.classList.remove("hide")
        document.getElementById("save-btn").disabled = false;
        document.getElementById("keywords").disabled = false;
        document.getElementById("show-matched").disabled = false;
        document.getElementById("show-meta").disabled = false;
    }, 1500);
}

// set the page to the settings
chrome.storage.sync.get(['keywords', 'showMatched', 'showMeta'], function({ keywords, showMatched, showMeta }) {
    if (keywords)
        document.getElementById("keywords").value = String(keywords);
    document.getElementById("show-matched").checked = !!showMatched
    document.getElementById("show-meta").checked = !!showMeta
});

document.getElementById("save-btn").addEventListener("click", save, null);