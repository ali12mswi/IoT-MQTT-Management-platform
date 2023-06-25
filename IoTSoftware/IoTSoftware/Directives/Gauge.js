app.directive('gauge', function ($q, WaitMultiplePromisesService, MessageWebApiService) {
    var directiveDefinitionObject = {
        scope: {
            onReady: '=',
            detail : '='
        },
        templateUrl: '/Services/Templates/gauge.html',
        controller: function ($scope, $element, $attrs) {
            var ctrl = this;

            var ctor = new Ctor(ctrl, $scope, $attrs,$element);



            ctor.initializeController();
        }

    };

    function Ctor(ctrl, $scope, $attrs,$element) {
        this.initializeController = initializeController;
        var itemApi;
        var itemReadyDeferred = $q.defer();

        function initializeController() {
            $scope.scopeModel = {};
            $scope.scopeModel.TimeStamp = "";
            $scope.scopeModel.view = "block";
            $scope.scopeModel.view1 = "none";
            $scope.scopeModel.checked = false;
            const gaugeElement = $element[0].querySelector('.gauge');


            function setGaugeValue(gauge, value) {
                if (value < 0 || value > 1) {
                    return;
                }

                gauge.querySelector(".gauge__fill").style.transform = `rotate(${value / 2}turn)`;
                gauge.querySelector(".gauge__cover").textContent = `${Math.round(value * 100)}`+$scope.detail.Unit;
            }

           
            function value() {
                return MessageWebApiService.GetFiltredData($scope.detail.Topic, 1)
                    .then(function (response) {console.log($scope.detail.Topic+" " +response)
                        $scope.scopeModel.TimeStamp = response[0].Timestamp.replace("T"," ");
                        const result = Number(response[0].message) / 100;
                        if (isNaN(result)) {
                            throw new Error('Value is not a number');
                        }
                        return result;
                    });
            }

            value().then(function (result) {
                setGaugeValue(gaugeElement, result);
                setInterval(function () {
                    value().then(function (result) {
                        setGaugeValue(gaugeElement, result);
                    }).catch(function (error) {
                        console.error(error);
                    });
                }, 2000);
            }).catch(function (error) {
                console.error(error);
            });



            $scope.scopeModel.change = function () {
                console.log("hi");
                if ($scope.scopeModel.checked) {
                    MessageWebApiService.PublishMessage("On", "my/lamp");
                    $scope.scopeModel.view1 = "block";
                    $scope.scopeModel.view = "none";

                }
                else {
                    $scope.scopeModel.view = "block";
                    $scope.scopeModel.view1 = "none";
                    MessageWebApiService.PublishMessage("OFF", "my/lamp");
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
                console.log($scope.scopeModel.selectedOption)
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