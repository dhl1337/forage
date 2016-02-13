/**
 * Created by danle on 1/29/16.
 */
(function () {
    angular
        .module('forageApp')
        .controller('ProfileController', ['HomeService', 'FoodtruckService','$stateParams',ProfileController]);

    function ProfileController (HomeService, FoodtruckService, $stateParams) {
        var vm = this;
        var currentUserId = $stateParams.id;

        google.maps.visualRefresh = true;
        HomeService.getCurrentUserId(currentUserId).then(function(user){
            vm.user = user;
            console.log("this is user",vm.user);
        });

        FoodtruckService.getFoodtruck().then(function (foodtruck) {
            vm.foodtruck = foodtruck;
            console.log('foodtruck:', vm.foodtruck);
            vm.review = [];
            vm.foodtruckReview = [];
            //var foodtruck = vm.foodtruck.length;
            for (var i = 0; i < vm.foodtruck.length; i++) {
                console.log("im looping!",vm.foodtruck[i].reviews);
                for (var j = 0; j < vm.foodtruck[i].reviews.length; j++) {
                    console.log('second loop', vm.foodtruck[i].reviews[j].userId);
                    if (vm.foodtruck[i].reviews[j].userId == vm.user[0]._id) {
                        vm.review.push(vm.foodtruck[i]);
                    }
                }
                console.log('this is reviews',vm.review);
            }
        });
    }
})();