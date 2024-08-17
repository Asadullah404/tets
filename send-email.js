document.getElementById('contactForm').addEventListener('submit', async function (e) {
  e.preventDefault();

  const name = e.target.name.value;
  const email = e.target.email.value;
  const message = e.target.message.value;

  try {
    await firestore.collection('submissions').add({
      name,
      email,
      message,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    });
    alert('Submission successful!');
  } catch (error) {
    console.error('Error storing submission:', error);
    alert('Submission failed!');
  }
});