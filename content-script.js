const hidePhotos = function() {
    const images = [...document.getElementsByTagName('img')];
    images.forEach(el => {
        const altText = el.alt;
        const words = [];

        // prevents the script from re-evaluating photos
        if (altText == '' || el.visited == true) return;
        el.visited = true;

        chrome.storage.sync.get(['keywords', 'showMatched', 'showMeta'], function({ keywords, showMatched, showMeta }) {
            if (!!showMeta)
                el.insertAdjacentHTML('afterend', `<div class="caption">${altText}</div>`);

            if (keywords.length > 0 && keywords[0] !== '') {
                keywords.forEach(filter => {
                    if (altText.toLowerCase().includes(filter.toLowerCase())) {
                        words.push(filter);
                    }
                })

                if (words.length > 0) {
                    el.style.filter = 'blur(40px)';
                    if (!!showMatched) {
                        el.style.position = 'relative';
                        el.insertAdjacentHTML('afterend', `<div class="reason">Image contains ${words.join(', ')}</div>`);
                    }

                }
            }
        });
    });

};

const initializePlugin = function() {
    const observer = new MutationObserver(mutations => {
        hidePhotos();
    });

    const config = {
        attributes: true,
        childList: true,
        subtree: true,
        characterData: false
    };
    observer.observe(document.body, config);

    hidePhotos();
};

initializePlugin();