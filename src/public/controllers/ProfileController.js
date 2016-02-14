/**
 * Created by danle on 1/29/16.
 */
(function () {
    angular
        .module('forageApp')
        .controller('ProfileController', ['HomeService', 'FoodtruckService', 'ProfileService','$stateParams',ProfileController]);

    function ProfileController (HomeService, FoodtruckService, ProfileService, $stateParams) {
        var vm = this;
        vm.currentUserId = $stateParams.id;
        vm.getFavorites = getFavorites;

        console.log('this is current user id',vm.currentUserId);
        google.maps.visualRefresh = true;
        HomeService.getCurrentUserId(vm.currentUserId).then(function(user){
            vm.user = user;
            //console.log("this is user",vm.user);
        });

        FoodtruckService.getFoodtruck().then(function (foodtruck) {
            vm.foodtruck = foodtruck;

        });

        function getFavorites () {
            ProfileService.getFavorite(vm.currentUserId).then(function (favorite) {
                var foodtrucks = favorite;
                var favorites = [];

                for (var i = 0; i < foodtrucks.length; i++) {
                    for (var j = 0; j < foodtrucks[i].favorites.length; j++) {
                        favorites.push(foodtrucks[i].favorites[j].foodtruckId);
                    }
                    console.log('favs arr', favorites);
                }

                for (var i = 0; i < favorites.length; i++) {
                    console.log("loop",favorites[i]);
                    FoodtruckService.getFoodtruckId(favorites[i]).then(function (data) {
                        vm.data = data;
                        console.log('this is data!',vm.data);
                    });
                }
            });
        }

        ProfileService.getReview(vm.currentUserId).then(function (foodtruck) {
            vm.foodtruck = foodtruck;
            //console.log('this is review',vm.foodtruck);
            vm.foundReview = [];
            for (var i = 0; i < vm.foodtruck.length; i++) {
                for (var j = 0; j < vm.foodtruck[i].reviews.length; j++) {
                    if (vm.foodtruck[i].reviews[j].userId == vm.user[0]._id) {
                        vm.foundReview.push(vm.foodtruck[i].reviews[j]);
                    }
                }
                //console.log('i found it?',vm.foundReview);
            }
        });
    }
})();