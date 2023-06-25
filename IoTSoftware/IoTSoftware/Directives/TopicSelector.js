app.directive('topicSelector', function ($q, TopicWebApiService, WaitMultiplePromisesService) {
    var directiveDefinitionObject = {
        scope: {
            onReady: '='
        },
        templateUrl: '/Services/Templates/TopicSelector.html',
        controller: function ($scope, $element, $attrs) {
            var ctrl = this;
            var ctor = new Ctor(ctrl, $scope, $attrs);


            ctor.initializeController();




        }
    };

    function Ctor(ctrl, $scope, $attrs) {
        this.initializeController = initializeController;


        function initializeController() {
            $scope.scopeModel = {};
            $scope.scopeModel.Topics = [];
            $scope.scopeModel.Topic = "";

            var itemApi;
            var itemReadyDeferred = $q.defer();



            $scope.scopeModel.onItemDirectiveReady = function (api) {

                itemApi = api;
                itemReadyDeferred.resolve();
            };

            defineAPI();
        }

        function defineAPI() {
            var api = {};

            api.load = function (payload) {
                var promises = [];
                //add all load promises to this array
                if (payload)
                    $scope.scopeModel.Topic = payload;
                


                GetAllTopics();


                function GetAllTopics() {
                    var deferred = $q.defer();
                    TopicWebApiService.GetFiltredData().then(function (response) {
                        $scope.scopeModel.Topics = response;
                        console.log(response)
                        deferred.resolve();
                    }, function () { deffered.reject(); });
                    promises.push(deferred.promise);
                }

                //return wait all promises
                return WaitMultiplePromisesService.waitMultiplePromises(promises);
            };
          

            api.getData = function () {
                return $scope.scopeModel.Topic;

            };
          


            if ($scope.onReady != null && typeof ($scope.onReady) == "function") {
                $scope.onReady(api);

            } else {
                console.log(typeof ("Error: onReady is not a function."));
            }
        }
    }

    return directiveDefinitionObject;
});