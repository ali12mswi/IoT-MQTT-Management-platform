using IoTSoftware.Models;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using System.Linq;
using System.Threading.Tasks;
using System.Web.Http;

namespace IoTSoftware.Controllers
{
    public class AspNetRolesController : ApiController
    {
        private ApplicationDbContext Context = new ApplicationDbContext();
        [HttpGet]
        public IHttpActionResult GetRoles()
        {
            var retval = Context.Roles.ToList();
            return Ok(retval);
        }
        [HttpPost]
        public async Task<IHttpActionResult> CreateRole(string Name)
        {
            var roleStore = new RoleStore<IdentityRole>(Context);
            var roleManager = new RoleManager<IdentityRole>(roleStore);
            var result = await roleManager.CreateAsync(new IdentityRole { Name = Name });
            return Ok(result);
        }
        [HttpDelete]
        public async Task<IHttpActionResult> Delete(string Id)
        {
            var roleStore = new RoleStore<IdentityRole>(Context);
            var roleManager = new RoleManager<IdentityRole>(roleStore);
            var role = await roleManager.FindByIdAsync(Id);
            var result = await roleManager.DeleteAsync(role);
            return Ok(result);



        }
    }
}
