(() => {
    angular
        .module('forageApp')
        .directive('user', user);

    function user () {
        const directive = {
            templateUrl: './directives/user/user.html',
            controller: 'ProfileController',
            controllerAs: 'profile'
        };

        return directive;
    }
})();