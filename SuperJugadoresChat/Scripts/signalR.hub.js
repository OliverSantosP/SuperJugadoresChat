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
        +$('#discussion').append('<li><img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxNDAiIGhlaWdodD0iMTQwIj48cmVjdCB3aWR0aD0iMTQwIiBoZWlnaHQ9IjE0MCIgZmlsbD0iI2VlZSI+PC9yZWN0Pjx0ZXh0IHRleHQtYW5jaG9yPSJtaWRkbGUiIHg9IjcwIiB5PSI3MCIgc3R5bGU9ImZpbGw6I2FhYTtmb250LXdlaWdodDpib2xkO2ZvbnQtc2l6ZToxMnB4O2ZvbnQtZmFtaWx5OkFyaWFsLEhlbHZldGljYSxzYW5zLXNlcmlmO2RvbWluYW50LWJhc2VsaW5lOmNlbnRyYWwiPjE0MHgxNDA8L3RleHQ+PC9zdmc+" alt="..." class="img-thumbnail"></img><strong>User</strong> ' + message + '</li>');
    }

    $.connection.hub.start().done(function () {
        $("#discussion").append("Connected\n");
        $("#sendButton").click(function () {
            chat.server.send($("#messageTextBox").val());
            $("#messageTextBox").val("")
        });
    });

}(jQuery));