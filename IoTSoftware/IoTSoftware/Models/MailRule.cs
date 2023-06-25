using System;

namespace IoTSoftware.Models
{
    public class MailRule
    {

        public int Id { get; set; }
        public string Topic { get; set; }
        public double ThresholdValue { get; set; }
        public Operator Operator { get; set; }
        public string EmailAddress { get; set; }
        public string EmailSubject { get; set; }
        public string EmailBody { get; set; }
        public DateTime LastTriggeredAt { get; set; }

    }
    public enum Operator
    {
        equal = 1,
        greaterThan = 2,
        lessThan = 3,
        greaterThanOrEqual = 4
    }
}