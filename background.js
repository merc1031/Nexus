//'use strict';

//localStorage.SERVER_SCHEMA = 'id,url';

//function getClickHandler() {
//    return function(info, tab) {
//        var url = ''
//        if(info.linkUrl)
//            url = info.linkUrl
//        if(info.srcUrl)
//            url = info.srcUrl
//
//        chrome.experimental.downloads.download({url: url, method : "POST" }, function(id) {
//        alert(id);
//        });
//
//    };
//};
//
//chrome.contextMenus.create({
//    "title" : "neXus",
//    "type" : "normal",
//    "contexts" : ["link","image"],
//    "onclick" : getClickHandler()
//});



chrome.downloads.onChanged.addListener(function(item) {
    if(item.state) {
        s = item.state.current;

        if ( s == 'complete') {
            chrome.downloads.search( {id:item.id}, function(items) {
                for (var i = 0; i < items.length; i++) {
                    download = items[i]
                    console.log(download);
                    console.log(download.url);
                    console.log(download.filename); 

                    sendToServer(download);
                }
            });
        }
    }
});

function sendToServer(downloadItem) {
    $.ajax(
            {
            url: 'http://localhost:24900/file',
            type: "post",
            dataType: "json",
            data: JSON.stringify(downloadItem),
            contentType: "application/json; charset=utf-8",
            success: function(result) {
            
            },
            error: function(result) {
                console.error('fail');
            }

            }
          );
}

//chrome.downloads.onCreated.addListener(function(item) {
//    alert('created');
//    alert(item.url);
//    alert(item.filename);
//    alert('done creating');
//});
