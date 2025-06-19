// Add smooth scrolling and header transparency on scroll
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
    } else {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
    }
});

// Add click animations to buttons
document.querySelectorAll('.btn-primary, .btn-secondary, .section-button').forEach(button => {
    button.addEventListener('click', (e) => {
        // Only prevent default if it's not a hash link
        if (!button.getAttribute('href').startsWith('#')) {
            e.preventDefault();
        }
        
        button.style.transform = 'scale(0.95)';
        setTimeout(() => {
            button.style.transform = '';
        }, 150);
    });
});

// Add navigation functionality
document.querySelectorAll('.nav-button').forEach(button => {
    button.addEventListener('click', (e) => {
        // Only prevent default if it's not a hash link
        if (!button.getAttribute('href').startsWith('#')) {
            e.preventDefault();
        }
        
        document.querySelectorAll('.nav-button').forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
    });
});

// Add intersection observer for section navigation
const sections = document.querySelectorAll('section[id]');
const navButtons = document.querySelectorAll('.nav-button[href^="#"]');

const observerOptions = {
    root: null,
    rootMargin: '-50% 0px -50% 0px',
    threshold: 0
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const targetId = entry.target.id;
            const activeButton = document.querySelector(`.nav-button[href="#${targetId}"]`);
            
            if (activeButton) {
                document.querySelectorAll('.nav-button').forEach(btn => btn.classList.remove('active'));
                activeButton.classList.add('active');
            }
        }
    });
}, observerOptions);

sections.forEach(section => {
    observer.observe(section);
});

// Add scroll-triggered animations for section elements
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