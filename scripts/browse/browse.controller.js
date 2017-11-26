(function() {
	'use strict';

	angular
		.module('app')
		.controller('BrowseController', BrowseController);

	BrowseController.$inject = [
    '$scope', '$http', 'addonretriever', 'installer','settings', '$log',
    'SharedScopes', '$translate', '$filter'
  ];

	function BrowseController(
    $scope, $http, addonretriever,installer, settings, $log,
    SharedScopes, $translate, $filter
  ) {
		const vm = this;
		this.sort = "name";

		require('electron-json-storage').get('settingCol', function(error, col) {
			console.log(col)
		    vm.col = col
            if(typeof col == 'object' )
                vm.col = 50
        });

		this.addonsLoading = true;

		addonretriever.getAddons(function(addons) {
			vm.addons = addons;
			vm.addonsLoading = false;
		});

		addonretriever.getDependencies(function(dependencies) {
			$log.info(JSON.stringify(dependencies));
		});

		this.changeCol = ()=>{
			require('electron-json-storage').set('settingCol',vm.col, error =>{
				console.log(error)
			})
		}
	
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

		$scope.filterAll = function( search ) {
			return function(addon){
				var addAddon,id;

				if(!search)
					search = "";
				addAddon = false;
				if (checkFor(addon.author.toLowerCase(), search.toLowerCase()) || checkFor(addon.name.toLowerCase(), search.toLowerCase()))
					addAddon = true;

				for(id=0;id<addon.tags.length;id++)
				{
					if(checkFor(addon.tags[id].toLowerCase(), search.toLowerCase()))
						addAddon = true;
				}

				if (addAddon)
					return true;

				return false;
			};

		};

		function checkFor(str, str2)
		{
			var i;
			var maxl = str.length
			var ok=true;
			for(i=0;i<str2.length;i++)
			{
				if(i > maxl)
					break;
				if(str[i] != str2[i])
				{
					return false;
					break;
				}
			}
			return ok;
		}
	}

})();
