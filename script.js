// ==========================================================================
// Alternative Hypothesis — Main JavaScript
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

    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });

    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenuBtn.classList.toggle('active');

            let mobileNav = document.querySelector('.mobile-nav');

            if (!mobileNav) {
                mobileNav = document.createElement('div');
                mobileNav.className = 'mobile-nav';
                mobileNav.innerHTML = `
                    <ul>
                        <li><a href="#the-shift">The Shift</a></li>
                        <li><a href="#services">Services</a></li>
                        <li><a href="#process">Process</a></li>
                        <li><a href="#about">About</a></li>
                        <li><a href="#contact" class="mobile-cta">Book a Call</a></li>
                    </ul>
                `;
                document.body.appendChild(mobileNav);

                const style = document.createElement('style');
                style.textContent = `
                    .mobile-nav {
                        position: fixed;
                        top: 72px;
                        left: 0;
                        right: 0;
                        bottom: 0;
                        background: rgba(9, 9, 11, 0.98);
                        backdrop-filter: blur(16px);
                        -webkit-backdrop-filter: blur(16px);
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
                        font-family: 'Inter', sans-serif;
                        font-size: 1.25rem;
                        font-weight: 500;
                        color: #a1a1aa;
                        transition: color 0.2s;
                    }
                    .mobile-nav a:hover {
                        color: #fafafa;
                    }
                    .mobile-nav .mobile-cta {
                        display: inline-block;
                        margin-top: 1rem;
                        padding: 0.75rem 1.5rem;
                        background: #ffffff;
                        color: #09090b !important;
                        border-radius: 8px;
                        font-weight: 600;
                    }
                    .mobile-menu-btn.active span:first-child {
                        transform: rotate(45deg) translate(5px, 5px);
                    }
                    .mobile-menu-btn.active span:last-child {
                        transform: rotate(-45deg) translate(5px, -5px);
                    }
                `;
                document.head.appendChild(style);

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

            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;

            try {
                const formData = new FormData(form);
                const response = await fetch(form.action, {
                    method: 'POST',
                    body: formData,
                    headers: { 'Accept': 'application/json' }
                });

                if (response.ok) {
                    // Google Ads conversion tracking
                    gtag('event', 'conversion', {'send_to': 'AW-676753769/c7YdCOO9ndoBEOni2cIC'});

                    submitBtn.textContent = 'Message Sent!';
                    submitBtn.style.background = '#22c55e';
                    submitBtn.style.color = '#ffffff';

                    form.reset();

                    setTimeout(() => {
                        submitBtn.textContent = originalText;
                        submitBtn.style.background = '';
                        submitBtn.style.color = '';
                        submitBtn.disabled = false;
                    }, 3000);
                } else {
                    throw new Error('Form submission failed');
                }
            } catch (error) {
                submitBtn.textContent = 'Error — Try Again';
                submitBtn.style.background = '#ef4444';
                submitBtn.style.color = '#ffffff';
                submitBtn.disabled = false;

                setTimeout(() => {
                    submitBtn.textContent = originalText;
                    submitBtn.style.background = '';
                    submitBtn.style.color = '';
                }, 3000);
            }
        });

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
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -40px 0px'
    });

    const selectors = [
        '.manifesto-content',
        '.problem-card',
        '.problem-statement',
        '.transform-row',
        '.service-card',
        '.process-step',
        '.outcome-item',
        '.different-card',
        '.cta-content'
    ];

    document.querySelectorAll(selectors.join(', ')).forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = `opacity 0.5s ease ${(index % 4) * 0.08}s, transform 0.5s ease ${(index % 4) * 0.08}s`;
        observer.observe(el);
    });

    const style = document.createElement('style');
    style.textContent = selectors.map(s => `${s}.visible`).join(',\n') + ` {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }`;
    document.head.appendChild(style);
}
