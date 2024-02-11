'use strict';
editorBaseController.$inject = ['$scope', '$rootScope', 'ModalService', 'TopicService', '$q', '$uibModalInstance', 'TopicWebApiService'];

function editorBaseController($scope, $rootScope, ModalService, TopicService, $q, $uibModalInstance, TopicWebApiService) {



    var itemID;
    var itemAPI;
    var TopicSelectorDeferred = $q.defer();
    var TopicApi;
    var itemReadyDeferred = $q.defer();
    defineScope();

    function loadParameters() {

        itemID = $scope.ID;

    }

    function defineScope() {
        // define all needed data/function on scope
        $scope.scopeModel = {};
        $scope.scopeModel.onItemDirectiveReady = function (api) {
            itemAPI = api;
            itemReadyDeferred.resolve();
        };
        $scope.scopeModel.onTopicSelectorReady = function (api) {

            TopicApi = api;
            TopicSelectorDeferred.resolve();
        }
        if ($scope.data) {
            $scope.scopeModel.EmailAddress = $scope.data.EmailAddress
            $scope.scopeModel.EmailBody = $scope.data.EmailBody
            $scope.scopeModel.EmailSubject = $scope.data.EmailSubject
            $scope.scopeModel.Operator = String($scope.data.Operator)
            $scope.scopeModel.ThresholdValue = $scope.data.ThresholdValue

        } 

        $scope.scopeModel.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };
        $scope.getOperatorLabel = function (operator) {
            switch (operator) {
                case "1":
                    return "=";
                case "2":
                    return ">";
                case "3":
                    return "<";
                case "4":
                    return ">=";
                default:
                    return "";
            }
        };

        $scope.scopeModel.submitForm = function () {
            var data = {};
            if (itemID != null) {
             
               data.Id = itemID;

               
                // Close the modal and pass the data back to the parent scope

            }
            else {
               

            }
            
            data.EmailAddress = $scope.scopeModel.EmailAddress;
            data.EmailBody = $scope.scopeModel.EmailBody;
            data.EmailSubject = $scope.scopeModel.EmailSubject;
            data.Operator = Number($scope.scopeModel.Operator);
            data.ThresholdValue = $scope.scopeModel.ThresholdValue;
            data.Topic = TopicApi.getData();


           
            $scope.saveCallback(data).then(function (response) {
                
                // Invoke the onStudentAdded callback if it's defined
                $scope.callback();
                $uibModalInstance.close();


            }).catch(function (error) {
                
            });
        };



    }

    function load() {
        // load all directives and make all web calls
        // synchronize all dependent calls using promises
        function loadAllControls() {
            loadTopicSelector() 
        }

        function loadItemDirective() {
            var loadDeferred = $q.defer();
            itemReadyDeferred.promise.then(function () {
                // load directive and resolve loadDeferred
                itemAPI.load(loadDeferred.resolve);
            });
            return loadDeferred.promise;
        }
        function loadTopicSelector() {
            var loadTopic = $q.defer();
            var data;
            TopicSelectorDeferred.promise.then(function () {
                if ($scope.data) {
                    data = $scope.data.Topic;
                }
                else { data = ""; }
                TopicApi.load(data).then(function () {
                    loadTopic.resolve();
                },
                    function () { loadTopic.reject(); })
            })
            return loadTopic.promise;
        }

        loadParameters();
        loadAllControls();
    }


    load();
}

app.controller('editorBaseController', editorBaseController);
