using models;
using System;
using System.Collections.Generic;
using System.Data;

namespace IoTSoftware.Models
{
    public class RuleDataManager
    {
        public static object[] RuleObject(MailRule rule, bool WithID = false)
        {
            if (!WithID)
            {
                object[] myArray = new object[] { rule.Topic, rule.ThresholdValue, rule.Operator, rule.EmailSubject, rule.EmailAddress, rule.EmailBody };


                return myArray;
            }
            else
            {
                object[] myArray = new object[] { rule.Id, rule.Topic, rule.ThresholdValue, rule.Operator, rule.EmailSubject, rule.EmailAddress, rule.EmailBody };

                return myArray;
            }
        }
        public static MailRule RuleMapper(IDataReader reader)
        {
            return new MailRule() { Topic = reader["Topic"].ToString(), Id = Convert.ToInt32(reader["Id"]), ThresholdValue = ((double)reader["ThresholdValue"]), Operator = (Operator)Convert.ToInt32(reader["Operator"]), EmailAddress = reader["EmailAddress"].ToString(), EmailSubject = reader["EmailSubject"].ToString(), EmailBody = reader["EmailBody"].ToString() };
        }

        public static IEnumerable<MailRule> GetFilteredData(RuleFilter filter)
        {


            // Set default value for name if it's null or empty
            string topicValue = string.IsNullOrEmpty(filter.Topic) ? string.Empty : filter.Topic;
            return BaseDataManager.GetSpItem<MailRule>("SpGetFilteredRules", RuleMapper, new object[] { topicValue });
        }
        public static int AddRule(MailRule rule)
        {
            return BaseDataManager.ExecuteNonQuery("SpAddRule", RuleObject(rule));
        }
        public static int UpdateRule(MailRule rule)

        {
            return BaseDataManager.ExecuteNonQuery("SpUpdateRule", RuleObject(rule, true));

        }
        public static int DeleteRule(MailRule rule)
        {
            return BaseDataManager.ExecuteNonQuery("SpDeleteRule", RuleObject(rule, true));

        }


    }
}