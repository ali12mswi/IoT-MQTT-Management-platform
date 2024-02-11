"use strict"




function baseController($scope, RulesWebApiService, ModalService, PaginationService, RuleService, WebApiService, $q) {


    defineScope();
    load();

    // input selection


    function defineScope() {
        $scope.scopeModel = {};
        $scope.scopeModel.filter = { Topic: "" };
        $scope.scopeModel.pages = [];
        $scope.scopeModel.change = function () {

            load();

        }
        $scope.scopeModel.getOperatorLabel = function (operator) {
            switch (operator) {
                case 1:
                    return "=";
                case 2:
                    return ">";
                case 3:
                    return "<";
                case 4:
                    return ">=";
                default:
                    return "";
            }
        };


        //Pagination


        $scope.scopeModel.currentPage = 1;

        $scope.scopeModel.setCurrentPage = function (page) {
            if (page > 0 && page <= $scope.scopeModel.pages.length) {
                $scope.scopeModel.currentPage = page;
                return PaginationService.setCurrentPage($scope.scopeModel.Rules, $scope.scopeModel.pages[page - 1]);
            }
        };
        //Retrieve Filtered Data From Database


        //Api Call Here:
        
        $scope.scopeModel.AddRule = function () {

            RuleService.addRule($scope.load);
        };
        
        $scope.scopeModel.Edit = function (S) {
            RuleService.editRule(S, $scope.load)
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

                $scope.scopeModel.Rules = []
                RulesWebApiService.GetFiltredData($scope.scopeModel.filter.Topic).then(function (response) {
                    $scope.scopeModel.Rules = response;




                    $scope.scopeModel.pages = PaginationService.getPages($scope.scopeModel.Rules.length);
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

app.controller("Rule_controller", baseController);