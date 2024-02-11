app.directive('thermometer', function ($q, WaitMultiplePromisesService, MessageWebApiService) {
    var directiveDefinitionObject = {
        scope: {
            onReady: '=',
            topic: '='
        },
        templateUrl: '/Services/Templates/Thermometer.html',
        controller: function ($scope, $element, $attrs) {
            var ctrl = this;

            var ctor = new Ctor(ctrl, $scope, $attrs, $element);



            ctor.initializeController();
        }

    };

    function Ctor(ctrl, $scope, $attrs, $element) {
        this.initializeController = initializeController;
        var itemApi;
        var itemReadyDeferred = $q.defer();

        function initializeController() {
            $scope.scopeModel = {};
            $scope.scopeModel.TimeStamp = "";
            $scope.scopeModel.view = "block";
            $scope.scopeModel.view1 = "none";
            $scope.scopeModel.checked = false;
            const tempFill = $element[0].querySelector('.thermometer__mercury');

            updateTemperature(20, true)

          
            function updateTemperature(tempC, useCelcius = true) {
                 
                if (tempFill) {
                    let scaleY = 0,
                        scaleYMax = 0.995;

                    if (useCelcius) {
                        let minTempC = -53,
                            maxTempC = 60;
                        scaleY += (tempC - minTempC + 5) / (Math.abs(minTempC) + maxTempC);
                    } else {
                        let minTempF = -60,
                            maxTempF = 140;
                        scaleY += (tempF - minTempF) / (Math.abs(minTempF) + maxTempF);
                    }

                    if (scaleY > scaleYMax)
                        scaleY = scaleYMax;
                    else if (scaleY < 0)
                        scaleY = 0;

                    tempFill.style.transform = `scaleY(${scaleY})`;
                }


            }
            function value() {
                return MessageWebApiService.GetFiltredData($scope.topic, 1)
                    .then(function (response) {
                        console.log(response)
                        $scope.scopeModel.TimeStamp = response[0].Timestamp.replace("T", " ");
                        const result = Number(response[0].message) / 100;
                        if (isNaN(result)) {
                            throw new Error('Value is not a number');
                        }
                        return result;
                    });
            }

            value().then(function (result) {
                updateTemperature(result, true)
                setInterval(function () {
                    value().then(function (result) {
                        updateTemperature(result, true)
                    }).catch(function (error) {
                        console.error(error);
                    });
                }, 4000);
            }).catch(function (error) {
                console.error(error);
            });

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