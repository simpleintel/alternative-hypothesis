// ==========================================================================
// Archway AI - Main JavaScript
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initSmoothScroll();
    initFormHandling();
    initScrollAnimations();
});

// ==========================================================================
// Navigation
// ==========================================================================

function initNavigation() {
    const nav = document.querySelector('.nav');
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    // Scroll behavior for nav background
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        // Add/remove scrolled class
        if (currentScroll > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
        
        lastScroll = currentScroll;
    });
    
    // Mobile menu toggle
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenuBtn.classList.toggle('active');
            
            // Create mobile nav if it doesn't exist
            let mobileNav = document.querySelector('.mobile-nav');
            
            if (!mobileNav) {
                mobileNav = document.createElement('div');
                mobileNav.className = 'mobile-nav';
                mobileNav.innerHTML = `
                    <ul>
                        <li><a href="#services">Services</a></li>
                        <li><a href="#process">Process</a></li>
                        <li><a href="#industries">Industries</a></li>
                        <li><a href="#why-us">Why Us</a></li>
                        <li><a href="#contact" class="mobile-cta">Start a Project</a></li>
                    </ul>
                `;
                document.body.appendChild(mobileNav);
                
                // Add styles dynamically
                const style = document.createElement('style');
                style.textContent = `
                    .mobile-nav {
                        position: fixed;
                        top: 72px;
                        left: 0;
                        right: 0;
                        bottom: 0;
                        background: rgba(255, 255, 255, 0.98);
                        backdrop-filter: blur(12px);
                        z-index: 999;
                        padding: 2rem;
                        transform: translateX(100%);
                        transition: transform 0.3s ease;
                    }
                    .mobile-nav.active {
                        transform: translateX(0);
                    }
                    .mobile-nav ul {
                        display: flex;
                        flex-direction: column;
                        gap: 1.5rem;
                    }
                    .mobile-nav a {
                        font-family: 'Courier Prime', monospace;
                        font-size: 1.25rem;
                        color: #4a4a4a;
                        transition: color 0.2s;
                    }
                    .mobile-nav a:hover {
                        color: #1a1a1a;
                    }
                    .mobile-nav .mobile-cta {
                        display: inline-block;
                        margin-top: 1rem;
                        padding: 0.75rem 1.5rem;
                        background: #1a1a1a;
                        color: #ffffff !important;
                        border-radius: 8px;
                        font-weight: 500;
                    }
                    .mobile-menu-btn.active span:first-child {
                        transform: rotate(45deg) translate(5px, 5px);
                    }
                    .mobile-menu-btn.active span:last-child {
                        transform: rotate(-45deg) translate(5px, -5px);
                    }
                `;
                document.head.appendChild(style);
                
                // Close menu when clicking links
                mobileNav.querySelectorAll('a').forEach(link => {
                    link.addEventListener('click', () => {
                        mobileNav.classList.remove('active');
                        mobileMenuBtn.classList.remove('active');
                    });
                });
            }
            
            mobileNav.classList.toggle('active');
        });
    }
}

// ==========================================================================
// Smooth Scrolling
// ==========================================================================

function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            
            if (targetId === '#') return;
            
            const target = document.querySelector(targetId);
            
            if (target) {
                const navHeight = document.querySelector('.nav').offsetHeight;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ==========================================================================
// Form Handling
// ==========================================================================

function initFormHandling() {
    const form = document.getElementById('contact-form');
    
    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const submitBtn = form.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            
            // Show loading state
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            
            // Submit to Formspree
            try {
                const formData = new FormData(form);
                const response = await fetch(form.action, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });
                
                if (response.ok) {
                    // Success state
                    submitBtn.textContent = 'Message Sent!';
                    submitBtn.style.background = '#22c55e';
                    
                    // Reset form
                    form.reset();
                    
                    // Reset button after delay
                    setTimeout(() => {
                        submitBtn.textContent = originalText;
                        submitBtn.style.background = '';
                        submitBtn.disabled = false;
                    }, 3000);
                } else {
                    throw new Error('Form submission failed');
                }
                
            } catch (error) {
                submitBtn.textContent = 'Error - Try Again';
                submitBtn.style.background = '#ef4444';
                submitBtn.disabled = false;
                
                setTimeout(() => {
                    submitBtn.textContent = originalText;
                    submitBtn.style.background = '';
                }, 3000);
            }
        });
        
        // Input animations
        form.querySelectorAll('input, textarea').forEach(input => {
            input.addEventListener('focus', () => {
                input.parentElement.classList.add('focused');
            });
            
            input.addEventListener('blur', () => {
                input.parentElement.classList.remove('focused');
            });
        });
    }
}

// ==========================================================================
// Scroll Animations
// ==========================================================================

function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Add animation classes and observe
    const animateElements = document.querySelectorAll(
        '.capability-card, .service-block, .process-step, .industry-card, .diff-card, .case-content'
    );
    
    animateElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = `opacity 0.5s ease ${index % 3 * 0.1}s, transform 0.5s ease ${index % 3 * 0.1}s`;
        observer.observe(el);
    });
    
    // Add visible styles
    const style = document.createElement('style');
    style.textContent = `
        .capability-card.visible,
        .service-block.visible,
        .process-step.visible,
        .industry-card.visible,
        .diff-card.visible,
        .case-content.visible {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);
}

// ==========================================================================
// Utility Functions
// ==========================================================================

// Debounce function for performance
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

// Throttle function for scroll events
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

