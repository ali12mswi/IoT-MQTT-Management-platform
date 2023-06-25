using MongoDB.Bson.Serialization.Attributes;

namespace IoTSoftware.Models
{
    [BsonKnownTypes(typeof(Gauge), typeof(Slider))]
    public class Graph
    {
        [BsonId]
        public string Id { get; set; }
        public string Title { get; set; }
        public string Topic { get; set; }
        public GraphType Type { get; set; }
    }




    public enum GraphType
    {
        slider = 1,
        Gauge = 2,
        thermometer = 3,
    }

}
