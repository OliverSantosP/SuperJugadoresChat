using Microsoft.AspNet.SignalR;

namespace SuperJugadoresChat
{
    public class Chat : Hub
    {
        public void Send(string message)
        {
            Clients.All.AddMessage(message);
        }
    }
}