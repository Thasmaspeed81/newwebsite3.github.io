now let me create the JavaScript file with all the interactive features and animations! 🎯
Action: file_editor create /app/frontend/public/portfolio/js/script.js --file-text "// ===================================
// DINOSAUR THEME PORTFOLIO - JAVASCRIPT
// Digital Paleontologist Interactions
// ===================================

// === INITIALIZATION ===
document.addEventListener('DOMContentLoaded', function() {
    initNavigation();
    initScrollAnimations();
    initFootprints();
    initLoadingScreen();
    initModal();
    initScrollEffects();
});

// === LOADING SCREEN ===
function initLoadingScreen() {
    const loadingScreen = document.getElementById('loadingScreen');
    setTimeout(() => {
        loadingScreen.style.display = 'none';
    }, 2500);
}

// === NAVIGATION ===
function initNavigation() {
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Toggle mobile menu
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        animateToggle(navToggle);
    });
    
    // Close mobile menu when clicking a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
        });
    });
    
    // Smooth scroll to sections
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const navbarHeight = navbar.offsetHeight;
                const targetPosition = targetSection.offsetTop - navbarHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                updateActiveLink(link);
            }
        });
    });
    
    // Navbar scroll effect
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        lastScroll = currentScroll;
        
        updateActiveLinkOnScroll();
    });
}

function animateToggle(toggle) {
    const spans = toggle.querySelectorAll('span');
    toggle.classList.toggle('active');
    
    if (toggle.classList.contains('active')) {
        spans[0].style.transform = 'rotate(45deg) translateY(10px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translateY(-10px)';
    } else {
        spans.forEach(span => {
            span.style.transform = '';
            span.style.opacity = '';
        });
    }
}

function updateActiveLink(activeLink) {
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => link.classList.remove('active'));
    activeLink.classList.add('active');
}

function updateActiveLinkOnScroll() {
    const sections = document.querySelectorAll('.section, .hero');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        const scrollPosition = window.pageYOffset + 150;
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
}

// === SCROLL ANIMATIONS ===
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    // Observe all animated elements
    const animatedElements = document.querySelectorAll(`
        .section-header,
        .about-content,
        .skill-category,
        .project-card,
        .timeline-item,
        .cert-card,
        .achievement-card,
        .hobby-card,
        .contact-card
    `);
    
    animatedElements.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
}

// === DINOSAUR FOOTPRINTS ===
function initFootprints() {
    const footprintsContainer = document.getElementById('footprintsContainer');
    let lastScrollY = window.pageYOffset;
    let footprintTimer = null;
    
    window.addEventListener('scroll', () => {
        const currentScrollY = window.pageYOffset;
        const scrollDelta = Math.abs(currentScrollY - lastScrollY);
        
        // Create footprint every 100px of scroll
        if (scrollDelta > 100) {
            createFootprint(footprintsContainer);
            lastScrollY = currentScrollY;
        }
        
        // Clear old footprints
        clearTimeout(footprintTimer);
        footprintTimer = setTimeout(() => {
            clearFootprints(footprintsContainer);
        }, 3000);
    });
}

function createFootprint(container) {
    const footprint = document.createElement('div');
    footprint.className = 'footprint';
    footprint.textContent = '🦶';
    
    // Random position
    const x = Math.random() * (window.innerWidth - 50);
    const y = window.pageYOffset + Math.random() * window.innerHeight;
    
    footprint.style.left = `${x}px`;
    footprint.style.top = `${y}px`;
    
    container.appendChild(footprint);
    
    // Remove after animation
    setTimeout(() => {
        if (footprint.parentNode === container) {
            container.removeChild(footprint);
        }
    }, 2000);
}

function clearFootprints(container) {
    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }
}

// === MODAL FUNCTIONALITY ===
function initModal() {
    const modal = document.getElementById('imageModal');
    const modalImage = document.getElementById('modalImage');
    const modalTitle = document.getElementById('modalTitle');
    
    // Close modal on backdrop click
    const backdrop = modal.querySelector('.modal-backdrop');
    if (backdrop) {
        backdrop.addEventListener('click', closeModal);
    }
    
    // Close modal on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });
}

function openModal(imageSrc, title) {
    const modal = document.getElementById('imageModal');
    const modalImage = document.getElementById('modalImage');
    const modalTitle = document.getElementById('modalTitle');
    
    modalImage.src = imageSrc;
    modalTitle.textContent = title;
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // Add animation
    setTimeout(() => {
        modal.style.display = 'block';
    }, 10);
}

function closeModal() {
    const modal = document.getElementById('imageModal');
    modal.classList.remove('active');
    document.body.style.overflow = '';
    
    setTimeout(() => {
        modal.style.display = 'none';
    }, 300);
}

// === SCROLL EFFECTS ===
function initScrollEffects() {
    // Parallax effect for hero section
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.dino-silhouette');
        
        parallaxElements.forEach((el, index) => {
            const speed = 0.5 + (index * 0.2);
            el.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });
    
    // Skill bar animation
    const skillBars = document.querySelectorAll('.skill-progress');
    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fillBar 1.5s ease-out forwards';
            }
        });
    }, { threshold: 0.5 });
    
    skillBars.forEach(bar => skillObserver.observe(bar));
}

// === UTILITY FUNCTIONS ===

// Smooth scroll to top
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Add \"Back to Top\" button
function addBackToTop() {
    const backToTopBtn = document.createElement('button');
    backToTopBtn.innerHTML = '🦕';
    backToTopBtn.className = 'back-to-top';
    backToTopBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 60px;
        height: 60px;
        background: linear-gradient(135deg, var(--fossil-brown), var(--clay-brown));
        color: white;
        border: none;
        border-radius: 50%;
        font-size: 2rem;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        box-shadow: 0 4px 8px rgba(0,0,0,0.2);
        z-index: 1000;
    `;
    
    document.body.appendChild(backToTopBtn);
    
    backToTopBtn.addEventListener('click', scrollToTop);
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 500) {
            backToTopBtn.style.opacity = '1';
            backToTopBtn.style.visibility = 'visible';
        } else {
            backToTopBtn.style.opacity = '0';
            backToTopBtn.style.visibility = 'hidden';
        }
    });
    
    backToTopBtn.addEventListener('mouseenter', () => {
        backToTopBtn.style.transform = 'scale(1.1) rotate(10deg)';
    });
    
    backToTopBtn.addEventListener('mouseleave', () => {
        backToTopBtn.style.transform = 'scale(1) rotate(0deg)';
    });
}

// Initialize back to top button
addBackToTop();

// === EASTER EGGS ===

// Dinosaur roar on logo click
const navLogo = document.querySelector('.nav-logo');
if (navLogo) {
    let clickCount = 0;
    navLogo.addEventListener('click', () => {
        clickCount++;
        if (clickCount === 3) {
            showDinoMessage();
            clickCount = 0;
        }
    });
}

function showDinoMessage() {
    const message = document.createElement('div');
    message.className = 'dino-message';
    message.innerHTML = '🦖 ROAAAAR! Thanks for exploring! 🦕';
    message.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%) scale(0);
        background: linear-gradient(135deg, #8B4513, #D2691E);
        color: white;
        padding: 2rem 3rem;
        border-radius: 20px;
        font-family: 'Cinzel', serif;
        font-size: 1.5rem;
        z-index: 10000;
        box-shadow: 0 10px 30px rgba(0,0,0,0.3);
        animation: dinoPopup 2s ease;
    `;
    
    document.body.appendChild(message);
    
    // Add animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes dinoPopup {
            0% { transform: translate(-50%, -50%) scale(0) rotate(0deg); }
            50% { transform: translate(-50%, -50%) scale(1.1) rotate(5deg); }
            70% { transform: translate(-50%, -50%) scale(0.9) rotate(-5deg); }
            100% { transform: translate(-50%, -50%) scale(0) rotate(0deg); }
        }
    `;
    document.head.appendChild(style);
    
    setTimeout(() => {
        document.body.removeChild(message);
        document.head.removeChild(style);
    }, 2000);
}

// Cursor trail effect (optional)
let cursorTrail = [];
document.addEventListener('mousemove', (e) => {
    if (Math.random() > 0.95) { // 5% chance
        createCursorTrail(e.clientX, e.clientY);
    }
});

function createCursorTrail(x, y) {
    const trail = document.createElement('div');
    trail.textContent = ['🦴', '🦕', '🦖'][Math.floor(Math.random() * 3)];
    trail.style.cssText = `
        position: fixed;
        left: ${x}px;
        top: ${y}px;
        font-size: 1rem;
        pointer-events: none;
        z-index: 9999;
        animation: cursorFade 1s ease-out forwards;
    `;
    
    document.body.appendChild(trail);
    
    setTimeout(() => {
        if (trail.parentNode) {
            document.body.removeChild(trail);
        }
    }, 1000);
}

// Add cursor fade animation
const cursorStyle = document.createElement('style');
cursorStyle.textContent = `
    @keyframes cursorFade {
        0% {
            opacity: 1;
            transform: scale(1) translateY(0);
        }
        100% {
            opacity: 0;
            transform: scale(0.5) translateY(-20px);
        }
    }
`;
document.head.appendChild(cursorStyle);

// === PERFORMANCE OPTIMIZATION ===

// Debounce function for scroll events
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

// Lazy load images
function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Initialize lazy loading
lazyLoadImages();

// === CONSOLE MESSAGE ===
console.log('%c🦖 Welcome to the Digital Fossil Record! 🦕', 'font-size: 20px; color: #8B4513; font-weight: bold;');
console.log('%cAdvait Racheti - The Digital Paleontologist', 'font-size: 14px; color: #D2691E;');
console.log('%cExcavating data, discovering patterns, unearthing insights!', 'font-size: 12px; color: #228B22;');
console.log('%c\nInterested in the code? Check out the GitHub repo!', 'font-size: 12px; color: #4A4A4A;');

// === ANALYTICS (Optional) ===
function trackEvent(category, action, label) {
    console.log(`Event: ${category} - ${action} - ${label}`);
    // Add your analytics code here (Google Analytics, etc.)
}

// Track section views
const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const sectionId = entry.target.getAttribute('id');
            trackEvent('Section View', 'Scroll', sectionId);
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.section').forEach(section => {
    sectionObserver.observe(section);
});

// === ACCESSIBILITY ENHANCEMENTS ===

// Focus management for modal
function trapFocus(element) {
    const focusableElements = element.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex=\"-1\"])'
    );
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];
    
    element.addEventListener('keydown', (e) => {
        if (e.key === 'Tab') {
            if (e.shiftKey && document.activeElement === firstElement) {
                e.preventDefault();
                lastElement.focus();
            } else if (!e.shiftKey && document.activeElement === lastElement) {
                e.preventDefault();
                firstElement.focus();
            }
        }
    });
}

// Add skip to content link
function addSkipLink() {
    const skipLink = document.createElement('a');
    skipLink.href = '#home';
    skipLink.textContent = 'Skip to content';
    skipLink.className = 'skip-link';
    skipLink.style.cssText = `
        position: absolute;
        top: -40px;
        left: 0;
        background: #8B4513;
        color: white;
        padding: 8px;
        text-decoration: none;
        z-index: 100;
    `;
    
    skipLink.addEventListener('focus', () => {
        skipLink.style.top = '0';
    });
    
    skipLink.addEventListener('blur', () => {
        skipLink.style.top = '-40px';
    });
    
    document.body.insertBefore(skipLink, document.body.firstChild);
}

addSkipLink();

// === PRINT STYLES ===
window.addEventListener('beforeprint', () => {
    // Expand all sections for printing
    console.log('Preparing for print...');
});

window.addEventListener('afterprint', () => {
    console.log('Print complete!');
});

// === END OF SCRIPT ===
console.log('%c✅ Portfolio loaded successfully!', 'color: #228B22; font-weight: bold;');
"
Observation: Create successful: /app/frontend/public/portfolio/js/script.js
