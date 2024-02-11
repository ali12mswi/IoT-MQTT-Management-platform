var loginApp = angular.module('loginApp', ['LocalStorageModule', 'AuthApp']);
loginApp.config(function ($httpProvider) {
    $httpProvider.interceptors.push('authInterceptorService');
});
//loginApp.run(['authService', function (authService) {
  //  authService.fillAuthData();

//}])
loginApp.controller('loginController', ['$scope', '$window', 'authService', function ($scope, $window, authService) {

    $scope.init = function () {
        $scope.isProcessing = false;
        $scope.LoginBtnText = "Sign In";

    }
    $scope.init();
    $scope.loginData = {
        userName: "",
        password:""
        }
    $scope.Login = function () {
       
        $scope.isProcessing = true;
        $scope.LoginBtnText = "Sign In....";
        authService.login($scope.loginData).then(function (response) {
            alert("login successfully");
            $window.location.href = '/Home/Index';
        }, function () { alert("Failed. Please try again"); $scope.init(); })
    }


}])