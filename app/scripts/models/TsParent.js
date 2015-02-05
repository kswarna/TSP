/**
 * Created by karthik on 2/3/2015.
 */
angular.module('travelApp')
    .service('TsParent',function($http,CityFactory) {

        var CityLink = [];
        var city = [];
        var rest = [];
        var map;
        var geocoder;
        var bounds = new google.maps.LatLngBounds();
        var markersArray = [];
        var selected = [];
        var origin1 = new google.maps.LatLng(55.930, -3.118);
        var origin2 = 'Greenwich, England';
        var destinationA = 'Stockholm, Sweden';
        var destinationB = new google.maps.LatLng(50.087, 14.421);

        var destinationIcon = 'https://chart.googleapis.com/chart?chst=d_map_pin_letter&chld=D|FF0000|000000';
        var originIcon = 'https://chart.googleapis.com/chart?chst=d_map_pin_letter&chld=O|FFFF00|000000';
        this.GetCityLink = function()
        {
            initialize();
            var sel =CityFactory.GetSelectedCities();

            for (var j = 0; j < sel.length; j++) {
                selected.push(sel[j].Name);
            }
            city = [];
            city.push(selected.pop());
            CalculateCityLink();
            return CityLink;
        };
        CalculateCityLink = function()
        {
            var destCities = selected.slice(0);
            var len = destCities.length;
            for (j = 0; j < len; j++) {
                rest.push(destCities.pop())
            }
            calculateDistances(city,rest);
        };

        function initialize() {
            var opts = {
                center: new google.maps.LatLng(55.53, 9.4),
                zoom: 10
            };
            map = new google.maps.Map(document.getElementById('map-canvas'), opts);
            geocoder = new google.maps.Geocoder();
            var outputDiv = document.getElementById('outputDiv');
            outputDiv.innerHTML = '';
            deleteOverlays();
            selected = [];
        }
        function calculateDistances(origin ,destinations) {
            var service = new google.maps.DistanceMatrixService();
            service.getDistanceMatrix(
                {
                    origins: origin,
                    destinations: destinations,
                    travelMode: google.maps.TravelMode.DRIVING,
                    unitSystem: google.maps.UnitSystem.METRIC,
                    avoidHighways: false,
                    avoidTolls: false
                }, callback);
        }

        function callback(response, status) {
            if (status != google.maps.DistanceMatrixStatus.OK) {
                alert('Error was: ' + status);
            } else {
                var origins = response.originAddresses;
                var destinations = response.destinationAddresses;
                var outputDiv = document.getElementById('outputDiv');

                for (var i = 0; i < origins.length; i++) {
                    var results = response.rows[i].elements;
                    addMarker(origins[i], false);
                    var closestCity = '';
                    var smallestDistance = 0;
                    for (var j = 0; j < results.length; j++) {
                        addMarker(destinations[j], true);
                        if (smallestDistance == 0)
                        {
                            smallestDistance = results[j].distance.value;
                            closestCity = destinations[j];
                        } else if (smallestDistance > results[j].distance.value)
                        {
                            smallestDistance = results[j].distance.value;
                            closestCity = destinations[j];
                        }
                    }
                    outputDiv.innerHTML += origins[i] + ' to ' + closestCity
                    + ': ' + smallestDistance + '<br>';
                    CityLink.push({orig:origins[i],dest:closestCity,dist:smallestDistance});
                    if (selected.length>1) {
                        city = [];
                        city.push(closestCity);
                        var index = selected.indexOf(closestCity);
                        if (index < 0) {
                            Alert("Errorr");
                            return;
                        }
                        selected.splice(index, 1);
                        CalculateCityLink();
                    }
                }
            }
        }

        function addMarker(location, isDestination) {
            var icon;
            if (isDestination) {
                icon = destinationIcon;
            } else {
                icon = originIcon;
            }
            geocoder.geocode({'address': location}, function(results, status) {
                if (status == google.maps.GeocoderStatus.OK) {
                    bounds.extend(results[0].geometry.location);
                    map.fitBounds(bounds);
                    var marker = new google.maps.Marker({
                        map: map,
                        position: results[0].geometry.location,
                        icon: icon
                    });
                    markersArray.push(marker);
                } else {
                    alert('Geocode was not successful for the following reason: '
                    + status);
                }
            });
        }

        function deleteOverlays() {
            for (var i = 0; i < markersArray.length; i++) {
                markersArray[i].setMap(null);
            }
            markersArray = [];
        }

    });