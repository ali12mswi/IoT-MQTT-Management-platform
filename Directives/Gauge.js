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


            function setGaugeValue(gauge, value, value2) {
                const gaugeFill = gauge.querySelector(".gauge__fill");
                const gaugeCover = gauge.querySelector(".gauge__cover");
                if (isNaN(value) || value ==null) {
                    gaugeFill.style.transform = `rotate(${0 / 2}turn)`;
                    gaugeCover.textContent = `....` ;
                }
                else if (value < 0) {
                    gaugeFill.style.transform = `rotate(${1/ 2}turn)`;
                    gaugeCover.textContent = `${Math.round(value2)}` + $scope.detail.Unit;
                    gaugeFill.style.backgroundColor = 'red';
                }
                else if (value > 1) {
                    gaugeFill.style.transform = `rotate(${1 / 2}turn)`;
                    gaugeCover.textContent = `${Math.round(value2)}` + $scope.detail.Unit;
                    gaugeFill.style.backgroundColor = 'green';
                }
                else { 
                    gaugeFill.style.transform = `rotate(${value / 2}turn)`;
                    gaugeCover.textContent = `${Math.round(value2)}` + $scope.detail.Unit;
                    gaugeFill.style.backgroundColor = 'blue';
                }
            }

           
            function value() {
                return MessageWebApiService.GetFiltredData($scope.detail.Topic, 1)
                    .then(function (response) {
                        var result;
                       
                        if (Array.isArray(response)) {
                            if (response[0] !== undefined) {
                                $scope.scopeModel.TimeStamp = response[0].Timestamp.replace("T", " ");
                                result = Number(response[0].message);
                                if (isNaN(result)) {
                                    throw new Error('Value is not a number');
                                }
                            }
                        }
                        if (result === undefined) return "";
                        return result;
                    });
            }

            value().then(function (result) {
                setGaugeValue(gaugeElement, result);
                setInterval(function () {
                    value().then(function (result) {
                        console.log(typeof(result))
                        var percentage = (result - $scope.detail.Min) / (1.0 * ($scope.detail.Max - $scope.detail.Min));
                        setGaugeValue(gaugeElement, percentage, result);
                    }).catch(function (error) {
                        console.error(error);
                    });
                }, 2000);
            }).catch(function (error) {
                console.error(error);
            });



            $scope.scopeModel.change = function () {
                
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