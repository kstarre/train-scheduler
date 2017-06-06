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