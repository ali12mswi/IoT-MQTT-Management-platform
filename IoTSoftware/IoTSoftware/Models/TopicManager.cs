using System.Collections.Generic;

namespace IoTSoftware.Models
{
    public class TopicManager
    {
        public static List<Topic> GetFilteredData(TopicFilter filter)
        {
            return (List<Topic>)TopicDataManager.GetFilteredData(filter);
        }
        public static int AddTopic(Topic topic)
        {
            return TopicDataManager.AddTopic(topic);
        }
        public static int UpdateTopic(Topic topic)
        {
            return TopicDataManager.UpdateTopic(topic);
        }
    }
}