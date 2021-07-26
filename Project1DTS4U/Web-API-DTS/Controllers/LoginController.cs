using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Web;
using System.Web.Http;
using System.Web.Http.Cors;
using Web_API_DTS.Models;

namespace Web_API_DTS.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]


    public class LoginController : ApiController
    {
        string connectionString = ConfigurationManager.ConnectionStrings["med"].ConnectionString;
        string path = WriteLog.GetUserHome();

        // POST: api/Login
        public HttpResponseMessage Post([FromBody] Users user)
        {
            int userId = -1;
            int status = 0;
            string message = "";
           
            using (SqlConnection con = new SqlConnection(connectionString))
            {
                using (SqlCommand cmd = new SqlCommand("sp_Login", con))
                {
                    try
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.AddWithValue("@UserName", user.UserName);
                        cmd.Parameters.AddWithValue("@Password", user.Password);
                        con.Open(); 

                        SqlParameter output = cmd.Parameters.Add("@UserId", SqlDbType.Int);
                        output.Direction = ParameterDirection.Output;
                        cmd.ExecuteNonQuery(); 
                         userId = int.Parse(output.Value.ToString()); 

                        if (userId>0)
                        {
                            status = 1;
                            message = HttpStatusCode.OK.ToString();
                            WriteLog.WriteLogFile(path, String.Format("{0} @ {1} @{2}", "Post in LoginController:", message, DateTime.Now));
                        }
                        else
                        {
                            status = 0;
                            message = HttpStatusCode.BadRequest.ToString();
                            WriteLog.WriteLogFile(path, String.Format("{0} @ {1} @{2}", "Post in LoginController:",message, DateTime.Now));
                        }


                    }
                    catch (Exception ex)
                    {
                        status = 0;
                        WriteLog.WriteLogFile(path, String.Format("{0} @ {1} @{2}", "Post in LoginController:", ex.Message, DateTime.Now));
                    }

                }
            }

            string jsonContent = $"{{\"access_token\":\"{userId}\" , \"status\": \"{status}\",    \"message\": \"{message}\"}}";
            var res = Request.CreateResponse();
            res.Content = new StringContent(jsonContent);
            res.Content.Headers.ContentType = MediaTypeHeaderValue.Parse("application/json");
            return res;

        }

    }
}
 