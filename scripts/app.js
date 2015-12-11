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
			// $mdThemingProvider.theme('default')
			//     .primaryPalette('pink')
			//     .accentPalette('orange');

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

			/*
			.state('tabs', {
				abstract: true,
				url: '/',
				templateUrl: 'template.html',
				controller: function($scope) {
					$scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
						$scope.currentTab = toState.data.selectedTab;
					});
				}
			})
			.state('tabs.settings', {
				url: '/settings',
				templateUrl: _templateBase + '/settings/settings.html',
				data: {
					'selectedTab': 0
				},
				views: {
					'settings': {
						controller: 'SettingsController'
					}
				}
			})
			.state('tabs.install', {
				url: '/install',
				data: {
					'selectedTab': 1
				},
				views: {
					'install': {
						controller: 'InstallController'
					}
				}
			});
			*/

			/*
            $routeProvider.when('/', {
                templateUrl: _templateBase + '/main/main.html' ,
                controller: 'MainController',
                controllerAs: 'mainController'
            }).when('/settings', {
				templateUrl: _templateBase + '/settings/settings.html' ,
                controller: 'SettingsController',
                controllerAs: 'settingsController'
			}).otherwise({
				redirectTo: '/'
			});
			*/
        }
    ]);
})();
