(function() {
    'use strict';

    angular
        .module('app')
        .controller('MainController', MainController);

    MainController.$inject = ['$http'];

    /* @ngInject */
    function MainController($http) {
        var viewModel = this;
		viewModel.browseForDirectory = browseForDirectory;
		viewModel.treeOfSaviorDirectory = "C:\\Program Files (x86)\\Steam\\steamapps\\common\\TreeOfSavior\\";

		$http.get("https://raw.githubusercontent.com/Tree-of-Savior-Addon-Community/Addons/master/addons.json").success(function(data) {
			var addons = [];
			angular.forEach(data.sources, function(source) {
				$http.get(source.url).success(function(sourceData) {
					console.log(sourceData);

					angular.forEach(sourceData, function(addon) {

						for(var attributeName in source) {
							addon[attributeName] = source[attributeName];
						}

						addon.downloadUrl = "https://github.com/" + source.author + "/" + source.repo + "/releases/download/" + addon.version + "/" + addon.file + "-" + addon.version + "." + addon.extension;
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

		function openWebsite(url) {
			//require("shell").openExternal(url);
		};

		viewModel.install = function install(addon) {
			console.log("installing!");

			//addon.url = "http://speedtest.atlanta.linode.com/100MB-atlanta.bin";
			addon.url = "http://speedtest.reliableservers.com/10MBtest.bin";
			//addon.url = "https://github.com/Excrulon/Tree-of-Savior-Lua-Mods/releases/download/1.9.1/tos-lua-addons-excrulon-1.9.1-20160512-01.zip";
			addon.isDownloading = true;
			addon.installProgress = 0;

			viewModel.treeOfSaviorDirectory = "C:/Program Files (x86)/Steam/SteamApps/common/TreeOfSavior/addons/";

			var modDirectory = viewModel.treeOfSaviorDirectory + "mods/";
			var filename = modDirectory + addon.name + ".zip";

			var fs = require('fs');
			var http = require('http');
			var file = fs.createWriteStream(filename);

			var request = http.get(addon.url, function(response) {
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

					addon.installProgress = Math.floor(percent);
					console.log(addon.installProgress);

					// TODO: Is there another way to update the progress bar properly besides using $scope here?
					$scope.$apply();
				});

				response.on("end", function() {
					addon.isDownloading = false;
					$scope.$apply();
				});

				request.on("error", function(error) {
					addon.isDownloading = false;
					$scope.$apply();
				});

				response.pipe(file);
			});
		};

		var fs = require('fs');
		var request = require('request');

		var download = function(url, dest, cb) {
		    var file = fs.createWriteStream(dest);
		    var sendReq = request.get(url);

		    // verify response code
		    sendReq.on('response', function(response) {
		        if (response.statusCode !== 200) {
		            return cb('Response status was ' + response.statusCode);
		        }
		    });

		    // check for request errors
		    sendReq.on('error', function (err) {
		        fs.unlink(dest);

		        if (cb) {
		            return cb(err.message);
		        }
		    });

		    sendReq.pipe(file);

		    file.on('finish', function() {
		        file.close(cb);  // close() is async, call cb after close completes.
		    });

		    file.on('error', function(err) { // Handle errors
		        fs.unlink(dest); // Delete the file async. (But we don't check the result)

		        if (cb) {
		            return cb(err.message);
		        }
		    });
		};
    }
})();
