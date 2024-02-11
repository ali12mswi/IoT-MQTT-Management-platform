"use strict"




function baseController($scope, TopicWebApiService, ModalService, PaginationService, TopicService, WebApiService, $q) {


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
                return PaginationService.setCurrentPage($scope.scopeModel.Topics, $scope.scopeModel.pages[page - 1]);
            }
        };
        //Retrieve Filtered Data From Database


        //Api Call Here:
        //Add Student
        $scope.scopeModel.AddTopic = function () {

            TopicService.addTopic($scope.load);
        };
        //Update Student
        $scope.scopeModel.Edit = function (S) {
            TopicService.editTopic(S, $scope.load)
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
                TopicWebApiService.GetFiltredData($scope.scopeModel.filter.Name).then(function (response) {
                    $scope.scopeModel.Topics = response;




                    $scope.scopeModel.pages = PaginationService.getPages($scope.scopeModel.Topics.length);
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