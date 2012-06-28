function getClickHandler() {
    return function(info, tab) {
        var url = info.linkUrl
        chrome.experimental.downloads.download({url: url, filename: url}, function(id) {
        });

    };
};

chrome.contextMenus.create({
    "title" : "neXus",
    "type" : "normal",
    "contexts" : ["link"],
    "onclick" : getClickHandler()
});
