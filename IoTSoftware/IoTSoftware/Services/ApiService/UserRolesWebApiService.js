
app.service('UserRolesWebApiService', function (WebApiService) {
    // Define the GET method


    this.GetFiltredData = function (name) {

        return WebApiService.get('/api/AspNetUserRoles/GetUserDetails', { roleNameFilter:name } );
    }

    // Define the POST method
    this.AddRoleUser = function (userRole) {
        return WebApiService.post('/api/AspNetUserRoles/AddUserToRole', userRole);
    };

    this.UpdateRole= function (userRole) {
        return WebApiService.post('/api/AspNetUserRoles/UpdateRole', userRole);
    };

});
