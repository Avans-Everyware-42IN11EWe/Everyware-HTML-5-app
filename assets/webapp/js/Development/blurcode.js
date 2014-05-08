 $( document ).ready(function() {
var vague = $('.vague').Vague({

                 intensity:      0,      // Blur Intensity
               forceSVGUrl:    false,   // Force absolute path to the SVG filter,
                 // default animation options
               animationOptions: {
               duration: 500,
               easing: 'linear' // here you can use also custom jQuery easing functions
                                     }
                    });

        vague.blur();
        var vaag = 0;
        
        
        $("#blur").scroll(function(e) {
            var elem = $("#blur");
            var maxScrollTop = elem[0].scrollHeight - elem.outerHeight();
            var vaagheid = 10/maxScrollTop;
            var blurHoeveelheid =$("#blur").scrollTop()*vaagheid;
            
           
            //grootte window
            console.log("blur per pixel: "+vaagheid);
            console.log("scrolltop waarde "+$("#blur").scrollTop());
            console.log(blurHoeveelheid);
                   vague.animate(blurHoeveelheid),{
                duration:0
            };
                });
                
                
                
    });