package nl.avans.glasaanhuis.html5;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.ObjectInputStream;
import java.io.ObjectOutputStream;
import java.net.URL;

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
import android.sax.StartElementListener;
import android.util.Log;
import android.webkit.JavascriptInterface;
import android.widget.Toast;

final class IJavascriptHandler {

	   SharedPreferences prefs;
	   
	   IJavascriptHandler() {
		   prefs = MainActivity._context.getSharedPreferences("GlasAanHuis", Context.MODE_PRIVATE);
	   }

	   @JavascriptInterface
	   public void Toast(String text) {		   	   
		  Log.v("Toast", text);
	      Toast t = Toast.makeText(MainActivity._context, text, Toast.LENGTH_LONG);
	      t.show();
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
									try {
									URL image_value = new URL("http://graph.facebook.com/"+userId+"/picture" );
									
										Bitmap profPict=BitmapFactory.decodeStream(image_value.openConnection().getInputStream());
									} catch (IOException e) {
										// TODO Auto-generated catch block
										e.printStackTrace();
									}
								}
							}
						}).executeAsync();
					}
				}
			});
			
			if (prefs.getString("userId", null) == null)
				return false;
			else
				return true;
	   }
	   
	   @JavascriptInterface
	   public void SaveToFile(String fName, String data)
	   {
		   	FileOutputStream fos;
			try {
				fos = MainActivity._context.openFileOutput(fName, Context.MODE_PRIVATE);
				prefs.edit().putString("userId", data).commit();
				
				ObjectOutputStream os = new ObjectOutputStream(fos);
				os.writeObject(data);
				os.close();
							
			} catch (Exception e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			
	   }
	   
	   @JavascriptInterface
	   public String GetSavedData(String fName)
	   {
		   File file = MainActivity._context.getFileStreamPath(fName);
			if(!file.exists()) 
				return "";
			
			String result = "";
			
			FileInputStream fis;
			try {
				fis = MainActivity._context.openFileInput(fName);
				ObjectInputStream is = new ObjectInputStream(fis);
				result = (String) is.readObject();
				is.close();
			} catch (Exception e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}		
			
			return result;
	   }
	   
	   
	}
