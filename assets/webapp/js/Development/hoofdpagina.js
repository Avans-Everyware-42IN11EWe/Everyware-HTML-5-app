  $( document ).ready(function() {
       var mySwiper = new Swiper('.swiper-container',{
                    //Your options here:
                    mode:'horizontal',
                    noSwiping: true,
                    loop: false,
                    //etc..
                  });  
 $( "#mijnWijk" ).click(function() {
                
                // TODO - create and login
                    mySwiper.swipeNext();
                });
                
});