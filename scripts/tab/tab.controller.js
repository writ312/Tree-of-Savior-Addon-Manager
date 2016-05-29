(function() {
	'use strict';

	angular
		.module('app')
		.controller('TabController', TabController);

	TabController.$inject = ['$scope', '$location'];

	/* @ngInject */
	function TabController($scope, $location) {
		var vm = this;

		vm.selectedIndex = 0;

		$scope.$watch('vm.selectedIndex', function(current, old) {
			switch(current) {
				case 0:
					$location.url('/settings');
					break;

				case 1:
					$location.url('/featured');
					break;

				case 2:
					$location.url('/browse');
					break;

				case 3:
					$location.url('/installed');
					break;
			}
		});
	}
})();
