 $( document ).ready(function() {
$("#intro").bind('ended', function(){
                if(mySwiper.activeIndex == 0){
                   mySwiper.swipeNext();
                }
                });
    });