using Microsoft.AspNet.SignalR;
using System.Collections.Generic;
using System.Linq;
using SuperJugadoresChat.Models;


namespace SuperJugadoresChat
{
    public class Chat : Hub
    {
        static List<UserDetail> ConnectedUsers = new List<UserDetail>();
        static List<Messages> CurrentMessage = new List<Messages>();

        public void Connect(string userName)
        {
            var id = Context.ConnectionId;

            if (ConnectedUsers.Count(x => x.ConnectionId == id) == 0)
            {
                ConnectedUsers.Add(new UserDetail { ConnectionId = id, UserName = userName });
            }

            // send to caller
            Clients.Caller.onConnected(ConnectedUsers);

            // send to all except caller client
            Clients.AllExcept(id).onNewUserConnected(id, userName);
        }


        public void Send(string username, string message)
        {
            // Call the 'addNewMessageToPage' method to update clients.
            Clients.All.addNewMessageToPage(username, message);

            // store last 100 messages in cache
            AddMessageinCache(username, message);
        }

        public override System.Threading.Tasks.Task OnDisconnected()
        {
            var item = ConnectedUsers.FirstOrDefault(x => x.ConnectionId == Context.ConnectionId);
            if (item != null)
            {
                ConnectedUsers.Remove(item);

                var id = Context.ConnectionId;
                Clients.All.onUserDisconnected(id, item.UserName);

            }

            return base.OnDisconnected();
        }

        private void AddMessageinCache(string userName, string message)
        {
            CurrentMessage.Add(new Messages { UserName = userName, Message = message});

            if (CurrentMessage.Count > 100)
                CurrentMessage.RemoveAt(0);
        }
        

    }
}