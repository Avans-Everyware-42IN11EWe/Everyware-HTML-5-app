package nl.avans.glasaanhuis.html5;

import java.util.Arrays;
import android.os.Bundle;
import android.app.Activity;
import android.content.Intent;
import android.view.Menu;
import android.widget.TextView;

import com.facebook.*;
import com.facebook.Session.StatusCallback;
import com.facebook.model.*;

public class LoginActivity extends Activity {
	@Override
	  public void onCreate(Bundle savedInstanceState) {
	    super.onCreate(savedInstanceState);
	    setContentView(R.layout.activity_login);

	    StatusCallback callback = new Session.StatusCallback() {

		      // callback when session changes state
		      @Override
		      public void call(Session session, SessionState state, Exception exception) {
		        if (session.isOpened()) {

		          // make request to the /me API
		          Request.newMeRequest(session, new Request.GraphUserCallback() {

		            // callback after Graph API response with user object
		            @Override
		            public void onCompleted(GraphUser user, Response response) {
		              if (user != null) {
		                /*TextView welcome = (TextView) findViewById(R.id.welcome);
		                welcome.setText("Hello " + user.getName() + "!");*/
		              }
		            }
		          }).executeAsync();
		        }
		      }
		    };
	    
	    Session session = Session.getActiveSession();
	    if (!session.isOpened() && !session.isClosed()) {
	        session.openForRead(new Session.OpenRequest(this)
	            .setPermissions(Arrays.asList("public_profile"))
	            .setCallback(callback));
	    } else {
	        Session.openActiveSession(this, true, callback);
	    }
	    
	  }

	  @Override
	  public void onActivityResult(int requestCode, int resultCode, Intent data) {
	      super.onActivityResult(requestCode, resultCode, data);
	      Session.getActiveSession().onActivityResult(this, requestCode, resultCode, data);
	  }

	@Override
	public boolean onCreateOptionsMenu(Menu menu) {
		// Inflate the menu; this adds items to the action bar if it is present.
		getMenuInflater().inflate(R.menu.login, menu);
		return true;
	}

}
