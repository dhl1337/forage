/**
 * Created by danle on 2/3/16.
 */
(function () {
    angular
        .module('forageApp')
        .service('FoodtruckService', FoodtruckService);

    function FoodtruckService ($http) {
        this.getFoodtruck = function () {
            return $http({
                method: 'GET',
                url: '/api/foodtrucks'
            }).then(function (response) {
                return response.data
            }).catch(function(err) {
                console.error(err);
                debugger;
            })
        };
        this.addNewFoodtruck = function (foodtruck) {
            return $http({
                method: 'POST',
                url: '/api/foodtrucks',
                data: foodtruck
            }).then(function (response){
                return response.data
            });
        };
        this.getFoodtruckId = function (id) {
            //console.log("foodtruckId: ",id);
            return $http({
                method: 'GET',
                url: '/api/foodtrucks/' + id
            }).then(function (response){
                //console.log("foodtruck response: ",response.data);
                return response.data
            })
        };
        this.updateFoodtruck = function (id, obj) {
            return $http({
                method: 'PUT',
                url: '/api/foodtrucks/' + id,
                data: obj
            }).then(function (response) {
                console.log("this is the update response data: ",response.data);
                return response.data
            })
        };
        this.addReview = function (id, obj) {
            return $http({
                method: 'POST',
                url: '/api/reviews/'+id,
                data: obj
            }).then(function (response) {
                return response.data
            })
        };
        this.addFavorite = function (currentUserId, foodtruckId) {
            return $http({
                method: 'POST',
                url: '/api/users/favorite/' + currentUserId,
                data: foodtruckId
            }).then(function (response){
                return response.data;
            })
        };

    }
})();