'use strict';

(function () {
    angular.module('forageApp').service('HomeService', HomeService);

    function HomeService($http, $state) {

        this.getCurrentuser = function (enforce) {
            return $http.get('/auth/current').then(function (response) {
                return response.data;
            }).catch(function (err) {
                if (err.status === 401 && enforce) {
                    $state.go('home');
                }
            });
        };

        this.getCurrentUserId = function (id) {
            return $http.get('/api/users/' + id).then(function (response) {
                return response.data;
            });
        };

        this.addReview = function (id, obj) {
            return $http.post('/api/users/reviews/' + id, obj).then(function (response) {
                return response.data;
            });
        };
    }
})();