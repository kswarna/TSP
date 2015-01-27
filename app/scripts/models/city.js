angular.module('travelApp')
.service('CityFactory',function($http)
{
	var Name = '' ;
	var State = '' ;
	var lng = '';
	var lat = '';
	this.init = function(CityName,CityState)
	{
		Name = Name;
		State = State;
	}
	
	this.verify = function()
	{
		var request = $http({
                        method: "get",
                        url: "https://maps.googleapis.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA&key=AIzaSyCkAEn9XmY0pGGK0Sa3o5BHBjAveuyY6Jo",
                        params: {
                            action: "get"
                        }
                    });

        return( request.then( handleSuccess, handleError ) );
		
	}
	
	this.calculateDistance = function(AnotherCity)
	{
		return "OK";
	}
	
	this.geo = function()
	{
		return lng;
	}
	function handleError( response ) {

		// The API response from the server should be returned in a
		// nomralized format. However, if the request was not handled by the
		// server (or what not handles properly - ex. server error), then we
		// may have to normalize it on our end, as best we can.
		if (
			! angular.isObject( response.data ) ||
			! response.data.message
			) {

			return( $q.reject( "An unknown error occurred." ) );

		}

		// Otherwise, use expected error message.
		return( $q.reject( response.data.message ) );

	}


	// I transform the successful response, unwrapping the application data
	// from the API response payload.
	function handleSuccess( response ) {

	lat = response.data.results[0].geometry.location.lat;
	lng = response.data.results[0].geometry.location.lng;
		return( "Success");

	}
});