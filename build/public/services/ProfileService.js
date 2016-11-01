'use strict';

(function () {
    angular.module('forageApp').service('ProfileService', ProfileService);

    function ProfileService($http) {

        this.getReview = function (id) {
            return $http.get('/api/reviews/' + id).then(function (response) {
                return response.data;
            });
        };

        //this.getFavorite = function (currentUserid) {
        //    return $http({
        //        method: 'GET',
        //        url: '/api/users/favorite/' + currentUserid
        //    }).then(function (response) {
        //        return response.data
        //    })
        //};
    }
})();