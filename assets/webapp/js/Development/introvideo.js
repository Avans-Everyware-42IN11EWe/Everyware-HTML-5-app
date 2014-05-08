 $( document ).ready(function() {
      var mySwiper = new Swiper('.swiper-container',{
                    //Your options here:
                    mode:'horizontal',
                    noSwiping: true,
                    loop: false,
                    //etc..
                  });  
$("#intro").bind('ended', function(){
                if(mySwiper.activeIndex == 0){
                   mySwiper.swipeNext();
                }
                });
    });