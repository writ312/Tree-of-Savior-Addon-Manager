(function () {
    'use strict';

    var _templateBase = './scripts';

    angular.module('app', [
        'ui.router',
		'ngResource',
        'ngMaterial',
        'ngAnimate'
    ])
    .config(['$stateProvider', '$urlRouterProvider', '$mdThemingProvider', function($stateProvider, $urlRouterProvider, $mdThemingProvider) {
			//$mdThemingProvider.theme('default')
				//.dark();

			$urlRouterProvider.otherwise("/tab");

			$stateProvider
				.state('settings', {
					url: '/settings',
					templateUrl: 'views/settings.html',
					controller: 'SettingsController as settingsController'
				})
				.state('featured', {
					url: '/featured',
					templateUrl: 'views/featured.html',
					controller: 'FeaturedController as featuredController'
				})
				.state('browse', {
					url: '/browse',
					templateUrl: 'views/browse.html',
					controller: 'BrowseController as browseController'
				})
				.state('installed', {
					url: '/installed',
					templateUrl: 'views/installed.html',
					controller: 'InstalledController as installedController'
				});

				/*
			$stateProvider
				.state('main', {
					url: '/',
					controller: 'MainController as mainController',
					templateUrl: _templateBase + '/main/main.html'
				});
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
				*/
        }
    ]);
})();
