(() => {
    angular
        .module('forageApp')
        .controller('ProfileController', ['HomeService', 'FoodtruckService', 'ProfileService', 'currentUser', ProfileController]);

    function ProfileController(HomeService, FoodtruckService, ProfileService, currentUser) {
        const vm = this;

        vm.currentUserId = currentUser._id;

        google.maps.visualRefresh = true;

        HomeService.getCurrentUserId(vm.currentUserId).then(user => vm.user = user);

        FoodtruckService.getFoodtruck().then(foodtruck => vm.foodtruck = foodtruck);

        vm.foodtrucksFavorite = () => {
            vm.arr = [];
            for (let i = 0; i < vm.user.length; i++) {
                for (let key in vm.user[i].favorites) {
                    vm.arr.push(vm.user[i].favorites[key]['foodtruckId']);
                }
            }
        };

        ProfileService.getReview(vm.currentUserId).then(foodtruck => {
            vm.foodtruck = foodtruck;
            vm.foundReview = [];
            for (let i = 0; i < vm.foodtruck.length; i++) {
                for (let j = 0; j < vm.foodtruck[i].reviews.length; j++) {
                    if (vm.foodtruck[i].reviews[j].userId == vm.user[0]._id) {
                        vm.foundReview.push(vm.foodtruck[i].reviews[j]);
                    }
                }
            }
        });


        $('#userMenu').on('click', 'div', () => {
            $(this).addClass('active').siblings().removeClass('active');
        });
    }
})();