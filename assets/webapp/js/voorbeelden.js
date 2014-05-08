// Shows a toast
window.JHandler.Toast("Toast!");			

// Write data to file
window.JHandler.SaveToFile("test.bin", "Text");

// Read data from file
$result = window.JHandler.GetSavedData("test.bin");		
alert($result);