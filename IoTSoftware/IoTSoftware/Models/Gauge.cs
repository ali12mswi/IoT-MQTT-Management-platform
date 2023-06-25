namespace IoTSoftware.Models
{
    public class Gauge : Graph
    {
        public double Min { get; set; }
        public double Max { get; set; }
        public string Unit { get; set; }
    }
}