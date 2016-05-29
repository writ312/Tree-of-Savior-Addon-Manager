(function() {
	'use strict';

	angular
		.module('app')
		.factory('settings', settings);

	settings.$inject = ['$log'];

	function settings($log) {
		const storage = require('electron-json-storage');
		const settingsFile = "settings";

		var service = {
			addInstalledAddon : addInstalledAddon,
			removeInstalledAddon : removeInstalledAddon
		};

		return service;

		function addInstalledAddon(addon) {
			storage.get(settingsFile, function(error, data) {
				if(!data.installedAddons) {
					data.installedAddons = {};
				}

				data.installedAddons[addon.file] = addon;
				saveInstalledAddons(data);

				$log.info("Saved adding addon: " + addon.file);
			});
		}

		function removeInstalledAddon(addon) {
			storage.get(settingsFile, function(error, data) {
				if(error) {
					$log.error("Could not remove installed addon: " + error + " " + data);
				} else if(data.installedAddons[addon.file]) {
					delete data.installedAddons[addon.file];
					saveInstalledAddons(data);
					$log.info("Saved removing addon: " + addon.file);
				} else {
					$log.warn("Addon " + addon.file + " can't be removed because it is not installed.");
				}
			});
		}

		function saveInstalledAddons(data) {
			storage.set(settingsFile, data, function(error) {
				if(error) {
					$log.error(error + ": " + data);
				} else {
					$log.info("Wrote installed addon to settings: " + data);
				}
			});
		}
	}
})();
