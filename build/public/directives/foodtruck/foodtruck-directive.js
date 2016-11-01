'use strict';

(function () {
    angular.module('forageApp').directive('foodtruck', foodtruck);

    function foodtruck() {
        var directive = {
            templateUrl: './directives/foodtruck/foodtruck.html',
            controller: 'FoodtruckController',
            controllerAs: 'foodtruck'
        };

        return directive;
    }
})();