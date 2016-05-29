(function() {
	'use strict';

	angular
		.module('app')
		.controller('BrowseController', BrowseController);

	BrowseController.$inject = ['$scope', '$http', 'installer', '$log'];

	/* @ngInject */
	function BrowseController($scope, $http, installer, $log) {
		var viewModel = this;

		viewModel.browseForDirectory = browseForDirectory;
		viewModel.treeOfSaviorDirectory = "C:\\Program Files (x86)\\Steam\\steamapps\\common\\TreeOfSavior\\";

		var masterSources = "https://raw.githubusercontent.com/Tree-of-Savior-Addon-Community/Addons/master/addons.json";

		$http.get(masterSources).success(function(data) {
			$log.info("Loading master sources from " + masterSources);
			var addons = [];
			angular.forEach(data.sources, function(source) {

				var repo = `https://raw.githubusercontent.com/${source.repo}/master/addons.json`;

				$http.get(repo).success(function(sourceData) {
					angular.forEach(sourceData, function(addon) {

						var repoValues = source.repo.split('/');

						addon.author = repoValues[0];
						addon.repo = repoValues[1];

						$log.info("Loading addon " + addon.name + " by " + addon.author);

						for(var attributeName in source) {
							addon[attributeName] = source[attributeName];
						}

						addon.downloadUrl = "https://github.com/" + source.repo + "/releases/download/" + addon.releaseTag + "/" + addon.file + "-" + addon.fileVersion + "." + addon.extension;
						addon.isDownloading = false;
						addons.push(addon);
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

		viewModel.uninstall = function(addon) {
			installer.uninstall(addon, $scope);
		}
	}
})();
