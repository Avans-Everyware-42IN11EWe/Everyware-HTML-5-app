package nl.avans.glasaanhuis.html5;

import android.app.Activity;
import android.graphics.Bitmap;
import android.view.View;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.widget.ImageView;

public class CustomWebViewclient extends WebViewClient {
	
	private Activity _view = null;
	
	public CustomWebViewclient(Activity v)
	{
		_view = v;
	}
	
	
	@Override
	public boolean shouldOverrideUrlLoading(WebView view, String urlNewString) {
		
	   return true;
   }

   @Override
   public void onPageStarted(WebView view, String url, Bitmap facIcon) {
	   
   }

   @Override
   public void onPageFinished(WebView view, String url) {
       ImageView startUpImage = (ImageView) _view.findViewById(R.id.LoadImg);
       startUpImage.setVisibility(0);
       
       view.setVisibility(1);
       
   }

}
