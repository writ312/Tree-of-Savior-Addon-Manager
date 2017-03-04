(function() {
	'use strict';

	angular
		.module('app')
		.controller('TabController', TabController);

	TabController.$inject = ['$scope', '$location',  '$anchorScroll','settings','$state','SharedScopes'];

	/* @ngInject */
	function TabController($scope, $location, $anchorScroll,settings,$state,SharedScopes) {
		var vm = this;

		vm.selectedIndex = 0;

		vm.isValidDirectory = function() {
			return settings.getIsValidDirectory();
		};

		vm.launchGame = function() {
			require("shell").openExternal("http://tos.nexon.co.jp/players");
		};

		$scope.$watch('vm.selectedIndex', function(current, old) {
			switch(current) {
				case 0:
					$location.url('/settings');
					break;

				case 1:
					$location.url('/browse');
					break;

				case 2:
					$location.url('/browseJP');
					break;
				case 3:
					$location.url('/itemlist');
					break;
				case 4:
					$location.url('/itemsearch');
					break;
			}
		});
		vm.jumpTo = function () {
 			$location.hash('top');
			$anchorScroll();
		}
		vm.showTab = function(){
			return (settings.JTos.isLoad && settings.ITos.isLoad);
		};
		$scope.reloadRoute = function() {
			$state.reload();
		};
		SharedScopes.setScope('TabController', $scope);
	}
})();
