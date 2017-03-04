// app.factory('SharedScopes', function ($rootScope) {
//     var sharedScopes = {};

//     return {
//         setScope: function (key, value) {
//             sharedScopes[key] = value;
//         },
//         getScope: function (key) {
//             return sharedScopes[key];
//         }
//     };
// });
(function() {
	'use strict';

	angular
		.module('app')
		.factory('SharedScopes', SharedScopes);


	function SharedScopes() {
        var sharedScopes = {};
        return {
            setScope: function (key, value) {
                sharedScopes[key] = value;
            },
            getScope: function (key) {
                return sharedScopes[key];
            }
        };
    }
})();