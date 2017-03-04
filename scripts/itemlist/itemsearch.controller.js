(function() {
	'use strict';

	angular
		.module('app')
		.controller('ItemsearchController', ItemsearchController);

	ItemsearchController.$inject = ['$scope','settings'];

	function ItemsearchController($scope,settings) {
        var Path;
        var vm = this
        settings.getTreeOfSaviorDirectory(function(path){
            Path = path
            $scope.items = {}
            $scope.userlist = require(path+'/addons/barrackitemlist/userlist.json')
            var warehouse = require(Path+'/addons/barrackitemlist/warehouse.json');

            for(let cid in $scope.userlist){
                $scope.items[$scope.userlist[cid]] = {}
                let items = require(Path+'/addons/barrackitemlist/'+cid+'.json');
                angular.forEach(items, function(value, type) {
                     Array.prototype.push.apply($scope.items[$scope.userlist[cid]],value)
                });    
            }
        })

       $scope.handleKeydown = function(e) {
           console.log(e.which)
            if (e.which == 13) {
                vm.searchQuery = $scope.searchStr
            }
        }
	}
})();
