// Firebase Configuration
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
const storage = firebase.storage(); // Firebase storage for profile pictures

// Sign Up Functionality
const signUpForm = document.getElementById('sign-up-form');
signUpForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const username = document.getElementById('username').value;
    const email = document.getElementById('sign-up-email').value;
    const password = document.getElementById('sign-up-password').value;
    const profilePic = document.getElementById('profile-pic').files[0]; // Get the uploaded file

    auth.createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            const user = userCredential.user;

            // Store profile picture
            if (profilePic) {
                const storageRef = storage.ref(`profile_pics/${user.uid}/${profilePic.name}`);
                storageRef.put(profilePic).then(() => {
                    storageRef.getDownloadURL().then((url) => {
                        // Update user profile with username and profile picture
                        user.updateProfile({
                            displayName: username,
                            photoURL: url
                        }).then(() => {
                            alert('Account created successfully with profile picture!');
                            signUpForm.reset();
                            window.location.href = 'upload.html';  // Redirect to upload.html
                        }).catch((error) => {
                            alert('Error updating profile: ' + error.message);
                        });
                    });
                }).catch((error) => {
                    alert('Error uploading profile picture: ' + error.message);
                });
            } else {
                // Update user profile with username only
                user.updateProfile({
                    displayName: username
                }).then(() => {
                    alert('Account created successfully!');
                    signUpForm.reset();
                    window.location.href = 'upload.html';  // Redirect to upload.html
                }).catch((error) => {
                    alert('Error updating profile: ' + error.message);
                });
            }
        })
        .catch((error) => {
            alert(error.message);
        });
});
