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