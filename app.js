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

// Sign Up Functionality
const signUpForm = document.getElementById('sign-up-form');
signUpForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const email = document.getElementById('sign-up-email').value;
    const password = document.getElementById('sign-up-password').value;

    auth.createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            alert('Account created successfully!');
            signUpForm.reset();
        })
        .catch((error) => {
            alert(error.message);
        });
});

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
        })
        .catch((error) => {
            alert(error.message);
        });
});
