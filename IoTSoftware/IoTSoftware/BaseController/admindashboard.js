var app = angular.module("myApp", ["ngRoute",'LocalStorageModule', 'AuthApp']);

app.config(function ($routeProvider, $httpProvider) {
    $httpProvider.interceptors.push('authInterceptorService');
    $routeProvider
        .when("/", {
            templateUrl: "/view/Dashboard.html",
            controller: "HomeController"
        })
        .when("/Users", {
            templateUrl: "/view/Users.html",
            controller: "UsersController"
        })
        .when("/Report", {
            templateUrl: "/view/Reports.html",
            controller: "ReportController"
        })
        .when("/Roles", {
            templateUrl: "/view/role.html",
            controller: "manageRoleController"
        })
        .otherwise({
            redirectTo: "/"
        });
});

app.controller("MenuController", function ($scope) {
    var activeLink = 'dashboard';
    var currentUrl = window.location.href;
    if (currentUrl.includes('/Users'))
    { activeLink = 'users'; }
    else if (currentUrl.includes('/Report')) { activeLink = 'reports'; }
    else if (currentUrl.includes('/Roles')) { activeLink = 'roles'; }
    else {  activeLink = 'dashboard'; }
    console.log(currentUrl);

    $scope.isActive = function (link) {
        return activeLink === link;
    };

    $scope.setActive = function (link) {
        activeLink = link;
    };
    
});


app.controller("HomeController", function ($scope) {
    // Controller logic for the home page
});
app.controller("UsersController", function ($scope, UserRolesWebApiService, manageRoleService, signupService) {
    $scope.scopeModel = {};
        $scope.scopeModel.selectedRole = '';
    $scope.scopeModel.Id = "";
    var modal = document.getElementById("myAddUserModal");
    var rolemodal = document.getElementById("roleModal");

    $scope.scopeModel.registration = {
        Email: '',
        Password: '',
        ConfirmPassword: ''
    };
    $scope.scopeModel.openModal = function () {
        $scope.scopeModel.registration = {
            Email: '',
            Password: '',
            ConfirmPassword: ''
        };
        modal.style.display = "block";

      
    }

    // Function to close the modal
    $scope.scopeModel.closeModal = function () {
        modal.style.display = "none";
        $scope.scopeModel.registration = {
            Email: '',
            Password: '',
            ConfirmPassword: ''
        };
    };
    $scope.scopeModel.openRoleModal = function (user) {
        $scope.scopeModel.selectedRole = user.RoleName;
        $scope.scopeModel.Id = user.Id;
        rolemodal.style.display = "block";
        if(!$scope.scopeModel.Roles)
        load();

    }

    // Function to close the modal
    $scope.scopeModel.closeRoleModal = function () {
        rolemodal.style.display = "none";
        $scope.scopeModel.selectedRole = '';
        $scope.scopeModel.Id= '';

    };
    $scope.scopeModel.putRole = function () {
        UserRolesWebApiService.AddRoleUser({ userId: $scope.scopeModel.Id, roleName: $scope.scopeModel.selectedRole })
            .then(function () {
                rolemodal.style.display = "none";
                UserRolesWebApiService.GetFiltredData($scope.scopeModel.role).then(function (response) {
                    console.log(response);
                    $scope.scopeModel.Users = response
                }
                    , function () { alert("Error on load Data") })
            })
            .catch(function () {
                alert("Failed To Add Role");
            })
        
    }

    function closeModal() {
        modal.style.display = "none";
        $scope.RoleName = '';
    }
    $scope.scopeModel.signUp = function () {
        console.log("hi");
        signupService.saveRegistration($scope.scopeModel.registration).then(function () {

            alert("Registered");
            closeModal();
        }, function (response) {console.log(response)
            var detail = "";
            
            var passwordState = response.data.ModelState["model.Password"];
            var modelState = response.data.ModelState[""];
            if (modelState)
               modelState.forEach((item) => { detail += item + "\n" });

            if(passwordState)
            passwordState.forEach((item) => { detail += item + "\n" });
            alert(response.data.Message+"\n"+detail);
            closeModal();
            load();
        });
    };
    function load() {
        manageRoleService.GetAllRoles().then(function (response) {
            $scope.scopeModel.Roles = response.data;

        }, function () { alert("Failed ") })
    }

    $scope.scopeModel.role = "";
   
    UserRolesWebApiService.GetFiltredData($scope.scopeModel.role).then(function (response)
    {
        console.log(response);
        $scope.scopeModel.Users = response
    }
        , function () { alert("Error on load Data") })
    // Controller logic for the home page
});


app.factory('signupService', ['$http', function ($http) {
    var signupService = {};

    signupService.saveRegistration = function (formdata) {
        return $http.post('/api/Account/Register', formdata);
    };

    return signupService;
}]);

app.controller('manageRoleController', ['$scope', 'manageRoleService','UserRolesWebApiService' ,function ($scope, manageRoleService, UserRolesWebApiService) {
   // UserRolesWebApiService.AddRoleUser({ userId: "a363d638-3d3f-451e-8370-f2c3caf0066c", roleName: "Admin" });;
    $scope.init = function () {
        manageRoleService.GetAllRoles().then(function (response) {
            $scope.Roles = response.data;

        }, function () { alert("Failed ") })
    }
    $scope.init();
    var modal = document.getElementById("myAddModal");

    // Function to open the modal
    $scope.openModal=function() {
        modal.style.display = "block";

        console.log("hi")
    }

    // Function to close the modal
    $scope.closeModal = function () {
        modal.style.display = "none";
        $scope.RoleName = '';
};
    function closeModal() {
        modal.style.display = "none";
        $scope.RoleName = '';
    }
    $scope.createRole = function () {
        manageRoleService.CreateRole($scope.RoleName).then(function () {
            closeModal();
        }, function () { alert("Failed to Create") })
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
app.factory('manageRoleService', ['$http', function ($http) {
    var manageRoleAppfactory = {};
    manageRoleAppfactory.GetAllRoles = function () {
        return $http.get('/api/AspNetRoles/GetRoles')

    }
    manageRoleAppfactory.CreateRole = function (newRoleName) {
        return $http.post('/api/AspNetRoles/CreateRole?Name=' + newRoleName)

    }
    manageRoleAppfactory.DeleteRole = function (Id) {
        return $http.delete('/api/AspNetRoles/' + Id)

    }
    return manageRoleAppfactory;
}])

app.controller("ReportController", function ($scope,MessageWebApiService) {
    function saveFile(blob, filename) {
        if (window.navigator.msSaveOrOpenBlob) {
            console.log("Using msSaveOrOpenBlob");
            window.navigator.msSaveOrOpenBlob(blob, filename);
        } else {
            console.log("Using createObjectURL");
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            document.body.appendChild(a);
            a.download = filename;
            a.href = url;
            console.log("Before click");
            a.click();
            console.log("After click");
            setTimeout(() => {
                window.URL.revokeObjectURL(url);
                document.body.removeChild(a);
                console.log("ok");
            }, 0);
        }
    }


    $scope.disable = true;
   // var array = [{ Topic: 1, Message: "Ali", DateTime: 12 }]
    MessageWebApiService.GetAllMessages().then(function (response) {
        array = response;
        $scope.disable = false;
},
        function () { alert("Error"); }    )

    $scope.createCsv = function () {
        console.log("hi")
        let csvContent = "Topic,Message,DateTime\n";
        array.forEach((item) => {
            let row = item.topic + "," + item.message + "," + item.Timestamp + "\n";
            csvContent += row;
        });
        var data = new Blob([csvContent], { type: 'text/csv' });
        saveFile(data, "test.csv");
    }
});
