/**
 * Created by karthik on 2/3/2015.
 */
angular.module('travelApp')
    .service('TsParent',['CityFactory',function($http,CityFactory) {

        var CityLink = [];
        this.GetCityLink = function()
        {
            return CityLink;
        };
        CalculateCityLink = function()
        {
            var selected = CityFactory.GetSelectedCities().slice(0);
            for (i = 0; i < selected.length; i++) {
                var city = selected.pop();
                var rest = selected.join("|");
                var url = "https://maps.googleapis.com/maps/api/distancematrix/json?origins="+city
                    +"&destinations="+rest
                    +"&key=AIzaSyCwa1z2pNmo2fwByzzxpIzDEEwn4P6j1Kg";
            }
        };

    }]);
