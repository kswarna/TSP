angular.module('travelApp')
.service('CityFactory',function($http)
{
	var lat = '';
	var lng = '';
	var name = '';
	var AvailableCities = [
		{ 'Name': 'Boston,MA','Lat':42.36,'Lng':-71.05, 'drag': true },
		{ 'Name': 'NYC,NY','Lat':40.71,'Lng':-74.00, 'drag': true },
		{ 'Name': 'Washingtona, DC','Lat':38.90,'Lng':-77.11, 'drag': true }
	];
		
	var SelectedCities = [];
	
	this.GetAvailableCities = function(){
      return AvailableCities;
	}
	
	this.GetSelectedCities = function(){
      return SelectedCities;
	}
		// SelectedCities.push(City);
	// };	
	
	this.AddAvailableCity = function(Location)
	{
		var request = $http({
                        method: "get",
                        url: "https://maps.googleapis.com/maps/api/geocode/json?address="+Location+"&key=AIzaSyCkAEn9XmY0pGGK0Sa3o5BHBjAveuyY6Jo",
                        params: {
                            action: "get"
                        }
                    });

        return( request.then( handleSuccess, handleError ) );
		
	}
	
	this.calculateDistance = function(City1,City2)
	{
		return "OK";
	}
	
	function handleError( response ) {
		if (
			! angular.isObject( response.data ) ||
			! response.data.message
			) {
			return( $q.reject( "An unknown error occurred." ) );
		}
		return( $q.reject( response.data.message ) );
	}

	function handleSuccess( response ) {
	lat = response.data.results[0].geometry.location.lat;
	lng = response.data.results[0].geometry.location.lng;
	AvailableCities.push({ 'Name': name,'Lat':42.36,'Lng':-71.05, 'drag': true });
		return('Success');
	}
});