(function() {
	'use strict';

	angular
		.module('app')
		.factory('installer', installer);

	installer.$inject = [];

	function installer() {
		var service = {
			install: install
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

			var treeOfSaviorDirectory = "C:/Program Files (x86)/Steam/SteamApps/common/TreeOfSavior/addons/";

			var modDirectory = treeOfSaviorDirectory + "mods/";
			var filename = modDirectory + "_" + addon.file + "-" + addon.unicode + "-" + addon.fileVersion + "." + addon.extension;

			addon.isDownloading = true;

			progress(request(addon.downloadUrl), {
			})
			.on('progress', function (state) {
				console.log(state);
			})
			.on('error', function (err) {
				console.log(err);
			})
			.on('end', function () {
				scope.$apply(function() {
					addon.isDownloading = false;
					addon.isInstalled = true;
				});

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
	}
})();
