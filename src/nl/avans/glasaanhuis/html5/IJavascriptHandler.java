package nl.avans.glasaanhuis.html5;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.ObjectInputStream;
import java.io.ObjectOutputStream;

import android.content.Context;
import android.util.Log;
import android.webkit.JavascriptInterface;
import android.widget.Toast;

final class IJavascriptHandler {
	   IJavascriptHandler() {
	   }

	   @JavascriptInterface
	   public void Toast(String text) {		   	   
		  Log.v("Toast", text);
	      Toast t = Toast.makeText(MainActivity._context, text, Toast.LENGTH_LONG);
	      t.show();
	   }
	   
	   @JavascriptInterface
	   public void SaveToFile(String fName, String data)
	   {
		   FileOutputStream fos;
		try {
			fos = MainActivity._context.openFileOutput(fName, Context.MODE_PRIVATE);
			
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
