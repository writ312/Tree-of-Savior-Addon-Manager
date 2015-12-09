(function () {
	'use strict';
	angular.module('app')
	.controller('mainController', function($scope) {

		$scope.mods = [
			{ name: 'expviewer', author: 'Excrulon', isInstalled: false },
			{ name: 'mobframes', author: 'SecurityRisk', isInstalled: false }
		];

		$scope.browseForDirectory = function() {
			var remote = require('remote');
			var dialog = remote.require('dialog');
			$scope.treeOfSaviorDirectory = dialog.showOpenDialog({ properties: ['openDirectory']});
		};
	});
})();
