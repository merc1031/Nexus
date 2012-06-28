function getClickHandler() {
    return function(info, tab) {
        var url = ''
        if(info.linkUrl)
            url = info.linkUrl
        if(info.srcUrl)
            url = info.srcUrl

        chrome.experimental.downloads.download({url: url, method : "POST" }, function(id) {
        alert(id);
        });

    };
};

chrome.contextMenus.create({
    "title" : "neXus",
    "type" : "normal",
    "contexts" : ["link","image"],
    "onclick" : getClickHandler()
});
