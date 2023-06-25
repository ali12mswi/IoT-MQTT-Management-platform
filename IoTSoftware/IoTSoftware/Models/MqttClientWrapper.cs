
using System;
using System.Text;
using uPLibrary.Networking.M2Mqtt;
using uPLibrary.Networking.M2Mqtt.Messages;

namespace Models
{
    public class MqttClientWrapper
    {
        //private readonly IHubContext<MyHub> _hubContext;//
        public MqttClient client;
        private static MqttClientWrapper instance = null;
        private static readonly object padlock = new object();


        private MqttClientWrapper()
        {
            this.client = new MqttClient("127.0.0.1", 1884, false, null, null, MqttSslProtocols.None); // Replace with your broker's address
            this.client.MqttMsgSubscribed += client_MqttMsgSubscribed;
            this.client.MqttMsgUnsubscribed += client_MqttMsgUnsubscribed;
            this.client.ConnectionClosed += client_ConnectionClosed;
            this.client.Connect(Guid.NewGuid().ToString());
            this.client.Subscribe(new string[] { "my/topic" }, new byte[] { MqttMsgBase.QOS_LEVEL_AT_LEAST_ONCE
});
        }


        public void PublishToTopic(string topic, string message)
        {
            this.client.Publish(topic, Encoding.UTF8.GetBytes(message), MqttMsgBase.QOS_LEVEL_AT_LEAST_ONCE, false);
        }

        public static MqttClientWrapper Instance
        {
            get
            {
                lock (padlock)
                {
                    if (instance == null)
                    {
                        instance = new MqttClientWrapper();
                    }
                    return instance;
                }
            }
        }

        private void client_MqttMsgSubscribed(object sender, MqttMsgSubscribedEventArgs e)
        {
            // Handle subscription confirmation here
        }

        private void client_MqttMsgUnsubscribed(object sender, MqttMsgUnsubscribedEventArgs e)
        {
            // Handle unsubscription confirmation here
        }

        private void client_ConnectionClosed(object sender, EventArgs e)
        {
            // Handle disc}
        }
    }
}