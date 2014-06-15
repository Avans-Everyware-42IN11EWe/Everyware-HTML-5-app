var userId;
var userToken;

$(document).ready(function () {
	loadUserSettings();
});

function loadUserSettings() {
	var arr = window.JHandler.GetSavedData();
	userId = arr[0];
	userToken = arr[1];
}