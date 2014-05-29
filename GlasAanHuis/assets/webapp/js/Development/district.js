var id;
	$(document).ready(function ()
	{
		id = 1;
		getDistrictInfo(id);
		
        var goedeDoel = 3;
        $('[id=goedeDoeltxt]').append(goedeDoel+"%");
        $('[id=goedeDoelVoortgang]').progressbar({value: goedeDoel});
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
			$bgImgUrl = data.plaatje;
			//console.error("hello");
			
			
			// Zet de variabelen op de goede plek in de html
			$("#buurtNaam").html($buurtNaam);
			$("#percentage").html($percentage);
			$("#participants").html($participants);
			$("#percentage2").html($percentage);
			$("#participants2").html($participants);
			$("body").css('background-image', 'url('+ $bgImgUrl +')');
			
			for (var i = 0; i < data.plaatjes.length; i++)
			{
				var img = document.createElement("IMG");
			    img.src = data.plaatjes[i].plaatje;
			    img.setAttribute('width', 75);
    			document.getElementById('userImages').appendChild(img);
    			
    			if(data.plaatjes[i].is_buddy == 1)
				{
    				img.setAttribute('border', 3)
    				img.style.borderColor = "lime";
				}
      		}
			
			var bewonersVerzamelen = Math.round(100 * data.stappen[0].percentage);
	        var inschrijven = Math.round(100 * data.stappen[1].percentage);
	        var providerSelecteren = Math.round(100 * data.stappen[2].percentage);
	        var glasvezelAanleggen = Math.round(100 * data.stappen[3].percentage);
	        var overstappenNaarGlasvezel = Math.round(100 * data.stappen[4].percentage);

	        /******text****/
	        $('[id=bewonersVerzamelentxt]').append(data.stappen[0].naam + " " + bewonersVerzamelen+"%");
	        $('[id=inschrijventxt]').append(data.stappen[1].naam + " " + inschrijven+"%");
	        $('[id=providerSelecterentxt]').append(data.stappen[2].naam + " " + providerSelecteren+"%");
	        $('[id=glasvezelAanleggentxt]').append(data.stappen[3].naam + " " + glasvezelAanleggen+"%");
	        $('[id=overstappenNaarGlasvezeltxt]').append(data.stappen[4].naam + " " + overstappenNaarGlasvezel+"%");

	        /******progressbars****/
	        $("[id=bewonersVerzamelen]").progressbar({value: bewonersVerzamelen});
	        $("[id=inschrijven]" ).progressbar({value: inschrijven});                
	        $("[id=providerSelecteren]" ).progressbar({value: providerSelecteren});                 
	        $("[id=glasvezelAanleggen]" ).progressbar({value: glasvezelAanleggen});                     
	        $("[id=overstappenNaarGlasvezel]" ).progressbar({value: overstappenNaarGlasvezel});
			
		});
		
		function mijnWijk()
		{
			alert("wijk "+ windows.id + " gekozen");

			window.JHandler.SaveToFile("wijkID.bin", windows.id);
		}
	}