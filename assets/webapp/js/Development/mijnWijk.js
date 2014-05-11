// functie die aangeroepen wordt zodra de pagina word geladen
window.onload = function showPosition(position)
{
	// Zodra de pagina wordt geladen zal er een locatie worden bepaald
	if (navigator.geolocation)
	{
		// Is het niet mogelijk een locatie te bepapelen zal er een error (toast) getoont worden
	  	navigator.geolocation.getCurrentPosition(showPosition, showError);
	}
	else
	{
		// Zodra er geen locatie bepaald kan worden zal er een melding komen
		window.JHandler.Toast("Geolocation is not supported by this browser.");
	}
	
	// De latitude en Longitude zal worden bepaald en in een variablen worden gezet
	var latlon=position.coords.latitude+","+position.coords.longitude;
	
	// Er word een img gemaakt van de map op locatie van latlon
	var img_url="http://maps.googleapis.com/maps/api/staticmap?center="
				+latlon+"&zoom=14&size=400x300&sensor=false";
	// Deze img zal in de div "mapholder" worden geplaatst.
	document.getElementById("mapholder").innerHTML="<img src='"+img_url+"'>";
}

// Dit zijn verschillende errors die er voor kunnen komen.
// @param error: De error code die word gegeven door bovenstaande functie als er iets fout gaat.
function showError(error)
{
	switch(error.code) 
	{
		case error.PERMISSION_DENIED:
			window.JHandler.Toast("User denied the request for Geolocation.");
			break;
		case error.POSITION_UNAVAILABLE:
			window.JHandler.Toast("Location information is unavailable.");
			break;
		case error.TIMEOUT:
			window.JHandler.Toast("The request to get user location timed out.");
			break;
		case error.UNKNOWN_ERROR:
			window.JHandler.Toast("An unknown error occurred.");
			break;
	}
}