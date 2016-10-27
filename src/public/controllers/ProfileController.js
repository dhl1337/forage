(function () {
    angular
        .module('forageApp')
        .controller('ProfileController', ['HomeService', 'FoodtruckService', 'ProfileService', 'currentUser', ProfileController]);

    function ProfileController (HomeService, FoodtruckService, ProfileService, currentUser) {
        console.log('hello');
        var vm = this;
        vm.currentUserId = currentUser._id;

        google.maps.visualRefresh = true;
        HomeService.getCurrentUserId(vm.currentUserId).then(function(user){
            vm.user = user;
        });

        FoodtruckService.getFoodtruck().then(function (foodtruck) {
            vm.foodtruck = foodtruck;
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


        $('#userMenu').on('click','div', function(){
            $(this).addClass('active').siblings().removeClass('active');
        });
    }
})();