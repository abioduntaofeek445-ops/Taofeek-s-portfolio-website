/* ===============================================
   PORTFOLIO WEBSITE - JAVASCRIPT
   =============================================== */

// ===============================================
// DARK MODE TOGGLE
// ===============================================

const themeToggle = document.getElementById('themeToggle');
const body = document.body;

// Check for saved theme preference or default to light mode
const currentTheme = localStorage.getItem('theme') || 'light-mode';
if (currentTheme === 'dark-mode') {
    body.classList.add('dark-mode');
    themeToggle.textContent = '☀️';
}

// Toggle theme
themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    
    if (body.classList.contains('dark-mode')) {
        localStorage.setItem('theme', 'dark-mode');
        themeToggle.textContent = '☀️';
    } else {
        localStorage.setItem('theme', 'light-mode');
        themeToggle.textContent = '🌙';
    }
});

// ===============================================
// SMOOTH SCROLLING & NAVBAR
// ===============================================

const navbar = document.getElementById('navbar');
const navMenu = document.getElementById('navMenu');
const hamburger = document.getElementById('hamburger');

// Sticky navbar on scroll
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Hamburger menu toggle
hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Close menu when link is clicked
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// ===============================================
// TYPING EFFECT IN HERO SECTION
// ===============================================

const typingText = document.getElementById('typingText');
const typingStrings = ['Taofeek Abiodun'];
let stringIndex = 0;
let charIndex = 0;
let currentString = '';
let isDeleting = false;

function typeEffect() {
    const fullString = typingStrings[stringIndex];
    
    if (!isDeleting && charIndex < fullString.length) {
        // Typing forward
        currentString += fullString.charAt(charIndex);
        charIndex++;
        typingText.textContent = currentString;
        setTimeout(typeEffect, 100);
    } else if (isDeleting && charIndex > 0) {
        // Deleting backward
        currentString = currentString.slice(0, -1);
        charIndex--;
        typingText.textContent = currentString;
        setTimeout(typeEffect, 50);
    } else if (!isDeleting && charIndex === fullString.length) {
        // Pause before deleting
        isDeleting = true;
        setTimeout(typeEffect, 2000);
    } else if (isDeleting && charIndex === 0) {
        // Move to next string
        isDeleting = false;
        stringIndex = (stringIndex + 1) % typingStrings.length;
        setTimeout(typeEffect, 500);
    }
}

// Start typing effect
typeEffect();

// ===============================================
// SCROLL TO TOP BUTTON
// ===============================================

const scrollToTopBtn = document.getElementById('scrollToTop');

// Show/hide scroll to top button
window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        scrollToTopBtn.classList.add('show');
    } else {
        scrollToTopBtn.classList.remove('show');
    }
});

// Scroll to top smoothly
scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ===============================================
// SECTION REVEAL ANIMATIONS ON SCROLL
// ===============================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all section-reveal elements
document.querySelectorAll('.section-reveal').forEach(el => {
    el.style.opacity = '0';
    observer.observe(el);
});

// ===============================================
// PROGRESS BAR ANIMATIONS
// ===============================================

const skillCards = document.querySelectorAll('.skill-card');
let skillsAnimated = false;

const skillsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !skillsAnimated) {
            skillsAnimated = true;
            
            // Animate progress bars
            const progressBars = document.querySelectorAll('.progress');
            progressBars.forEach(bar => {
                const width = bar.style.width;
                bar.style.width = '0';
                
                setTimeout(() => {
                    bar.style.transition = 'width 1.5s ease';
                    bar.style.width = width;
                }, 100);
            });
        }
    });
}, { threshold: 0.3 });

const skillsSection = document.getElementById('skills');
if (skillsSection) {
    skillsObserver.observe(skillsSection);
}

// ===============================================
// FORM VALIDATION & SUBMISSION
// ===============================================

const contactForm = document.getElementById('contactForm');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const messageInput = document.getElementById('message');
const formMessage = document.getElementById('formMessage');
const nameError = document.getElementById('nameError');
const emailError = document.getElementById('emailError');
const messageError = document.getElementById('messageError');

/**
 * Validate name field
 * @returns {boolean} True if name is valid
 */
function validateName() {
    const name = nameInput.value.trim();
    
    if (name.length < 2) {
        showError(nameInput, nameError, 'Name must be at least 2 characters long');
        return false;
    }
    
    if (!/^[a-zA-Z\s]+$/.test(name)) {
        showError(nameInput, nameError, 'Name can only contain letters and spaces');
        return false;
    }
    
    clearError(nameInput, nameError);
    return true;
}

/**
 * Validate email field
 * @returns {boolean} True if email is valid
 */
function validateEmail() {
    const email = emailInput.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!emailRegex.test(email)) {
        showError(emailInput, emailError, 'Please enter a valid email address');
        return false;
    }
    
    clearError(emailInput, emailError);
    return true;
}

/**
 * Validate message field
 * @returns {boolean} True if message is valid
 */
function validateMessage() {
    const message = messageInput.value.trim();
    
    if (message.length < 10) {
        showError(messageInput, messageError, 'Message must be at least 10 characters long');
        return false;
    }
    
    if (message.length > 500) {
        showError(messageInput, messageError, 'Message cannot exceed 500 characters');
        return false;
    }
    
    clearError(messageInput, messageError);
    return true;
}

/**
 * Show error message
 * @param {HTMLElement} input - Input element
 * @param {HTMLElement} errorEl - Error message element
 * @param {string} message - Error message
 */
function showError(input, errorEl, message) {
    input.classList.add('error');
    errorEl.textContent = message;
    errorEl.classList.add('show');
}

/**
 * Clear error message
 * @param {HTMLElement} input - Input element
 * @param {HTMLElement} errorEl - Error message element
 */
function clearError(input, errorEl) {
    input.classList.remove('error');
    errorEl.textContent = '';
    errorEl.classList.remove('show');
}

/**
 * Display form message
 * @param {string} message - Message to display
 * @param {string} type - Type of message ('success' or 'error')
 */
function displayFormMessage(message, type) {
    formMessage.textContent = message;
    formMessage.className = `form-message ${type}`;
    
    // Auto-hide message after 5 seconds
    setTimeout(() => {
        formMessage.className = 'form-message';
    }, 5000);
}

// Real-time validation
nameInput.addEventListener('blur', validateName);
emailInput.addEventListener('blur', validateEmail);
messageInput.addEventListener('blur', validateMessage);

// Form submission
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Validate all fields
    const isNameValid = validateName();
    const isEmailValid = validateEmail();
    const isMessageValid = validateMessage();
    
    if (isNameValid && isEmailValid && isMessageValid) {
        // Collect form data
        const formData = {
            name: nameInput.value.trim(),
            email: emailInput.value.trim(),
            message: messageInput.value.trim()
        };
        
        // Simulate form submission (in a real scenario, you'd send this to a server)
        console.log('Form submitted:', formData);
        
        // Show success message
        displayFormMessage('✓ Message sent successfully! I\'ll get back to you soon.', 'success');
        
        // Reset form
        contactForm.reset();
        
        // Clear any errors
        clearError(nameInput, nameError);
        clearError(emailInput, emailError);
        clearError(messageInput, messageError);
    } else {
        // Show error message if validation failed
        displayFormMessage('✗ Please fill out all fields correctly.', 'error');
    }
});

// ===============================================
// INTERSECTION OBSERVER FOR STAGGERED ANIMATIONS
// ===============================================

/**
 * Stagger animations for multiple elements
 */
function setupStaggerAnimation() {
    const projectCards = document.querySelectorAll('.project-card');
    
    const cardObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                entry.target.style.animationDelay = `${index * 0.1}s`;
            }
        });
    }, { threshold: 0.1 });
    
    projectCards.forEach(card => {
        cardObserver.observe(card);
    });
}

setupStaggerAnimation();

// ===============================================
// ACTIVE NAVIGATION LINK HIGHLIGHTING
// ===============================================

window.addEventListener('scroll', () => {
    let current = '';
    
    // Get all sections
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    // Update active nav link
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// ===============================================
// UTILITY FUNCTIONS
// ===============================================

/**
 * Debounce function to limit function execution frequency
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time in milliseconds
 * @returns {Function} Debounced function
 */
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// ===============================================
// INITIALIZATION
// ===============================================

/**
 * Initialize all features
 */
function init() {
    console.log('Portfolio website loaded successfully!');
    
    // Add any additional initialization code here
    // For example: loading external data, setting up event listeners, etc.
}

// Run initialization when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}