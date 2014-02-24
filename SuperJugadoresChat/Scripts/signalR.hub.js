(function ($) {
    $.ajax({
        url: "/signalr/hubs",
        dataType: "script",
        async: false,
        cache: true
    });

    var chat = $.connection.chat;

    chat.client.addMessage = function (message) {
        if (message!='') {
            var now = new Date();
            var strDateTime = [[AddZero(now.getDate()), AddZero(now.getMonth() + 1), now.getFullYear()].join("/"), [AddZero(now.getHours()), AddZero(now.getMinutes())].join(":"), now.getHours() >= 12 ? "PM" : "AM"].join(" ");

            //Pad given value to the left with "0"
            function AddZero(num) {
                return (num >= 0 && num < 10) ? "0" + num : num + "";
            }
            // Add the message to the page. 
            +$('#discussion').append('<li><strong>User</strong> ' + message + '<i> ' + strDateTime + '</i></li>');
        }
        
    }

    $.connection.hub.start().done(function () {
        $("#discussion").append("Connected\n");
        $("#sendButton").click(function () {
            chat.server.send($("#messageTextBox").val());
            $("#messageTextBox").val("")
        });
    });

}(jQuery));