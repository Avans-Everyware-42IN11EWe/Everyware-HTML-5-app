 $(document).ready(function(){
      var aangevinkt;
  $(document).on("click","#zoek",function(){
     // console.log("zoek clicked");
      $("#results").empty();
       aangevinkt= false;
      var zoekAdres= $("#zoekwijk").val();
    $.get("http://glas.mycel.nl/districts?search="+zoekAdres,function(data,status){
     // console.log("Data: " +JSON.stringify(data) + "\nStatus: " + status);
      for (var i=0; i < data.length; i++){
           $( "#results" ).append( '<li><a data="'+data[i].id+'" class="linkwijk">'+data[i].name+'</a></li>' );  
      }
    });
  });
  
   $(document).on("click","a.linkwijk",function(){
        if(aangevinkt==true){
            alert("je hebt al een wijk gekozen");
        }else{
       aangevinkt= true;
      //alert("linkwijk clicked");
   $(this).css("color","Red");
   $(this).attr('gekozen', 'gekozen');
   console.log(id);
   }
  });
  
  
  $(document).on("click","#ditismijnwijk",function(){
     var gekozen= $("a.linkwijk[gekozen]").attr("data");
     //uit data het id van het gekozen element gehaald
     alert("uw gekozen wijk is: "+gekozen);
  });
});
