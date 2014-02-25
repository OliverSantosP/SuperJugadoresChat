(function ($) {
    $.ajax({
        url: "/signalr/hubs",
        dataType: "script",
        async: false,
        cache: true
    });

    // Get the user name and store it to prepend to messages.
    var userName = prompt("Enter your user name:");

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
            $('.padd').append('<div class="row"><div class="avatar pull-left"><img src="/Content/user.jpg" alt="" /><div class="chat-content"><strong>' + userName + '</strong> ' + message + '<small><br /><i> ' + strDateTime + '</i></small></div></div></li>');
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
            $('.padd').append('<div class="row"><div class="avatar pull-left"><img src="/Content/user.jpg" alt="" /><div class="chat-content"><strong>'+userName+'</strong>'+ url + '<br /><i>' + strDateTime + '</i></small></div></div></li>');
        });
    });

    $.connection.hub.start().done(function () {
        $(".padd").append("Connected\n");
        $(".row #sendButton").click(function () {
            chat.server.send($("#messageTextBox").val());
            $("#messageTextBox").val("")
        });
    });


    $(document.body).delegate('input:text', 'keypress', function (e) {
        if (e.which === 13) { // if is enter
            e.preventDefault(); // don't submit form
            chat.server.send($("#messageTextBox").val());
            $("#messageTextBox").val("")
        }
    });


}(jQuery));