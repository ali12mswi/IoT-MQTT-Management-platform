using MongoDB.Bson;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IoTSoftware.Models
{
    public class GraphDb
    {


        private const string connectionString = "mongodb://localhost:27017";
        private const string databaseName = "simple_db";
        private const string collectionName = "graphs";

        private static IMongoCollection<Graph> ConnectToMongo()
        {
            var client = new MongoClient(connectionString);
            var db = client.GetDatabase(databaseName);
            return db.GetCollection<Graph>(collectionName);


        }
        public static async Task<List<Graph>> GetAllGraphs()
        {
            var messageCollection = ConnectToMongo();
            var filter = Builders<Graph>.Filter.Empty;

            List<Graph> results;

            try
            {
                results = await messageCollection.Find(filter).ToListAsync();
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error querying MongoDB: {ex.Message}");
                results = new List<Graph>();
            }

            return results;
        }





        public static async Task<List<Graph>> GetGraphsbyTopic(string topic)
        {
            var messageCollection = ConnectToMongo();
            var results = await messageCollection.FindAsync(graph => graph.Topic == topic);
            return results.ToList();
        }
        public static Task AddGraph(Graph message)
        {
            message.Id = ObjectId.GenerateNewId().ToString();
            var messageCollection = ConnectToMongo();
            return messageCollection.InsertOneAsync(message);
        }
        public static Task UpdateGraph(Graph message)
        {
            var messageCollection = ConnectToMongo();
            var filter = Builders<Graph>.Filter.Eq("Id", message.Id);
            return messageCollection.ReplaceOneAsync(filter, message, options: new ReplaceOptions { IsUpsert = true });
        }
        public static Task DeleteGraph(Graph graph)
        {
            var messageCollection = ConnectToMongo();
            return messageCollection.DeleteOneAsync(m => m.Id == graph.Id);
        }

    }

}
