(function () {
    'use strict';

    var _templateBase = './scripts';

    angular.module('app', [
        'ngRoute',
		'ngResource',
        'ngMaterial',
        'ngAnimate'
    ])
    .config(['$routeProvider', '$mdThemingProvider', function ($routeProvider, $mdThemingProvider) {
			// $mdThemingProvider.theme('default')
			//     .primaryPalette('pink')
			//     .accentPalette('orange');

			$mdThemingProvider.theme('default')
				.dark();

            $routeProvider.when('/', {
                templateUrl: _templateBase + '/main/main.html' ,
                controller: 'MainController',
                controllerAs: 'mainController'
            });
            $routeProvider.otherwise({ redirectTo: '/' });
        }
    ]);
})();
