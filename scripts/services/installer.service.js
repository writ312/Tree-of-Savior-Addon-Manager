(function() {
	'use strict';

	angular
		.module('app')
		.factory('installer', installer);

	installer.$inject = ['$log', 'settings'];

	function installer($log, settings) {
		var service = {
			install: install,
			uninstall: uninstall
		};

		return service;

		// definitely shouldn't be passing in scope here but I'll find another way later...
		function install(addon, scope) {
			var semver = require('semver');
			console.log("ver: " + semver.gt('1.2.3', '9.8.7'));

			var fs = require('fs');
			var request = require('request');
			var progress = require('request-progress');

			const storage = require('electron-json-storage');

			var filename = getAddonPath(addon);

			addon.isDownloading = true;

			console.log(addon.downloadUrl);

			progress(request(addon.downloadUrl), {
			}).on('response', function(response) {
				$log.info(`status code: ${response.statusCode}`);
				if(response.statusCode !== 200) {
				}
			}).on('progress', function (state) {
				console.log(state);
			}).on('error', function (err) {
				console.log(err);
			}).on('end', function () {
				scope.$apply(function() {
					addon.isDownloading = false;
					addon.isInstalled = true;
				});

				settings.addInstalledAddon(addon);
			}).pipe(fs.createWriteStream(filename));
		}

		function uninstall(addon, scope) {
			settings.getInstalledAddons(function(installedAddons) {
				if(installedAddons) {
					var installedAddon = installedAddons[addon.file];

					if(installedAddon) {
						var fs = require('fs');
						var filename = getAddonPath(installedAddon);

						fs.exists(filename, function(exists) {
							if(exists) {
								$log.info("Removing " + filename);
								fs.unlink(filename);
								settings.removeInstalledAddon(addon);

								scope.$apply(function() {
									addon.isDownloading = false;
									addon.isInstalled = false;
								});
							} else {
								$log.error(filename + " does not exist so cannot remove it.");
							}
						});
					}
				}
			});
		}

		function getAddonPath(addon) {
			var treeOfSaviorDirectory = "C:/Program Files (x86)/Steam/SteamApps/common/TreeOfSavior/addons/";
			var addonDirectory = treeOfSaviorDirectory + "mods/";
			var filename = addonDirectory + "_" + addon.file + "-" + addon.unicode + "-" + addon.fileVersion + "." + addon.extension;

			$log.info("getAddonPath: " + filename);

			return filename;
		}
	}
})();
