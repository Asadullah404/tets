auth.onAuthStateChanged((user) => {
    if (user) {
        console.log("User is signed in:", user.uid);
        setupBlogUpload(user);
    } else {
        console.log("No user is signed in. Redirecting to sign-in.");
        window.location.href = 'signin.html'; // Redirect to sign-in page if not authenticated
    }
});

// Setup Blog Upload Functionality
function setupBlogUpload(user) {
    const blogForm = document.getElementById('blog-form');

    blogForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const blogTitle = document.getElementById('blog-title').value;
        const blogContent = document.getElementById('blog-content').value;
        const blogImage = document.getElementById('blog-image').files[0];

        if (!blogTitle || !blogContent || !blogImage) {
            alert('Please fill out all fields and select an image.');
            return;
        }

        // Reference to the storage path where the image will be stored
        const storageRef = storage.ref(`blog_images/${user.uid}/${blogImage.name}`);
        
        // Uploading the image to Firebase Storage
        const uploadTask = storageRef.put(blogImage);

        uploadTask.on('state_changed', 
            (snapshot) => {
                console.log('Upload is in progress...');
            }, 
            (error) => {
                alert('Error uploading image: ' + error.message);
            }, 
            () => {
                uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
                    db.collection('blogs').add({
                        userId: user.uid,
                        username: user.displayName || 'Anonymous',
                        title: blogTitle,
                        content: blogContent,
                        imageUrl: downloadURL,
                        createdAt: firebase.firestore.FieldValue.serverTimestamp()
                    }).then(() => {
                        alert('Blog post uploaded successfully!');
                        blogForm.reset();
                    }).catch((error) => {
                        alert('Error saving blog post: ' + error.message);
                    });
                });
            }
        );
    });
}

// Sign out functionality
document.getElementById('sign-out-btn').addEventListener('click', () => {
    auth.signOut().then(() => {
        window.location.href = 'signin.html';
    }).catch((error) => {
        alert('Error signing out: ' + error.message);
    });
});