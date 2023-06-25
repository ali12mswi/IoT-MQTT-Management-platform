using System.Web.Mvc;

namespace IoTSoftware.Controllers
{
    public class BaseController : Controller
    {
        // GET: Base
        protected override void OnActionExecuting(ActionExecutingContext filterContext)
        {
            if (!User.Identity.IsAuthenticated)
            {
                filterContext.Result = Redirect("https://localhost:44350/Services/Templates/login.html");
            }

            base.OnActionExecuting(filterContext);
        }
    }
}