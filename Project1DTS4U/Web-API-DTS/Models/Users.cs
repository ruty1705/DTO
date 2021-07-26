using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.ComponentModel.DataAnnotations;

namespace Web_API_DTS.Models
{
    public class Users
    {
        public int Id { get; set; }

        [Required(ErrorMessage = ". שם משתמש שדה חובה")]
        [MaxLength(10, ErrorMessage = ".שם מלא יכול להכיל עד 10 תווים")]
        [MinLength(5, ErrorMessage = ".שם משתמש יכיל לפחות 5 תווים ")]
        public string UserName { get; set; }

        [Required(ErrorMessage = ". סיסמא שדה חובה")]
        [MaxLength(10, ErrorMessage = ".סיסמא יכול להכיל עד 10 תווים")]
        [MinLength(8, ErrorMessage = ".סיסמא תכיל לפחות 8 תווים ")]
        public string Password { get; set; }


        [Required(ErrorMessage = ". שם  שדה חובה")]
        [MaxLength(50, ErrorMessage = ".שם יכיל עד 50 תווים")]
        [MinLength(3, ErrorMessage = ".שם יכיל לפחות 5 תווים ")]

        public string Name { get; set; }
        public DateTime  AddDate { get; set; }
        public int Status { get; set; }
       
    }
}