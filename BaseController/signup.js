var signupApp = angular.module('signupApp', []);

signupApp.controller('signupController', ['$scope', '$window', 'signupService', function ($scope, $window, signupService) {
    $scope.registration = {
        Email: '',
        Password: '',
        ConfirmPassword: ''
    };

    $scope.signUp = function () {
        
        signupService.saveRegistration($scope.registration).then(function () {
            alert("Registered");
        }, function () {
            alert("Failed");
        });
    };
}]);

signupApp.factory('signupService', ['$http', function ($http) {
    var signupService = {};

    signupService.saveRegistration = function (formdata) {
        return $http.post('/api/Account/Register', formdata);
    };

    return signupService;
}]);
