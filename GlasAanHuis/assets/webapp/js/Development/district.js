var id;
	$(document).ready(function ()
	{
		//id = 1;
        

    	/*$(".swiper-slide").clone(true).appendTo(".swiper-wrapper");
		$.get("http://glas.mycel.nl/districts?search=5211AA", function(data, status)
		{
			for (var i = 0; i < data.length; i++)
			{
				id = i + 1;
				getDistrictInfo(id);
			}
						
		});*/
    	
       /* var goedeDoel = 3;
        $('[id=goedeDoeltxt]').append(goedeDoel+"%");
        $('[id=goedeDoelVoortgang]').progressbar({value: goedeDoel});
        console.log("voortgang geladen");
        */
		$(document).on('click', '.facebookLink', function (event) {
				//alert("testje");
				var url = $(this).attr("href");
				window.JHandler.OpenInExternalWebBrowser(url);
		});
		
	});
	/*if (localStorage.getItem("id") !== null || localStorage.getItem("key") !== null) {
  

    var userID = localStorage.getItem("id");
        var userKey = localStorage.getItem("key");
        console.log("userid: "+userID+"key: "+userKey);
    }*/
   userID=null;
   userKey=null;
	var userData;
   try {
		userData = JSON.parse(window.JHandler.GetSavedData());
		//alert("userdata is: "+JSON.stringify(userData));
		//alert("token: "+userData.authToken+"en het id is:"+userData.userId);
		userID=userData.userId;
        userKey=userData.authToken;
    } catch(err) {
        console.log("jhandler error bij ophalen userdata: "+err);
    }
        getProgress(userID, userKey);
    
    function getProgress(id, key)
    {
        //voor t geval dat hij undefined is wann er geen userid en key voorradig is
        $status =0;
        
        if(id != null && key != null)
        {
            $.get("http://glas.mycel.nl/progress?id="+id+"&auth_token="+key+"",function(data, status)
            {
                //alert(data.status);
                $status = data.status;
                //console.error("status = " + $status);
                });
                }
    //switch mag buiten de get en de !=null check anders kan hij in het begin nooit bereikt worden
                 switch($status){
                    case 0:
                     $("#mijnWijk").html("Dit is mijn wijk");
                     break;
                    case 1:
                       // $("div#buttons").empty();
                        //$("div#buttons").append('<a class="customButton" href="#" style="background-color: rgb(236, 236, 236); text-align:center; color: rgb(45, 138, 249); padding: 10px 20px; position:absolute; left:0px; right:0px;" id="mijnWijk">Geef een provider voorkeur</a>');
                        //$("div#buttons").css({"margin-left" : "10px", "margin-right" : "10px", "width" : "100%", "padding-bottom" : "50px"});
                        break;
                    case 2:
                       $("div#buttons").empty();
                        $("div#buttons").append('<a class="customButton" href="#" style="background-color: rgb(236, 236, 236); text-align:center; color: rgb(45, 138, 249); padding: 10px 20px; position:absolute; left:0px; right:0px;" id="mijnWijk">Ik doe mee!!!</a>');
                        $("div#buttons").css({"margin-left" : "10px", "margin-right" : "10px", "width" : "100%", "padding-bottom" : "50px"});
                        break;
                    case 3:
                        $("div#buttons").empty();
                        $("div#buttons").append('<a class="customButton" href="#" style="background-color: rgb(236, 236, 236); text-align:center; color: rgb(45, 138, 249); padding: 10px 20px; position:absolute; left:0px; right:0px;" id="mijnWijk">Geef een provider voorkeur</a>');
                        $("div#buttons").css({"margin-left" : "10px", "margin-right" : "10px", "width" : "100%", "padding-bottom" : "50px"});
                        break;
                    case 4:
                       $("div#buttons").empty();
                        $("div#buttons").append('<a class="customButton" href="#" style="background-color: rgb(236, 236, 236); text-align:center; color: rgb(45, 138, 249); padding: 10px 20px; position:absolute; left:0px; right:0px;" id="mijnWijk">Wachten op het slagen van de actie</a>');
                        $("div#buttons").css({"margin-left" : "10px", "margin-right" : "10px", "width" : "100%", "padding-bottom" : "50px"});
                        break;
                
                }       
            //});
        
    }
	
		function LoadDistrictPage($element, callback)
		{		
			$page = "pages/district.html";
			$path = "file:///android_asset/webapp/";
		  
		  
			var isDesktop = (function() {
			return !('ontouchstart' in window) // works on most browsers 
			|| !('onmsgesturechange' in window); // works on ie10
		   })();

		   window.isDesktop = isDesktop;
		   if( isDesktop )
			$path = "file://assets/webapp/";  
	 
			$($element).load( $page, function() {
			
				if(callback != null)
					callback($element);
		  });
		}
		
		function LoadDistrictProfilePage(id)
		{
			$.get("http://glas.mycel.nl/buddy?id=" + id + "", function(data, status) {
				if (data.is_buddy == "true") {
					// Go to chat overlay
					$("#overlay_container").html($ebuddy);                         
					$("#overlay_container").show();
					
					$("#bg").css("opacity","0");
					$("#districtProfileImage").attr('src', data.plaatje);
					$("#districtProfileName").text(data.naam);
					$("#districtProfileAge").text(data.leeftijd);
					$("#districtProfileCity").text(data.woonplaats);
					$("#districtProfilePhone").text(data.telefoon);
					$("#districtProfileEmail").text(data.email);
					$("#districtProfileVideo").attr('src', data.video);
				} else {
					$("#overlay_container").html($eDistrictProfile);                         
					$("#overlay_container").show();
					
					$("#districtProfileVideo").attr('src', data.video);
				}
			});
		}
				
		var mySwiper;
		var districts;
        $( document ).ready(function() {

		$maxSlides = 0;
		$slidesCreated = 0;
		$currentSlide = 0;
		$isCreatingSlide = false;
		
		$currentDistrictId = 2;
				
		var map = []; 	
		// Creates a new district
		function CreateDistrict($disId, callback)
		{
			$isCreatingSlide = true;
		
			// Create new element
			$ele = $('<div class="swiper-slide blur">');				
			// Load the page
			LoadDistrictPage($ele, function($element) {
				
			$mapElement = $element.find(".map");	
						
			$mapElement.append('<img src="img/wijk_'+$disId+'.png" />');	
	
			/*	
			var mapElement = $element.find(".map");		
			map.push(L.mapbox.map(mapElement[0], 'nanne.i84f0he3'));
                 $.get('http://glas.mycel.nl/geo?id='+$disId, function(data){
               // console.log(JSON.stringify(data));
			   
                map[map.length-1].setView(data.center.reverse(), 14);
                var wijkarray=[];
                wijkarray=data.bound;
                    for (var i = 0; i < data.bound.length; i++) {
                       var wijk = data.bound[i];
                       var p = data.percentage;              
                        var red = Math.ceil((100 - Math.max(50, p)) * (255/50));
                        var green = Math.ceil(Math.min(50, p) * (255/50));
                        wijk.reverse();
                    }
                    L.marker(data.center).addTo(map[map.length-1])
                            .bindPopup("Uw wijk")
                            .openPopup();
                     var polygon = L.polygon(wijkarray).addTo(map[map.length-1]);
                            //console.log(JSON.stringify(wijkarray));
                     polygon.setStyle({color: "black",weight: 3,fillColor: "rgb("+red+","+green+",0)",fillOpacity: 0.7});
            });
			*/	
			$.get("http://glas.mycel.nl/district?id=" + $disId + "",function(data, status)
				{	
					$element.find(".naarMap").attr('disid', $disId);

					// Zet alle benodigde data in variabelen
					$buurtNaam = data.name;
					$percentage = Math.round((100 * data.percentage)) + "%";
					$participants = data.participants;
					$bgImgUrl = data.plaatje;
					//console.error("hello");
					
					$element.find(".buurtNaam").html($buurtNaam);
					$element.find(".percentage").html($percentage);
					$element.find(".participants").html($participants);
					$element.find(".percentage2").html($percentage);
					$element.find(".participants2").html($participants);
					$element.find(".facebookLink").attr('href', data.facebookpageurl);
					
					for (var i = 0; i < data.plaatjes.length; i++)
					{
						var div = document.createElement("DIV");
						div.setAttribute('class', 'profilePictures');
						var img = document.createElement("DIV");
						//img.src = data.plaatjes[i].plaatje;
						div.setAttribute('personid', data.plaatjes[i].id);
						img.setAttribute('class', 'districtProfileIMG');
						img.setAttribute('style', 'background-image: url("'+data.plaatjes[i].plaatje+'");background-size: 100%; width: 75px; height: 75px;');
						$element.find(".userImages").append(div);
						div.appendChild(img);
						
						if(data.plaatjes[i].is_buddy == 1)
						{
							//div.setAttribute('style', 'box-shadow: inset 0px 0px 5px 5px lime;');
							div.setAttribute('class', 'profilePictures buddy');
							$(document).on( "click", ".profilePictures[personid='"+data.plaatjes[i].id+"']", function() {
								$id = $(this).attr('personid');
								
								LoadDistrictProfilePage($id);
							});
							if (data.plaatjes[i].has_video == 1)
							{
								var cameraIcon = document.createElement("DIV");
								cameraIcon.setAttribute('style', 'background-image: url(cameraicon.png);background-size: 100%; width: 20px; height: 20px;');
								cameraIcon.setAttribute('class', 'cameraIcon');
								div.appendChild(cameraIcon);
							}
						}
						else if (data.plaatjes[i].has_video == 1)
						{
							var cameraIcon = document.createElement("DIV");
							cameraIcon.setAttribute('style', 'background-image: url(cameraicon.png);background-size: 100%; width: 20px; height: 20px;');
							cameraIcon.setAttribute('class', 'cameraIcon');
							div.appendChild(cameraIcon);
							$(document).on( "click", ".profilePictures[personid='"+data.plaatjes[i].id+"']", function() {
								$id = $(this).attr('personid');
								LoadDistrictProfilePage($id);
							});
						}
					}
					
					var bewonersVerzamelen = Math.round(100 * data.stappen[0].percentage);
					var inschrijven = Math.round(100 * data.stappen[1].percentage);
					var providerSelecteren = Math.round(100 * data.stappen[2].percentage);
					var glasvezelAanleggen = Math.round(100 * data.stappen[3].percentage);
					var overstappenNaarGlasvezel = Math.round(100 * data.stappen[4].percentage);

					/******text****/
					$element.find(".bewonersVerzamelentxt").append(data.stappen[0].naam + " " + bewonersVerzamelen+"%");
					$element.find(".inschrijventxt").append(data.stappen[1].naam + " " + inschrijven+"%");
					$element.find(".providerSelecterentxt").append(data.stappen[2].naam + " " + providerSelecteren+"%");
					$element.find(".glasvezelAanleggentxt").append(data.stappen[3].naam + " " + glasvezelAanleggen+"%");
					$element.find(".overstappenNaarGlasvezeltxt").append(data.stappen[4].naam + " " + overstappenNaarGlasvezel+"%");

					/******progressbars****/
					$element.find(".bewonersVerzamelen").progressbar({value: bewonersVerzamelen});
					$element.find(".inschrijven").progressbar({value: inschrijven});
					$element.find(".providerSelecteren").progressbar({value: providerSelecteren});
					$element.find(".glasvezelAanleggen").progressbar({value: glasvezelAanleggen});
					$element.find(".overstappenNaarGlasvezel").progressbar({value: overstappenNaarGlasvezel});

					// End filling data
										
					mySwiper.appendSlide(mySwiper.createSlide($element.html()));
					$slidesCreated++;	
					
					//alert("Slide created");
					
					if(callback)
						callback($element);
					$isCreatingSlide = false;
				});
			});
		}
		
		$.get("http://glas.mycel.nl/districts?lat=51.983333&long=5.916667",function(data, status)
		{
		districts = data;
		
		$maxSlides  = data.length;
		
		// Create the two first districts
		$("body").css('background-image', "url('"+ data[0].plaatje +"')");
		
		function dis(k, max) {
			if(k < max) CreateDistrict(districts[k].id, function(){ dis(k+1, max);  });
		}
		dis(0, $maxSlides, data);
		
		
		/*
		CreateDistrict(data[0].id, function(){
			CreateDistrict(data[1].id);
		});
		*/
		
		
		
		
		
		mySwiper  = new Swiper('.swiper-container',{
                    //Your options here:
                    mode:'horizontal',
                    noSwiping: true,
                    loop: false,
					
					// Slide next event
					onSlideNext: function() {
							
						
							
						if($slidesCreated < $maxSlides && !$isCreatingSlide)
						{
							CreateDistrict(data[$currentDistrictId].id);	
														
							$currentDistrictId++;							
						}									
						$currentSlide++;
						$("body").css('background-image', "url('"+ data[$currentSlide].plaatje +"')");
					},
					
					onSlidePrev:  function() {
						$currentSlide--;
						$("body").css('background-image', "url('"+ data[$currentSlide].plaatje +"')");
					}/*,

					onSetWrapperTransition: function() {
						if($currentSlide == $maxSlides-1)
						{
							mySwiper.swipeTo(0);
							$currentSlide = 0;
							$("body").css('background-image', "url('"+ data[$currentSlide].plaatje +"')");
						}
					}*/
					
                });
			});
		});
	
	
	
	/*
	// Functie om de data van de server op te halen
	function getDistrictInfo(data, element, loadBackground)
	{
					
	    	//console.log("Data: " + data + "\nStatus: " + status);
	    	//console.log("Name: " + JSON.stringify(data.name));
	    	
	    	// Zet alle benodigde data in variabelen
			$buurtNaam = data.name;
			$percentage = Math.round(100 * data.percentage) + "%";
			$participants = data.participants;
			$bgImgUrl = data.plaatje;
			//console.error("hello");
			
			element.find(".buurtNaam").html($buurtNaam);
			element.find(".percentage").html($percentage);
			element.find(".participants").html($participants);
			element.find(".percentage2").html($percentage);
			element.find(".participants2").html($participants);
			var facebook = element.find(".facebookLink");
			
			facebook.attr("href", data.facebookpageurl);
			
			
			// Zet de variabelen op de goede plek in de html
			/*
			$("#buurtNaam").html($buurtNaam);
			$("#percentage").html($percentage);
			$("#participants").html($participants);
			$("#percentage2").html($percentage);
			$("#participants2").html($participants);
			*/
			/*
			if(loadBackground)
				$("body").css('background-image', 'url('+ $bgImgUrl +')');
				//code om een geblurde image in div #bg te zetten
				/*$( "#bg" ).has( ".blurBg" ).empty();
				var image = new Image();
                image.onload = function(){
                    Pixastic.process(image, "blurfast", {amount:2.0});
                    $("#bg").append(image);
                };
                alert(image);
               image.setAttribute('class', 'blurBg');
               // document.body.appendChild(img);
                image.src = $bgImgUrl;
                
                //document.body.appendChild(img);
              //  alert(img);
               
               
				   
                // code voor opacity
                 $(".swiper-container").scroll(function(e) {
                     //console.log("scrollen");
                 var elem = $(".blur");
                 var maxScrollTop = elem[0].scrollHeight - elem.outerHeight();
                 var vaagheid = 6/maxScrollTop;
                 var blurHoeveelheid =$(".swiper-container").scrollTop()*vaagheid;
            
           
                 //grootte window
                 //console.log("blur per pixel: "+vaagheid);
                // console.log("scrolltop waarde "+$(".swiper-container").scrollTop());
                 //console.log("opacityval: "+blurHoeveelheid);
                 $("#bg").css("opacity",blurHoeveelheid);
                });*/
                
                
			/*
			/*for (var i = 0; i < data.plaatjes.length; i++)
			{
				var div = document.createElement("DIV");
				div.setAttribute('class', 'profilePictures');
				var img = document.createElement("DIV");
			    //img.src = data.plaatjes[i].plaatje;
				div.setAttribute('personid', data.plaatjes[i].id);
			    img.setAttribute('class', 'districtProfileIMG');
				img.setAttribute('style', 'background-image: url("'+data.plaatjes[i].plaatje+'");background-size: 100%; width: 75px; height: 75px;');
			    element.find(".userImages").append(div);
    			div.appendChild(img);
				
				if(data.plaatjes[i].is_buddy == 1)
				{
					//div.setAttribute('style', 'box-shadow: inset 0px 0px 5px 5px lime;');
					div.setAttribute('class', 'profilePictures buddy');
					$(document).on( "click", ".profilePictures[personid='"+data.plaatjes[i].id+"']", function() {
	                	$("#bg").css("opacity","0");
				            
				        // Go to chat overlay
				      	$("#overlay_container").html($ebuddy);                         
			            $("#overlay_container").show();
				    });
					if (data.plaatjes[i].has_video == 1)
					{
						var cameraIcon = document.createElement("DIV");
						cameraIcon.setAttribute('style', 'background-image: url(cameraicon.png);background-size: 100%; width: 20px; height: 20px;');
						cameraIcon.setAttribute('class', 'cameraIcon');
						div.appendChild(cameraIcon);
					}
				}
				else if (data.plaatjes[i].has_video == 1)
				{
					var cameraIcon = document.createElement("DIV");
					cameraIcon.setAttribute('style', 'background-image: url(cameraicon.png);background-size: 100%; width: 20px; height: 20px;');
					cameraIcon.setAttribute('class', 'cameraIcon');
					div.appendChild(cameraIcon);
					$(document).on( "click", ".profilePictures[personid='"+data.plaatjes[i].id+"']", function() {
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
	        var overstappenNaarGlasvezel = Math.round(100 * data.stappen[4].percentage);*/
/*
	        /******text****/
			/*
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
			/*
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
			*//*
	}*/

	function mijnWijk()
	{
	    //wat is windows.id en waar komt het vandaan en waarom word dit niet in de functie parameters doorgegeven?
	    // is nu in ieder geval undefined
		//alert("wijk "+ windows.id + " gekozen");

		//window.JHandler.SaveToFile("wijkID.bin", windows.id);
	}
	
	/*function OpenInExternalWebBrowser() {
		var url = $(".FacebookLink").attr("href");
		window.JHandler.OpenInExternalWebBrowser(url);
	}*/

	/*$(document).on('click', '#FacebookLink', function (event) {
		var url = $("#FacebookLink").attr("href");
		window.JHandler.OpenInExternalWebBrowser(url);
	}*/
	