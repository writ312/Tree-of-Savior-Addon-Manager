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
			const storage = require('electron-json-storage');
			var destinationFile = getAddonPath(addon);

			addon.isDownloading = true;

			download(addon, destinationFile, scope, function() {
				console.log("download complete!");
			});
		}

		function download(addon, destinationFile, scope, callback) {
			var request = require('request');
			var fileRequest = request.get(addon.downloadUrl);

			fileRequest.on('response', function(response) {
				$log.info(`status code: ${response.statusCode}`);
				if(response.statusCode !== 200) {
					scope.$apply(function() {
						addon.isDownloading = false;
						addon.isInstalled = false;
						addon.failedInstall = true;
					});

					console.log("unlinking");

					return;
				} else {
					var fs = require('fs');
					var file = fs.createWriteStream(destinationFile);

					fileRequest.on('error', function(error) {
						scope.$apply(function() {
							addon.isDownloading = false;
							addon.failedInstall = true;
							addon.isInstalled = false;
						});
						fs.unlink(destinationFile);

						console.log("file request error");

						return;
					});

					fileRequest.pipe(file);

					file.on('finish', function() {
						scope.$apply(function() {
							addon.isDownloading = false;
							addon.isInstalled = true;
							addon.failedInstall = false;
						});

						file.close();
						settings.addInstalledAddon(addon);
					});

					file.on('error', function(error) {
						fs.unlink(destinationFile);
						scope.$apply(function() {
							addon.isDownloading = false;
							addon.failedInstall = true;
							addon.isInstalled = false;
						});

						return;
					});
				}
			});
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
