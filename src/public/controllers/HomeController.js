(() => {
    angular
        .module('forageApp')
        .controller('HomeController', ['currentFoodtruck', 'currentUser', '$state', HomeController]);

    function HomeController(currentFoodtruck, currentUser, $state) {
        const vm = this;

        let refreshTimeout = null;
        let map = null;
        let infowindow = null;

        google.maps.visualRefresh = true;

        vm.foodtrucks = currentFoodtruck;
        vm.user = currentUser;

        vm.loginModal = () => {
            $('#loginModal').modal('show');
        };

        vm.openSideBar = () => {
            $('#sidemenu')
                .sidebar('setting', 'push')
                .sidebar('toggle')
        };

        if (vm.user) {
            //find their food truck
            for (let i = 0; i < vm.foodtrucks.length; i++) {
                if (vm.user.foodTruck == vm.foodtrucks[i]._id) {
                    vm.openTruck = vm.foodtrucks[i];
                }
            }
        }

        vm.initMap = () => {
            const styles = [{
                "featureType": "administrative",
                "elementType": "labels.text.fill",
                "stylers": [{"color": "#444444"}]
            }, {
                "featureType": "landscape",
                "elementType": "all",
                "stylers": [{"color": "#f2f2f2"}]
            }, {"featureType": "poi", "elementType": "all", "stylers": [{"visibility": "off"}]}, {
                "featureType": "road",
                "elementType": "all",
                "stylers": [{"saturation": -100}, {"lightness": 45}]
            }, {
                "featureType": "road.highway",
                "elementType": "all",
                "stylers": [{"visibility": "simplified"}]
            }, {
                "featureType": "road.arterial",
                "elementType": "labels.icon",
                "stylers": [{"visibility": "off"}]
            }, {
                "featureType": "transit",
                "elementType": "all",
                "stylers": [{"visibility": "off"}]
            }, {
                "featureType": "water",
                "elementType": "all",
                "stylers": [{"color": "#46bcec"}, {"visibility": "on"}]
            }];

            const styledMap = new google.maps.StyledMapType(styles, {name: "Styled Map"});

            map = new google.maps.Map(document.getElementById('homeMap'), {
                center: {lat: 37.09024, lng: -95.712891},
                zoom: 5,
                mapTypeControlOptions: {
                    mapTypeIds: [google.maps.MapTypeId.ROADMAP, 'map_style']
                }
            });
            infowindow = new google.maps.InfoWindow({map: map});
            google.maps.event.addListener(map, 'click', function () {
                infowindow.close(map);
            });
            map.mapTypes.set('map_style', styledMap);
            map.setMapTypeId('map_style');
            google.maps.event.trigger(map, "resize");

            refreshMarkers();
        };

        const initLocationSharing = (location_callback, error_callback) => {

            const guid = () => {
                const s4 = () => {
                    return Math.floor((1 + Math.random()) * 0x10000)
                        .toString(16).substring(1);
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
            //const socket = io.connect('http://localhost:9999/');
            var socket = io.connect('https://goforage.herokuapp.com');
            socket.on('connect', function () {
                socket.on('location', function (location) {
                    if (location.id != userInfo.id) {
                        location_callback(location);
                    }
                })
            });

            // Setup Geolocation
            if (!navigator.geolocation) {
                return userInfo;
            }

            const geo_success = (position) => {
                userInfo.latitude = position.coords.latitude;
                userInfo.longitude = position.coords.longitude;
                location_callback(userInfo);
                sendLocation();
            };

            const geo_error = () => error_callback();

            let sendLocationTimeout = null;

            const sendLocation = () => {
                socket.emit('location', userInfo);
                clearTimeout(sendLocationTimeout);
                sendLocationTimeout = setTimeout(sendLocation, 1000 * 5);
            };

            const geo_options = {enableHighAccuracy: true};
            navigator.geolocation.watchPosition(geo_success, geo_error, geo_options);
            navigator.geolocation.getCurrentPosition(geo_success, geo_error, geo_options);

            return userInfo;
        };

        // User Infomation
        let currentUserInfo = null;
        let users = {};
        // Google Maps UI

        const userLocationUpdate = (userInfo) => {
            if (!users[userInfo.id]) users[userInfo.id] = {id: userInfo.id};

            users[userInfo.id].name = userInfo.name;
            users[userInfo.id].latitude = userInfo.latitude;
            users[userInfo.id].longitude = userInfo.longitude;
            users[userInfo.id].timestamp = new Date().getTime();
            refreshMarkers();
        };

        const refreshMarkers = () => {
            for (let id in users) {

                const userInfo = users[id];
                if (userInfo.marker) {

                    //Move the markers
                    userInfo.marker.setTitle(userInfo.name);
                    userInfo.marker.setPosition(
                        new google.maps.LatLng(userInfo.latitude, userInfo.longitude));

                } else {
                    // Create a marker for the new user
                    if (userInfo.name !== "Anonymous") {
                        const marker = new google.maps.Marker({map: map});

                        google.maps.event.addListener(marker, 'click', function () {
                            infowindow.setContent(marker.getTitle());
                            infowindow.open(map, marker);
                            map.setZoom(map.getZoom() + 10);
                            map.setCenter(marker.getPosition());

                            vm.openSideBar();
                            $state.go('home.foodtruck', {id: userInfo.id});

                        });

                        userInfo.marker = marker;
                    }
                }

            }

            // Refresh the markers every 10 seconds
            clearTimeout(refreshTimeout);
            refreshTimeout = setTimeout(refreshMarkers, 1000);
        };

        vm.logFoodtruck = () => currentUserInfo = initLocationSharing(userLocationUpdate);

        //google.maps.event.addDomListener(window, "load", vm.initMap);
        refreshMarkers();
        vm.initMap();

        currentUserInfo = initLocationSharing(userLocationUpdate);

    }
})();
