'use strict';
editorBaseController.$inject = ['$scope', '$rootScope', 'ModalService', 'TopicService', '$q', '$uibModalInstance', 'TopicWebApiService'];

function editorBaseController($scope, $rootScope, ModalService, TopicService, $q, $uibModalInstance, TopicWebApiService) {



    var itemID;
    var itemAPI;
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
        $scope.scopeModel.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };
   
        $scope.scopeModel.submitForm = function () {

            if (itemID != null) {
                console.log("edit")
                $scope.data.Id = itemID;

                console.log($scope.data)
                // Close the modal and pass the data back to the parent scope

            }
            else {
                console.log("add"); console.log($scope.data);

            }
            console.log($scope.data)
            $scope.saveCallback($scope.data).then(function (response) {
                console.log('Topic with ID ' + response + ' has been added.');
                // Invoke the onStudentAdded callback if it's defined
                $scope.callback();
                $uibModalInstance.close();


            }).catch(function (error) {
                console.log('Error while adding student: ', error);
            });
        };


   
    }

    function load() {
        // load all directives and make all web calls
        // synchronize all dependent calls using promises
        function loadAllControls() {

        }

        function loadItemDirective() {
            var loadDeferred = $q.defer();
            itemReadyDeferred.promise.then(function () {
                // load directive and resolve loadDeferred
                itemAPI.load(loadDeferred.resolve);
            });
            return loadDeferred.promise;
        }

        loadParameters();
        loadAllControls();
    }


    load();
}

app.controller('editorBaseController', editorBaseController);
