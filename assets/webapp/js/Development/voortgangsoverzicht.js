  $( document ).ready(function() {
       var mySwiper = new Swiper('.swiper-container',{
                    //Your options here:
                    mode:'horizontal',
                    noSwiping: true,
                    loop: false,
                    //etc..
                  });  
 var bewonersVerzamelen = 22;
                var inschrijven = 9;
                var providerSelecteren = 2;
                var glasvezelAandeel = 0;
                var glasvezelAanleggen = 0;
                var overstappenNaarGlasvezel = 0;
                /******* text****/
                $('#bewonersVerzamelentxt').append(bewonersVerzamelen+"%");
                $('#inschrijventxt').append(inschrijven+"%");
                $('#providerSelecterentxt').append(providerSelecteren+"%");
                $('#glasvezelAandeeltxt').append(glasvezelAandeel+"%");
                $('#glasvezelAanleggentxt').append(glasvezelAanleggen+"%");
                $('#overstappenNaarGlasvezeltxt').append(overstappenNaarGlasvezel+"%");
                
                /******progressbars****/
                $( "#bewonersVerzamelen" ).progressbar({value: bewonersVerzamelen});                  
                $( "#inschrijven" ).progressbar({value: inschrijven});                
                $( "#providerSelecteren" ).progressbar({value: providerSelecteren});                   
                $( "#glasvezelAandeel" ).progressbar({value: glasvezelAandeel});                    
                $( "#glasvezelAanleggen" ).progressbar({value: glasvezelAanleggen});                     
                $( "#overstappenNaarGlasvezel" ).progressbar({value: overstappenNaarGlasvezel});
                
});