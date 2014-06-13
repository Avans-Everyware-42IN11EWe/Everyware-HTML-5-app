var id;
	$(document).ready(function ()
	{
		id = 1;
        getDistrictInfo(id);
        getProgress(id);

    	/*$(".swiper-slide").clone(true).appendTo(".swiper-wrapper");
		$.get("http://glas.mycel.nl/districts?search=5211AA", function(data, status)
		{
			for (var i = 0; i < data.length; i++)
			{
				id = i + 1;
				getDistrictInfo(id);
			}
						
		});*/
    	
        var goedeDoel = 3;
        $('[id=goedeDoeltxt]').append(goedeDoel+"%");
        $('[id=goedeDoelVoortgang]').progressbar({value: goedeDoel});
        console.log("voortgang geladen");
        
	});
	
	function getProgress(id)
	{
		$.get("http://glas.mycel.nl/progress?id=1&auth_token=blaat123",function(data, status)
		{
			$status = data.status;
			//console.error("status = " + $status);

			switch($status){
				case 1:
					$("#mijnWijk").html("Dit is mijn wijk");
					break;
				case 2:
					$("#mijnWijk").html("Aanmelden");
					$("#andereWijk").hide();
					break;
				case 3:
					$("#mijnWijk").html("Provider voorkeur");
					$("#andereWijk").hide();
					break;
				case 4:
					$("#mijnWijk").html("Betalen");
					$("#andereWijk").hide();
					break;
			
			}
			/*
			if($status == 1){
				$("#mijnWijk").html("Dit is mijn wijk");
			}
			if($status == 2){
				$("#mijnWijk").html("Aanmelden");
				$("#mijnWijk").css('width', '100%');
				$("#andereWijk").hide();
			}
			if($status == 3){
				$("#mijnWijk").html("Provider voorkeur");
				$("#andereWijk").hide();
			}
			if($status == 4){
				$("#mijnWijk").html("Betalen");
				$("#andereWijk").hide();
			}*/
			
		});
	}

	// Functie om de data van de server op te halen
	function getDistrictInfo(id, element)
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
			
			element.find(".buurtNaam").html($buurtNaam);
			element.find(".percentage").html($percentage);
			element.find(".participants").html($participants);
			element.find(".percentage2").html($percentage);
			element.find(".participants2").html($participants);
			// Zet de variabelen op de goede plek in de html
			/*
			$("#buurtNaam").html($buurtNaam);
			$("#percentage").html($percentage);
			$("#participants").html($participants);
			$("#percentage2").html($percentage);
			$("#participants2").html($participants);
			*/
			$("body").css('background-image', 'url('+ $bgImgUrl +')');
			
			for (var i = 0; i < data.plaatjes.length; i++)
			{
				var div = document.createElement("DIV");
				div.setAttribute('class', 'profilePictures');
				var img = document.createElement("IMG");
			    img.src = data.plaatjes[i].plaatje;
			    div.setAttribute('id', 'person_'+i);
			    img.setAttribute('class', 'test');
			    img.setAttribute('width', 75);
			    element.find(".userImages").append(div);
    			document.getElementById('userImages').appendChild(div);
    			div.appendChild(img);

    			if(data.plaatjes[i].is_buddy == 1)
				{
					//div.setAttribute('style', 'box-shadow: inset 0px 0px 5px 5px lime;');
					div.setAttribute('class', 'profilePictures buddy');
					$(document).on( "click", "#person_"+i, function() {    
	                	$("#bg").css("opacity","0");
				            
				        // Go to chat overlay
				      	$("#overlay_container").html($ebuddy);                         
			            $("#overlay_container").show();
				    });
				}
				else if (data.plaatjes[i].has_video == 1)
				{
					$(document).on( "click", "#person_"+i, function() {    
	                	$("#bg").css("opacity","0");
				            
				        // Go to chat overlay
				      	$("#overlay_container").html($ebuddy);                         
			            $("#overlay_container").show();
				    });
				}
				
      		}
			
			var bewonersVerzamelen = Math.round(100 * data.stappen[0].percentage);
	        var inschrijven = Math.round(100 * data.stappen[1].percentage);
	        var providerSelecteren = Math.round(100 * data.stappen[2].percentage);
	        var glasvezelAanleggen = Math.round(100 * data.stappen[3].percentage);
	        var overstappenNaarGlasvezel = Math.round(100 * data.stappen[4].percentage);

	        /******text****/
	        element.find(".bewonersVerzamelentxt").append(data.stappen[0].naam + " " + bewonersVerzamelen+"%");
	        element.find(".inschrijventxt").append(data.stappen[1].naam + " " + inschrijven+"%");
	        element.find(".providerSelecterentxt").append(data.stappen[2].naam + " " + providerSelecteren+"%");
	        element.find(".glasvezelAanleggentxt").append(data.stappen[3].naam + " " + glasvezelAanleggen+"%");
	        element.find(".overstappenNaarGlasvezeltxt").append(data.stappen[4].naam + " " + overstappenNaarGlasvezel+"%");
	        /*
	        $('[id=bewonersVerzamelentxt]').append(data.stappen[0].naam + " " + bewonersVerzamelen+"%");
	        $('[id=inschrijventxt]').append(data.stappen[1].naam + " " + inschrijven+"%");
	        $('[id=providerSelecterentxt]').append(data.stappen[2].naam + " " + providerSelecteren+"%");
	        $('[id=glasvezelAanleggentxt]').append(data.stappen[3].naam + " " + glasvezelAanleggen+"%");
	        $('[id=overstappenNaarGlasvezeltxt]').append(data.stappen[4].naam + " " + overstappenNaarGlasvezel+"%");
			*/
	        /******progressbars****/
	        element.find(".bewonersVerzamelen").progressbar({value: bewonersVerzamelen});
	        element.find(".inschrijven").progressbar({value: inschrijven});
	        element.find(".providerSelecteren").progressbar({value: providerSelecteren});
	        element.find(".glasvezelAanleggen").progressbar({value: glasvezelAanleggen});
	        element.find(".overstappenNaarGlasvezel").progressbar({value: overstappenNaarGlasvezel});
	        /*
	        $("[id=bewonersVerzamelen]").progressbar({value: bewonersVerzamelen});
	        $("[id=inschrijven]" ).progressbar({value: inschrijven});
	        $("[id=providerSelecteren]" ).progressbar({value: providerSelecteren});
	        $("[id=glasvezelAanleggen]" ).progressbar({value: glasvezelAanleggen});
	        $("[id=overstappenNaarGlasvezel]" ).progressbar({value: overstappenNaarGlasvezel});
			*/
		});
		

	}

	function mijnWijk()
	{
	    //wat is windows.id en waar komt het vandaan en waarom word dit niet in de functie parameters doorgegeven?
	    // is nu in ieder geval undefined
		alert("wijk "+ windows.id + " gekozen");

		//window.JHandler.SaveToFile("wijkID.bin", windows.id);
	}
	
	
	