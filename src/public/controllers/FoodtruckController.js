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
        vm.menuAccordion = menuAccordion;
        vm.reviewModal = reviewModal;
        vm.addReview = addReview;
        vm.addFoodtruck = addFoodtruck;
        vm.addFavorite = addFavorite;
        vm.notifiedModal = notifiedModal;

        google.maps.visualRefresh = true;

        vm.menuItems = [];

        vm.addMessage = addMessage;

        function addMessage (message) {
            var text = { message: message };
            FoodtruckService.sendTextMessage(text);
        }

        function notifiedModal () {
            $('#notifiedModal').modal('show');
        }

        HomeService.getCurrentuser().then(function (user){
            vm.currentUser = user;
        });

        FoodtruckService.getFoodtruckId(currentFoodtruckId).then(function(foodtruckUser){
            var truck = foodtruckUser[0];
            vm.foodtruckUser = foodtruckUser;
            vm.name = truck.name;
            vm.cuisine = truck.cuisine;
            vm.photo = truck.photo;
            vm.phone = truck.phone;
            vm.website = truck.website;
            vm.sunday = truck.hours.sunday;
            vm.monday = truck.hours.monday;
            vm.tuesday = truck.hours.tuesday;
            vm.wednesday = truck.hours.wednesday;
            vm.thursday = truck.hours.thursday;
            vm.friday = truck.hours.friday;
            vm.saturday = truck.hours.saturday;
            vm.priceMin = truck.price.min;
            vm.priceMax = truck.price.max;
            vm.heathScore = truck.healthScore;
            vm.menuItems = truck.menu;
            vm.reviews = truck.reviews;
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
        }

        function addMenu () {
            vm.menuItems.push({});
        }

        function settings (name, cuisine, photo, phone, website, sunday, monday, tuesday, wednesday, thursday, friday, saturday, priceMin, priceMax, heathScore, menu) {
            var foodtruck = {
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
            console.log('currentFoodtruckId', currentFoodtruckId);
            console.log('foodtruck stuff', foodtruck);
            FoodtruckService.updateFoodtruck(currentFoodtruckId, foodtruck);
        }


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
            FoodtruckService.addReview(currentFoodtruckId, obj);
            HomeService.addReview(vm.currentUser._id, foodtruckObj);
        }

        function menuAccordion () {
            $('#menuAccordion').accordion();
        }

        function hoursAccordion () {
            $('#hoursAccordion').accordion();
        }

        function reviewModal () {
            $('#reviewModal').modal('show');
        }

        function addFavorite () {

            var obj = {
                foodtruckId: currentFoodtruckId,
                name: vm.foodtruckUser[0].name,
                photo: vm.foodtruckUser[0].photo,
                cuisine: vm.foodtruckUser[0].cuisine
            };

            FoodtruckService.addFavorite(vm.currentUser._id, obj);
        }

        $('#asdf').rating('enable');


        $('#foodtruckRating').rating('disable');

        $('#userRating').rating('setting', 'onRate', function (value) {
                vm.rating = value;
                //console.log(vm.rating);
            })
    }
})();