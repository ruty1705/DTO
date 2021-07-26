using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Web_API_DTS.Models
{
    public class Waiting
    {
        public int Id { get; set; }
        public int UserId { get; set; } 
        public DateTime DateAdded { get; set; }
        public DateTime DateQueue { get; set; }
        public string TimeQueue { get; set; }
        public string Name { get; set; }

    }
}