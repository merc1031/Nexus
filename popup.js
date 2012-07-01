function sendOptions() {
    var els = $(".options");
    var obj = {};
    for( var i = 0; i < els.length; i++) {
        var el = $(els[i]);
        
        var enabled = $(".enabled", el);
        var name = $(".name", el);
        var notes = $(".notes", el);
        var match = $(".match", el);
        var route = $(".route", el);

        var data = {};
        data['enabled'] = enabled.val();        
        data['notes'] = notes.val();        
        data['match'] = match.val();        
        data['route'] = route.val();        

        
        obj[name.val()] = data;
    }

    console.log(obj);
    $.ajax(
            {
            url: 'http://localhost:24900/opt',
            type: "post",
            dataType: "json",
            data: JSON.stringify(obj),
            contentType: "application/json; charset=utf-8",
            success: function(result) {
                createForm();
            },
            error: function(result) {
                console.error('fail');
            }

            }
          );
}

function createForm() {
        $.ajax(
                {
                url: 'http://localhost:24900/opt',
                type: "get",
                dataType: "json",
                contentType: "application/json; charset=utf-8",
                success: function(result, textStatus, jqXHR) {
                    $("body .form").empty();
                    var $body = $(window.document.body);
                    var $template = $(".template > .options", $body);

                    for (var res in result) {
                        if (result.hasOwnProperty(res) && res != '') {
                            console.log(res);
                            var $element = $template.clone();
                            $element.appendTo($("body .form"));
                            console.log('made 1 from data');
     
                            var enabled = $(".enabled", $element);
                            var name = $(".name", $element);
                            var notes = $(".notes", $element);
                            var match = $(".match", $element);
                            var route = $(".route", $element);
                            if (result[res]['enabled']) {
                                enabled.prop("checked", true);
                            }else {
                                enabled.prop("checked", false);
                            }
                            notes.val(result[res]['notes']);        
                            match.val(result[res]['match']);        
                            route.val(result[res]['route']);        
                            name.val(res);        
                        }

                    }
                    var $element2 = $template.clone();
                    $element2.appendTo($("body .form"));
                    console.log('made 1 from standard');
                    
                    var $templateS = $(".template .submit", $body);
                    var $element3 = $templateS.clone();
                    $element3.appendTo($("body .form"));

                    $element3.click( function() { 
                        sendOptions(); 
                    } );
                },
                error: function(result) {
                    console.error('fail');
                }

                }
              );
}

$(document).ready( function () {
        createForm();
        

    } ) ;
