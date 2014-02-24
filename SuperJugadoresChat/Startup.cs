using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(SuperJugadoresChat.Startup))]
namespace SuperJugadoresChat
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            app.MapSignalR();

        }
    }
}

