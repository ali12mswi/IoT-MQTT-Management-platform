if (!app) {
    var app = angular.module("MyApp", ['ui.bootstrap']);

}
app.service('RulesWebApiService', function (WebApiService) {
    // Define the GET method


    this.GetFiltredData = function (topic) {

        return WebApiService.post('/api/Rules/GetFilteredRules', { Topic: topic });
    }

    // Define the POST method
    this.AddRule = function (Rule) {
        return WebApiService.post('/api/Rules/AddRule', Rule);
    };

    this.UpdateRule = function (Rule) {
        return WebApiService.post('/api/Rules/UpdateRule', Rule);
    };

});
