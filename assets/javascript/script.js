$(document).ready(function() {
	// Initialize Firebase
	var config = {
	  apiKey: "AIzaSyAyglAUitvmLS7IvoUxwDyQT8NNaDerUmo",
	  authDomain: "train-scheduler-b90a7.firebaseapp.com",
	  databaseURL: "https://train-scheduler-b90a7.firebaseio.com",
	  projectId: "train-scheduler-b90a7",
	  storageBucket: "train-scheduler-b90a7.appspot.com",
	  messagingSenderId: "644552055897"
	};
	firebase.initializeApp(config);

	var database = firebase.database();
	var name = "";
	var destination = "";
	var firstTrain = 0;
	var trainInterval = 0;
	var nextTrain = 0;
	var untilNextTrain = 0;
	var dt = new Date();
	var time = dt.getHours() + ":" + dt.getMinutes();

	$("#add-train").on("click", function() {
		name = $("#train-name-input").val().trim();
		destination = $("#destination-input").val().trim();
		firstTrain = $("#train-time-input").val().trim();
		trainInterval = $("#frequency-input").val().trim();
		// Figure out calculation for nextTrain and untilNextTrain
		// it will need to calculate from first train time (array?)
		var timeMill = trainInterval * 60000;

		$("#train-name-input").text("");
		$("#destination-input").text("");
		$("#train-time-input").text("");
		$("#frequency-input").text("");

		// Push to firebase array...
		// Add to html...

	});

	database.ref().on("value", function(snapshot) {
		var data = snapshot.val();

	}, function(errorObject) {
		console.log("The read failed: " + errorObject.code);
	});

});