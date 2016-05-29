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
			addInstalledAddon : addInstalledAddon
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
			});
		}

		function removeInstalledAddon(addon) {
			storage.get(settingsFile, function(error, data) {
				if(data.installedAddons[data.file]) {
					delete data.installedAddons[data.file];
					saveInstalledAddons(data);
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
