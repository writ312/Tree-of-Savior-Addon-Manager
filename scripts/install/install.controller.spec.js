describe("Install Controller", function() {

	var installController;

	beforeEach(module('app'));
	beforeEach(inject(function($controller) {
		installController = $controller('InstallController', {
			$scope: {}
		});
	}));

	it('getAddons method should be defined', function() {
		expect(installController.getAddons).toBeDefined();
	});

	it('installMod method should be defined', function() {
		expect(installController.installMod).toBeDefined();
	});
});
