(() => {
    angular
        .module('forageApp', ['ui.router'])
        .config(['$stateProvider', '$urlRouterProvider', config]);

    function config($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('signup', {
                url: '/signup',
                templateUrl: '../views/foodtruck/signup/signup.html'
            })
            .state('home', {
                url: '/home',
                templateUrl: '../views/home.html',
                controller: 'HomeController',
                controllerAs: 'home',
                resolve: {
                    currentFoodtruck(FoodtruckService) {
                        return FoodtruckService.getFoodtruck()
                            .then(res => res)
                            .catch(err => null)
                    },
                    currentUser(HomeService) {
                        return HomeService.getCurrentuser(false)
                            .then(res => res)
                            .catch(err => null)
                    }
                }
            })
            .state('splash', {
                url: '/welcome',
                templateUrl: './views/splash/index.html'
            })
            .state('home.user', {
                url: '/user',
                templateUrl: './views/splash/user.html',
                controller: 'ProfileController',
                controllerAs: 'profile',
                resolve: {
                    currentUser(HomeService) {
                        return HomeService.getCurrentuser(false)
                            .then(res => res)
                            .catch(err => null)
                    }
                }
            })
            .state('home.profile', {
                url: '/profile/:id',
                templateUrl: '../views/user/profile/user.html',
                controller: 'ProfileController',
                controllerAs: 'profile'
            })
            .state('home.profile.reviews', {
                url: '/reviews',
                templateUrl: '../views/user/reviews/review.html',
                controller: 'ProfileController',
                controllerAs: 'profile'
            })
            .state('home.profile.favorites', {
                url: '/favorites',
                templateUrl: '../views/user/favorites/favorite.html',
                controller: 'ProfileController',
                controllerAs: 'profile'
            })
            .state('home.foodtruck', {
                url: '/foodtruck/:id',
                templateUrl: '../views/foodtruck/profile/foodtruck.html',
                controller: 'FoodtruckController',
                controllerAs: 'foodtruck',
                currentFoodtruck(FoodtruckService) {
                    return FoodtruckService.getFoodtruck()
                        .then(res => res)
                        .catch(err => null)
                }
            })
            .state('usersettings', {
                url: '/user_settings/:id',
                templateUrl: '../views/user/settings/setting.html'
            })
            .state('foodtrucksettings', {
                url: '/foodtruck_settings/:id',
                templateUrl: '../views/foodtruck/settings/setting.html',
                controller: 'FoodtruckController',
                controllerAs: 'foodtruck'
            })
            .state('foodtrucksignup', {
                url: '/foodtruck_setting',
                templateUrl: '../views/foodtruck/signup/index.html',
                controller: 'FoodtruckController',
                controllerAs: 'foodtruck'
            });
        $urlRouterProvider.otherwise('/welcome');
    }
})();