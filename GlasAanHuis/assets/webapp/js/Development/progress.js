/*
function getProgress () {        
    var uid = userData.userId;
    var token = userData.authToken;
     $.get('http://glas.mycel.nl/progress?id='+uid+'&auth_token='+token+'', function(data){
         
         if(data.status==1){
             //heeft account
       // $("#mijnWijk").remove();
        //$("#andereWijk").remove();
         $( this ).css({
      "background-color": "yellow",
      "font-weight": "bolder"
    });
        $("div#buttons").empty();
        $("div#buttons").append('<a class="customButton" href="#" style="background-color: rgb(236, 236, 236); text-align:center; color: rgb(45, 138, 249); padding: 10px 20px; position:absolute; left:0px; right:0px;" id="schrijfIn">Schrijf je in!</a>');
        $("div#buttons").css({"margin-left" : "10px", "margin-right" : "10px", "width" : "100%", "padding-bottom" : "50px"});
         }
         if(data.status==2){
             //geen deelnemer
        
         }
         if(data.status==3){
             //wel deelnemer
         }
         if(data.status==4){
             //provider gekozen
             //afronding van de actie
         }
     
    });
    }
*/