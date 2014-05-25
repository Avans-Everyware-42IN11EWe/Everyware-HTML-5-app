 $( document ).ready(function() {
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
               // console.log("voortgang geladen");
});