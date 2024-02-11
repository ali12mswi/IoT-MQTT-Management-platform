'use strict';
editorBaseController.$inject = ['$scope', '$rootScope', 'ModalService', 'GraphService', '$q', '$uibModalInstance'];

function editorBaseController($scope, $rootScope, ModalService, StudentService, $q, $uibModalInstance) {
    var context = {};
    var itemID;
    var itemAPI;
    var DepartmentApi;
    var TopicApi;
    var PaymentMethodApi;
    var GraphApi;
    var itemReadyDeferred = $q.defer();
    var GraphSelectorDeferred = $q.defer();
    var TopicSelectorDeferred = $q.defer();
    var DepartmentSelectorDeferred = $q.defer();
    
    defineScope()

    load();

    function loadParameters() {

        itemID = $scope.ID;


    }

    function defineScope() {
        // define all needed data/function on scope
        $scope.scopeModel = {};
        $scope.scopeModel.Title = "";
        $scope.scopeModel.onGraphSelectorReady= function (api) {
            GraphApi = api;
            GraphSelectorDeferred.resolve();

        }
        $scope.scopeModel.onTopicSelectorReady = function (api) {

            TopicApi = api;
            TopicSelectorDeferred.resolve();
        }
        $scope.scopeModel.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };
        $scope.scopeModel.submitForm = function () {
            $scope.data = {};
            Object.assign($scope.data, GraphApi.getData());
            if (itemID != null) {
               
                $scope.data.Id = itemID;
              

                
                // Close the modal and pass the data back to the parent scope

            }
            else {
                
               
                $scope.data.Id = 0;
               

            }
            $scope.data.Title=$scope.scopeModel.Title
            $scope.data.Topic = TopicApi.getData();
            
         
            $scope.saveCallback($scope.data).then(function (response) {
               
                // Invoke the onStudentAdded callback if it's defined
                $scope.callback();

                $uibModalInstance.close();


            }).catch(function (error) {
                
            });
        }
        
        $scope.scopeModel.onItemDirectiveReady = function (api) {
            itemAPI = api;
            itemReadyDeferred.resolve();
        };

       
        
    }

    function load() {
        // load all directives and make all web calls
        // synchronize all dependent calls using promises
        function loadAllControls() {

            loadItemDirective();
            loadGraphSelectorDirective();
            var topic = "";
            if ($scope.data) { topic = $scope.data.Topic; $scope.scopeModel.Title = $scope.data.Title; }
            loadTopicSelector(topic);
           
       
        }


        function loadItemDirective() {
            var loadDeferred = $q.defer();
            itemReadyDeferred.promise.then(function () {

                // load directive and resolve loadDeferred
                itemAPI.load(loadDeferred.resolve);
            });
            return loadDeferred.promise;
        }
        function loadGraphSelectorDirective() {
            var loadGraph = $q.defer();
            GraphSelectorDeferred.promise.then(function () {
                GraphApi.load($scope.data).then(function () { loadGraph.resolve(); }
                    , function () { loadGraph.reject(); })
               
            });


            return loadGraph.promise;

      
        }
   
        function loadTopicSelector() {
            var loadTopic = $q.defer();
            var data;
            TopicSelectorDeferred.promise.then(function () {
                if ($scope.data) {
                   data  = $scope.data.Topic;
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

}

app.controller('editorBaseController', editorBaseController);
