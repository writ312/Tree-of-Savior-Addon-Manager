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

		$http.get('https://raw.githubusercontent.com/Tree-of-Savior-Addon-Community/Addons/master/addons.json').success(function(data) {
			console.log(data);
			viewModel.addons = data;
		});

        activate();

        function activate() {
        }

		function browseForDirectory() {
			var fs = require('fs');
			var modDirectory = viewModel.treeOfSaviorDirectory + "mods";
			fs.mkdir(viewModel.treeOfSaviorDirectory + "mods");

			var remote = require('remote');
			var dialog = remote.require('dialog');
			viewModel.treeOfSaviorDirectory = dialog.showOpenDialog({ properties: ['openDirectory']});
		};
    }
})();
