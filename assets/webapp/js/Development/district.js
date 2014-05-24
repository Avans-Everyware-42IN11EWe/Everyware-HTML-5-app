
	$(document).ready(function ()
	{
		getDistrictInfo(1);
	
		/*var newSlide = mySwiper.createSlide('<p>Here is my new slide</p>');
		newSlide.append()*/
		
		/*var cloneSlide = mySwiper.clone()
		cloneSlide.append();*/
		
        var goedeDoel = 3;
        var bewonersVerzamelen = 22;
        var inschrijven = 9;
        var providerSelecteren = 2;
        var glasvezelAandeel = 0;
        var glasvezelAanleggen = 0;
        var overstappenNaarGlasvezel = 0;
        /******* text****/
        $('[id=goedeDoeltxt]').append(goedeDoel+"%");
        $('[id=bewonersVerzamelentxt]').append(bewonersVerzamelen+"%");
        $('[id=inschrijventxt]').append(inschrijven+"%");
        $('[id=providerSelecterentxt]').append(providerSelecteren+"%");
        $('[id=glasvezelAandeeltxt]').append(glasvezelAandeel+"%");
        $('[id=glasvezelAanleggentxt]').append(glasvezelAanleggen+"%");
        $('[id=overstappenNaarGlasvezeltxt]').append(overstappenNaarGlasvezel+"%");
        
        /******progressbars****/
        $('[id=goedeDoelVoortgang]').progressbar({value: goedeDoel});
        $( "[id=bewonersVerzamelen]" ).progressbar({value: bewonersVerzamelen});                  
        $( "[id=inschrijven]" ).progressbar({value: inschrijven});                
        $( "[id=providerSelecteren]" ).progressbar({value: providerSelecteren});                   
        $( "[id=glasvezelAandeel]" ).progressbar({value: glasvezelAandeel});                    
        $( "[id=glasvezelAanleggen]" ).progressbar({value: glasvezelAanleggen});                     
        $( "[id=overstappenNaarGlasvezel]" ).progressbar({value: overstappenNaarGlasvezel});
        console.log("voortgang geladen");
        
	});


	// Functie om de data van de server op te halen
	function getDistrictInfo(id)
	{
		$.get("http://glas.mycel.nl/district?id=" + id + "",function(data, status)
		{
	    	//console.log("Data: " + data + "\nStatus: " + status);
	    	//console.log("Name: " + JSON.stringify(data.name));
	    	
	    	// Zet alle benodigde data in variabelen
			$buurtNaam = data.name;
			$percentage = (100 * data.percentage) + "%";
			$participants = data.participants;
			//console.error("hello");
			
			
			// Zet de variabelen op de goede plek in de html
			$("#buurtNaam").html($buurtNaam);
			$("#percentage").html($percentage);
			$("#participants").html($participants);
			$("#percentage2").html($percentage);
			$("#participants2").html($participants);
			
			for (var i = 0; i < data.plaatjes.length; i++)
			{
				var img = document.createElement("IMG");
			    img.src = data.plaatjes[i].plaatje;
			    img.setAttribute('width', 75);
    			document.getElementById('userImages').appendChild(img);
				/*if(i % 5 == 0 && i != 0)
				{
					//console.log(i);
					var br = document.createElement("br");
    				document.getElementById('userImages').appendChild(br);
				} */ 
      		}
		});
	}