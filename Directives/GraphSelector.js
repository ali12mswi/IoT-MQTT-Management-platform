app.directive('graphSelector', function ($q, WaitMultiplePromisesService) {
    var directiveDefinitionObject = {
        scope: {
            onReady: '=',

        },
        templateUrl: '/Services/Templates/GraphSelector.html',
        controller: function ($scope, $element, $attrs) {
            var ctrl = this;
            var ctor = new Ctor(ctrl, $scope, $attrs);


            ctor.initializeControllers();




        }
    };

    function Ctor(ctrl, $scope, $attrs) {
        this.initializeControllers = initializeControllers;


        function initializeControllers() {
         

            
            $scope.scopeModel = {};
            $scope.scopeModel.Type = "";
            $scope.scopeModel.Min = "";
            $scope.scopeModel.Max = "";
            $scope.scopeModel.onMessage = "";
            $scope.scopeModel.offMessage = "";
            $scope.scopeModel.Unit = "";


            $scope.scopeModel.Compare = function (Graph) {
              
                return $scope.scopeModel.Type === Graph;

            }
            $scope.scopeModel.detail = {}

           

            var itemReadyDeferred = $q.defer();
            defineAPI();
            function defineAPI() {
                var api = {};
                var deffered = $q.defer();
                api.load = function (payload) {

                    
                    var promises = [];
                    //add all load promises to this array
                    if (payload) {
                        if (payload.Type) {
                            $scope.scopeModel.Type = String(payload.Type);
                            if (payload.Type === 2) {
                                $scope.scopeModel.Unit = payload.Unit;
                                $scope.scopeModel.Max = payload.Max;
                                $scope.scopeModel.Min = payload.Min;
                            }
                            else if (payload.Type === 1) {
                                $scope.scopeModel.onMessage = payload.OnMessage;
                                $scope.scopeModel.offMessage = payload.OffMessage;
                               
                            }
                        }
                    }
                 

                    //extract data from payload
                    deffered.resolve();
                    promises.push(deffered.promise)


                    //return wait all promises



                    return WaitMultiplePromisesService.waitMultiplePromises(promises);
                };


                function loadCash(data) {
                    var loadCash = $q.defer();
                    CashDefered.promise.then(function () {
                        CashDefered = $q.defer();

                        CashApi.load(data).then(function () { loadCash.resolve(); }
                            , function () { loadCash.reject(); })

                    })
                    return loadCash.promise;
                };

                function loadBank(data) {
                    var loadBank = $q.defer();
                    BankDefered.promise.then(function () {
                        BankDefered = $q.defer();
                        BankApi.load(data).then(function () { loadBank.resolve(); }
                            , function () { loadBank.reject(); })

                    })
                    return loadBank.promise;
                };


                api.getData = function () {
                    var detail = {};
                   
                    if ($scope.scopeModel.Type === '2')
                    {
                        detail.$type = "IoTSoftware.Models.Gauge, IoTSoftware";
                        detail.Max = $scope.scopeModel.Max;
                        detail.Min = $scope.scopeModel.Min;
                        detail.Unit = $scope.scopeModel.Unit;

                    }
                    else if ($scope.scopeModel.Type === '1')
                    {
                        detail.$type = "IoTSoftware.Models.Slider, IoTSoftware";
                        detail.OnMessage = $scope.scopeModel.onMessage;
                        detail.OffMessage = $scope.scopeModel.offMessage;
                    }
                    detail.Type = Number($scope.scopeModel.Type);
                    return detail;
                };
             
               


                if ($scope.onReady != null && typeof ($scope.onReady) == "function") {
                    $scope.onReady(api);

                } else {
                    console.log(typeof ("Error: onReady is not a function."));
                }
            }
        }


    }

    return directiveDefinitionObject;
});