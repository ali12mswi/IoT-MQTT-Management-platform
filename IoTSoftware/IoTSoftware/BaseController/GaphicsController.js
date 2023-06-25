"use strict"




function baseController($q, $scope, GraphWebApiService, ModalService, PaginationService, GraphService, WebApiService) {

    $scope.UniversityApi = {};
    defineScope();
    load();



    function defineScope() {
       
     //  GraphWebApiService.AddGraph({$type:"IoTSoftware.Models.Gauge, IoTSoftware",Title:"Water Level",Topic:"water",Type:2,Max:300,Min:150,Unit:"L"});
        $scope.scopeModel = {};
        $scope.scopeModel.GenderApi = {};
        $scope.scopeModel.pages = [];
        $scope.scopeModel.DepartmentApi = {};
        $scope.scopeModel.Students = [];
        $scope.scopeModel.filter = {};//all filter For Student
        $scope.scopeModel.currentPage = 1;
        
        // input selection
        $scope.scopeModel.OnGenderSelected = function () {
            $scope.scopeModel.filter.gender = $scope.scopeModel.GenderApi.getData();

        }

        $scope.scopeModel.setCurrentPage = function (page) {
            if (page > 0 && page <= $scope.scopeModel.pages.length) {
                $scope.scopeModel.currentPage = page;
                return PaginationService.setCurrentPage($scope.scopeModel.Students, $scope.scopeModel.pages[page - 1]);
            }
        };
        //Api Call Here:
        //Add Student
        $scope.scopeModel.AddGraph = function () {
            console.log("hi")
            GraphService.addGraph($scope.load);

        };
        //Update Student
        $scope.scopeModel.Edit = function (S) {
           

                GraphService.editGraph(S, $scope.load)
            
        }
        $scope.load = function () { load(); }
        $scope.scopeModel.change = function () {
            //$scope.scopeModel.OnGenderSelected();
            console.log($scope.scopeModel.filter)
            load();
        }

        $scope.scopeModel.getTypeDescription = function (TypeValue) {
            
            for (var key in GraphEnum) {
                if (GraphEnum[key].value === TypeValue) {
                    return GraphEnum[key].description;
                }
            }
            return '';
        }
        //Directives
        $scope.scopeModel.onGenderSelectorReady = function (api) {
            var deffered = $q.defer()
            $scope.scopeModel.GenderApi = api;
            deffered.resolve();
            deffered.promise.then(function () { loadGenderSelector() })

        };
        $scope.scopeModel.onUniversitySelectorReady = function (api) {
            var deffered = $q.defer()
            $scope.UniversityApi = api;
            deffered.resolve();
            loadUniversitySelector();

        }
        $scope.scopeModel.onDepartmentSelectorReady = function (api) {
            $scope.scopeModel.DepartmentApi = api;
            $scope.scopeModel.DepartmentApi.onSelectionChanged = function (val) {
                console.log($scope.scopeModel.filter);
                $scope.scopeModel.filter.DepartementId = val;
                console.log($scope.scopeModel.filter);
            }
        }


    }
    function load() {
        function loadAllControllers() {

            function loadStaticData() {
            };
            function loadData() {

                $scope.scopeModel.Students = []

                GraphWebApiService.GetAllGraphs().then(function (response) {

                    $scope.scopeModel.Students = response
                    console.log(response)

                    $scope.scopeModel.setCurrentPage(1);

                    $scope.scopeModel.pages = PaginationService.getPages($scope.scopeModel.Students.length);

                    $scope.scopeModel.setCurrentPage(1);


                },
                    function (response) { console.log("Error"); });
            };
            loadStaticData();
            loadData();
        }
        loadAllControllers();
    }
    function waitMultiplePromises(promises) {
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

    function loadGenderSelector() {
        var deferred = $q.defer();
        // Load gender selector directive

        $scope.scopeModel.GenderApi.load({}).then(function (result) {
            $scope.scopeModel.GenderApi.onSelectionChanged = function (val) {
                console.log(val)
                $scope.scopeModel.filter.gender = val;
            }
            deferred.resolve();
        }, function (error) {
            deferred.reject(error);
        });
        return deferred.promise;
    }
    function loadUniversitySelector() {

        var deffered = $q.defer();
        $scope.UniversityApi.load({}).then(function (result) {
            $scope.UniversityApi.onSelectionChanged = function (val) {
                console.log($scope.scopeModel.filter);
                $scope.scopeModel.filter.UniversityId = val;
                loadDepartmentSelector(val);
                console.log($scope.scopeModel.filter);
            }
            deffered.resolve();
        },
            function (error) { deffered.reject(error); })
        return deffered.promise;
    }
    function loadDepartmentSelector(UniversityId) {
        console.log($scope.scopeModel.DepartmentApi)
        var deffered = $q.defer();
        $scope.scopeModel.DepartmentApi.load({ UniversityId: UniversityId }).then(function (result) {

            deffered.resolve();
        },
            function (error) { deffered.reject(error); })
        return deffered.promise;
    }

}

app.controller("graphic_controller", baseController);








