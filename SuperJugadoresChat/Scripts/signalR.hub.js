(function ($) {
    $.ajax({
        url: "/signalr/hubs",
        dataType: "script",
        async: false,
        cache: true
    });

    var chat = $.connection.chat;

    chat.client.addMessage = function (message) {

        //Verify the message is not empty.
        if (message != '') {
            //Get the message Datetime.
            var now = new Date();
            var strDateTime = [[AddZero(now.getDate()), AddZero(now.getMonth() + 1), now.getFullYear()].join("/"), [AddZero(now.getHours()), AddZero(now.getMinutes())].join(":"), now.getHours() >= 12 ? "PM" : "AM"].join(" ");

            //Pad given value to the left with "0"
            function AddZero(num) {
                return (num >= 0 && num < 10) ? "0" + num : num + "";
            }
            // Add the message to the page. 
            $('#discussion').append('<div class="row"><strong>User</strong> ' + message + '<small><i> ' + strDateTime + '</i></small></div>');
        }
        
    }

    $(document).on('dragover', function (e) { e.preventDefault(); return false; });
    
    $(document).on('drop', function (e) {
        e.preventDefault();
        e.originalEvent.dataTransfer.items[0].getAsString(function (url) {

            //Get the message Datetime.
            var now = new Date();
            var strDateTime = [[AddZero(now.getDate()), AddZero(now.getMonth() + 1), now.getFullYear()].join("/"), [AddZero(now.getHours()), AddZero(now.getMinutes())].join(":"), now.getHours() >= 12 ? "PM" : "AM"].join(" ");

            //Pad given value to the left with "0"
            function AddZero(num) {
                return (num >= 0 && num < 10) ? "0" + num : num + "";
            }


            alert(url);
            $('#discussion').append('<div class="row"><small><i><img src="' + url + '" />' + strDateTime + '</i></small></div>');
        });
    });

    $.connection.hub.start().done(function () {
        $("#discussion").append("Connected\n");
        $("#sendButton").click(function () {
            chat.server.send($("#messageTextBox").val());
            $("#messageTextBox").val("")
        });
    });

}(jQuery));