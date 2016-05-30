(function() {
	'use strict';

	angular
		.module('app')
		.directive('addon', addon);

	function addon(installer) {
		var directive = {
			scope: {},
			restrict: 'E',
			link: link,
			templateUrl: 'views/addon.html',
			controller: AddonController,
			controllerAs: "vm",
			bindToController: {
				addon: '='
			}
		};

		return directive;

		function link(scope, element, attrs) {
			scope.install = function(addon) {
				addon.isDownloading = true;
				installer.install(addon, scope, function() {
					addon.isDownloading = false;
				});
			}

			scope.uninstall = function(addon) {
				installer.uninstall(addon, scope);
			}

			scope.openWebsite = function(addon) {
				// TODO: this needs to be a utility method
				var repoUrl = "https://github.com/" + addon.repo;
				require("shell").openExternal(repoUrl);
			}
		}
	}

	AddonController.$inject = ['$scope'];

	function AddonController($scope) {
		$scope.testFunction = function() {
			console.log("test function");
		}
	}
})();
