using IoTSoftware.Models;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Web.Http;

namespace IoTSoftware.Controllers
{
    public class GraphController : ApiController
    {
        [HttpPost]
        public async Task<List<Graph>> GetAllGraphs()
        {
            var graphs = await GraphDb.GetAllGraphs();
            return graphs;
        }
        [HttpPost]
        public async Task AddGraph(Graph graph)
        {
            await GraphDb.AddGraph(graph);
        }
        [HttpPost]
        public async Task UpdateGraph(Graph graph)
        {
            await GraphDb.UpdateGraph(graph);
        }
        [HttpPost]
        public async Task DeleteGraph(Graph graph)
        { await GraphDb.DeleteGraph(graph); }
    }
}
