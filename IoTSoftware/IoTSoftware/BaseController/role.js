var managerRoleApp = angular.module('managerRoleApp', ['LocalStorageModule','AuthApp']);
managerRoleApp.config(function ($httpProvider) {
    $httpProvider.interceptors.push('authInterceptorService');


})
managerRoleApp.controller('manageRoleController', ['$scope', 'manageRoleService', function ($scope,manageRoleService) {
    $scope.init = function () {
        manageRoleService.GetAllRoles().then(function (response) {
            $scope.Roles = response.data;

        }, function () {alert("Failed ") } )
    }
    $scope.init();
    $scope.createRole = function () {
        manageRoleService.CreateRole($scope.RoleName).then(function () {

        }, function () {alert("Failed to Create") })
    }
    $scope.DeleteRole = function (Id) {
        manageRoleService.DeleteRole(Id).then(function () {
            alert("Deleted");
            $scope.init();
        }, function () {
            alert("failed to Delete . Try Again");

        })
    }

}])
managerRoleApp.factory('manageRoleService', ['$http', function ($http) {
    var manageRoleAppfactory = {};
    manageRoleAppfactory.GetAllRoles = function () {
        return $http.get('/api/AspNetRoles/GetRoles')

    }
    manageRoleAppfactory.CreateRole = function (newRoleName) {
        return $http.post('/api/AspNetRoles/CreateRole?Name='+newRoleName)

    }
    manageRoleAppfactory.DeleteRole = function (Id) {
      return  $http.delete('/api/AspNetRoles/'+Id)

    }
    return manageRoleAppfactory;
}])