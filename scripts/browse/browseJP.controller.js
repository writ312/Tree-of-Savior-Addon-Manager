(function() {
	'use strict';

	angular
		.module('app')
		.controller('BrowseControllerJP', BrowseControllerJP);

	BrowseControllerJP.$inject = ['$scope', '$http', 'addonretrieverJP', 'installer','settings', '$log','SharedScopes'];

	function BrowseControllerJP($scope, $http, addonretriever,installer, settings, $log,SharedScopes) {
		var viewModel = this;
		this.sort ="name"
		addonretriever.getAddons(function(addons) {
			viewModel.addons = addons;
		});

		addonretriever.getDependencies(function(dependencies) {
			$log.info(JSON.stringify(dependencies));
		});
		$scope.updateAllAddons = function(){
			var updatelist = '';
			for(let i = 0;i< viewModel.addons.length - 1;i++){
				let addon = viewModel.addons[i]
				if(addon.isUpdateAvailable){
					installer.update(addon)
					updatelist += addon.name + '\n';
				}
			}
			if(updatelist != ''){
				alert(updatelist+'をアップデートしました')
				setTimeout(()=>{
					SharedScopes.getScope('TabController').reloadRoute()
				},3000)
			}else{
				alert('アップデートするアドオンがありません')
			}
		}
	}
})();
