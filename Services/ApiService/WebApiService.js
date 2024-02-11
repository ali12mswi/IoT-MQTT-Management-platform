app.service('WebApiService', function ($http, $q) {
    // Define the GET method
    this.get = function (url, params) {
        var deferred = $q.defer();

        $http({
            method: 'GET',
            url: url,
            params: params,
            headers: { 'Content-Type': 'application/json' }
        })
            .then(function (response) {
                deferred.resolve(response.data);
            })
            .catch(function (error) {
                deferred.reject(error);
            });

        return deferred.promise;
    };

    // Define the POST method
    this.post = function (url, parameters) {
        var deferred = $q.defer();

        $http({
            method: 'POST',
            url: url,
            data: parameters,
            headers: { 'Content-Type': 'application/json' }
        })
            .then(function (response) {
                deferred.resolve(response.data);
            })
            .catch(function (error) {
                deferred.reject(error);
            });

        return deferred.promise;
    };
});





    // Define the WebApiService service
   /* app.service('WebApiService', function ($http) {
        // Define the GET method
        this.get = function (url, params) {
            return $http({
                method: 'GET',
                url: url,
                params: params,
                headers: { 'Content-Type': 'application/json' }
            });
        };

        // Define the POST method
        this.post = function (url, parameters) {
            return $http({
                method: 'POST',
                url: url,
                data: parameters,
                headers: { 'Content-Type': 'application/json' }
            });
        };
    });
    */