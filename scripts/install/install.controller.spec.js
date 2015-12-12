describe("Install Controller", function() {

	var installController;

	beforeEach(module('app'));
	beforeEach(inject(function($controller) {
		installController = $controller('InstallController', {
			$scope: {}
		});
	}));

	it('getAddons method should be defined', inject(function($controller) {
		expect(installController.getAddons).toBeDefined();
	}));
});
