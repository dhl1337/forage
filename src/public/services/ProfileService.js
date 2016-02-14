/**
 * Created by danle on 1/29/16.
 */
(function () {
    angular
        .module('forageApp')
        .service('ProfileService', ProfileService);

    function ProfileService ($http) {

        this.getReview = function (id) {
            return $http ({
                method: 'GET',
                url: '/api/reviews/' + id
            }).then(function (response) {
                return response.data
            })
        };
        this.getFavorite = function (currentUserid) {
            return $http({
                method: 'GET',
                url: '/api/users/favorite/' + currentUserid
            }).then(function (response) {
                return response.data
            })
        };

    }
})();
