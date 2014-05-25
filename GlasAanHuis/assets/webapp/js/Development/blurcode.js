 $( document ).ready(function() {
     
/*    
var vague = $('.vague').Vague({intensity:0});

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
                });*/
                $('#bg').blurjs({
                    source: 'body',
                    radius: 60,
                    overlay: 'rgba(0, 0, 0, .2)'
                });

                 $(".blur").scroll(function(e) {
            var elem = $(".blur");
            var maxScrollTop = elem[0].scrollHeight - elem.outerHeight();
            var vaagheid = 1/maxScrollTop;
            var blurHoeveelheid =$(".blur").scrollTop()*vaagheid;
            
           
            //grootte window
            console.log("blur per pixel: "+vaagheid);
            console.log("scrolltop waarde "+$(".blur").scrollTop());
            console.log(blurHoeveelheid);
            $("#bg").css("opacity",blurHoeveelheid);
                 
                });
                
                
                
    });