"use strict"




function baseController($scope, GraphWebApiService, ModalService, PaginationService, GraphService, WebApiService, $q) {


    defineScope();
    load();

    // input selection


    function defineScope() {
        $scope.scopeModel = {};
        $scope.scopeModel.filter = { Name: "" };
        $scope.scopeModel.pages = [];
        $scope.scopeModel.change = function () {

            load();

        }
     

        //Pagination


        $scope.scopeModel.currentPage = 1;

        $scope.scopeModel.setCurrentPage = function (page) {
            if (page > 0 && page <= $scope.scopeModel.pages.length) {
                $scope.scopeModel.currentPage = page;
                return PaginationService.setCurrentPage($scope.scopeModel.Graphs, $scope.scopeModel.pages[page - 1]);
            }
        };
        //Retrieve Filtered Data From Database


        
        //Update Student
        $scope.scopeModel.Edit = function (S) {
            GraphService.editTopic(S, $scope.load)
        }
        $scope.load = function () { load(); }
        //End Of Api Operations//
        //Map between Gender value and description


    }
    function load() {
        function loadAllControllers() {
            function loadStaticData() {
            };
            function loadData() {

                $scope.scopeModel.Topics = []
                GraphWebApiService.GetAllGraphs().then(function (response) {
                    $scope.scopeModel.Graphs = response;
                    $scope.scopeModel.pages = PaginationService.getPages($scope.scopeModel.Graphs.length);
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

app.controller("topic_controller", baseController);