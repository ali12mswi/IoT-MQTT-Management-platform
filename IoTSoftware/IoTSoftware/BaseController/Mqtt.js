var client = new Paho.MQTT.Client("192.168.1.5", 8883, "clientId");

client.connect({
    useSSL: true,
    onSuccess: function () {
        console.log("Connected to MQTT broker");
        client.subscribe("my/topic");
    },
    onFailure: function (err) {
        console.log("Failed to connect to MQTT broker: " + err.errorMessage);
    }
});

client.onMessageArrived = function (message) {
    console.log("Message received on topic " + message.destinationName + ": " + message.payloadString);
};

