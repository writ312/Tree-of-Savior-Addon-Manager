(function() {
	'use strict';

	angular
		.module('app')
		.controller('MainController', MainController);

	MainController.$inject = ['$scope', '$http'];

	/* @ngInject */
	function MainController($scope, $http) {
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
			var fs = require('fs');
			var request = require('request');
			var progress = require('request-progress');

			const storage = require('electron-json-storage');

			addon.isDownloading = true;

			viewModel.treeOfSaviorDirectory = "C:/Program Files (x86)/Steam/SteamApps/common/TreeOfSavior/addons/";

			var modDirectory = viewModel.treeOfSaviorDirectory + "mods/";
			var filename = modDirectory + "_" + addon.file + "-" + addon.unicode + "-" + addon.fileVersion + "." + addon.extension;

			console.log("installing: " + addon.downloadUrl);

			progress(request(addon.downloadUrl), {
			})
			.on('progress', function (state) {
				console.log(state);
			})
			.on('error', function (err) {
				console.log(err);
			})
			.on('end', function () {
				console.log("download complete!");
				addon.isDownloading = false;

				storage.get("settings", function(error, data) {

					if(!data.installedAddons) {
						data.installedAddons = [];
					}

					var installedAddon = {
						key : addon.file,
						releaseVersion : addon.releaseVersion,
						fileVersion : addon.fileVersion,
					};

					data.installedAddons.push(installedAddon);

					storage.set("settings", data, function(error) {
						console.log("installed-addon data saved!");
					});
				});
			})
			.pipe(fs.createWriteStream(filename));
		}

		function downloadComplete(status) {
			console.log("download complete: " + status);
		}
	}
})();
