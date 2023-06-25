using MQTTnet;
using MQTTnet.Server;

using System.Text;
using System.Threading.Tasks;

namespace IoTSoftware.Models
{

    public class MqttService : IMqttService
    {
        private readonly MqttServer mqttServer;

        // Connection string for your database

        public MqttService()
        {


            // Create the options for the MQTT broker
            var options = new MqttServerOptionsBuilder()
                .WithDefaultEndpoint()
                .WithDefaultEndpointPort(1884);


            // Create a new mqtt server
            mqttServer = new MqttFactory().CreateMqttServer(options.Build());

            // Add the InterceptingPublishAsync event handler
            mqttServer.InterceptingPublishAsync += Server_InterceptingPublishAsync;
        }

        public async Task StartAsync()
        {
            // Start the MQTT server
            await mqttServer.StartAsync();

        }

        public async Task StopAsync()
        {
            // Stop the MQTT server
            await mqttServer.StopAsync();
        }

        private async Task Server_InterceptingPublishAsync(InterceptingPublishEventArgs arg)
        {
            // Convert Payload to string
            var payload = arg.ApplicationMessage?.Payload == null ? null : Encoding.UTF8.GetString(arg.ApplicationMessage?.Payload);

            await MongoDb.AddMessage(new MessageModel { message = payload, topic = arg.ApplicationMessage?.Topic });
            await MailService.CheckThresholdAsync(arg.ApplicationMessage?.Topic, payload);

        }
    }
    public interface IMqttService
    {
        Task StartAsync();
        Task StopAsync();
    }

}