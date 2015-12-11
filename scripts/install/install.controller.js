(function() {
	'use strict';

	angular
	.module('app')
	.controller('InstallController', InstallController);

	InstallController.$inject = ['$scope', 'AddonFactory'];

	/* @ngInject */
	function InstallController($scope, AddonFactory) {
		var viewModel = this;
		viewModel.addons = [];
		viewModel.getAddons = getAddons;
		viewModel.installMod = installMod;
		viewModel.treeOfSaviorDirectory = "C:\\Program Files (x86)\\Steam\\steamapps\\common\\TreeOfSavior\\";

		activate();

		function activate() {
			return getAddons().then(function() {
			});
		}

		function getAddons() {
			return AddonFactory.getAddons().then(function(data) {
				viewModel.addons = data;
				return viewModel.addons;
			});
		}

		function installMod(mod) {
			mod.url = "http://speedtest.atlanta.linode.com/100MB-atlanta.bin";
			mod.isDownloading = true;

			var modDirectory = viewModel.treeOfSaviorDirectory + "mods\\";
			var filename = modDirectory + mod.name + ".zip";

			var fs = require('fs');
			var http = require('http');
			var file = fs.createWriteStream(filename);

			var request = http.get(mod.url, function(response) {
				var len = parseInt(response.headers['content-length'], 10);
				var body = "";
				var cur = 0;
				var BYTES_IN_MEGABYTE = 1048576;
				var total = len / BYTES_IN_MEGABYTE;

				response.on("data", function(chunk) {
					body += chunk;
					cur += chunk.length;
					var percent = (100.0 * cur / len).toFixed(2);
					//console.log("Downloading " + percent + "% " + (cur / 1048576).toFixed(2) + " mb\r" + ". Total size: " + total.toFixed(2) + " mb");

					mod.installProgress = percent;
					console.log("prog: " + mod.installProgress);
				});

				response.on("end", function() {
					mod.isDownloading = false;
				});

				request.on("error", function(error) {
					mod.isDownloading = false;
				});

				response.pipe(file);
			});
		}
	}
})();
