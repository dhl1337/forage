/**
 * Created by danle on 2/4/16.
 */
(function () {
    angular
        .module('forageApp')
        .controller('FoodtruckController', ['FoodtruckService', '$stateParams', 'HomeService', '$state', FoodtruckController]);

    function FoodtruckController (FoodtruckService, $stateParams, HomeService, $state) {
        var vm = this;
        var currentFoodtruckId = $stateParams.id;
        vm.addFoodtruck = addFoodtruck;
        vm.addMenu = addMenu;
        vm.settings = settings;
        vm.hoursAccordion = hoursAccordion;
        vm.menuAccordion = menuAccordion;
        vm.reviewModal = reviewModal;
        vm.addReview = addReview;
        vm.addFoodtruck = addFoodtruck;
        vm.addFavorite = addFavorite;
        vm.menuItems = [];


        HomeService.getCurrentuser().then(function (user){vm.currentUser = user;});

        FoodtruckService.getFoodtruckId(currentFoodtruckId).then(function(foodtruckUser){
            var truck = foodtruckUser[0];
            vm.foodtruckUser = foodtruckUser;
            //console.log("foodcontroller truck:",truck);
            vm.foodTruckAddress = truck.address;
            vm.foodTruckCity = truck.city;
            vm.foodTruckZip = truck.zip;
            vm.state = truck.state;
            vm.foodTruckPhone = truck.phone;
            vm.foodTruckWebsite = truck.website;
            vm.foodTruckSunday = truck.hours.sunday;
            vm.foodTruckMonday = truck.hours.monday;
            vm.foodTruckTuesday = truck.hours.tuesday;
            vm.foodTruckWednesday = truck.hours.wednesday;
            vm.foodTruckThursday = truck.hours.thursday;
            vm.foodTruckFriday = truck.hours.friday;
            vm.foodTruckSaturday = truck.hours.saturday;
            vm.priceMin = truck.price.min;
            vm.priceMax = truck.price.max;
            vm.heathScore = truck.healthScore;
            vm.menuItems = truck.menu;
            vm.reviews = truck.reviews;
            console.log('this is reviews',vm.reviews);
        });

        function addFoodtruck (name, cuisine, photo, phone, website, sunday, monday, tuesday, wednesday, thursday, friday, saturday, priceMin, priceMax, heathScore, menu) {
            var foodtruckUser = {
                name: name,
                cuisine: cuisine,
                photo: photo,
                phone: phone,
                website: website,
                hours: {
                    sunday: sunday,
                    monday: monday,
                    tuesday: tuesday,
                    wednesday: wednesday,
                    thursday: thursday,
                    friday: friday,
                    saturday: saturday
                },
                price: {
                    min: priceMin,
                    max: priceMax
                },
                healthScore: heathScore,
                menu: menu
            };
            FoodtruckService.addNewFoodtruck(foodtruckUser);
        };

        function addMenu () {
            vm.menuItems.push({});
        }

        function settings (address, zip, phone, website, sunday, monday, tuesday, wednesday, thursday, friday, saturday, priceMin, priceMax, heathScore, menu, state, city) {
            var foodtruck = {
                address: address,
                zip: zip,
                city: city,
                phone: phone,
                website: website,
                hours: {
                    sunday:sunday,
                    monday:monday,
                    tuesday:tuesday,
                    wednesday: wednesday,
                    thursday: thursday,
                    friday: friday,
                    saturday: saturday
                },
                price: {min: priceMin, max: priceMax},
                menu: menu,
                healthScore: heathScore,
                state: state
            };
            FoodtruckService.updateFoodtruck(currentFoodtruckId, foodtruck)
        }

        //console.log("this is the current user",vm.currentUser);

        function addReview (description) {
            var obj = {
                userId: vm.currentUser._id,
                rating: vm.rating,
                description: description,
                date: Date.now()
            };

            var foodtruckObj = {
                foodtruckId: currentFoodtruckId,
                name: vm.foodtruckUser[0].name,
                photo: vm.foodtruckUser[0].photo,
                description: description,
                rating: vm.rating
            };
            //console.log("add review",vm.currentUser._id, obj);
            //console.log('this should be maryID',currentFoodtruckId);
            FoodtruckService.addReview(currentFoodtruckId, obj);
            HomeService.addReview(vm.currentUser._id, foodtruckObj);
            //$state.go('home.foodtruck', {id:currentFoodtruckId});
        }

        function menuAccordion () {
            $('#menuAccordion')
                .accordion()
            ;
        }

        function hoursAccordion () {
            $('#hoursAccordion')
                .accordion()
            ;
        }

        function reviewModal () {
            console.log('im getting clicky clickey');
            $('#reviewModal')
                .modal('show')
            ;
        }

        function addFavorite () {
            //console.log('adding currentuser',vm.currentUser._id);
            //console.log('adding current foodtruck',currentFoodtruckId);
            var obj = {
                foodtruckId: currentFoodtruckId,
                name: vm.foodtruckUser[0].name,
                photo: vm.foodtruckUser[0].photo,
                cuisine: vm.foodtruckUser[0].cuisine
            };
            console.log(obj);
            FoodtruckService.addFavorite(vm.currentUser._id, obj);
        }

        $('#asdf')
            .rating('enable');


        $('#foodtruckRating')
            .rating('disable');

        $('#userRating')
            .rating('setting', 'onRate', function (value) {
                vm.rating = value;
                //console.log(vm.rating);
            })
    }
})();