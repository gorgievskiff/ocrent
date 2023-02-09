using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace OCRent.Models
{
    public class ClientModel
    {
        public string username { get; set; }
        public string f_name { get; set; }
        public string l_name { get; set; }
        public string address { get; set; }
        public string email { get; set; }

        public ClientModel(string username, string f_name, string l_name, string address, string email)
        {
            this.username = username;
            this.f_name = f_name;
            this.l_name = l_name;
            this.address = address;
            this.email = email;
        }
    }
}
