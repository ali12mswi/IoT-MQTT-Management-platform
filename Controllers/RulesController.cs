using IoTSoftware.Models;
using System.Collections.Generic;
using System.Web.Http;

namespace IoTSoftware.Controllers
{
    public class RulesController : ApiController
    {
        [HttpPost]
        public List<MailRule> GetFilteredRules(RuleFilter filter)
        {
            return RuleManager.GetFilteredData(filter);
        }

        [HttpPost]
        public MailRule UpdateRule(MailRule rule)
        {

            RuleManager.UpdateRule(rule);
            return rule;


        }
        [HttpPost]
        public MailRule AddRule(MailRule rule)
        {
            RuleManager.AddRule(rule);
            return rule;
        }
    }
}
