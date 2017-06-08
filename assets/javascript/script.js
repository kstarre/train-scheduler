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



	function renderTableInfo() {
		var newRow = $("<tr>");
		var tableData = newRow.html("<td>" + name + "</td>");
		tableData.append("<td>" + destination + "</td>");
		tableData.append("<td>" + trainInterval + "</td>");
		tableData.append("<td>" + nextTrain + "</td>");
		tableData.append("<td>" + untilNextTrain + "</td>");
		$("#trainTable").append(newRow);

	};

	function nextTrainCalc() {

		nextTrain = moment(firstTrain, "HH:mm");

		while ( nextTrain.isBefore( moment() ) ) {
			nextTrain.add(trainInterval, 'm');
		}
		if ( nextTrain >= moment() ) {
			nextTrain = moment(nextTrain);
			untilNextTrain = nextTrain.diff( moment() );
			nextTrain = nextTrain.format("hh:mm A");
			untilNextTrain = Math.floor(untilNextTrain / 60000);
		}
	};

	$("#add-train").on("click", function() {

		event.preventDefault();

		name = $("#train-name-input").val().trim();
		destination = $("#destination-input").val().trim();
		firstTrain = $("#train-time-input").val().trim();
		trainInterval = $("#frequency-input").val().trim();

		// Push to firebase array...
		database.ref().push( {
			name: name,
			destination: destination,
			firstTrain: firstTrain,
			trainInterval: trainInterval
		});

		// Calculate next train...
		nextTrainCalc();

		// Display in html...
		renderTableInfo();

		// Empty input fields...
		$("#train-name-input").text("");
		$("#destination-input").text("");
		$("#train-time-input").text("");
		$("#frequency-input").text("");
	});

	database.ref().once("value", function(snapshot) {
		var data = snapshot.val();

		for( var key in data) {
			var thisObject = data[key];
			destination = thisObject.destination;
			firstTrain = thisObject.firstTrain;
			name = thisObject.name;
			trainInterval = thisObject.trainInterval;
			nextTrainCalc();
			renderTableInfo();
		}

	}, function(errorObject) {
		console.log("The read failed: " + errorObject.code);
	});


});