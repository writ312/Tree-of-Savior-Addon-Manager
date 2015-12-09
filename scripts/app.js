(function () {
    'use strict';

    var _templateBase = './scripts';

    angular.module('app', [
        'ngRoute',
        'ngMaterial',
        'ngAnimate'
    ])
    .config(['$routeProvider', function ($routeProvider) {
            $routeProvider.when('/', {
                templateUrl: _templateBase + '/main/main.html' ,
                controller: 'mainController',
                controllerAs: 'mainController'
            });
            $routeProvider.otherwise({ redirectTo: '/' });
        }
    ]);
})();
