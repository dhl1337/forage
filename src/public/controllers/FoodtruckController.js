(() => {
    angular
        .module('forageApp')
        .controller('FoodtruckController', ['FoodtruckService', 'HomeService', '$stateParams', '$state', FoodtruckController]);

    function FoodtruckController(FoodtruckService, HomeService, $stateParams, $state) {
        const vm = this;
        const currentFoodtruckId = $stateParams.id;

        vm.menuItems = [];

        HomeService.getCurrentuser().then(function (user) {
            vm.currentUser = user;
        });

        FoodtruckService.getFoodtruckId(currentFoodtruckId).then(function (foodtruckUser) {
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

        vm.addFoodtruck = (name, cuisine, photo, phone, website, sunday, monday, tuesday, wednesday, thursday, friday, saturday, priceMin, priceMax, heathScore, menu) => {
            const foodtruckUser = {
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

        vm.addMenu = () => {
            vm.menuItems.push({});
        };

        vm.settings = (name, cuisine, photo, phone, website, sunday, monday, tuesday, wednesday, thursday, friday, saturday, priceMin, priceMax, heathScore, menu) => {
            const foodtruck = {
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
            console.log('hey!');
            FoodtruckService.updateFoodtruck(currentFoodtruckId, foodtruck).then(function () {
                $state.go('home.foodtruck', {id: currentFoodtruckId});
            });
        };

        vm.addReview = (description) => {
            const obj = {
                userId: vm.currentUser._id,
                rating: vm.rating,
                description: description,
                date: Date.now()
            };

            const foodtruckObj = {
                foodtruckId: currentFoodtruckId,
                name: vm.foodtruckUser[0].name,
                photo: vm.foodtruckUser[0].photo,
                description: description,
                rating: vm.rating
            };

            FoodtruckService.addReview(currentFoodtruckId, obj);
            HomeService.addReview(vm.currentUser._id, foodtruckObj);
        };

        vm.menuAccordion = () => {
            $('#menuAccordion').accordion();
        };

        vm.hoursAccordion = () => {
            $('#hoursAccordion').accordion();
        };

        vm.reviewModal = () => {
            $('#reviewModal').modal('show');
        };

        vm.addFavorite = () => {

            const obj = {
                foodtruckId: currentFoodtruckId,
                name: vm.foodtruckUser[0].name,
                photo: vm.foodtruckUser[0].photo,
                cuisine: vm.foodtruckUser[0].cuisine
            };

            FoodtruckService.addFavorite(vm.currentUser._id, obj);
        };

    }
})();