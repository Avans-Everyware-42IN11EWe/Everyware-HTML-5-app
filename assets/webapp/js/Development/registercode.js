 $(document)
 	.ready(function ()
 		{
 			var mySwiper = new Swiper('.swiper-container',
 			{
 				//Your options here:
 				mode: 'horizontal',
 				noSwiping: true,
 				loop: false,
 				//etc..
 			});
 			// kijken of er al een bestandje met de inlog gegevens bestaat, zo ja, gelijk doorgaan
			$result = window.JHandler.GetSavedData("login.bin");		
			if($result !=null)
			{
				mySwiper.swipeNext();
			}
 			var lat;
 			var long;

 			function getLocation()
 			{
 				navigator.geolocation.getCurrentPosition(foundLocation, noLocation);

 				function foundLocation(position)
 				{


 					lat = position.coords.latitude;
 					long = position.coords.longitude;
 					alert("LAT : " + lat + ", LONG : " + long);
 				}
 			}

 			function noLocation()
 			{
 				alert('Could not find location');
 			}
 		}
 		$("#registerbtn")
 		.click(function (event)
 		{
 			var Name = $("#txtName")
 				.val();
 			var Email = $("#txtEmail")
 				.val();
 			getLocation();
 			$.ajax(
 			{
 				url: "http://glas.mycel.nl/register",
 				type: "POST",
 				data: JSON.stringify(
 				{
 					"email": Email,
 					"name": Name,
 					"latlong": [lat, long],
 					"district_id": 3
 				}),
 				dataType: "json",
 				success: function (data)
 				{
 					alert("Success");
 					window.JHandler.SaveToFile("login.bin", data);
 					mySwiper.swipeNext();
 				},
 				error: function (jqXHR, textStatus, errorThrown)
 				{
 					alert("ERROR! -- textStatus")
 					console.log(textStatus, errorThrown);
 				}
 			});
 		});

 		$("#register-facebook")
 		.click(function ()
 		{

 			// TODO - create and login
 			mySwiper.swipeNext();
 		});

 });