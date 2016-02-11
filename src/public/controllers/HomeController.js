/**
 * Created by danle on 1/29/16.
 */
(function () {
    angular
        .module('forageApp')
        .controller('HomeController', ['FoodtruckService', 'HomeService', 'currentFoodtruck', 'currentUser',HomeController]);

    function HomeController (FoodtruckService, HomeService, currentFoodtruck, currentUser) {
        console.log('controller loading');
        var vm = this;
        vm.initMap = initMap;

        vm.foodtrucks = currentFoodtruck;
        console.log(vm.foodtrucks);

        //FoodtruckService.getFoodtruck().then(function(foodtruck){
        //    vm.foodtrucks = foodtruck;
        //    console.log('vm:', vm.foodtrucks);
        //});

        vm.user = currentUser;

        if(vm.user) {
            //find their food truck
            for(var i = 0; i <vm.foodtrucks.length; i++) {
                if (vm.user.foodTruck == vm.foodtrucks[i]._id) {
                    vm.openTruck = vm.foodtrucks[i];
                    console.log(vm.openTruck);
                }
            }
        }

        //HomeService.getCurrentuser().then(function (user) {
        //    vm.user = user;
        //});


        console.log('USER: ', vm.user);

        var map;
        function initMap() {
            map = new google.maps.Map(document.getElementById('homeMap'), {
                center: {lat: 37.09024, lng: -95.712891},
                zoom: 5
            });
            infowindow = new google.maps.InfoWindow({map: map});
            google.maps.event.addListener(map, 'click', function() {
                infowindow.close(map);
            });
            refreshMarkers();
        }

        vm.initLocation = initLocation;
        var refreshTimeout = null;
        function initLocation () {
            var infoWindow = new google.maps.InfoWindow({map: map});

            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(function(position) {
                    var pos = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    };
                    infoWindow.setPosition(pos);
                    infoWindow.setContent('Searching for food!');
                    map.setCenter(pos);
                    map.setZoom(map.getZoom() + 10);
                }, function() {
                    handleLocationError(true, infoWindow, map.getCenter());
                });
            } else {
                // Browser doesn't support Geolocation
                handleLocationError(false, infoWindow, map.getCenter());
            }
        }
        //google.maps.event.addDomListener(window, "load", vm.initLocation);

        function initLocationSharing(location_callback, error_callback){

            var userInfo = {
                id: vm.openTruck._id,
                name: vm.openTruck.name
            };

            // ================================
            // Setup Socket IO
            // ================================
            var socket = io();
            socket.on('connect', function () {
                socket.on('location', function(location){
                    if(location.id != userInfo.id) {
                        location_callback(location);
                    }
                })
            });

            // ================================
            // Setup Geolocation
            // ================================
            if (!navigator.geolocation) {
                return userInfo;
            }

            function geo_success(position) {
                var longitude = position.coords.longitude;
                userInfo.latitude  = position.coords.latitude;
                userInfo.longitude = position.coords.longitude;
                location_callback(userInfo);
                sendLocation();
            }

            function geo_error() {
                error_callback();
            }

            var sendLocationTimeout = null;
            function sendLocation(){
                socket.emit('location', userInfo);
                clearTimeout(sendLocationTimeout);
                sendLocationTimeout = setTimeout(sendLocation, 1000*20);
            }

            var geo_options = { enableHighAccuracy: true };
            navigator.geolocation.watchPosition(geo_success, geo_error, geo_options);
            navigator.geolocation.getCurrentPosition(geo_success, geo_error, geo_options);

            return userInfo;
        }
        //google.maps.event.addDomListener(window, "load", initLocationSharing);

        // User Infomation
        var currentUserInfo = null;
        var users = {};
        // Google Maps UI

        function userLocationUpdate(userInfo){
            if(!users[userInfo.id]) users[userInfo.id] = { id: userInfo.id };

            users[userInfo.id].name = userInfo.name;
            users[userInfo.id].latitude  = userInfo.latitude;
            users[userInfo.id].longitude = userInfo.longitude;
            users[userInfo.id].timestamp = new Date().getTime();
            //console.log(userInfo);
            refreshMarkers();
        }
        function refreshMarkers(){

            for (var id in users) {
                var userInfo = users[id];
                if(userInfo.marker){

                    // If we havn't received any update from the user
                    //  We remove the marker of missing user
                    if( userInfo.id != currentUserInfo.id &&
                        userInfo.timestamp + 1000*30 < new Date().getTime() ){
                        userInfo.marker.setMap(null);
                        delete users[id];
                        continue;
                    }
                }else{
                    // Create a marker for the new user
                    var marker = new google.maps.Marker({ map:map });
                    google.maps.event.addListener(marker, 'click', function() {
                        infowindow.setContent(marker.getTitle())
                        infowindow.open(map, marker);
                    });
                    userInfo.marker = marker;
                }
                //Move the markers
                userInfo.marker.setTitle(userInfo.name);
                userInfo.marker.setPosition(
                    new google.maps.LatLng(userInfo.latitude, userInfo.longitude));
            }

            // Refresh the markers every 20 seconds
            clearTimeout(refreshTimeout);
            refreshTimeout = setTimeout(refreshMarkers, 1000*20);
        }


        google.maps.event.addDomListener(window, "load", vm.initMap);
        if (vm.openTruck) {
            currentUserInfo = initLocationSharing(userLocationUpdate);
        }
    }
})();