if (!app) {
    var app = angular.module("MyApp", ['ui.bootstrap']);
    
}
app.service('TopicWebApiService', function (WebApiService) {
    // Define the GET method
   

    this.GetFiltredData = function (name) {

        return WebApiService.post('/api/Topic/GetFilteredTopics', { Name: name });
    }

    // Define the POST method
    this.AddTopic = function (Topic) {
        return WebApiService.post('/api/Topic/AddTopic', Topic);
    };
    
    this.UpdateTopic = function (topic) {
        return WebApiService.post('/api/Topic/UpdateTopic', topic);
    };

});
