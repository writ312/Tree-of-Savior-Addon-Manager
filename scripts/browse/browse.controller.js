(function() {
	'use strict';

	angular
		.module('app')
		.controller('BrowseController', BrowseController);

	BrowseController.$inject = [
    '$scope', '$http', 'addonretriever', 'installer','settings', '$log',
    'SharedScopes', '$translate'
  ];

	function BrowseController(
    $scope, $http, addonretriever,installer, settings, $log,
    SharedScopes, $translate
  ) {
		const vm = this;
		this.sort = "name";

		addonretriever.getAddons(function(addons) {
			vm.addons = addons;
		});

		addonretriever.getDependencies(function(dependencies) {
			$log.info(JSON.stringify(dependencies));
		});

		$scope.updateAllAddons = function(){
			let updatelist = '';
			for(let i = 0;i<vm.addons.length - 1;i++){
				let addon = vm.addons[i]
				if(addon.isUpdateAvailable){
					installer.update(vm.addons[i])
					updatelist += addon.name + '\n';			
				}
			}

			if(updatelist !== '')
				alert(`${updatelist}${$translate.instant('ADDONS.UPDATE_LIST_SUCCESS')}`);
			else
				alert($translate.instant('ADDONS.UPDATE_LIST_BLANK'));
		
		}
	}
})();
