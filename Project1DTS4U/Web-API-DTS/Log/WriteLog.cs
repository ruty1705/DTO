using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;

namespace Web_API_DTS
{
    public class WriteLog
    {
        public static bool WriteLogFile(string strFileName, string strMessage)
        {
            try
            {
                //FileStream objFilestream = new FileStream(string.Format("{0}\\{1}", Path.GetTempPath(), strFileName), FileMode.Append, FileAccess.Write);
                //StreamWriter objStreamWriter = new StreamWriter((Stream)objFilestream);
                //objStreamWriter.WriteLine(strMessage);
                //objStreamWriter.Close();
                //objFilestream.Close();
                return true;
            }
            catch (Exception ex)
            {
                return false;
            }
        }



        public static string GetUserHome()
        {
            var homeDrive = Environment.GetEnvironmentVariable("HOMEDRIVE");
            if (!string.IsNullOrWhiteSpace(homeDrive))
            {
                var homePath = Environment.GetEnvironmentVariable("HOMEPATH");
                if (!string.IsNullOrWhiteSpace(homePath))
                {
                    var fullHomePath = homeDrive + Path.DirectorySeparatorChar + homePath;
                    return Path.Combine(fullHomePath, "Log");
                }
                else
                {
                    throw new Exception("Environment variable error, there is no 'HOMEPATH'");
                }
            }
            else
            {
                throw new Exception("Environment variable error, there is no 'HOMEDRIVE'");
            }
        }
    }
}
