(function() {
	'use strict';

	angular
		.module('app')
		.controller('BrowseController', BrowseController);

	BrowseController.$inject = ['$scope', '$http', 'installer'];

	/* @ngInject */
	function BrowseController($scope, $http, installer) {
		var viewModel = this;

		viewModel.browseForDirectory = browseForDirectory;
		viewModel.treeOfSaviorDirectory = "C:\\Program Files (x86)\\Steam\\steamapps\\common\\TreeOfSavior\\";

		$http.get("https://raw.githubusercontent.com/Tree-of-Savior-Addon-Community/Addons/master/addons.json").success(function(data) {
			var addons = [];
			angular.forEach(data.sources, function(source) {
				$http.get(source.url).success(function(sourceData) {
					angular.forEach(sourceData, function(addon) {

						for(var attributeName in source) {
							addon[attributeName] = source[attributeName];
						}

						addon.downloadUrl = "https://github.com/" + source.author + "/" + source.repo + "/releases/download/" + addon.releaseVersion + "/" + addon.file + "-" + addon.fileVersion + "." + addon.extension;
						addon.isDownloading = false;
						addons.push(addon);

						console.log(addon);
					});
				});
			});

			viewModel.addons = addons;
		});

		function browseForDirectory() {
			var fs = require('fs');
			var modDirectory = viewModel.treeOfSaviorDirectory + "mods";
			fs.mkdir(viewModel.treeOfSaviorDirectory + "mods");

			var remote = require('remote');
			var dialog = remote.require('dialog');
			viewModel.treeOfSaviorDirectory = dialog.showOpenDialog({ properties: ['openDirectory']});
		};

		viewModel.openWebsite = function(url) {
			require("shell").openExternal(url);
		};

		viewModel.install = function(addon) {
			installer.install(addon, $scope);
		}
	}
})();
