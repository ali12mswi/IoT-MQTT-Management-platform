app.service('ModalService', ['$uibModal', "$rootScope", function ($uibModal, $rootScope) {
    var modalInstance = null;

    this.showModal = function (templateUrl, controller, parameters) {
        modalInstance = $uibModal.open({
            templateUrl: templateUrl,
            controller: controller,
            scope: parameters ? angular.extend($rootScope.$new(), parameters) : $rootScope.$new(),
            backdrop: 'static'
        });

        return modalInstance;
    };
}]);



/*app.service('ModalService', ['$uibModal', function ($uibModal) {
    var modalInstance = null;

    this.showModal = function () {
        modalInstance = $uibModal.open({
            templateUrl: '/Home/TestTemplate',

            controller: function ($scope, $uibModalInstance) {
                $scope.data = {};
                $scope.ok = function () {
                    $uibModalInstance.close($scope.data);
                };
                $scope.cancel = function () {
                    $uibModalInstance.dismiss('cancel');
                };
            }
        });
        return modalInstance;
    };

    this.hideModal = function () {
        if (modalInstance) {
            modalInstance.close();
            modalInstance = null;
        }
    };
}]);*/


