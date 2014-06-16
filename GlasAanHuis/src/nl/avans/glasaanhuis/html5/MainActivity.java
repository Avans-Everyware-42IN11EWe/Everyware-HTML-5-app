package nl.avans.glasaanhuis.html5;

import java.io.ByteArrayOutputStream;
import java.io.File;

import org.apache.http.HttpEntity;
import org.apache.http.HttpResponse;
import org.apache.http.entity.mime.HttpMultipartMode;
import org.apache.http.entity.mime.MultipartEntity;
import org.apache.http.entity.mime.content.FileBody;
import org.apache.http.util.EntityUtils;
import org.apache.http.client.HttpClient;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.impl.client.DefaultHttpClient;

import com.facebook.Session;

import android.net.Uri;
import android.os.AsyncTask;
import android.os.Build;
import android.os.Build.VERSION_CODES;
import android.os.Bundle;
import android.provider.MediaStore;
import android.annotation.SuppressLint;
import android.app.Activity;
import android.app.ProgressDialog;
import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
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
	public final static int REQ_CODE_PICK_VIDEO = 200;
	private ValueCallback<Uri> mUploadMessage;
	private WebView wv;
	private SharedPreferences prefs;
	
	@SuppressLint({ "SetJavaScriptEnabled", "JavascriptInterface" })
	@Override
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		setContentView(R.layout.activity_main);
		prefs = getSharedPreferences("GlasAanHuis", Context.MODE_PRIVATE);
		wv = (WebView) findViewById(R.id.WebView);
		
		_context = getBaseContext();
		_activity = this;
		
		// clear
		//prefs.edit().clear().commit();
		
		wv.addJavascriptInterface(new Logging(),"Logging");
		wv.setWebViewClient(new CustomWebViewclient(this));
		//wv.loadUrl("file:///android_asset/webapp/index.html");
		wv.setWebChromeClient(new CustomChromeClient(this));
		// Javascript handler
		wv.addJavascriptInterface(new IJavascriptHandler(), "JHandler");		
		wv.getSettings().setJavaScriptEnabled(true);
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
			    
			    Cursor cursor = getContentResolver().query(selectedImage, filePathColumn, null, null, null);
			    cursor.moveToFirst();
			
			    int columnIndex = cursor.getColumnIndex(filePathColumn[0]);
			    String filePath = cursor.getString(columnIndex);
			    cursor.close();
			    
			    Bitmap uploadeImage = BitmapFactory.decodeFile(filePath);
			    ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream();
			    uploadeImage.compress(Bitmap.CompressFormat.PNG, 100, byteArrayOutputStream);
			    byte[] byteArray = byteArrayOutputStream.toByteArray();
			    String imageBase64 = Base64.encodeToString(byteArray, Base64.NO_WRAP);
			    String image = "data:image/png;base64," + imageBase64;
			    String str = String.format("javascript:setValue('%s')", image);
 			    wv.loadUrl(str);
 			    
 			    new AsyncHttpPostPicture().execute(selectedImage);
			}
		} 
		else if (requestCode == REQ_CODE_PICK_VIDEO) {
			if(resultCode == RESULT_OK) {
				Uri selectedVideo = data.getData();
				new AsyncHttpPostVideo().execute(selectedVideo);
			}
		}
		else {
	    		Session.getActiveSession().onActivityResult(this, requestCode, resultCode, data);
	    		String url = String.format("javascript:sendFacebookData('%s','%s')", "1",Session.getActiveSession().getAccessToken());
	    		wv.loadUrl(url);
	    }
	}
	
	public class AsyncHttpPostPicture extends AsyncTask<Uri, Void, String> {
        private final ProgressDialog dialog = new ProgressDialog(MainActivity.this);
        private static final String TAG = "POST FAIL";

        public String getPath(Uri uri) {
            String[] projection = { MediaStore.Images.Media.DATA };
            Cursor cursor = managedQuery(uri, projection, null, null, null);
            int column_index = cursor.getColumnIndexOrThrow(MediaStore.Images.Media.DATA);
            cursor.moveToFirst();
            return cursor.getString(column_index);
        }
        @Override
        protected void onPreExecute() {
            super.onPreExecute();
            dialog.setMessage("Uploading photo...");
            dialog.show();
        }
        @Override
        protected String doInBackground(Uri... params) {
            String result = null;
            try {
                HttpClient httpclient = new DefaultHttpClient();
                HttpPost httppost = new HttpPost("http://glas.mycel.nl/image?id="+prefs.getString("userId", "1")+"&auth_token="+prefs.getString("authToken", "blaat123")+"");//Connector.getServerUrl()+"upload_file2.php");
                MultipartEntity entity  = new MultipartEntity( HttpMultipartMode.BROWSER_COMPATIBLE );

                entity.addPart( "file", new FileBody(new File(getPath(params[0]))));
                httppost.setEntity(entity);

                HttpResponse response = httpclient.execute(httppost);// Execute HTTP Post Request
                //Do something with response...
                int status = response.getStatusLine().getStatusCode();
                if(status == 201) {
                    HttpEntity entityy = response.getEntity();
                    result = EntityUtils.toString(entityy);// htmlResponse
                }
            } catch (Exception e) {
                Log.d(TAG, "DIT WERKT NIET "+e.getMessage());
            }
            return result;
        }
        @Override
        protected void onPostExecute(String result) {
            super.onPostExecute(result);
            dialog.dismiss();
            if(result != null) {
            }
        }
    }
	
	public class AsyncHttpPostVideo extends AsyncTask<Uri, Void, String> {
        private final ProgressDialog dialog = new ProgressDialog(MainActivity.this);
        private static final String TAG = "POST FAIL";

        public String getPath(Uri uri) {
            String[] projection = { MediaStore.Images.Media.DATA };
            Cursor cursor = managedQuery(uri, projection, null, null, null);
            int column_index = cursor.getColumnIndexOrThrow(MediaStore.Images.Media.DATA);
            cursor.moveToFirst();
            return cursor.getString(column_index);
        }
        @Override
        protected void onPreExecute() {
            super.onPreExecute();
            dialog.setMessage("Uploading video...");
            dialog.show();
        }
        @Override
        protected String doInBackground(Uri... params) {
            String result = null;
            try {
                HttpClient httpclient = new DefaultHttpClient();
                HttpPost httppost = new HttpPost("http://glas.mycel.nl/video?id="+prefs.getString("userId", "1")+"&auth_token="+prefs.getString("authToken", "blaat123")+"");//Connector.getServerUrl()+"upload_file2.php");
                MultipartEntity entity  = new MultipartEntity( HttpMultipartMode.BROWSER_COMPATIBLE );

                entity.addPart( "file", new FileBody(new File(getPath(params[0]))));
                httppost.setEntity(entity);

                HttpResponse response = httpclient.execute(httppost);// Execute HTTP Post Request
                //Do something with response...
                int status = response.getStatusLine().getStatusCode();
                if(status == 201) {
                    HttpEntity entityy = response.getEntity();
                    result = EntityUtils.toString(entityy);// htmlResponse
                }
            } catch (Exception e) {
                Log.d(TAG, "DIT WERKT NIET "+e.getMessage());
            }
            return result;
        }
        @Override
        protected void onPostExecute(String result) {
            super.onPostExecute(result);
            dialog.dismiss();
            if(result != null) {
            }
        }
    }

}
