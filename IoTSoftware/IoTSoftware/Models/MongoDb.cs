using MongoDB.Driver;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IoTSoftware.Models
{
    public class MongoDb
    {
        private const string connectionString = "mongodb://localhost:27017";
        private const string databaseName = "simple_db";
        private const string collectionName = "messages";

        private static IMongoCollection<MessageModel> ConnectToMongo()
        {
            var client = new MongoClient(connectionString);
            var db = client.GetDatabase(databaseName);
            return db.GetCollection<MessageModel>(collectionName);
        }
        public static async Task<List<MessageModel>> GetAllMessages()
        {
            var messageCollection = ConnectToMongo();
            var results = await messageCollection.FindAsync(_ => true);
            return results.ToList();
        }
        public static async Task<List<MessageModel>> GetMessagesbyTopic(string topic)
        {
            var messageCollection = ConnectToMongo();
            var results = await messageCollection.FindAsync(message => message.topic == topic);
            return results.ToList();
        }
        public static async Task<List<MessageModel>> GetLastMessagesByTopic(string topic, int numMessages = 1)
        {
            var messageCollection = ConnectToMongo();
            var results = await messageCollection
                .Find(m => m.topic == topic)
                .Sort(Builders<MessageModel>.Sort.Descending(m => m.Timestamp))
                .Limit(numMessages)
                .ToListAsync();
            return results;
        }
        public static List<MessageModel> GetLastMessageForEachTopic()
        {
            var collection = ConnectToMongo();

            var result = collection.AsQueryable()
                                   .GroupBy(m => m.topic)
                                   .Select(g => g.OrderByDescending(m => m.Timestamp).FirstOrDefault())
                                   .ToList();

            return result;
        }
        public static Task AddMessage(MessageModel message)
        {
            var messageCollection = ConnectToMongo();
            return messageCollection.InsertOneAsync(message);
        }
        public static Task UpdateMessage(MessageModel message)
        {
            var messageCollection = ConnectToMongo();
            var filter = Builders<MessageModel>.Filter.Eq("Id", message.Id);
            return messageCollection.ReplaceOneAsync(filter, message, options: new ReplaceOptions { IsUpsert = true });
        }
        public static Task DeleteMessage(MessageModel message)
        {
            var messageCollection = ConnectToMongo();
            return messageCollection.DeleteOneAsync(m => m.Id == message.Id);
        }

    }
}