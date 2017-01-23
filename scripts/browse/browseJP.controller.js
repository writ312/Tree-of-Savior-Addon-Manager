(function() {
	'use strict';

	angular
		.module('app')
		.controller('BrowseControllerJP', BrowseControllerJP);

	BrowseControllerJP.$inject = ['$scope', '$http', 'addonretrieverJP', 'settings', '$log'];

	function BrowseControllerJP($scope, $http, addonretriever, settings, $log) {
		var viewModel = this;
		this.sort ="name"
		addonretriever.getAddons(function(addons) {
			viewModel.addons = addons;
		});

		addonretriever.getDependencies(function(dependencies) {
			$log.info(JSON.stringify(dependencies));
		});
	}
})();
