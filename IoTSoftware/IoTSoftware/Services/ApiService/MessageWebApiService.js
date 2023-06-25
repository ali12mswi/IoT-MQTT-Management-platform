if (!app) {
    var app = angular.module("MyApp", ['ui.bootstrap']);

}
app.service('MessageWebApiService', function (WebApiService) {
    // Define the GET method

    this.GetAllMessages = function () {
        return WebApiService.get('/api/Message/GetAllMessages');
    }
    this.GetFiltredData = function (name,number) {

        return WebApiService.post('/api/Message/GetLastMessagesByTopicAsync', { Name: name,number:number });
    }
    this.PublishMessage = function (message,topic) {
        return WebApiService.post('/api/Message/PublishMessage', { message: message , topic: topic });
    }

    // Define the POST method
 

});
