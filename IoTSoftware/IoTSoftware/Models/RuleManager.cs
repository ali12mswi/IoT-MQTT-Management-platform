using System.Collections.Generic;

namespace IoTSoftware.Models
{
    public class RuleManager
    {
        public static List<MailRule> GetFilteredData(RuleFilter filter)
        {
            return (List<MailRule>)RuleDataManager.GetFilteredData(filter);
        }
        public static int AddRule(MailRule rule)
        {
            return RuleDataManager.AddRule(rule);
        }
        public static int UpdateRule(MailRule rule)
        {
            return RuleDataManager.UpdateRule(rule);
        }
    }
}