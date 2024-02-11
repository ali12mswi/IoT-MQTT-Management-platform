using IoTSoftware.Models;
using Models;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Web.Http;


namespace IoTSoftware.Controllers
{
    public class MessageController : ApiController
    {
        private MqttClientWrapper mqttClient;
        MessageController()
        {
            this.mqttClient = MqttClientWrapper.Instance;

        }
        [HttpGet]
        public async Task<List<MessageModel>> GetAllMessages()
        {
            var messages = await MongoDb.GetAllMessages();
            return messages;
        }
        [HttpPost]
        public async Task<List<MessageModel>> GetLastMessagesByTopicAsync(MessageFilter Filter)
        {
            var messages = await MongoDb.GetLastMessagesByTopic(Filter.Name, Filter.number);

            return messages;
        }
        [HttpPost]
        public void PublishMessage(MessageModel message)
        {
            mqttClient.PublishToTopic(message.topic, message.message);
        }


    }
}
