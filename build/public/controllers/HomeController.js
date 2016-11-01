'use strict';

(function () {
    angular.module('forageApp').controller('HomeController', ['currentFoodtruck', 'currentUser', '$state', HomeController]);

    function HomeController(currentFoodtruck, currentUser, $state) {
        var vm = this;

        var refreshTimeout = null;
        var map = null;
        var infowindow = null;

        google.maps.visualRefresh = true;

        vm.foodtrucks = currentFoodtruck;
        vm.user = currentUser;

        vm.loginModal = function () {
            $('#loginModal').modal('show');
        };

        vm.openSideBar = function () {
            $('#sidemenu').sidebar('setting', 'push').sidebar('toggle');
        };

        if (vm.user) {
            //find their food truck
            for (var i = 0; i < vm.foodtrucks.length; i++) {
                if (vm.user.foodTruck == vm.foodtrucks[i]._id) {
                    vm.openTruck = vm.foodtrucks[i];
                }
            }
        }

        vm.initMap = function () {
            var styles = [{
                "featureType": "administrative",
                "elementType": "labels.text.fill",
                "stylers": [{ "color": "#444444" }]
            }, {
                "featureType": "landscape",
                "elementType": "all",
                "stylers": [{ "color": "#f2f2f2" }]
            }, { "featureType": "poi", "elementType": "all", "stylers": [{ "visibility": "off" }] }, {
                "featureType": "road",
                "elementType": "all",
                "stylers": [{ "saturation": -100 }, { "lightness": 45 }]
            }, {
                "featureType": "road.highway",
                "elementType": "all",
                "stylers": [{ "visibility": "simplified" }]
            }, {
                "featureType": "road.arterial",
                "elementType": "labels.icon",
                "stylers": [{ "visibility": "off" }]
            }, {
                "featureType": "transit",
                "elementType": "all",
                "stylers": [{ "visibility": "off" }]
            }, {
                "featureType": "water",
                "elementType": "all",
                "stylers": [{ "color": "#46bcec" }, { "visibility": "on" }]
            }];

            var styledMap = new google.maps.StyledMapType(styles, { name: "Styled Map" });

            map = new google.maps.Map(document.getElementById('homeMap'), {
                center: { lat: 37.09024, lng: -95.712891 },
                zoom: 5,
                mapTypeControlOptions: {
                    mapTypeIds: [google.maps.MapTypeId.ROADMAP, 'map_style']
                }
            });
            infowindow = new google.maps.InfoWindow({ map: map });
            google.maps.event.addListener(map, 'click', function () {
                infowindow.close(map);
            });
            map.mapTypes.set('map_style', styledMap);
            map.setMapTypeId('map_style');
            google.maps.event.trigger(map, "resize");

            refreshMarkers();
        };

        var initLocationSharing = function initLocationSharing(location_callback, error_callback) {

            var guid = function guid() {
                var s4 = function s4() {
                    return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
                };
                return s4() + s4() + '-' + s4() + '-' + s4() + s4();
            };

            if (vm.openTruck) {
                var userInfo = {
                    id: vm.openTruck._id,
                    name: vm.openTruck.name
                };
            } else {
                var userInfo = {
                    id: guid(),
                    name: 'Anonymous'
                };
            }

            // Setup Socket IO
            var socket = io.connect('http://localhost:9999/');
            //var socket = io.connect('http://104.236.199.135/');
            socket.on('connect', function () {
                socket.on('location', function (location) {
                    if (location.id != userInfo.id) {
                        location_callback(location);
                    }
                });
            });

            // Setup Geolocation
            if (!navigator.geolocation) {
                return userInfo;
            }

            var geo_success = function geo_success(position) {
                userInfo.latitude = position.coords.latitude;
                userInfo.longitude = position.coords.longitude;
                location_callback(userInfo);
                sendLocation();
            };

            var geo_error = function geo_error() {
                return error_callback();
            };

            var sendLocationTimeout = null;

            var sendLocation = function sendLocation() {
                socket.emit('location', userInfo);
                clearTimeout(sendLocationTimeout);
                sendLocationTimeout = setTimeout(sendLocation, 1000 * 5);
            };

            var geo_options = { enableHighAccuracy: true };
            navigator.geolocation.watchPosition(geo_success, geo_error, geo_options);
            navigator.geolocation.getCurrentPosition(geo_success, geo_error, geo_options);

            return userInfo;
        };

        // User Infomation
        var currentUserInfo = null;
        var users = {};
        // Google Maps UI

        var userLocationUpdate = function userLocationUpdate(userInfo) {
            if (!users[userInfo.id]) users[userInfo.id] = { id: userInfo.id };

            users[userInfo.id].name = userInfo.name;
            users[userInfo.id].latitude = userInfo.latitude;
            users[userInfo.id].longitude = userInfo.longitude;
            users[userInfo.id].timestamp = new Date().getTime();
            refreshMarkers();
        };

        var refreshMarkers = function refreshMarkers() {
            var _loop = function _loop(id) {
                var userInfo = users[id];

                if (userInfo.marker) {

                    //Move the markers
                    userInfo.marker.setTitle(userInfo.name);
                    userInfo.marker.setPosition(new google.maps.LatLng(userInfo.latitude, userInfo.longitude));
                } else {
                    // Create a marker for the new user
                    if (userInfo.name !== "Anonymous") {
                        (function () {
                            var marker = new google.maps.Marker({ map: map });

                            google.maps.event.addListener(marker, 'click', function () {
                                infowindow.setContent(marker.getTitle());
                                infowindow.open(map, marker);
                                map.setZoom(map.getZoom() + 10);
                                map.setCenter(marker.getPosition());

                                vm.openSideBar();
                                $state.go('home.foodtruck', { id: userInfo.id });
                            });

                            userInfo.marker = marker;
                        })();
                    }
                }
            };

            for (var id in users) {
                _loop(id);
            }

            // Refresh the markers every 10 seconds
            clearTimeout(refreshTimeout);
            refreshTimeout = setTimeout(refreshMarkers, 1000 * 10);
        };

        vm.logFoodtruck = function () {
            return currentUserInfo = initLocationSharing(userLocationUpdate);
        };

        google.maps.event.addDomListener(window, "load", vm.initMap);

        currentUserInfo = initLocationSharing(userLocationUpdate);
    }
})();