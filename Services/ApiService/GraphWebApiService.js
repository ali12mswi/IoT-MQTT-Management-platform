if (!app) {
    var app = angular.module("MyApp", ['ui.bootstrap']);

}
app.service('GraphWebApiService', function (WebApiService) {
    // Define the GET method


    this.GetAllGraphs = function () {

        return WebApiService.post('/api/Graph/GetAllGraphs');
    }

    // Define the POST method
    this.AddGraph = function (graph) {
       
        return WebApiService.post('/api/Graph/AddGraph', graph);
    };

    this.UpdateGraph = function (graph) {
        return WebApiService.post('/api/Graph/UpdateGraph', graph);
    };

});
