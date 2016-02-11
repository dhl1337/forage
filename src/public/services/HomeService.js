/**
 * Created by danle on 1/29/16.
 */
(function () {
    angular
        .module('forageApp')
        .service('HomeService', HomeService);

    function HomeService ($http, $state) {

        this.getCurrentuser = function (enforce) {
            return $http({
                method: 'GET',
                url: '/auth/current'
            }).then(function (response) {
                return response.data
            }).catch(function (err) {
                console.log($state.is('home'));
                if(err.status === 401 && enforce) {
                    $state.go('home');
                }
            });
        };

        this.getCurrentUserId = function (id) {
            return $http({
                method: 'GET',
                url: '/api/users/' + id
            }).then(function (response) {
                return response.data
            });
        }

    }
})();