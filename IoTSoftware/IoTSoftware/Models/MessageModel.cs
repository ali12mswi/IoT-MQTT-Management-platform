using MongoDB.Bson.Serialization.Attributes;
using System;

namespace IoTSoftware.Models
{
    public class MessageModel
    {
        [BsonId]
        [BsonRepresentation(MongoDB.Bson.BsonType.ObjectId)]
        public string Id { get; set; }
        public string topic { get; set; }
        public string message { get; set; }
        public DateTime Timestamp { get; set; } = DateTime.Now;
    }
}