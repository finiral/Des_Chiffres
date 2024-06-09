angular.module("gameUi",[])
    .component("gameUi",{
        templateUrl : "game-ui/game-ui.component.template.html",
        controller :["$scope","$interval", function ($scope,$interval){
            $scope.singleDigit=13424
            $scope.cells=[12,24,321,53,65]
            var self=this
            function initialize(){
                self.seconds=60
                $scope.time=getTimeLeftFormat(self.seconds)
            }
            initialize()
            $scope.startGame= function(){
                $scope.gameLaunched=true
                self.interval=$interval(function(){
                   self.seconds=self.seconds-1
                   $scope.time=getTimeLeftFormat(self.seconds)
                },1000)
            }
            $scope.stopGame=function(){
                $scope.gameLaunched=false
                $interval.cancel(self.interval)
                initialize()
            }
        }]
    })