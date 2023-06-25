using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;

namespace models
{
    public class BaseDataManager
    {
        static string cs = ConfigurationManager.ConnectionStrings["cs"].ConnectionString;
        static SqlConnection con = new SqlConnection(cs);

        public static int ExecuteNonQuery(string storedProcedureName, params object[] parameters)
        {
            int affectedRows = 0;
            using (SqlConnection connection = new SqlConnection(cs))
            {
                using (SqlCommand command = new SqlCommand(storedProcedureName, connection))
                {
                    connection.Open();
                    command.CommandType = CommandType.StoredProcedure;
                    SqlCommandBuilder.DeriveParameters(command);

                    int count = command.Parameters.Count;
                    for (int i = 0; i < count - 1; i++)
                    {
                        command.Parameters[i + 1].Value = parameters[i];
                    }

                    affectedRows = command.ExecuteNonQuery();
                }
            }
            return affectedRows;
        }



        public static IEnumerable<T> GetSpItem<T>(string storedprocedure, Func<IDataReader, T> mapper, params object[] parameters)
        {
            List<T> Items = new List<T>();
            using (SqlConnection connection = new SqlConnection(cs))
            {
                using (SqlCommand cmd = new SqlCommand(storedprocedure, connection))
                {
                    cmd.CommandType = CommandType.StoredProcedure;

                    connection.Open();
                    SqlCommandBuilder.DeriveParameters(cmd);
                    int count = cmd.Parameters.Count;
                    for (int i = 0; i < count - 1; i++)
                    {
                        cmd.Parameters[i + 1].Value = parameters[i];
                    }
                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        while (reader.Read())
                        {
                            Items.Add(mapper(reader));

                        }
                    }
                }
            }
            return Items;
        }

    }
}