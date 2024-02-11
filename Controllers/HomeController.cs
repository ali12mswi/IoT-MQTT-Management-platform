using System.Web.Mvc;

namespace IoTSoftware.Controllers
{
    public class HomeController : BaseController
    {
        public HomeController()
        {


        }
        public ActionResult Index()
        {
            ViewBag.Title = "Home Page";


            return View();
        }
        public ActionResult Graphs()
        {
            return View();
        }
        public ActionResult Admin()
        {
            if (User.IsInRole("Admin")) { return View(); }
            else { return View("Index"); }

        }
        public ActionResult graph()
        {
            return View();
        }
        public ActionResult Graphics()
        {
            return View();
        }
        public ActionResult Rules()
        {
            return View();
        }
    }
}
