(function() {
	'use strict';

	angular
		.module('app')
		.controller('ItemlistController', ItemlistController);

	ItemlistController.$inject = ['$scope', 'settings'];

	function ItemlistController($scope ,settings) {
        var vm = this
        var storage = require('electron-json-storage');
        var Path;
        var items = {};
        var warehouse;
        settings.getTreeOfSaviorDirectory(function(path){
            Path = path
            $scope.userlist = require(path+'/addons/barrackitemlist/userlist.json')
            for(let cid in $scope.userlist){
                items[cid] = require(Path+'/addons/barrackitemlist/'+cid+'.json');
            }
            warehouse = require(Path+'/addons/barrackitemlist/warehouse.json');        
        })
        storage.get('checkList', function(error, data) {
				if(error) {
					$log.error("Could not get tree of savior directory: " + error);
				} else {
                    vm.isShow = data
				}
        });
        this.openItemlist = function(cid,name){
            $scope.items = {}
            $scope.items = items[cid]
            $scope.items.warehouse = warehouse[cid].warehouse
            vm.selectedChara = name
            console.log($scope.items.Weapon)
       }
       this.saveChecklist = function(){
           storage.set("checkList",  vm.isShow, function(error) {
               if(error)    
                    console.log(error)
            });
       }
	}
})();
