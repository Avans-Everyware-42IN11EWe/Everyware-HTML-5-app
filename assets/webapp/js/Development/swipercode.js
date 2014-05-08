  $( document ).ready(function() {
 
 $height = $( window ).height();

              
                $(".swiper-container").css("height", $height-20 + "px");
                
                  var mySwiper = new Swiper('.swiper-container',{
                    //Your options here:
                    mode:'horizontal',
                    noSwiping: true,
                    loop: false,
                    //etc..
                  });  
 });