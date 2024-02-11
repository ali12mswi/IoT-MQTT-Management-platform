using IoTSoftware.Models;
using System.Collections.Generic;
using System.Web.Http;

namespace IoTSoftware.Controllers
{
    public class TopicController : ApiController
    {
        [HttpPost]
        public List<Topic> GetFilteredTopics(TopicFilter filter)
        {
            return TopicManager.GetFilteredData(filter);
        }

        [HttpPost]
        public Topic UpdateTopic(Topic topic)
        {

            TopicManager.UpdateTopic(topic);
            return topic;


        }
        [HttpPost]
        public Topic AddTopic(Topic topic)
        {
            TopicManager.AddTopic(topic);
            return topic;
        }
    }
}
