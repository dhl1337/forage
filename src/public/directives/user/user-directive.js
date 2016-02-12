/**
 * Created by danle on 2/11/16.
 */
(function () {
    angular
        .module('forageApp')
        .directive('user', user);

    function user () {
        var directive = {
            templateUrl: './directives/user/user.html',
            controller: 'ProfileController',
            controllerAs: 'profile'
        };


        return directive;
    }
})();