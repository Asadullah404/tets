// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCZ1GL6GMxH8vwZL02dp2dFGhm0PR1rqXo",
    authDomain: "hackaton-de376.firebaseapp.com",
    projectId: "hackaton-de376",
    storageBucket: "hackaton-de376.appspot.com",
    messagingSenderId: "547286971895",
    appId: "1:547286971895:web:2aa3b177638e0698afeaf2"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

// Sign In Functionality
const signInForm = document.getElementById('sign-in-form');
signInForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const email = document.getElementById('sign-in-email').value;
    const password = document.getElementById('sign-in-password').value;

    auth.signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            alert('Signed in successfully!');
            signInForm.reset();
            window.location.href = 'upload.html';  // Redirect to upload.html
        })
        .catch((error) => {
            alert(error.message);
        });
});
