

// // Get the form and input elements
// const loginForm = document.querySelector('.wrapper form');
// const usernameInput = document.querySelector('.input-box input[type="text"]');
// const passwordInput = document.querySelector('.input-box input[type="password"]');

// // Create an error message element (will be added only if needed)
// const errorMessage = document.createElement('div');
// errorMessage.style.color = '#ff3333';
// errorMessage.style.marginBottom = '15px';
// errorMessage.style.fontSize = '14px';
// errorMessage.style.textAlign = 'center';
// errorMessage.style.display = 'none';

// // Insert error message before the button
// const loginButton = document.querySelector('.btn');
// loginForm.insertBefore(errorMessage, loginButton);

// // Add submit event listener to the form
// loginForm.addEventListener('submit', function(event) {
//     event.preventDefault();
    
//     const username = usernameInput.value;
//     const password = passwordInput.value;
    
//     const url = `${window.location.origin}/api/login?username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`;
//     fetch(url, {credentials: 'include'})
//         .then(response => response.json()) 
//         .then(data => {
//             if (data.error) {
//                 // Display error message if login fails
//                 console.log("Login failed:", data.error); // Log the error for debugging
//                 errorMessage.textContent = data.error;
//                 errorMessage.style.display = 'block';
//             } else {
//                 // Redirect to the dashboard or another page on successful login
//                 window.location.href = 'admin.html';
//             }
//         });
    
// });

// Enhanced admin login functionality with modern interactions

// Get the form and input elements
const loginForm = document.querySelector('.wrapper form');
const usernameInput = document.querySelector('.input-box input[type="text"]');
const passwordInput = document.querySelector('.input-box input[type="password"]');
const loginButton = document.querySelector('.btn');

// Create an enhanced error message element
const errorMessage = document.createElement('div');
errorMessage.className = 'error-message';
errorMessage.style.display = 'none';

// Insert error message before the button
loginForm.insertBefore(errorMessage, loginButton);

// Add floating label effect
function addFloatingLabelEffect() {
    const inputBoxes = document.querySelectorAll('.input-box');
    
    inputBoxes.forEach(box => {
        const input = box.querySelector('input');
        const icon = box.querySelector('i');
        
        // Add focus and blur animations
        input.addEventListener('focus', () => {
            box.classList.add('focused');
            icon.style.color = '#6B7B5A';
            icon.style.transform = 'translateY(-50%) scale(1.1)';
        });
        
        input.addEventListener('blur', () => {
            if (!input.value) {
                box.classList.remove('focused');
                icon.style.color = '#999';
                icon.style.transform = 'translateY(-50%) scale(1)';
            }
        });
        
        // Add input animation
        input.addEventListener('input', () => {
            if (input.value) {
                box.classList.add('has-value');
            } else {
                box.classList.remove('has-value');
            }
        });
    });
}

// Add button loading state
function setButtonLoading(loading) {
    if (loading) {
        loginButton.classList.add('loading');
        loginButton.textContent = '';
    } else {
        loginButton.classList.remove('loading');
        loginButton.textContent = 'Login';
    }
}

// Show error message with animation
function showError(message) {
    errorMessage.textContent = message;
    errorMessage.style.display = 'block';
    errorMessage.style.opacity = '0';
    errorMessage.style.transform = 'translateY(-10px)';
    
    // Animate in
    setTimeout(() => {
        errorMessage.style.opacity = '1';
        errorMessage.style.transform = 'translateY(0)';
    }, 10);
    
    // Auto hide after 5 seconds
    setTimeout(() => {
        hideError();
    }, 5000);
}

// Hide error message with animation
function hideError() {
    errorMessage.style.opacity = '0';
    errorMessage.style.transform = 'translateY(-10px)';
    
    setTimeout(() => {
        errorMessage.style.display = 'none';
    }, 300);
}

// Add form validation
function validateForm() {
    const username = usernameInput.value.trim();
    const password = passwordInput.value.trim();
    
    if (!username) {
        showError('Please enter your username');
        usernameInput.focus();
        return false;
    }
    
    if (!password) {
        showError('Please enter your password');
        passwordInput.focus();
        return false;
    }
    
    if (username.length < 3) {
        showError('Username must be at least 3 characters long');
        usernameInput.focus();
        return false;
    }
    
    return true;
}

// Enhanced form submission with better UX
loginForm.addEventListener('submit', async function(event) {
    event.preventDefault();
    
    // Hide any existing errors
    hideError();
    
    // Validate form
    if (!validateForm()) {
        return;
    }
    
    // Get form data
    const username = usernameInput.value.trim();
    const password = passwordInput.value.trim();
    
    // Set loading state
    setButtonLoading(true);
    
    try {
        const url = `${window.location.origin}/api/login?username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`;
        
        const response = await fetch(url, {
            credentials: 'include',
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        
        const data = await response.json();
        
        if (data.error) {
            // Display error message with enhanced styling
            console.log("Login failed:", data.error);
            showError(data.error || 'Login failed. Please check your credentials.');
        } else {
            // Success animation before redirect
            loginButton.textContent = 'Success!';
            loginButton.style.background = 'linear-gradient(135deg, #2ecc71, #27ae60)';
            
            // Add success checkmark
            setTimeout(() => {
                loginButton.innerHTML = '✓ Success!';
            }, 100);
            
            // Redirect after brief delay
            setTimeout(() => {
                window.location.href = 'admin.html';
            }, 1000);
        }
    } catch (error) {
        console.error('Network error:', error);
        showError('Connection failed. Please check your internet connection and try again.');
    } finally {
        // Remove loading state if there was an error
        if (!loginButton.textContent.includes('Success')) {
            setButtonLoading(false);
        }
    }
});

// Add keyboard shortcuts
document.addEventListener('keydown', function(event) {
    // Enter key submission (if not already handled by form)
    if (event.key === 'Enter' && document.activeElement.tagName !== 'BUTTON') {
        event.preventDefault();
        loginForm.dispatchEvent(new Event('submit'));
    }
    
    // Escape key to clear form
    if (event.key === 'Escape') {
        usernameInput.value = '';
        passwordInput.value = '';
        hideError();
        usernameInput.focus();
    }
});

// Add input animations and effects
function addInputAnimations() {
    const inputs = document.querySelectorAll('.input-box input');
    
    inputs.forEach(input => {
        // Add ripple effect on focus
        input.addEventListener('focus', function() {
            this.parentElement.style.transform = 'translateY(-2px)';
            this.style.boxShadow = '0 0 0 4px rgba(107, 123, 90, 0.1)';
        });
        
        input.addEventListener('blur', function() {
            this.parentElement.style.transform = 'translateY(0)';
        });
        
        // Add typing animation
        input.addEventListener('input', function() {
            const icon = this.nextElementSibling;
            if (icon) {
                icon.style.transform = 'translateY(-50%) scale(1.1)';
                setTimeout(() => {
                    icon.style.transform = 'translateY(-50%) scale(1)';
                }, 150);
            }
        });
    });
}

// Add smooth scroll to top on page load
function smoothScrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Initialize all enhancements
document.addEventListener('DOMContentLoaded', function() {
    addFloatingLabelEffect();
    addInputAnimations();
    smoothScrollToTop();
    
    // Focus on username input for better UX
    setTimeout(() => {
        usernameInput.focus();
    }, 300);
});

// Add header scroll effect (if header exists)
window.addEventListener('scroll', () => {
    const header = document.querySelector('#header-container');
    if (header) {
        if (window.scrollY > 50) {
            header.style.background = 'rgba(255, 255, 255, 0.98)';
            header.style.boxShadow = '0 2px 20px rgba(0,0,0,0.1)';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.boxShadow = 'none';
        }
    }
});

// Add form reset function for development/testing
window.resetLoginForm = function() {
    usernameInput.value = '';
    passwordInput.value = '';
    hideError();
    setButtonLoading(false);
    usernameInput.focus();
};

// Add accessibility improvements
function addAccessibilityFeatures() {
    // Add ARIA labels
    usernameInput.setAttribute('aria-label', 'Username');
    passwordInput.setAttribute('aria-label', 'Password');
    loginButton.setAttribute('aria-label', 'Login to Admin Panel');
    
    // Add focus trap within form
    const focusableElements = loginForm.querySelectorAll('input, button');
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];
    
    loginForm.addEventListener('keydown', function(e) {
        if (e.key === 'Tab') {
            if (e.shiftKey) {
                if (document.activeElement === firstElement) {
                    e.preventDefault();
                    lastElement.focus();
                }
            } else {
                if (document.activeElement === lastElement) {
                    e.preventDefault();
                    firstElement.focus();
                }
            }
        }
    });
}

// Initialize accessibility features
document.addEventListener('DOMContentLoaded', addAccessibilityFeatures);