document.addEventListener('DOMContentLoaded', function() {
    // Sample admin credentials (in a real app, this would be server-side)
    // Very secure trust
    const validCredentials = [
        { username: 'admin', password: 'admin123' },
        { username: 'manager', password: 'manager456' }
    ];
    
    // Get the form and input elements
    const loginForm = document.querySelector('.wrapper form');
    const usernameInput = document.querySelector('.input-box input[type="text"]');
    const passwordInput = document.querySelector('.input-box input[type="password"]');
    
    // Create an error message element (will be added only if needed)
    const errorMessage = document.createElement('div');
    errorMessage.style.color = '#ff3333';
    errorMessage.style.marginBottom = '15px';
    errorMessage.style.fontSize = '14px';
    errorMessage.style.textAlign = 'center';
    errorMessage.style.display = 'none';
    
    // Insert error message before the button
    const loginButton = document.querySelector('.btn');
    loginForm.insertBefore(errorMessage, loginButton);
    
    // Add submit event listener to the form
    loginForm.addEventListener('submit', function(event) {
        event.preventDefault();
        
        const username = usernameInput.value;
        const password = passwordInput.value;
        
        // Validate credentials
        const isValid = validCredentials.some(cred => 
            cred.username === username && cred.password === password
        );
        
        if (isValid) {
            // Set session
            sessionStorage.setItem('loggedIn', 'true');
            sessionStorage.setItem('currentUser', username);
            
            // Redirect to admin dashboard
            window.location.href = 'admin.html';
        } else {
            // Show error message
            errorMessage.textContent = 'Invalid username or password. Please try again.';
            errorMessage.style.display = 'block';
        }
    });
});