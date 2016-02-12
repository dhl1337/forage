/**
 * Created by danle on 2/4/16.
 */
(function () {
    angular
        .module('forageApp')
        .controller('FoodtruckController', ['FoodtruckService', '$stateParams', 'HomeService', FoodtruckController]);

    function FoodtruckController (FoodtruckService, $stateParams, HomeService) {
        var vm = this;
        var currentFoodtruckId = $stateParams.id;
        vm.addFoodtruck = addFoodtruck;
        vm.addMenu = addMenu;
        vm.settings = settings;
        vm.hoursAccordion = hoursAccordion;
        vm.reviewModal = reviewModal;
        vm.addReview = addReview;
        vm.menuItems = [];
        vm.user  = {};

        $('.ui.rating')
            .rating()
        ;

        HomeService.getCurrentuser().then(function (user){
            vm.currentUser = user;
        });

        console.log("this is the current user",vm.currentUser);

        function addReview (description) {
            var obj = {
                userId: vm.currentUser._id,
                description: description,
                date: Date.now()
            };
            //console.log("add review",vm.currentUser._id, obj);
            FoodtruckService.addReview(currentFoodtruckId, obj)
        }

        function hoursAccordion () {
            $('.ui.accordion')
                .accordion()
            ;
        }

        function reviewModal () {
            console.log('im getting clicky clickey');
            $('#reviewModal')
                .modal('show')
            ;
        }

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
            console.log(vm.reviews);
        });

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

        function addMenu () {
            vm.menuItems.push({});
        }

        function addFoodtruck () {
            FoodtruckService.addNewFoodtruck(vm.user);
        }

    }
})();