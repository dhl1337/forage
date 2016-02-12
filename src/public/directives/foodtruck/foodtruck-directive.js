/**
 * Created by danle on 2/11/16.
 */
(function () {
    angular
        .module('forageApp')
        .directive('foodtruck', foodtruck);

    function foodtruck () {
        var directive = {
            templateUrl: './directives/foodtruck/foodtruck.html',
            controller: 'FoodtruckController',
            controllerAs: 'foodtruck'
        };

        return directive;
    }
})();