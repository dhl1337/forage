(() => {
    angular
        .module('forageApp')
        .service('HomeService', HomeService);

    function HomeService($http, $state) {

        this.getCurrentuser = enforce => $http
            .get(`/auth/current`)
            .then(response => response.data)
            .catch(err => {
                if (err.status === 401 && enforce) {
                    $state.go('home')
                }
            });

        this.getCurrentUserId = id => $http.get(`/api/users/${id}`).then(response => response.data);

        this.addReview = (id, obj) => $http.post(`/api/users/reviews/${id}`, obj).then(response => response.data);

    }
})();