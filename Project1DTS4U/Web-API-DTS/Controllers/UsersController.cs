using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data.SqlClient;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;
using Web_API_DTS.Models;

namespace Web_API_DTS.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]

    public class UsersController : ApiController
    {
        string connectionString = ConfigurationManager.ConnectionStrings["med"].ConnectionString;
        string path = WriteLog.GetUserHome();

        // POST: api/Users
        public HttpResponseMessage Post([FromBody] Users user)
        {
            if (ModelState.IsValid)
            {
                using (SqlConnection connection = new SqlConnection(connectionString))
                {
                    string query = "INSERT INTO Users (UserName,Password,Name,AddDate,Status) VALUES (@UserName,@Password,@Name,@AddDate,@Status)";

                    using (SqlCommand command = new SqlCommand(query, connection))
                    {
                        try
                        {
                            command.Parameters.AddWithValue("@UserName", user.UserName);
                            command.Parameters.AddWithValue("@Password", user.Password);
                            command.Parameters.AddWithValue("@Name", user.Name);
                            command.Parameters.AddWithValue("@AddDate", DateTime.Now);
                            command.Parameters.AddWithValue("@Status", 0);

                            connection.Open();
                            int result = command.ExecuteNonQuery();

                            // Check Error
                            if (result < 0)
                            {
                                WriteLog.WriteLogFile(path, String.Format("{0} @ {1} @{2}", "Post in UsersController:", HttpStatusCode.BadRequest, DateTime.Now));
                                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
                            }
                            else
                            {
                                WriteLog.WriteLogFile(path, String.Format("{0} @ {1} @{2}", "Post in UsersController:", HttpStatusCode.OK, DateTime.Now));
                                return new HttpResponseMessage(HttpStatusCode.OK);
                            }
                        }
                        catch (Exception ex)
                        {
                            WriteLog.WriteLogFile(path, String.Format("{0} @ {1} @{2}", "Post in UsersController:", ex.Message, DateTime.Now));

                            return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
                        }
                    }
                }
            }
            else
            {
                WriteLog.WriteLogFile(path, String.Format("{0} @ {1} @{2}", "Post in UsersController:", "inValid", DateTime.Now));
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }

               
        }
    }
}
