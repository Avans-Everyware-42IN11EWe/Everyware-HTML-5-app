 $(document).ready(function(){
  $("#zoek").click(function(){
      console.log("zoek clicked");
      $("#results").empty();
      var zoekAdres= $("#zoekwijk").val();
    $.get("http://glas.mycel.nl/districts?search="+zoekAdres,function(data,status){
      console.log("Data: " +JSON.stringify(data) + "\nStatus: " + status);
      for (var i=0; i < data.length; i++){
           $( "#results" ).append( '<li><a data="'+data[i].id+'" class="linkwijk">'+data[i].name+'</a></li>' );  
      }
    });
  });
   $("a.linkwijk").click(function(){
      alert("linkwijk clicked");
  // var id= $(this).attr('data');
   $(this).css("color","Red");
   $('this').attr('gekozen', 'gekozen');
   //$("p").css({"background-color":"yellow","font-size":"200%"});
   //console.log(id);
  });
  
  $("#ditismijnwijk").click(function(){
     var gekozen= $("a.linkwijk[gekozen]").attr("data");
     //uit data het id van het gekozen element gehaald
     alert(gekozen);
  });
});