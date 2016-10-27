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
        };

        this.addReview = function (id, obj) {
            return $http({
                method: 'POST',
                url: '/api/users/reviews/' + id,
                data: obj
            }).then(function (response) {
                return response.data
            })
        };

    }
})();