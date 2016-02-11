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
                            console.log('resolve truck success');
                            return res;
                        }).catch(function(err) {
                            console.error('resolve truck err');
                            return null;
                        })
                    },
                    currentUser: function (HomeService) {
                        return HomeService.getCurrentuser(false).then(function(res) {
                            console.log('Resolve User success');
                            return res;
                        }).catch(function(err) {
                            console.log('resolve user failed');
                            return null;
                        })
                    }
                }
            })
            .state('profile', {
                url: '/profile/:id',
                templateUrl: '../views/user/profile/user.html',
                controller: 'ProfileController',
                controllerAs: 'profile'
            })
            .state('foodtruck', {
                url: '/foodtruck/:id',
                templateUrl: '../views/foodtruck/profile/foodtruck.html',
                controller: 'FoodtruckController',
                controllerAs: 'foodtruck'
            })
            .state('foodtruck.reviews', {
                url: '/reviews',
                templateUrl: '../views/foodtruck/profile/review.html',
                controller: 'FoodtruckController',
                controllerAs: 'foodtruck'
            })
            .state('foodtruck.menu',{
                url: '/menu',
                templateUrl: '../views/foodtruck/profile/menu.html',
                controller: 'FoodtruckController',
                controllerAs: 'foodtruck'
            })
            .state('ftsignup', {
                url: '/getting_started',
                templateUrl: '../views/foodtruck/signup/signup.html',
                controller: 'FoodtruckController',
                controllerAs: 'foodtruck'
            })
            .state('ftsignup.about', {
                url: '/about',
                templateUrl: '../views/foodtruck/signup/about.html'
            })
            .state('ftsignup.picture', {
                url: '/picture',
                templateUrl: '../views/foodtruck/signup/picture.html'
            })
            .state('ftsignup.confirm', {
                url: '/confirm',
                templateUrl: '../views/foodtruck/signup/confirm.html'
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
            });
        $urlRouterProvider.otherwise('/home');
    }
})();