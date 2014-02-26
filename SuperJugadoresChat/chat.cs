using Microsoft.AspNet.SignalR;

namespace SuperJugadoresChat
{
    public class Chat : Hub
    {
        public void Send(string username, string message)
        {
            // Call the 'addNewMessageToPage' method to update clients.
            Clients.All.addNewMessageToPage(username, message);
        }
    }
}