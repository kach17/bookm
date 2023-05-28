document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();
  
    // Extract email and password values
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;
  
    // Create the request payload
    var payload = {
      email: email,
      password: password
    };
  
    // Make the API request
    fetch('http://localhost:3000/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    })
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      // Handle the response
      if (data.success) {
        // Login successful
        // Save the token to local storage or cookie
        localStorage.setItem('token', data.token);
        // Redirect to another page or perform additional actions
        window.location.href = '/dashboard.html';
      } else {
        // Login failed
        // Display an error message or perform other error handling
        console.log(data.message);
      }
    })
    .catch(function(error) {
      // Handle any error that occurred during the request
      console.error('Error:', error);
    });
  });
  