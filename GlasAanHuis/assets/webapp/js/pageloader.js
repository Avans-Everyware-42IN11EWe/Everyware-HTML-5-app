  // Function to load html pages 
  function LoadHtmlPage($page, $element, callback, $script)
  {				
    $path = "file:///android_asset/webapp/";
  
  
    var isDesktop = (function() {
    return !('ontouchstart' in window) // works on most browsers 
    || !('onmsgesturechange' in window); // works on ie10
   })();

   window.isDesktop = isDesktop;
   if( isDesktop )
    $path = "file://assets/webapp/";  
  	//$($element).load($page); 
  	$($element).load( $page, function() {
	
		if(callback != null)
			callback($element);
	
  	    if($script!=null){
			$('head').append($script);
  }
});
	
	/*
    $.get( $path+$page, function( pageData ) {					
      $element.html( pageData );	
  	  //alert(pageData);						
  	});	
*/	
  }


$( document ).ready(function() {
 
  LoadHtmlPage("pages/intro_video.html", $("#intro_video"));
  
  LoadHtmlPage("pages/steps.html", $("#steps"));
  //LoadHtmlPage("pages/postcode.html",$("#postcode"));
  LoadHtmlPage("pages/mijnWijk.html",$("#Wijk"));
  LoadHtmlPage("pages/provider.html",$("#provider"));
    LoadHtmlPage("pages/map.html",$("#maps"));
});


