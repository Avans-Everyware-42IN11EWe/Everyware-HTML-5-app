package nl.avans.glasaanhuis.html5;

import java.io.ByteArrayOutputStream;

import com.facebook.Session;

import android.net.Uri;
import android.os.Build;
import android.os.Build.VERSION_CODES;
import android.os.Bundle;
import android.provider.MediaStore;
import android.annotation.SuppressLint;
import android.app.Activity;
import android.content.Context;
import android.content.Intent;
import android.database.Cursor;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.util.Base64;
import android.util.Log;
import android.view.Menu;
import android.view.Window;
import android.view.WindowManager;
import android.webkit.ConsoleMessage;
import android.webkit.ValueCallback;
import android.webkit.WebChromeClient;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;

public class MainActivity extends Activity {

	public static Context _context;
	public static Activity _activity;
	public final static int REQ_CODE_PICK_IMAGE = 100;
	private ValueCallback<Uri> mUploadMessage;
	
	@SuppressLint({ "SetJavaScriptEnabled", "JavascriptInterface" })
	@Override
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		setContentView(R.layout.activity_main);
		WebView wv;
		wv = (WebView) findViewById(R.id.WebView);
		
		_context = getBaseContext();
		_activity = this;
		
		wv.addJavascriptInterface(new Logging(),"Logging");
		wv.setWebViewClient(new CustomWebViewclient(this));
		//wv.loadUrl("file:///android_asset/webapp/index.html");
		wv.setWebChromeClient(new CustomChromeClient(this));
		// Javascript handler
		wv.addJavascriptInterface(new IJavascriptHandler(), "JHandler");		
		
		wv.loadUrl("file:///android_asset/webapp/start.html");
		
		// Waarom werkt dit niet
		wv.setWebChromeClient(new WebChromeClient() {
			public boolean onConsoleMessage(ConsoleMessage cm) {
				Log.d("GlasAanHuisHTML5",
						cm.message() + " -- From line " + cm.lineNumber()
								+ " of " + cm.sourceId());
				return true;
			}
			
		});

		WebSettings webSettings = wv.getSettings();
		if (Build.VERSION.SDK_INT >= VERSION_CODES.JELLY_BEAN) {
			wv.getSettings().setAllowUniversalAccessFromFileURLs(true);
		}
		webSettings.setJavaScriptEnabled(true);
	}
	
	@Override
	public void onActivityResult(int requestCode, int resultCode, Intent data) {
		super.onActivityResult(requestCode, resultCode, data);
		
		if (requestCode == REQ_CODE_PICK_IMAGE) {
			if(resultCode == RESULT_OK) {
			    Uri selectedImage = data.getData();
			    String[] filePathColumn = {MediaStore.Images.Media.DATA};
			
			    Cursor cursor = getContentResolver().query(
			                       selectedImage, filePathColumn, null, null, null);
			    cursor.moveToFirst();
			
			    int columnIndex = cursor.getColumnIndex(filePathColumn[0]);
			    String filePath = cursor.getString(columnIndex);
			    cursor.close();
			
			    Bitmap uploadeImage = BitmapFactory.decodeFile(filePath);
			    ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream();
			    uploadeImage.compress(Bitmap.CompressFormat.PNG, 100, byteArrayOutputStream);
			    byte[] byteArray = byteArrayOutputStream.toByteArray();
			    String imgageBase64 = Base64.encodeToString(byteArray, Base64.DEFAULT);
			    String image = "data:image/png;base64," + imgageBase64;
			}
		} else {
	    		Session.getActiveSession().onActivityResult(this, requestCode, resultCode, data);
	    }
	}

}
