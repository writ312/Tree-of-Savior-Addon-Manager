(function() {
	'use strict';

	angular
		.module('app')
		.controller('BrowseController', BrowseController);

	BrowseController.$inject = ['$scope', '$http', 'installer', 'settings', '$log'];

	function BrowseController($scope, $http, installer, settings, $log) {
		var viewModel = this;

		var masterSources = "https://raw.githubusercontent.com/Tree-of-Savior-Addon-Community/Addons/master/addons.json";

		settings.getInstalledAddons(function(installedAddons) {
			$http.get(masterSources + "?" + new Date().toString(), {cache: false}).success(function(data) {
				console.log(JSON.stringify(data));
				$log.info("Loading master sources from " + masterSources);
				var addons = [];
				angular.forEach(data.sources, function(source) {
					var repo = `https://raw.githubusercontent.com/${source.repo}/master/addons.json`;
					
					$http.get(repo + "?" + new Date().toString()).success(function(sourceData) {
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

							var installedAddon = installedAddons[addon.file];

							if(installedAddon) {
								addon.isInstalled = true;
								var semver = require('semver');

								$log.info("Update available for " + addon.name + "? " + semver.gt(addon.fileVersion, installedAddon.fileVersion));

								if(semver.gt(addon.fileVersion, installedAddon.fileVersion)) {
									addon.isUpdateAvailable = true;
								}
							}

							addons.push(addon);
						});
					});
				});

				viewModel.addons = addons;
			});
		});
	}
})();
