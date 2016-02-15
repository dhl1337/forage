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
            console.log("this is user",vm.user);
        });

        FoodtruckService.getFoodtruck().then(function (foodtruck) {
            vm.foodtruck = foodtruck;

            console.log('foodtrucks', vm.foodtruck)
        });

        vm.foodtrucksFavorite = function () {
            vm.arr = [];
            for (var i = 0; i < vm.user.length; i++) {
                console.log('boo', vm.user[i].favorites);
                for (var key in vm.user[i].favorites) {
                    console.log('work?',vm.user[i].favorites[key]['foodtruckId']);

                    vm.arr.push(vm.user[i].favorites[key]['foodtruckId']);

                }
            }
            console.log('arr of favorites?',vm.arr);
            //FoodtruckService.getFoodtruckId(vm.user[i].favorites[key]['foodtruckId']).then(function (data){
            //    vm.favoritesFoodtruck = data;
            //    console.log('this is favorite food truck',vm.favoritesFoodtruck);
            //})
        };

        //vm.favorites = [];


        function getFavorites () {
            //// var def = q.defer();
            //var finalFavorites = [];
            //ProfileService.getFavorite(vm.currentUserId).then(function (favorite) {
            //    var foodtrucks = favorite;
            //    var favorites = [];
            //
            //    for (var i = 0; i < foodtrucks.length; i++) {
            //        for (var j = 0; j < foodtrucks[i].favorites.length; j++) {
            //            favorites.push(foodtrucks[i].favorites[j].foodtruckId);
            //        }
            //        console.log('favs arr', favorites);
            //    }
            //
            //    for (var i = 0; i < favorites.length; i++) {
            //        console.log("loop",favorites[i]);
            //        FoodtruckService.getFoodtruckId(favorites[i]).then(function (data) {
            //            vm.data = data;
            //            // add all elements in data arr to favorites arr
            //            //vm.favorites.concat(vm.data);
            //
            //            console.log('this is data!',vm.data);
            //
            //            data.forEach(function(elem, i, arr) {
            //                //vm.usersReviewsForTruckArr = [];
            //                //elem.reviews.forEach(function(elem1, i1, arr1) {
            //                //   if (elem1.user_id === curr_user_id) {
            //                //      usersReviewsForTruckArr.push(elem1);
            //                //   }
            //                //});
            //
            //                vm.finalFavorites.push(elem);
            //            });
            //
            //            //console.log(vm.usersReviewsForTruckArr);
            //
            //            console.log('tyler saves the day',vm.favorites);
            //            // def.resolve(finalFavorites);
            //        });
            //    }
            //});
            //
            ////return def.promise;

        }

        //getFavorites()
        //    .then(
        //        function(response) {
        //            vm.favorites = response;
        //        }
        //    );


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


        $(function() {
            $('.ui.rating')
                .rating()
            ;
        });



        $('#userMenu').on('click','div', function(){
            $(this).addClass('active').siblings().removeClass('active');
        });
    }
})();