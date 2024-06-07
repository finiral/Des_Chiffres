const apiUrl="http://localhost:5291"
angular
    .module("rallyeApp")
    .config(['$routeProvider',function config($routeProvider){
        $routeProvider
            .when("/saisons",{
                template : "<saisons-list></saisons-list>"
            })
            .when("/saisons/:saisonId",{
                template :"<menu-saison></menu-saison>"
            })
            .when("/saisons/:saisonId/:rallyeId",{
                template:"<rallye-detail></rallye-detail>"
            })
            .otherwise("/saisons")
    }])