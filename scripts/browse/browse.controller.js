(function() {
	'use strict';

	angular
		.module('app')
		.controller('BrowseController', BrowseController);

	BrowseController.$inject = ['$scope', '$http', 'addonretriever', 'installer','settings', '$log','SharedScopes'];

	function BrowseController($scope, $http, addonretriever,installer, settings, $log,SharedScopes) {
		var viewModel = this;
		this.sort ="name"
		addonretriever.getAddons(function(addons) {
			viewModel.addons = addons;
		});

		addonretriever.getDependencies(function(dependencies) {
			$log.info(JSON.stringify(dependencies));
		});
		$scope.updateAllAddons = function(){
			for(let i = 0;i< viewModel.addons.length - 1;i++){
				let addon = viewModel.addons[i]
				if(addon.isUpdateAvailable)
					installer.update(addon)
			}
			SharedScopes.getScope('TabController').reloadRoute()
		}
	}
})();
