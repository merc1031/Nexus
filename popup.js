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
            
            },
            error: function(result) {
                console.error('fail');
            }

            }
          );
}
$(document).ready( function () {

        $("body .submit").click( function() { 
            sendOptions(); 
        } );

    } ) ;
