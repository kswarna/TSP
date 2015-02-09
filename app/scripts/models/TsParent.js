/**
 * Created by karthik on 2/3/2015.
 */
angular.module('travelApp')
    .service('TsParent',function($http,CityFactory) {

        var CityLink = [{orig:'asdsd',dest:'asd',dist:'asd'},{orig:'asd',dest:'asd',dist:'asd'},{orig:'asd',dest:'asd',dist:'asd'}];
        var city = [];
        var rest = [];
        var map;
        var geocoder;
        var bounds = new google.maps.LatLngBounds();
        var markersArray = [];
        var selected = [];
        var backColor = 'FF0000';
        var fontColor = '000000';

        var destinationIcon = 'https://chart.googleapis.com/chart?chst=d_map_pin_letter&chld=D|FF0000|000000';
        var originIcon = 'https://chart.googleapis.com/chart?chst=d_map_pin_letter&chld=O|FFFF00|000000';
        this.GetCityLink = function()
        {
            return CityLink;
        };
        this.calculateResult = function() {

            initialize();
            var sel =CityFactory.GetSelectedCities();
            for (var j = 0; j < sel.length; j++)
            {
                selected.push(sel[j].Name);
            }
            city = [];
            city.push(selected.pop());
            CalculateCityLink();
        }
        function initialize() {
            var opts = {
                center: new google.maps.LatLng(55.53, 9.4),
                zoom: 10
            };
            map = new google.maps.Map(document.getElementById('map-canvas'), opts);
            geocoder = new google.maps.Geocoder();
            deleteOverlays();
            selected = [];
            CityLink = [];
            var outputDiv = document.getElementById('outputDiv');
            outputDiv.innerHTML = "";
        }

        CalculateCityLink = function()
        {
            var service = new google.maps.DistanceMatrixService();
            service.getDistanceMatrix(
                {
                    origins: city,
                    destinations: selected,
                    travelMode: google.maps.TravelMode.DRIVING,
                    unitSystem: google.maps.UnitSystem.METRIC,
                    avoidHighways: false,
                    avoidTolls: false
                }, callback);
        };

        function callback(response, status) {
            if (status != google.maps.DistanceMatrixStatus.OK) {
                alert('Error was: ' + status);
            } else {
                var origins = response.originAddresses;
                var destinations = response.destinationAddresses;
                var outputDiv = document.getElementById('outputDiv');

                for (var i = 0; i < origins.length; i++) {
                    var results = response.rows[i].elements;
                    var closestCity = '';
                    var smallestDistance = 0;
                    for (var j = 0; j < results.length; j++) {
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
                    var link = {'orig':origins[i],'dest':closestCity,'dist':smallestDistance};
//                    var ind = CityLink.indexOf(link);
                    if(!ContainsLink(link)) {
                        CityLink.push(link);
                        outputDiv.innerHTML += CityLink.length + ') ' + origins[i] + ' to ' + closestCity
                        + ': ' + smallestDistance / 1600 + 'Miles.' + '<br>';
                        addMarker(origins[i], CityLink.length);
                        addMarker(closestCity, CityLink.length + 1);
                    }
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

        function ContainsLink (link)
        {
            for (var i = 0; i < CityLink.length; i++)
            {
                if(CityLink[i].dest == link.dest && CityLink[i].orig == link.orig)
                {
                    return true;
                }
            }
            return false;
        }

        function addMarker(location, num) {
            var icon;
            icon = CalcIconUrl(num);

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

        function CalcIconUrl(num)
        {
            return 'https://chart.googleapis.com/chart?chst=d_map_pin_letter&chld='+num+'|'+backColor+'|'+fontColor;
        }

    });