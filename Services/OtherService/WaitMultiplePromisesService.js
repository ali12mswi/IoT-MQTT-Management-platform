app.service('WaitMultiplePromisesService', function ($q) {
        // Define the GET method
        this.waitMultiplePromises = function (promises) {

            var deferred = $q.defer();
            var results = [];

            var remainingPromises = promises.length;
           
            angular.forEach(promises, function (promise, index) {
                promise.then(function (result) {
                    results[index] = result;
                    remainingPromises--;

                    if (remainingPromises === 0) {
                        deferred.resolve(results);
                    }
                }, function (error) {
                    deferred.reject(error);
                });
            });
            return deferred.promise;
        }
       
    });