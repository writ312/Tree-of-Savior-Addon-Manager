(function() {
	'use strict';

	angular
		.module('app')
		.factory('settings', settings);

	settings.$inject = ['$log'];

	function settings($log) {
		var service = {
			addInstalledAddon: addInstalledAddon
		};

		return service;

		function addInstalledAddon(addon) {
			var storage = require('electron-json-storage');

			storage.get("settings", function(error, data) {
				if(!data.installedAddons) {
					data.installedAddons = [];
				}

				data.installedAddons.push(addon);

				storage.set("settings", data, function(error) {
					if(error) {
						$log.error(error + ": " + addon);
					} else {
						$log.info("Wrote installed addon to settings: " + addon);
					}
				});
			});
		}
	}
})();
