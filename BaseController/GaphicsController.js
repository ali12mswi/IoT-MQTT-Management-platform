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
       

        $scope.scopeModel.setCurrentPage = function (page) {
            if (page > 0 && page <= $scope.scopeModel.pages.length) {
                $scope.scopeModel.currentPage = page;
                return PaginationService.setCurrentPage($scope.scopeModel.Students, $scope.scopeModel.pages[page - 1]);
            }
        };
        //Api Call Here:
        
        $scope.scopeModel.AddGraph = function () {
            
            GraphService.addGraph($scope.load);

        };
      
        $scope.scopeModel.Edit = function (S) {
           

                GraphService.editGraph(S, $scope.load)
            
        }
        $scope.load = function () { load(); }
        $scope.scopeModel.change = function () {
            
            
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
        


    }
    function load() {
        function loadAllControllers() {

            function loadStaticData() {
            };
            function loadData() {

                $scope.scopeModel.Students = []

                GraphWebApiService.GetAllGraphs().then(function (response) {

                    $scope.scopeModel.Students = response;
                  

                    $scope.scopeModel.setCurrentPage(1);

                    $scope.scopeModel.pages = PaginationService.getPages($scope.scopeModel.Students.length);

                    $scope.scopeModel.setCurrentPage(1);


                },
                    function (response) {  });
            };
            loadStaticData();
            loadData();
        }
        loadAllControllers();
    }
  

}

app.controller("graphic_controller", baseController);








