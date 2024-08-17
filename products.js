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
const db = firebase.firestore();

// Display Blogs Functionality
const blogsContainer = document.getElementById('blogs-container');

db.collection('blogs').orderBy('createdAt', 'desc').get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
        const blog = doc.data();
        const postDate = blog.createdAt ? blog.createdAt.toDate().toLocaleString() : "N/A";
        const userName = blog.userName || "Anonymous";
        const userIcon = blog.userIcon || "https://via.placeholder.com/50"; // Placeholder icon if none is provided

        const blogDiv = document.createElement('div');
        blogDiv.classList.add('blog');

        blogDiv.innerHTML = `
            <div class="blog-header">
                <img src="${userIcon}" alt="${userName}" class="user-icon" style="width: 50px; height: 50px; border-radius: 50%;">
                <div>
                    <h3 style="margin: 0; font-weight: bold;">${userName}</h3>
                    <p style="margin: 0; font-size: 0.8em;">Posted on: ${postDate}</p>
                </div>
            </div>
            <img src="${blog.imageUrl}" alt="${blog.title}" style="width: 100%; height: auto; margin-top: 10px;">
            <h2 style="font-weight: bold; font-size: 1.5em; margin-top: 10px;">${blog.title}</h2>
            <p style="margin-top: 10px;">${blog.content}</p>
        `;

        blogsContainer.appendChild(blogDiv);
    });
}).catch((error) => {
    alert('Error getting blogs: ' + error.message);
});
