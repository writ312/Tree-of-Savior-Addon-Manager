(function() {
	'use strict';

	angular
		.module('app')
		.controller('AddonBigController', AddonBigController);

	AddonBigController.$inject = [
    '$scope', '$http', 'addonretriever', 'installer','settings', '$log',
    'SharedScopes', '$translate', '$location', 'readmeretriever', '$sce'
  ];

	function AddonBigController(
    $scope, $http, addonretriever,installer, settings, $log,
    SharedScopes, $translate, $location, readmeretriever, $sce
  ) {
		const vm = this;
		this.sort = "name";

		this.buttons = {
			download: 'img/download.png',
			more: 'img/more.png',
			uninstall: 'img/uninstall.png',
			update: 'img/update.png',
			style: {
				width: '32px',
				height: '32px'
			}
		}

		this.photo = {
			twitter: 'img/twitter.png',
			github : 'img/GitHub-Mark-64px.png',
			dropdn : 'img/dropdown-arrow-down.png',
			style: {
				width: '16px',
				height: '16px'
			}
		};

		require('electron-json-storage').get('settingCol', function(error, col) {
			console.log(col)
			vm.col = col
			if(typeof col == 'object' )
				vm.col = 50
		});


		this.addon = $location.selectedAddon;

		readmeretriever.getReadme(this.addon, function(success, readme) {
			if(success) {
				// var marked = require('marked');
				marked.setOptions({
					sanitize: true
				});

				vm.addon.readme = $sce.trustAsHtml(marked(readme));

				$scope.$apply();
			}
		});

		this.changeCol = ()=>{
			require('electron-json-storage').set('settingCol',vm.col, error =>{
				console.log(error)
			})
		}

	}
})();
