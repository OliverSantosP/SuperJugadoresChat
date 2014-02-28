using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SuperJugadoresChat.Models
{
    public class Messages
    {
        public string UserName { get; set; }
        public string Message { get; set; }
        public DateTime Datetime { get; set; }
    }
}