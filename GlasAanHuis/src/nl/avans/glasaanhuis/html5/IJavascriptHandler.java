package nl.avans.glasaanhuis.html5;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.ObjectInputStream;
import java.io.ObjectOutputStream;
import java.net.URL;

import org.apache.http.HttpResponse;
import org.apache.http.HttpVersion;
import org.apache.http.client.ClientProtocolException;
import org.apache.http.client.ResponseHandler;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.impl.client.DefaultHttpClient;
import org.apache.http.params.BasicHttpParams;
import org.apache.http.params.CoreProtocolPNames;
import org.apache.http.params.HttpParams;

import com.facebook.LoginActivity;
import com.facebook.Request;
import com.facebook.Response;
import com.facebook.Session;
import com.facebook.SessionState;
import com.facebook.model.GraphUser;

import android.app.Activity;
import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.net.Uri;
import android.sax.StartElementListener;
import android.util.Log;
import android.webkit.JavascriptInterface;
import android.widget.Toast;

final class IJavascriptHandler {

	   SharedPreferences prefs;
	   private DefaultHttpClient mHttpClient;
	   IJavascriptHandler() {
		   prefs = MainActivity._context.getSharedPreferences("GlasAanHuis", Context.MODE_PRIVATE);
		   HttpParams params = new BasicHttpParams();
	       params.setParameter(CoreProtocolPNames.PROTOCOL_VERSION, HttpVersion.HTTP_1_1);
	       mHttpClient = new DefaultHttpClient(params);
	   }

	   @JavascriptInterface
	   public void Toast(String text) {		   	   
		  Log.v("Toast", text);
	      Toast t = Toast.makeText(MainActivity._context, text, Toast.LENGTH_LONG);
	      t.show();
	   }
	   
	   @JavascriptInterface
	   public void UploadPicture()
	   {
		   Intent photoPickerIntent = new Intent(Intent.ACTION_PICK);
		   photoPickerIntent.setType("image/*");
		   MainActivity._activity.startActivityForResult(photoPickerIntent, MainActivity.REQ_CODE_PICK_IMAGE);
	   }
	   
	   @JavascriptInterface
	   public void UploadVideo()
	   {
		   Intent videoPickerIntent = new Intent(Intent.ACTION_PICK);
		   videoPickerIntent.setType("video/*");
		   MainActivity._activity.startActivityForResult(videoPickerIntent, MainActivity.REQ_CODE_PICK_VIDEO);
	   }
	   
	   @JavascriptInterface
	   public void OpenInExternalWebBrowser(String url)
	   {
		   Intent intent = new Intent(Intent.ACTION_VIEW, Uri.parse(url));
		   MainActivity._context.startActivity(intent);
	   }
	   
	   @JavascriptInterface
	   public boolean LoginFacebook()
	   {
			Session.openActiveSession(MainActivity._activity, true, new Session.StatusCallback() 
			{
				//callback when session changes state
				@Override
				public void call(Session session, SessionState state, Exception exception) 
				{
					if (session.isOpened())
					{
						// make request to the /me API
						Request.newMeRequest(session, new Request.GraphUserCallback() 
						{
							// callback after Graph API response with user object
							@Override
							public void onCompleted(GraphUser user, Response response)
							{
								if (user != null) 
								{
									String userId = user.getId();
									prefs.edit().putString("userId", userId).commit();
									/*try {
										URL image_value = new URL("http://graph.facebook.com/"+userId+"/picture" );
										Bitmap profPict=BitmapFactory.decodeStream(image_value.openConnection().getInputStream());
									} catch (IOException e) {
										// TODO Auto-generated catch block
										e.printStackTrace();
									}*/
								}
							}
						}).executeAsync();
					}
				}
			});
			
			return true;
	   }
	   
	   @JavascriptInterface
	   public void SaveToFile(String userId, String authToken)
	   {
			try {
				prefs.edit().putString("userId", userId).commit();
				prefs.edit().putString("authToken", authToken).commit();
			} catch (Exception e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			
	   }
	   
	   @JavascriptInterface
	   public String[] GetSavedData()
	   {
			try {
				String[] result = new String[2];
				result[0] = prefs.getString("userId", null);
				result[1] = prefs.getString("authToken", null);
				
				return result;
			} catch (Exception e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
	   }
	   
	}
