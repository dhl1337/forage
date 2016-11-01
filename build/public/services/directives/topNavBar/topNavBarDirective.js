'use strict';

(function () {
    'use strict';

    angular.module('forageApp').directive('topNavBar', topNavBar);

    function topNavBar() {
        var directive = {
            templateUrl: './services/directives/topNavBar/topNavBar.html',
            controller: topNavBarController,
            controllerAs: 'topNavBar'
        };

        function topNavBarController(HomeService, FoodtruckService) {

            var vm = this;

            HomeService.getCurrentuser().then(function (user) {
                vm.user = user;
                if (vm.user && vm.user.foodTruck) FoodtruckService.getFoodtruckId(vm.user.foodTruck).then(function (foodtruckUser) {
                    return vm.foodtruckUser = foodtruckUser;
                });
            });

            vm.dropDown = function () {
                return $('.ui.top.right.pointing.dropdown').dropdown({ allowAdditions: false });
            };
        }

        return directive;
    }
})();