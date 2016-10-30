(() => {
    'use strict';
    angular
        .module('forageApp')
        .directive('topNavBar', topNavBar);

    function topNavBar() {
        const directive = {
            templateUrl: './services/directives/topNavBar/topNavBar.html',
            controller: topNavBarController,
            controllerAs: 'topNavBar'
        };

        function topNavBarController(HomeService, FoodtruckService) {

            const vm = this;

            HomeService.getCurrentuser().then(user => {
                vm.user = user;
                if (vm.user && vm.user.foodTruck)
                    FoodtruckService.getFoodtruckId(vm.user.foodTruck).then(foodtruckUser => vm.foodtruckUser = foodtruckUser);
            });

            vm.dropDown = () => $('.ui.top.right.pointing.dropdown').dropdown({allowAdditions: false});

        }

        return directive;
    }
})();