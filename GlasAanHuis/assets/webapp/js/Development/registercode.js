 $(document).ready(function () {
	function statusChangeCallback(response) {
	    console.log('statusChangeCallback');
	    console.log(response);

	    if (response.status === 'connected') {
	      // Logged into your app and Facebook.
	      testAPI();
	    } else if (response.status === 'not_authorized') {
	      // The person is logged into Facebook, but not your app.
	      document.getElementById('status').innerHTML = 'Please log ' +
	        'into this app.';
	    } else {
	      // The person is not logged into Facebook, so we're not sure if
	      // they are logged into this app or not.
	      document.getElementById('status').innerHTML = 'Please log ' +
	        'into Facebook.';
	    }
	}

	function checkLoginState() {
		FB.getLoginStatus(function(response) {
		  statusChangeCallback(response);
		});
	}

      window.fbAsyncInit = function() {
      FB.init({
        appId      : '718137888230563',
        cookie     : true,  // enable cookies to allow the server to access 
                            // the session
        xfbml      : true,  // parse social plugins on this page
        version    : 'v2.0' // use version 2.0
      });

      FB.getLoginStatus(function(response) {
        statusChangeCallback(response);
      });

      };

      // Load the SDK asynchronously
      (function(d, s, id) {
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) return;
        js = d.createElement(s); js.id = id;
        js.src = "//connect.facebook.net/en_US/sdk.js";
        fjs.parentNode.insertBefore(js, fjs);
      }(document, 'script', 'facebook-jssdk'));

      // Here we run a very simple test of the Graph API after login is
      // successful.  See statusChangeCallback() for when this call is made.
    function testAPI() {
        console.log('Welcome!  Fetching your information.... ');
        FB.api('/me', function(response) {
            console.log('Successful login for: ' + response.name);
            document.getElementById('status').innerHTML =
            'Thanks for logging in, ' + response.name + '!';
        });
    }
    /*is al gedaan
		var mySwiper = new Swiper('.swiper-container',
		{
			//Your options here:
			mode: 'horizontal',
			noSwiping: true,
			loop: false,
			//etc..
		});*/
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

	$("#registerbtn").click(function (event) {
		var Name = $("#txtName").val();
		var Email = $("#txtEmail").val();
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
				alert("ERROR! -- textStatus");
				console.log(textStatus, errorThrown);
			}
		});
	});

	$("#register-facebook").click(function () {

		// TODO - create and login
		mySwiper.swipeNext();
	});

 });