(function () {
    'use strict';

    var _templateBase = './scripts';

    angular.module('app', [
        'ui.router',
		'ngResource',
        'ngMaterial',
        'ngAnimate'
    ])
    .config(['$stateProvider', '$urlRouterProvider', '$mdThemingProvider', function ($stateProvider, $urlRouterProvider, $mdThemingProvider) {
			$mdThemingProvider.theme('default')
				.dark();

			$urlRouterProvider.otherwise("/settings");

			$stateProvider
				.state('settings', {
					url: '/settings',
					controller: 'SettingsController as settingsController',
					templateUrl: _templateBase + '/settings/settings.html'
				})
				.state('install', {
					url: '/install',
					controller: 'InstallController as installController',
					templateUrl: _templateBase + '/install/install.html'
				});
        }
    ]);
})();
