using IoTSoftware.Models;
using System.Web.Http;
using System.Web.Mvc;
using System.Web.Optimization;
using System.Web.Routing;
using Unity;
using Unity.AspNet.Mvc;

namespace IoTSoftware
{
    public class WebApiApplication : System.Web.HttpApplication
    {
        protected void Application_Start()
        {
            var mqttService = new MqttService();
            DependencyResolver.SetResolver(new UnityDependencyResolver(UnityConfig.Container));
            UnityConfig.Container.RegisterInstance<IMqttService>(mqttService);

            // Start the MqttService
            _ = mqttService.StartAsync();
            AreaRegistration.RegisterAllAreas();
            GlobalConfiguration.Configure(WebApiConfig.Register);
            FilterConfig.RegisterGlobalFilters(GlobalFilters.Filters);
            RouteConfig.RegisterRoutes(RouteTable.Routes);
            BundleConfig.RegisterBundles(BundleTable.Bundles);
        }
    }
}
