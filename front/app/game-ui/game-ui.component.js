angular.module("gameUi", [])
    .component("gameUi", {
        templateUrl: "game-ui/game-ui.component.template.html",
        controller: ["$scope", "$interval", "$http", function ($scope, $interval, $http) {
            var self = this
            function initialize() {
                self.playersData=[]
                self.seconds = 60
                self.singleDigit=null
                self.cells=[]
                self.clickBtn=[]
                self.starts=[]
                self.gameLaunched=false
                $scope.time = getTimeLeftFormat(self.seconds)
            }
            initialize()

            /* FONCTIONS */

            $scope.addPlayerData=function(id,guess){
                self.clickBtn[id]=true
                self.playersData.push({
                    idPlayer:id,
                    nb:self.singleDigit,
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
                self.gameLaunched = true
                $http.get(apiUrl + "/game/random").
                    then(function (response) {
                        self.singleDigit = response.data
                    })
                $http.get(apiUrl + "/game/randoms").
                    then(function (response) {
                        self.cells = response.data
                    })
                self.interval = $interval(function () {
                    self.seconds = self.seconds - 1
                    $scope.time = getTimeLeftFormat(self.seconds)
                }, 1000)
            }
            $scope.stopGame = function () {
                self.gameLaunched = false
                $interval.cancel(self.interval)
                initialize()
            }
            $scope.sendCalcul = function (calc) {
                var body = JSON.stringify({
                    nombre: self.singleDigit,
                    calcul: calc,
                    nbs: self.cells
                })
                $http.post(apiUrl + "/game/verifCalcul", body)
                    .then(function (response) {
                    window.alert("Validité de la combinaison : "+response.data)
                })
            }
            
        }]
    })