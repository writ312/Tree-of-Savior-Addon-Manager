describe("Install Controller", function() {

	beforeEach(module('app'));

	it('getAddons method should be defined', inject(function($controller) {
        var ctrl = $controller('InstallController', {
			$scope : {}
		});

		expect(ctrl.getAddons).toBeDefined();
    }));
});
