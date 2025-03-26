document.getElementById('signupForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const fullName = document.getElementById('fullName').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
  
    // Here you would typically send this data to a server
    console.log('Sign up data:', { fullName, email, password });
    alert('Sign up successful!');
  });
  
  // Social login handlers
  document.querySelectorAll('.social-button').forEach(button => {
    button.addEventListener('click', function() {
      const provider = this.className.split(' ')[1];
      console.log(`Signing in with ${provider}`);
      alert(`${provider} login clicked`);
    });
  });
  
  // Sign in link handler
  document.getElementById('signInLink').addEventListener('click', function(e) {
    e.preventDefault();
    alert('Sign in clicked');
  });