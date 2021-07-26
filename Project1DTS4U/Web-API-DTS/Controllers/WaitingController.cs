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

    public class WaitingController : ApiController
    {
        string connectionString = ConfigurationManager.ConnectionStrings["med"].ConnectionString;
        string path = WriteLog.GetUserHome();

        // GET: api/Waiting
        //[Authorize]
        public IEnumerable<Waiting> Get()
        {
            DateTime dateVal = DateTime.MinValue;
            DateTime dateValAdddate = DateTime.MinValue;

            List<Waiting> waitingList = new List<Waiting>();
            string queryString = @"SELECT w.Id,u.Name,w.UserId, w.DateAdded,w.DateQueue
                                   FROM Waiting w LEFT JOIN Users u ON w.UserId=u.Id";
            using (SqlConnection con = new SqlConnection(connectionString))
            {
                using (SqlCommand cmd = new SqlCommand(queryString, con))
                {
                    con.Open();
                    using (SqlDataReader dr = cmd.ExecuteReader())
                    {
                        while (dr.Read())
                        {
                            DateTime.TryParse(dr["DateQueue"].ToString(), out dateVal);
                            DateTime.TryParse(dr["DateAdded"].ToString(), out dateValAdddate);
                            waitingList.Add(new Waiting
                            {
                                UserId = int.Parse(dr["UserId"].ToString()),
                                Id = int.Parse(dr["Id"].ToString()),
                                Name = dr["Name"].ToString(),
                                DateQueue = dateVal,
                                DateAdded = dateValAdddate,
                                TimeQueue = dateVal.Hour.ToString("00.##") + ":" + dateVal.Minute.ToString("00.##")
                            });
                        }
                    }
                    con.Close();
                
                }
            }
            return waitingList;
        }


        // GET: api/Waiting/5
        public string Get(int id)
        {
            return "value";
        }

        // POST: api/Waiting
        public void Post([FromBody] Waiting waiting)
        {
            string massage = "";

            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                string query = @"INSERT INTO Waiting  (UserId,DateQueue,DateAdded)
                                 VALUES (@UserId, @DateQueue ,@DateAdded)   ";

                using (SqlCommand command = new SqlCommand(query, connection))
                {
                    try
                    {
                        waiting.DateQueue = getDateAndTime(waiting.DateQueue, waiting.TimeQueue);

                        command.Parameters.AddWithValue("@UserId", waiting.UserId);
                        command.Parameters.AddWithValue("@DateQueue", waiting.DateQueue);
                        command.Parameters.AddWithValue("@DateAdded", DateTime.Now);

                        connection.Open();
                        int result = command.ExecuteNonQuery();
                        massage = "ההוספה בוצעה בהצלחה";
                    }
                    catch (Exception ex)
                    {
                        massage = ex.Message.ToString();
                        WriteLog.WriteLogFile(path, String.Format("{0} @ {1} @{2}", "Post in WaitingController:", ex.Message, DateTime.Now));
                    }
                }
            }
        }

        private DateTime getDateAndTime(DateTime dateQueue, string timeQueue)
        {
            TimeSpan ts = TimeSpan.Parse(timeQueue);
            int hours = ts.Hours;
            int minutes = ts.Minutes;
            return dateQueue.AddHours(hours).AddMinutes(minutes);
        }

        // PUT: api/Waiting/5
        public void Put([FromBody] Waiting waiting)
        {
            string message = "";

            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                string query = @"Update Waiting  
                                 SET DateQueue=@DateQueue                              
                                 WHERE Id=@Id";

                using (SqlCommand command = new SqlCommand(query, connection))
                {
                    try
                    {
                        waiting.DateQueue = getDateAndTime(waiting.DateQueue, waiting.TimeQueue);

                        command.Parameters.AddWithValue("@Id", waiting.Id);
                        command.Parameters.AddWithValue("@DateQueue", waiting.DateQueue);
                        connection.Open();
                        int result = command.ExecuteNonQuery();
                        message = "העדכון בוצע בהצלחה";
                        WriteLog.WriteLogFile(path, String.Format("{0} @ {1} @{2}", "Put in WaitingController:", message, DateTime.Now));

                    }
                    catch (Exception ex)
                    {
                        message = ex.Message.ToString();
                        WriteLog.WriteLogFile(path, String.Format("{0} @ {1} @{2}", "Put in WaitingController:", ex.Message, DateTime.Now));
                    }
                }
            }
        }

        // DELETE: api/Waiting/5
        public string Delete(int id)
        {
            string message = "";
            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                string query = "DELETE FROM Waiting WHERE Id=@Id";

                using (SqlCommand command = new SqlCommand(query, connection))
                {
                    try
                    {
                        command.Parameters.AddWithValue("@Id", id);
                     
                        connection.Open();
                        int result = command.ExecuteNonQuery();
                        message = "מחיקה בוצעה בהצלחה";
                        WriteLog.WriteLogFile(path, String.Format("{0} @ {1} @{2}", "Delete in WaitingController:", message, DateTime.Now));

                    }
                    catch (Exception ex)
                    {
                        message = ex.Message.ToString();
                        WriteLog.WriteLogFile(path, String.Format("{0} @ {1} @{2}", "Delete in WaitingController:", message, DateTime.Now));

                    }
                }
            }
            return message;

        }
    }
}
