/**
 * Portfolio JavaScript for Huy Tuong Lam
 * Features: Smooth scrolling, mobile menu toggle, scroll animations
 */

document.addEventListener('DOMContentLoaded', function() {
    
    // ==========================================================================
    // Smooth Scrolling for Navigation Links
    // ==========================================================================
    
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                const navMenu = document.getElementById('nav-menu');
                const navToggle = document.getElementById('nav-toggle');
                
                if (navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    navToggle.setAttribute('aria-expanded', 'false');
                }
            }
        });
    });
    
    // ==========================================================================
    // Mobile Menu Toggle
    // ==========================================================================
    
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            const isExpanded = this.getAttribute('aria-expanded') === 'true';
            
            // Toggle menu visibility
            navMenu.classList.toggle('active');
            
            // Update aria-expanded for accessibility
            this.setAttribute('aria-expanded', !isExpanded);
            
            // Prevent body scroll when menu is open
            if (!isExpanded) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
                if (navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    navToggle.setAttribute('aria-expanded', 'false');
                    document.body.style.overflow = '';
                }
            }
        });
        
        // Close menu on escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                navToggle.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = '';
                navToggle.focus(); // Return focus to toggle button
            }
        });
    }
    
    // ==========================================================================
    // Scroll Reveal Animation
    // ==========================================================================
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Stop observing once animated
            }
        });
    }, observerOptions);
    
    // Elements to animate on scroll
    const animateElements = document.querySelectorAll(`
        .hero-content,
        .about-content,
        .project-card,
        .skill-category,
        .contact-content
    `);
    
    animateElements.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
    
    // ==========================================================================
    // Active Navigation Link Highlighting
    // ==========================================================================
    
    const sections = document.querySelectorAll('section[id]');
    const navMenuLinks = document.querySelectorAll('.nav-link');
    
    function updateActiveLink() {
        const scrollPosition = window.scrollY + 100; // Offset for header
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionBottom = sectionTop + section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                // Remove active class from all links
                navMenuLinks.forEach(link => {
                    link.classList.remove('active');
                });
                
                // Add active class to current section link
                const activeLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
                if (activeLink) {
                    activeLink.classList.add('active');
                }
            }
        });
    }
    
    // Update active link on scroll
    window.addEventListener('scroll', updateActiveLink);
    
    // ==========================================================================
    // Header Background on Scroll
    // ==========================================================================
    
    const header = document.querySelector('.header');
    
    function updateHeaderBackground() {
        if (window.scrollY > 50) {
            header.style.background = 'rgba(255, 255, 255, 0.98)';
            header.style.boxShadow = '0 2px 20px rgba(0, 31, 63, 0.1)';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.boxShadow = 'none';
        }
    }
    
    window.addEventListener('scroll', updateHeaderBackground);
    
    // ==========================================================================
    // Enhanced Focus Management
    // ==========================================================================
    
    // Improve focus visibility for keyboard users
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Tab') {
            document.body.classList.add('keyboard-navigation');
        }
    });
    
    document.addEventListener('mousedown', function() {
        document.body.classList.remove('keyboard-navigation');
    });
    
    // ==========================================================================
    // Form Enhancement (if contact form is added later)
    // ==========================================================================
    
    function enhanceForm(formSelector) {
        const form = document.querySelector(formSelector);
        if (!form) return;
        
        const inputs = form.querySelectorAll('input, textarea');
        
        inputs.forEach(input => {
            // Add floating label effect
            input.addEventListener('focus', function() {
                this.parentElement.classList.add('focused');
            });
            
            input.addEventListener('blur', function() {
                if (this.value === '') {
                    this.parentElement.classList.remove('focused');
                }
            });
            
            // Check if input has value on page load
            if (input.value !== '') {
                input.parentElement.classList.add('focused');
            }
        });
    }
    
    // ==========================================================================
    // Utility Functions
    // ==========================================================================
    
    // Debounce function for performance optimization
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
    
    // Use debounced scroll handlers for better performance
    const debouncedScrollHandler = debounce(() => {
        updateActiveLink();
        updateHeaderBackground();
    }, 10);
    
    window.addEventListener('scroll', debouncedScrollHandler);
    
    // ==========================================================================
    // Accessibility Improvements
    // ==========================================================================
    
    // Add proper ARIA labels and roles where needed
    function improveAccessibility() {
        // Ensure all images have alt text
        const images = document.querySelectorAll('img:not([alt])');
        images.forEach(img => {
            console.warn('Image missing alt text:', img.src);
            img.setAttribute('alt', 'Image description needed');
        });
        
        // Ensure all links have accessible names
        const links = document.querySelectorAll('a:not([aria-label]):not([title])');
        links.forEach(link => {
            if (!link.textContent.trim()) {
                console.warn('Link missing accessible name:', link);
            }
        });
    }
    
    // Run accessibility check in development
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        improveAccessibility();
    }
    
    // ==========================================================================
    // Performance Monitoring
    // ==========================================================================
    
    // Log performance metrics (development only)
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        window.addEventListener('load', function() {
            setTimeout(() => {
                const perfData = performance.getEntriesByType('navigation')[0];
                console.log('Page Load Performance:', {
                    'DOM Content Loaded': perfData.domContentLoadedEventEnd - perfData.domContentLoadedEventStart,
                    'Load Complete': perfData.loadEventEnd - perfData.loadEventStart,
                    'Total Load Time': perfData.loadEventEnd - perfData.fetchStart
                });
            }, 0);
        });
    }
    
    // ==========================================================================
    // Error Handling
    // ==========================================================================
    
    window.addEventListener('error', function(e) {
        console.error('JavaScript Error:', e.error);
        // In production, you might want to send this to an error tracking service
    });
    
    // ==========================================================================
    // Initialization Complete
    // ==========================================================================
    
    console.log('Portfolio JavaScript initialized successfully');
    
    // Trigger initial checks
    updateActiveLink();
    updateHeaderBackground();
});

// ==========================================================================
// Additional CSS for enhanced keyboard navigation
// ==========================================================================

// Add CSS for keyboard navigation enhancement
const keyboardNavigationCSS = `
    .keyboard-navigation *:focus {
        outline: 3px solid #007BFF !important;
        outline-offset: 2px !important;
    }
    
    .keyboard-navigation .btn:focus {
        outline-color: #FFFFFF !important;
        box-shadow: 0 0 0 3px #007BFF !important;
    }
    
    .nav-link.active {
        background: var(--surface);
        color: var(--primary);
        border-radius: 4px;
    }
`;

// Inject the CSS
const style = document.createElement('style');
style.textContent = keyboardNavigationCSS;
document.head.appendChild(style);