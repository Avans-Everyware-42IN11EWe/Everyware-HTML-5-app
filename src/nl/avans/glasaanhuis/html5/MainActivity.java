package nl.avans.glasaanhuis.html5;

import android.os.Build;
import android.os.Build.VERSION_CODES;
import android.os.Bundle;
import android.annotation.SuppressLint;
import android.app.Activity;
import android.util.Log;
import android.view.Menu;
import android.view.Window;
import android.view.WindowManager;
import android.webkit.ConsoleMessage;
import android.webkit.WebChromeClient;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;

public class MainActivity extends Activity {

	@SuppressLint("SetJavaScriptEnabled")
	@Override
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		setContentView(R.layout.activity_main);
		WebView wv;
		wv = (WebView) findViewById(R.id.WebView);
		
		
		wv.addJavascriptInterface(new Logging(),"Logging");
		wv.setWebViewClient(new CustomWebViewclient(this));
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

		wv.loadUrl("file:///android_asset/webapp/index.html");
	}

}
