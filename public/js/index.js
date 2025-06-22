// Header transparency on scroll
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
    } else {
        header.style.background = 'rgba(255, 255, 255, 1)';
    }
});

// Button click animations for primary and secondary buttons
document.querySelectorAll('.btn-primary, .btn-secondary, .section-button').forEach(button => {
    button.addEventListener('click', () => {
        button.style.transform = 'scale(0.95)';
        setTimeout(() => {
            button.style.transform = '';
        }, 150);
    });
});

// Nav button active class toggling on click — let links work normally
document.querySelectorAll('.nav-button').forEach(button => {
    button.addEventListener('click', () => {
        document.querySelectorAll('.nav-button').forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
    });
});

// Scroll-triggered animations for section elements
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.section-content, .section-visual');
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        if (elementTop < windowHeight * 0.8) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
};

// Initialize animation styles
document.querySelectorAll('.section-content, .section-visual').forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(50px)';
    element.style.transition = 'all 0.8s ease';
});

window.addEventListener('scroll', animateOnScroll);
window.addEventListener('load', animateOnScroll);

// Mobile menu functionality
document.addEventListener('DOMContentLoaded', function() {
    // Close mobile menu when clicking on nav links
    const navLinks = document.querySelectorAll('.nav-button');
    const navToggle = document.getElementById('nav-toggle');
    
    // Only add mobile menu functionality if the toggle exists
    if (navToggle) {
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navToggle.checked = false;
            });
        });
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', function(event) {
            const header = document.querySelector('.header');
            const isClickInsideHeader = header.contains(event.target);
            
            if (!isClickInsideHeader && navToggle.checked) {
                navToggle.checked = false;
            }
        });
        
        // Close mobile menu when pressing Escape key
        document.addEventListener('keydown', function(event) {
            if (event.key === 'Escape' && navToggle.checked) {
                navToggle.checked = false;
            }
        });
        
        // Prevent body scroll when mobile menu is open
        navToggle.addEventListener('change', function() {
            if (this.checked) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        });
    }
});
