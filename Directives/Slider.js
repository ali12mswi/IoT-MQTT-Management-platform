app.directive('slider', function ($q, WaitMultiplePromisesService, MessageWebApiService) {
    var directiveDefinitionObject = {
        scope: {
            onReady: '=',
            detail:'='
        },
        templateUrl: '/Services/Templates/slider.html',
        controller: function ($scope, $element, $attrs) {
            var ctrl = this;

            var ctor = new Ctor(ctrl, $scope, $attrs);
           


            ctor.initializeController();
        }

    };

    function Ctor(ctrl, $scope, $attrs) {
        this.initializeController = initializeController;
        var itemApi;
        var itemReadyDeferred = $q.defer();
      

        function initializeController() {
            $scope.scopeModel = {};
         
            $scope.scopeModel.view = "block";
            $scope.scopeModel.view1 = "none";
            $scope.scopeModel.checked = false;

            $scope.scopeModel.change = function () {
               
                if ($scope.scopeModel.checked) {
                    MessageWebApiService.PublishMessage($scope.detail.OnMessage, $scope.detail.Topic);
                    $scope.scopeModel.view1 = "block";
                        $scope.scopeModel.view = "none";

                }
                else {
                    $scope.scopeModel.view = "block";
                    $scope.scopeModel.view1 = "none";
                    MessageWebApiService.PublishMessage($scope.detail.OffMessage, $scope.detail.Topic);
                }

            }

            function bedlamp1() {
                let bedlampswitch1 = document.getElementById("bedlampswitch1");
                let bedlampimg1 = document.getElementById("bedlampimg1");
                let bedlampon1 = document.getElementById("bedlampon1");
                
                if (bedlampswitch1.checked === true) {
                    bedlampimg1.style.display = "none";
                    bedlampon1.style.display = "block";
                }
                else {
                    bedlampimg1.style.display = "block";
                    bedlampon1.style.display = "none";
                }

            }



            defineAPI();
        }

        function defineAPI() {
            var api = {};

            api.load = function () {
                var deffered = $q.defer();

                if (payload.Gender) {
                    $scope.scopeModel.selectedOption = String(payload.Gender);
                }
                var promises = [];
                //add all load promises to this array
                deffered.resolve();
                var datal = payload.datal;
                //extract data from payload 

                promises.push(deffered.promise);



                return WaitMultiplePromisesService.waitMultiplePromises(promises);
            };

            api.getData = function () {
                
                return $scope.scopeModel.selectedOption;


            };
            $scope.$watch('scopeModel.selectedOption', function (newVal, oldVal) {

                if (newVal !== oldVal) {
                    api.onSelectionChanged(newVal);
                }
            });

            if ($scope.onReady != null && typeof ($scope.onReady) == "function") {

                $scope.onReady(api);

            }
            else { console.log(typeof ("error you enter :" + $scope.onReady + "which not function")); }
        }


    }

    return directiveDefinitionObject;
});