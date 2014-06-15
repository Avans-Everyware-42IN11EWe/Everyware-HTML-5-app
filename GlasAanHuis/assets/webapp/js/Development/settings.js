var userId;
var userToken;

$(document).ready(function () {
	loadUserSettings();
});

function loadUserSettings() {

	try {
		var arr = window.JHandler.GetSavedData();
		userId = arr[0];
		userToken = arr[1];
	}
	catch(err) {
		// err
	}
	
	
}