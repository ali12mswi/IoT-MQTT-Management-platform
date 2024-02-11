app.directive('timeSeries', function ($q, WaitMultiplePromisesService, MessageWebApiService) {
    var directiveDefinitionObject = {
        scope: {
            onReady: '=',
            topic: '='
        },
        templateUrl: '/Services/Templates/timeseries.html',
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
            const gaugeElement = $element[0].querySelector('.gauge');


            var data = [
                {
                    x: ['2013-10-04 22:23:00', '2013-11-04 22:23:00', '2013-12-04 22:23:00'],
                    y: [1, 3, 6],
                    type: 'scatter'
                }
            ];

            Plotly.newPlot('myDiv', data);




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