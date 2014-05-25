package nl.avans.glasaanhuis.html5;

import android.app.Activity;
import android.content.Intent;
import android.net.Uri;
import android.webkit.ValueCallback;
import android.webkit.WebChromeClient;

public class CustomChromeClient extends WebChromeClient {
	
	private Activity _view = null;
	private ValueCallback<Uri> mUploadMessage;  
	private final static int FILECHOOSER_RESULTCODE=1; 
	
	public CustomChromeClient(Activity v)
	{
		_view = v;
	}
	
	public void openFileChooser(ValueCallback<Uri> uploadMsg) {  
		mUploadMessage = uploadMsg;  
		Intent i = new Intent(Intent.ACTION_GET_CONTENT);  
		i.addCategory(Intent.CATEGORY_OPENABLE);  
		i.setType("image/*");  
		_view.startActivityForResult(Intent.createChooser(i,"Image Chooser"), FILECHOOSER_RESULTCODE);  
	}

   public void openFileChooser(ValueCallback<Uri> uploadMsg, String acceptType) {
       openFileChooser(uploadMsg);
   }                   
	
   public void openFileChooser(ValueCallback<Uri> uploadMsg, String acceptType, String capture) {
       openFileChooser(uploadMsg);
   }     
}
