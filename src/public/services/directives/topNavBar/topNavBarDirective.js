(function () {
    'use strict';
    angular
        .module('forageApp')
        .directive('topNavBar', topNavBar);

    function topNavBar () {
        var directive = {
            templateUrl: './services/directives/topNavBar/topNavBar.html',
            controller: topNavBarController,
            controllerAs: 'topNavBar'
        };

        function topNavBarController (HomeService, FoodtruckService) {
            var vm = this;
            vm.loginModal = loginModal;
            vm.dropDown = dropDown;


            HomeService.getCurrentuser().then(function(user){
                vm.user = user;
                if (vm.user && vm.user.foodTruck) {
                    FoodtruckService.getFoodtruckId(vm.user.foodTruck).then(function(foodtruckUser){
                        vm.foodtruckUser = foodtruckUser;
                    });
                }
            });

            function dropDown () {
                $('.ui.top.right.pointing.dropdown')
                    .dropdown({
                        allowAdditions: false
                    })
                ;
            }

        }
        return directive;
    }
})();