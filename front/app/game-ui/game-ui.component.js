angular.module("gameUi", [])
    .component("gameUi", {
        templateUrl: "game-ui/game-ui.component.template.html",
        controller: ["$scope", "$interval" ,"$http", function ($scope, $interval,$http) {
            var self = this
            function initialize() {
                self.seconds = 60
                $scope.time = getTimeLeftFormat(self.seconds)
            }
            initialize()
            $scope.startGame = function () {
                $scope.gameLaunched = true
                $http.get(apiUrl + "/game/random").
                    then(function (response) {
                        $scope.singleDigit = response.data
                    })
                $http.get(apiUrl + "/game/randoms").
                    then(function (response) {
                        $scope.cells = response.data
                    })
                self.interval = $interval(function () {
                    self.seconds = self.seconds - 1
                    $scope.time = getTimeLeftFormat(self.seconds)
                }, 1000)
            }
            $scope.stopGame = function () {
                $scope.gameLaunched = false
                $interval.cancel(self.interval)
                initialize()
            }
            /* $http({
                url:"/game/verifCalcul",
                method:'POST',
                data:{
                    nombre: ,
                    calcul: ""
                }
            }) */
        }]
    })