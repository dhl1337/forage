'use strict';

(function () {
    angular.module('forageApp').controller('ProfileController', ['HomeService', 'FoodtruckService', 'ProfileService', 'currentUser', ProfileController]);

    function ProfileController(HomeService, FoodtruckService, ProfileService, currentUser) {
        var _this = this;

        var vm = this;

        vm.currentUserId = currentUser._id;

        google.maps.visualRefresh = true;

        HomeService.getCurrentUserId(vm.currentUserId).then(function (user) {
            return vm.user = user;
        });

        FoodtruckService.getFoodtruck().then(function (foodtruck) {
            return vm.foodtruck = foodtruck;
        });

        vm.foodtrucksFavorite = function () {
            vm.arr = [];
            for (var i = 0; i < vm.user.length; i++) {
                for (var key in vm.user[i].favorites) {
                    vm.arr.push(vm.user[i].favorites[key]['foodtruckId']);
                }
            }
        };

        ProfileService.getReview(vm.currentUserId).then(function (foodtruck) {
            vm.foodtruck = foodtruck;
            vm.foundReview = [];
            for (var i = 0; i < vm.foodtruck.length; i++) {
                for (var j = 0; j < vm.foodtruck[i].reviews.length; j++) {
                    if (vm.foodtruck[i].reviews[j].userId == vm.user[0]._id) {
                        vm.foundReview.push(vm.foodtruck[i].reviews[j]);
                    }
                }
            }
        });

        $('#userMenu').on('click', 'div', function () {
            $(_this).addClass('active').siblings().removeClass('active');
        });
    }
})();