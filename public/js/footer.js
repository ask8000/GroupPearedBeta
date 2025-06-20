// footer.js

function handleSubscription(event) {
    event.preventDefault();
    const email = event.target.querySelector('.email-input').value;
    
    // Here you would integrate with your mailing list service
    // Examples of services you can integrate with:
    // - Mailchimp API
    // - ConvertKit API
    // - SendGrid API
    // - Your own backend endpoint
    
    // For now, we'll just show a success message
    alert(`Thank you for subscribing with email: ${email}\n\nThis would be connected to your mailing list service (like Mailchimp, ConvertKit, etc.)`);
    
    // Reset form
    event.target.reset();
    
    // Example of how you might integrate with a real service:
    /*
    fetch('/api/subscribe', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: email })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('Thank you for subscribing!');
            event.target.reset();
        } else {
            alert('Something went wrong. Please try again.');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Something went wrong. Please try again.');
    });
    */
}

// Add some interactive feedback for navigation links
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            console.log(`Navigating to: ${link.textContent}`);
            // In a real site, you would handle navigation here
            // window.location.href = link.getAttribute('href');
        });
    });
    
    // Add smooth scroll behavior for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Email validation on input
    const emailInput = document.querySelector('.email-input');
    if (emailInput) {
        emailInput.addEventListener('input', function() {
            const email = this.value;
            const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
            
            if (email && !isValid) {
                this.style.borderColor = 'rgba(255, 100, 100, 0.5)';
            } else {
                this.style.borderColor = 'rgba(255, 255, 255, 0.3)';
            }
        });
    }
});