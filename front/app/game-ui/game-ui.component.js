angular.module("gameUi", [])
    .component("gameUi", {
        templateUrl: "game-ui/game-ui.component.template.html",
        controller: ["$scope", "$interval", "$http", function ($scope, $interval, $http) {
            var self = this
            function initialize() {
                self.gameLaunched = false
                self.playersData = []
                self.seconds = 60
                self.singleDigit = null
                self.cells = []
                self.clickBtn = []
                self.starts = []
                self.guess1=''
                self.guess2=''
                self.calcul1=''
                self.calcul2=''
                self.time = getTimeLeftFormat(self.seconds)
            }
            initialize()

            /* FONCTIONS */

            $scope.addPlayerData = function (id, guess) {
                self.clickBtn[id] = true
                self.playersData.push({
                    idPlayer: id,
                    nb: self.singleDigit,
                    nbGuess: guess,
                    timeLeft: self.seconds
                })
                console.log(self.playersData)
                /* Decider qui commence en premier */
                if (self.playersData.length >= 2) {
                    $interval.cancel(self.interval)
                    var body = JSON.stringify(self.playersData)
                    $http.post(apiUrl + "/game/decideStart", body).
                        then(function (response) {
                            self.starts[response.data] = true
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
                    self.time = getTimeLeftFormat(self.seconds)
                    /* Quand le chrono est terminé */
                    if (self.seconds == 0) {
                        $interval.cancel(self.interval)
                        if (self.playersData.length == 0) {
                            window.alert("Personne gagne")
                        }
                        else if (self.playersData.length == 1) {
                            window.alert("Le joueur " + self.playersData[0].idPlayer + " gagne")
                        }
                        $scope.stopGame()
                    }
                }, 1000)
            }
            $scope.stopGame = function () {
                self.gameLaunched = false
                $interval.cancel(self.interval)
                initialize()
            }
            $scope.sendCalcul = function (idplayer,guess, calc) {
                var body = JSON.stringify({
                    id: idplayer,
                    nombre: guess,
                    calcul: calc,
                    nbs: self.cells
                })
                $http.post(apiUrl + "/game/verifCalcul", body)
                    .then(function (response) {
                        var alertage
                        if (response.data == true) {
                            alertage = "Votre combinaison est correct , le joueur " + idplayer + " gagne !"
                        }
                        else {
                            alertage = "Votre combinaison est fausse , le joueur adverse gagne !"
                        }
                        window.alert(alertage)
                        $scope.stopGame()
                    })
            }

        }]
    })