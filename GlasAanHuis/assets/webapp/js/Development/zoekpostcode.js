  $(document).ready(function(){
      var wijkSelectedId;
  $(document).on("click","#zoek",function(){
     // console.log("zoek clicked");
      $("#results").empty();

      var zoekAdres= $("#zoekwijk").val();
    $.get("http://glas.mycel.nl/districts?search="+zoekAdres,function(data,status){
     // console.log("Data: " +JSON.stringify(data) + "\nStatus: " + status);
      for (var i=0; i < data.length; i++){
           $( "#results" ).append( '<li><a data="'+data[i].id+'" class="linkwijk">'+data[i].name+'</a></li>' );  
      }
    });
  });
  
   $(document).on("click","a.linkwijk",function(){
      $('.linkwijk').css("color","Black");
      $(this).css("color","Red");
      wijkSelectedId = $(this).attr('data');
  });
  
  
  $(document).on("click","#ditismijnwijk",function(){
     //var gekozen= $("a.linkwijk[gekozen]").attr("data");
     //var gekozen= $("a.linkwijk[gekozen]").attr("data");
     //uit data het id van het gekozen element gehaald
     alert("uw gekozen wijk is: "+wijkSelectedId);
  });
});