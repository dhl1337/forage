/**
 * Created by danle on 1/29/16.
 */
(function () {
    angular
        .module('forageApp')
        .controller('ProfileController', ['HomeService', '$stateParams',ProfileController]);

    function ProfileController (HomeService, $stateParams) {
        var vm = this;
        var currentUserId = $stateParams.id;

        google.maps.visualRefresh = true;
        HomeService.getCurrentUserId(currentUserId).then(function(user){
            vm.user = user;
            console.log(vm.user);
        });


    }
})();