(() => {
    angular
        .module('forageApp')
        .directive('foodtruck', foodtruck);

    function foodtruck () {
        const directive = {
            templateUrl: './directives/foodtruck/foodtruck.html',
            controller: 'FoodtruckController',
            controllerAs: 'foodtruck'
        };

        return directive;
    }
})();