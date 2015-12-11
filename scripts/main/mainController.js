(function() {
    'use strict';

    angular
        .module('app')
        .controller('MainController', MainController);

    MainController.$inject = ['AddonFactory'];

    /* @ngInject */
    function MainController(AddonFactory) {
		console.log("main controller");

        var viewModel = this;
		viewModel.addons = [];
		viewModel.getAddons = getAddons;
		viewModel.browseForDirectory = browseForDirectory;
		viewModel.installMod = installMod;
		viewModel.treeOfSaviorDirectory = "C:\\Program Files (x86)\\Steam\\steamapps\\common\\TreeOfSavior\\";

        activate();

        function activate() {
			return getAddons().then(function() {
				console.log("activated main controller");
			});
        }

		function getAddons() {
			return AddonFactory.getAddons().then(function(data) {
				viewModel.addons = data;
				return viewModel.addons;
			});
		}

		/*
		$scope.mods = [
			{ name: 'expviewer', author: 'Excrulon', isInstalled: false },
			{ name: 'mobframes', author: 'SecurityRisk', isInstalled: false }
		];
		*/

		function browseForDirectory() {
			var fs = require('fs');
			var modDirectory = viewModel.treeOfSaviorDirectory + "mods";
			fs.mkdir(viewModel.treeOfSaviorDirectory + "mods");

			var remote = require('remote');
			var dialog = remote.require('dialog');
			viewModel.treeOfSaviorDirectory = dialog.showOpenDialog({ properties: ['openDirectory']});
		};

		function installMod(mod) {
			mod.url = "http://speedtest.atlanta.linode.com/100MB-atlanta.bin";

			var modDirectory = viewModel.treeOfSaviorDirectory + "mods\\";
			var filename = modDirectory + mod.name + ".zip";

			var fs = require('fs');
			var http = require('http');
			var file = fs.createWriteStream(filename);

			var request = http.get(mod.url, function(response) {
				var len = parseInt(response.headers['content-length'], 10);
				var body = "";
            	var cur = 0;
				var total = len / 1048576; //1048576 - bytes in  1Megabyte

				response.on("data", function(chunk) {
	                body += chunk;
	                cur += chunk.length;
					console.log("Downloading " + (100.0 * cur / len).toFixed(2) + "% " + (cur / 1048576).toFixed(2) + " mb\r" + ".<br/> Total size: " + total.toFixed(2) + " mb");
	            });
				console.log(response);
				response.pipe(file);
			});
		}
    }
})();
