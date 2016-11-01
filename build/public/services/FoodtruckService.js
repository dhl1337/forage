'use strict';

(function () {
    angular.module('forageApp').service('FoodtruckService', FoodtruckService);

    function FoodtruckService($http) {

        this.getFoodtruck = function () {
            return $http.get('/api/foodtrucks').then(function (response) {
                return response.data;
            });
        };

        this.addNewFoodtruck = function (foodtruck) {
            return $http.post('/api/foodtrucks', foodtruck).then(function (response) {
                return response.data;
            });
        };

        this.getFoodtruckId = function (id) {
            return $http.get('/api/foodtrucks/' + id).then(function (response) {
                return response.data;
            });
        };

        this.updateFoodtruck = function (id, obj) {
            return $http.put('/api/foodtrucks/' + id, obj).then(function (response) {
                return response.data;
            });
        };

        this.addReview = function (id, obj) {
            return $http.post('/api/reviews/' + id, obj).then(function (response) {
                return response.data;
            });
        };

        this.addFavorite = function (currentUserId, foodtruckId) {
            return $http.post('/api/users/favorite/' + currentUserId, foodtruckId).then(function (response) {
                return response.data;
            });
        };
    }
})();