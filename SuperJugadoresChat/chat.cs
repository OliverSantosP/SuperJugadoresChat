using Microsoft.AspNet.SignalR;
using System.Collections.Generic;
using System.Linq;
using SuperJugadoresChat.Models;

namespace SuperJugadoresChat
{
    public class Chat : Hub
    {
        static List<UserDetail> ConnectedUsers = new List<UserDetail>();

        public void Connect(string userName)
        {
            var id = Context.ConnectionId;

            if (ConnectedUsers.Count(x => x.ConnectionId == id) == 0)
            {
                ConnectedUsers.Add(new UserDetail { ConnectionId = id, UserName = userName });
            }

            // send to caller
            Clients.Caller.onConnected(ConnectedUsers);
        }

        public static List<UserDetail> getUsers()
        {
            return ConnectedUsers;
        }

        public void Send(string username, string message)
        {
            // Call the 'addNewMessageToPage' method to update clients.
            Clients.All.addNewMessageToPage(username, message);
        }
        

    }
}