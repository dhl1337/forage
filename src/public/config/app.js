/**
 * Created by danle on 1/29/16.
 */
(function () {
    angular
        .module('forageApp',['ui.router'])
        .config(['$stateProvider','$urlRouterProvider', config]);

    function config ($stateProvider, $urlRouterProvider) {
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
                    currentFoodtruck: function (FoodtruckService) {
                        return FoodtruckService.getFoodtruck().then(function(res) {
                            //console.log('resolve truck success');
                            return res;
                        }).catch(function(err) {
                            //console.error('resolve truck err');
                            return null;
                        })
                    },
                    currentUser: function (HomeService) {
                        return HomeService.getCurrentuser(false).then(function(res) {
                            //console.log('Resolve User success');
                            return res;
                        }).catch(function(err) {
                            //console.log('resolve user failed');
                            return null;
                        })
                    }
                }
            })
            .state('splash', {
                url: '/welcome',
                templateUrl: '../views/splash/index.html',
                controller: 'HomeController',
                controllerAs: 'home'
            })
            .state('home.user', {
                url: '/user',
                templateUrl: '../views/splash/user.html',
                controller: 'ProfileController',
                controllerAs: 'profile'
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
                controllerAs: 'foodtruck'
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
                url:'/foodtruck_setting',
                templateUrl: '../views/foodtruck/signup/index.html',
                controller: 'FoodtruckController',
                controllerAs: 'foodtruck'
            });
        $urlRouterProvider.otherwise('/welcome');
    }
})();