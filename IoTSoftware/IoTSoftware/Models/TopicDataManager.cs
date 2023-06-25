using models;
using System;
using System.Collections.Generic;
using System.Data;

namespace IoTSoftware.Models
{
    public class TopicDataManager
    {
        public static object[] TopicObject(Topic topic, bool WithID = false)
        {
            if (!WithID)
            {
                object[] myArray = new object[] { topic.Name };


                return myArray;
            }
            else
            {
                object[] myArray = new object[] { topic.Id, topic.Name };

                return myArray;
            }
        }
        public static Topic TopicMapper(IDataReader reader)
        {
            return new Topic() { Name = reader["Name"].ToString(), Id = Convert.ToInt32(reader["Id"]) };
        }

        public static IEnumerable<Topic> GetFilteredData(TopicFilter filter)
        {


            // Set default value for name if it's null or empty
            string nameValue = string.IsNullOrEmpty(filter.Name) ? string.Empty : filter.Name;
            return BaseDataManager.GetSpItem<Topic>("SpGetFilteredTopics", TopicMapper, new object[] { nameValue });
        }
        public static int AddTopic(Topic topic)
        {
            return BaseDataManager.ExecuteNonQuery("SpAddTopic", TopicObject(topic));
        }
        public static int UpdateTopic(Topic topic)

        {
            return BaseDataManager.ExecuteNonQuery("SpUpdateTopic", TopicObject(topic, true));

        }
        public static int DeleteDepartement(Topic topic)
        {
            return BaseDataManager.ExecuteNonQuery("SpDeleteTopic", TopicObject(topic, true));

        }
    }
}