angular.module('travelApp')
.service('CityFactory',function($http)
{
    var initialized = false;
	var lat = '';
	var lng = '';
	var name = '';
	var AvailableCities = [];
	var SelectedCities = [];
    this.init = function() {
        this.AddAvailableCity('Boston,MA');
        this.AddAvailableCity('NYC,NY');
        this.AddAvailableCity('Washington,DC');
    };
	this.GetAvailableCities = function(){
        if(!initialized)
        {
            initialized = true;
            this.init();
        }
      return AvailableCities;
	};
	
	this.GetSelectedCities = function(){
      return SelectedCities;
	};

	this.AddAvailableCity = function(Location) {
        name = Location;
        var VerifyUrl = "https://maps.googleapis.com/maps/api/geocode/json?address="
                            +Location+"&key=AIzaSyCkAEn9XmY0pGGK0Sa3o5BHBjAveuyY6Jo";
		var request = $http({
                        method: "get",
                        url: VerifyUrl,
                        params: {action: "get"}
                    });
        return( request.then( handleSuccess, handleError ) );
	}

	function handleError( response ) {
        //TODO: Add errorr handling logic from google api page
		return( 'Fail' );
	}

	function handleSuccess( response ) {
	    lat = response.data.results[0].geometry.location.lat;
	    lng = response.data.results[0].geometry.location.lng;
        name = response.data.results[0].formatted_address;
	    AvailableCities.push({ 'Name': name,'Lat':42.36,'Lng':-71.05, 'drag': true });
		return('Success');
	}
});