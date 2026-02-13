fetch("http://localhost:3000/api/send-otp", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({ email: "muskansoni.saroj27@gmail.com" }),
})
// script.js
document.getElementById('sendOtpBtn').addEventListener('click', async () => {
  const email = document.getElementById('emailInput').value;

  if (!email) {
    alert('Please enter email');
    return;
  }

  try {
    const response = await fetch('http://localhost:5000/send-otp', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email })
    });

    const data = await response.json();
    if (response.ok) {
      alert('OTP sent successfully! Check your email.');
      console.log('OTP for testing:', data.otp); // testing only, production में remove करें
    } else {
      alert('Failed to send OTP: ' + data.message);
    }
  } catch (err) {
    console.error(err);
    alert('Error sending OTP');
  }
});
