angular.module("gameUi", [])
    .component("gameUi", {
        templateUrl: "game-ui/game-ui.component.template.html",
        controller: ["$scope", "$interval", "$http", function ($scope, $interval, $http) {
            var self = this
            function initialize() {
                self.playersData=[]
                self.seconds = 60
                self.clickBtn1=false
                self.clickBtn2=false
                self.starts=[]
                $scope.time = getTimeLeftFormat(self.seconds)
            }
            initialize()

            /* FONCTIONS */

            $scope.addPlayerData=function(id,guess){
                self.playersData.push({
                    idPlayer:id,
                    nb:$scope.singleDigit,
                    nbGuess:guess,
                    timeLeft:self.seconds
                })
                console.log(self.playersData)
                /* Decider qui commence en premier */
                if(self.playersData.length>=2){
                    var body=JSON.stringify(self.playersData)
                    $http.post(apiUrl + "/game/decideStart",body).
                    then(function (response) {
                        self.starts[response.data]=true
                    })
                }
            }
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
            $scope.sendModel = function (calc) {
                var body = JSON.stringify({
                    nombre: $scope.singleDigit,
                    calcul: calc,
                    nbs: $scope.cells
                })
                $http.post(apiUrl + "/game/verifCalcul", body)
                    .then(function (response) {
                    console.log(response.data)
                })
            }
            
        }]
    })