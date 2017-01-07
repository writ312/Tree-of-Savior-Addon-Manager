(function() {
	'use strict';

	angular
		.module('app')
		.controller('SettingsController', SettingsController);

	SettingsController.$inject = ['$http','settings'];

	/* @ngInject */
	function SettingsController($http,settings) {
		var vm = this;
		vm.thisVersion = require('./package.json').version;
		vm.latestVersion = null
		var masterSources = "https://raw.githubusercontent.com/JTosAddon/Addons/master/addons.json";
		$http.get(masterSources + "?" + new Date().toString(), {cache: false}).success(function(data) {
			settings.JToSData = data;
			settings.isLoadedJToSData = true;
			vm.latestVersion = data.version
		});
		settings.getTreeOfSaviorDirectory(function(treeOfSaviorDirectory) {
			vm.treeOfSaviorDirectory = treeOfSaviorDirectory;
			validateDirectory();
		});

		vm.browseForDirectory = function() {
			var remote = require('remote');
			var dialog = remote.require('dialog');
			var directories = dialog.showOpenDialog({ properties: ['openDirectory']});

			if(directories && directories.length > 0) {
				vm.treeOfSaviorDirectory = directories[0];
				settings.saveTreeOfSaviorDirectory(vm.treeOfSaviorDirectory);
				validateDirectory();
			}
		};

		vm.isValidDirectory = function() {
			return settings.getIsValidDirectory();
		};
		vm.isLatestVersion = function(){
			return (vm.thisVersion == vm.latestVersion)?true:false;
		}
		function validateDirectory() {
			var fs = require("fs");
			var exe = vm.treeOfSaviorDirectory + "/release/Client_tos.exe";

			fs.stat(exe, function(error, stat) {
				if(error == null) {
					settings.setIsValidDirectory(true);
				} else {
					settings.setIsValidDirectory(false);
				}
			});
		}
	}
})();
