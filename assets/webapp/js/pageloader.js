$( document ).ready(function() {
 
function LoadHtmlPageDesktop($page, $element)
  { 
    $($element).load($page);                  
    $.get( "file://assets/webapp/"+$page, function( pageData ) {                    
      $element.html( pageData );    
      //alert(pageData);                        
    });                                         
  }


 var isDesktop = (function() {
  return !('ontouchstart' in window) // works on most browsers 
  || !('onmsgesturechange' in window); // works on ie10
 })();
 //edit, if you want to use this variable outside of this closure, or later use this:
 window.isDesktop = isDesktop;
 if( isDesktop ){ 
     
  LoadHtmlPageDesktop("pages/intro_video.html", $("#intro_video"));
  LoadHtmlPageDesktop("pages/district.html", $("#blur"));
  
  LoadHtmlPageDesktop("pages/register.html", $("#register"));
  LoadHtmlPageDesktop("pages/steps.html", $("#steps"));
}else{
//mobile
 
 
 
  // Function to load html pages 
  function LoadHtmlPage($page, $element)
  {					
    $.get( "file:///android_asset/webapp/"+$page, function( pageData ) {					
      $element.html( pageData );	
  	  //alert(pageData);						
  	});											
  }

  // Call
  //LoadHtmlPage("test.html", $("#intro_video"));

  LoadHtmlPage("pages/intro_video.html", $("#intro_video"));
  LoadHtmlPage("pages/district.html", $("#blur"));
  
  LoadHtmlPage("pages/register.html", $("#register"));
  LoadHtmlPage("pages/steps.html", $("#steps"));
}
});