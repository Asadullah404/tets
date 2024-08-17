// Firebase configuration and initialization
var firebaseConfig = {
    apiKey: "AIzaSyCRRGLY5wimSd9GdJt3Np-BFI9tFAFjvnU",
    authDomain: "conversion-6394a.firebaseapp.com",
    projectId: "conversion-6394a",
    storageBucket: "conversion-6394a.appspot.com",
    messagingSenderId: "1053184555205",
    appId: "1:1053184555205:web:f85d614a068cfccde218ac"
  };
  
  // Check if Firebase is already initialized
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  } else {
    firebase.app(); // if already initialized, use that one
  }
  
  var firestore = firebase.firestore();
  