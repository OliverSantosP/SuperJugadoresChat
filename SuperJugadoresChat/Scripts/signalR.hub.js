(function ($) {
    $.ajax({
        url: "/signalr/hubs",
        dataType: "script",
        async: false,
        cache: true
    });

    var chat = $.connection.chat;

    chat.client.addMessage = function (message) {
        // Add the message to the page. 
        +$('#discussion').append('<li><strong>Test</strong> ' + message + '</li>');
    }

    $.connection.hub.start().done(function () {
        $("#discussion").append("Connected\n");
        $("#sendButton").click(function () {
            chat.server.send($("#messageTextBox").val());
            $("#messageTextBox").val("")
        });
    });

}(jQuery));