  // Function to load html pages 
  function LoadHtmlPage($page, $element)
  {					
    $.get( "file:///android_asset/webapp/"+$page, function( pageData ) {					
      $element.html( pageData );	
  	  //alert(pageData);						
  	});											
  }

$( document ).ready(function() {
  // Call
  //LoadHtmlPage("test.html", $("#intro_video"));

  //LoadHtmlPage("pages/intro_video.html", $("#intro_video"));
  LoadHtmlPage("pages/district.html", $("#blur"));
  
  LoadHtmlPage("pages/register.html", $("#register"));
  LoadHtmlPage("pages/steps.html", $("#steps"));
});