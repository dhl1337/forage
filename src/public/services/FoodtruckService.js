(() => {
    angular
        .module('forageApp')
        .service('FoodtruckService', FoodtruckService);

    function FoodtruckService ($http) {

        this.getFoodtruck = () => $http.get(`/api/foodtrucks`).then(response => response.data);

        this.addNewFoodtruck = foodtruck => $http.post(`/api/foodtrucks`, foodtruck).then(response => response.data);

        this.getFoodtruckId = id => $http.get(`/api/foodtrucks/${id}`).then(response => response.data);

        this.updateFoodtruck = (id, obj) => $http.put(`/api/foodtrucks/${id}`, obj).then(response => response.data);

        this.addReview = (id, obj) => $http.post(`/api/reviews/${id}`, obj).then(response => response.data);

        this.addFavorite = (currentUserId, foodtruckId) => $http.post(`/api/users/favorite/${currentUserId}`, foodtruckId).then(response => response.data);

    }
})();