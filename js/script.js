// ===================================
// Tech Innovators - JavaScript
// Interactive Features & Functionality
// ===================================

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // ===================================
    // Dark Mode Toggle
    // ===================================
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = document.getElementById('themeIcon');
    const themeText = document.getElementById('themeText');
    const body = document.body;

    // Check for saved theme preference or default to 'light'
    const currentTheme = localStorage.getItem('theme') || 'light';
    
    // Apply saved theme on page load
    if (currentTheme === 'dark') {
        body.classList.add('dark-mode');
        updateThemeButton(true);
    }

    // Theme toggle event listener
    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            body.classList.toggle('dark-mode');
            const isDark = body.classList.contains('dark-mode');
            
            // Save theme preference
            localStorage.setItem('theme', isDark ? 'dark' : 'light');
            
            // Update button appearance
            updateThemeButton(isDark);
            
            // Add smooth transition effect
            body.style.transition = 'background-color 0.3s ease, color 0.3s ease';
        });
    }

    // Update theme button text and icon
    function updateThemeButton(isDark) {
        if (themeIcon && themeText) {
            if (isDark) {
                themeIcon.textContent = '☀️';
                themeText.textContent = 'Light';
            } else {
                themeIcon.textContent = '🌙';
                themeText.textContent = 'Dark';
            }
        }
    }

    // ===================================
    // Mobile Menu Toggle
    // ===================================
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.getElementById('navLinks');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            menuToggle.classList.toggle('active');
            
            // Update ARIA attributes for accessibility
            const isExpanded = navLinks.classList.contains('active');
            menuToggle.setAttribute('aria-expanded', isExpanded);
        });

        // Close mobile menu when clicking on a link
        const navItems = navLinks.querySelectorAll('a');
        navItems.forEach(item => {
            item.addEventListener('click', function() {
                if (window.innerWidth <= 768) {
                    navLinks.classList.remove('active');
                    menuToggle.classList.remove('active');
                    menuToggle.setAttribute('aria-expanded', 'false');
                }
            });
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', function(event) {
            const isClickInsideMenu = navLinks.contains(event.target);
            const isClickOnToggle = menuToggle.contains(event.target);
            
            if (!isClickInsideMenu && !isClickOnToggle && navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                menuToggle.classList.remove('active');
                menuToggle.setAttribute('aria-expanded', 'false');
            }
        });
    }

    // ===================================
    // Smooth Scroll for Navigation Links
    // ===================================
    const smoothScrollLinks = document.querySelectorAll('a[href^="#"]');
    
    smoothScrollLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Only prevent default for hash links (not empty hash)
            if (href !== '#' && href.startsWith('#')) {
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    e.preventDefault();
                    
                    // Calculate offset for fixed header
                    const headerHeight = document.querySelector('header').offsetHeight;
                    const targetPosition = targetElement.offsetTop - headerHeight - 20;
                    
                    // Smooth scroll to target
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // ===================================
    // Scroll Animation for Team Cards
    // ===================================
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Add staggered delay for each card
                setTimeout(() => {
                    entry.target.classList.add('fade-in');
                }, index * 100);
                
                // Stop observing once animated
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all member cards
    const memberCards = document.querySelectorAll('.member-card[data-animation="fade"]');
    memberCards.forEach(card => {
        observer.observe(card);
    });

    // ===================================
    // Active Navigation Link Highlighting
    // ===================================
    function updateActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-links a');
        
        let currentSection = '';
        const scrollPosition = window.scrollY + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
            // Highlight Home link when at top of page
            if (window.scrollY < 100 && link.getAttribute('href') === 'index.html') {
                link.classList.add('active');
            }
        });
    }

    // Update active link on scroll
    window.addEventListener('scroll', debounce(updateActiveNavLink, 100));

    // ===================================
    // Contact Form Handling
    // ===================================
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                message: document.getElementById('message').value
            };
            
            // Simulate form submission (replace with actual API call)
            console.log('Form submitted:', formData);
            
            // Show success message
            showNotification('Thank you! Your message has been sent successfully.', 'success');
            
            // Reset form
            contactForm.reset();
        });
    }

    // ===================================
    // Notification System
    // ===================================
    function showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        
        // Style the notification
        Object.assign(notification.style, {
            position: 'fixed',
            top: '20px',
            right: '20px',
            padding: '1rem 1.5rem',
            backgroundColor: type === 'success' ? '#64FFDA' : '#0A192F',
            color: type === 'success' ? '#0A192F' : '#FFFFFF',
            borderRadius: '8px',
            boxShadow: '0 5px 20px rgba(0,0,0,0.2)',
            zIndex: '9999',
            animation: 'slideInRight 0.3s ease-out',
            fontFamily: 'Poppins, sans-serif',
            fontSize: '0.95rem',
            maxWidth: '300px'
        });
        
        // Add to page
        document.body.appendChild(notification);
        
        // Remove after 4 seconds
        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.3s ease-out';
            setTimeout(() => notification.remove(), 300);
        }, 4000);
    }

    // ===================================
    // Header Scroll Effect
    // ===================================
    let lastScroll = 0;
    const header = document.querySelector('header');
    
    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        
        // Add shadow when scrolled
        if (currentScroll > 0) {
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.05)';
        }
        
        lastScroll = currentScroll;
    });

    // ===================================
    // Parallax Effect for Hero Section
    // ===================================
    const hero = document.querySelector('.hero');
    
    if (hero) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const parallaxSpeed = 0.5;
            
            if (scrolled < hero.offsetHeight) {
                hero.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
                hero.style.opacity = 1 - (scrolled / hero.offsetHeight) * 0.5;
            }
        });
    }

    // ===================================
    // Hover Effect Enhancement for Cards
    // ===================================
    const cards = document.querySelectorAll('.member-card, .project-item');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // ===================================
    // Typing Effect for Hero Text (Optional)
    // ===================================
    const heroTitle = document.querySelector('.hero h1');
    
    if (heroTitle && heroTitle.hasAttribute('data-typing')) {
        const text = heroTitle.textContent;
        heroTitle.textContent = '';
        let charIndex = 0;
        
        function typeCharacter() {
            if (charIndex < text.length) {
                heroTitle.textContent += text.charAt(charIndex);
                charIndex++;
                setTimeout(typeCharacter, 50);
            }
        }
        
        typeCharacter();
    }

    // ===================================
    // Utility Functions
    // ===================================
    
    // Debounce function to limit function calls
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

    // ===================================
    // Performance Optimization
    // ===================================
    
    // Lazy load images (if any are added later)
    if ('loading' in HTMLImageElement.prototype) {
        const images = document.querySelectorAll('img[loading="lazy"]');
        images.forEach(img => {
            img.src = img.dataset.src;
        });
    } else {
        // Fallback for browsers that don't support lazy loading
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
        document.body.appendChild(script);
    }

    // ===================================
    // Accessibility Enhancements
    // ===================================
    
    // Focus trap for mobile menu
    const focusableElements = navLinks?.querySelectorAll('a, button');
    const firstFocusable = focusableElements?.[0];
    const lastFocusable = focusableElements?.[focusableElements.length - 1];

    if (navLinks) {
        navLinks.addEventListener('keydown', function(e) {
            if (e.key === 'Tab') {
                if (e.shiftKey) {
                    if (document.activeElement === firstFocusable) {
                        lastFocusable?.focus();
                        e.preventDefault();
                    }
                } else {
                    if (document.activeElement === lastFocusable) {
                        firstFocusable?.focus();
                        e.preventDefault();
                    }
                }
            }
            
            // Close menu on Escape
            if (e.key === 'Escape' && navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                menuToggle.classList.remove('active');
                menuToggle.focus();
            }
        });
    }

    // ===================================
    // Console Welcome Message
    // ===================================
    console.log('%c🚀 Tech Innovators Website', 'font-size: 20px; font-weight: bold; color: #64FFDA;');
    console.log('%cBuilt with HTML, CSS, and JavaScript', 'font-size: 14px; color: #64748B;');
    console.log('%cNo frameworks - Pure vanilla code!', 'font-size: 14px; color: #0A192F;');

    // ===================================
    // Initialize Page
    // ===================================
    console.log('✅ Website initialized successfully!');
    
    // Add subtle entrance animation to main content
    const mainContent = document.querySelector('main');
    if (mainContent) {
        mainContent.style.opacity = '0';
        setTimeout(() => {
            mainContent.style.transition = 'opacity 0.5s ease-in';
            mainContent.style.opacity = '1';
        }, 100);
    }
});

// ===================================
// Service Worker Registration (Optional - for PWA)
// ===================================
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // Uncomment to enable service worker
        // navigator.serviceWorker.register('/sw.js')
        //     .then(reg => console.log('Service Worker registered'))
        //     .catch(err => console.log('Service Worker registration failed'));
    });
}

// ===================================
// Add custom animations to CSS dynamically
// ===================================
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);
