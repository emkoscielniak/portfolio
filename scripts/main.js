// Mobile Navigation Toggle

const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

// Toggle mobile menu
hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    
    // Animate hamburger to X
    hamburger.classList.toggle('active');
});

// Close menu when clicking on a nav link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Project Filter Functionality
const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');
let activeFilters = new Set(['all']);

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        const filterValue = button.getAttribute('data-filter');
        
        // Handle "All" button click
        if (filterValue === 'all') {
            activeFilters.clear();
            activeFilters.add('all');
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
        } else {
            // Remove "All" if it's active
            if (activeFilters.has('all')) {
                activeFilters.delete('all');
                document.querySelector('[data-filter="all"]').classList.remove('active');
            }
            
            // Toggle the clicked filter
            if (activeFilters.has(filterValue)) {
                activeFilters.delete(filterValue);
                button.classList.remove('active');
            } else {
                activeFilters.add(filterValue);
                button.classList.add('active');
            }
            
            // If no filters are selected, activate "All"
            if (activeFilters.size === 0) {
                activeFilters.add('all');
                document.querySelector('[data-filter="all"]').classList.add('active');
            }
            
            // Get all available filter values (excluding "all")
            const allFilterValues = Array.from(filterButtons)
                .map(btn => btn.getAttribute('data-filter'))
                .filter(val => val !== 'all');
            
            // If all filters are selected, switch to "All"
            if (activeFilters.size === allFilterValues.length) {
                activeFilters.clear();
                activeFilters.add('all');
                filterButtons.forEach(btn => btn.classList.remove('active'));
                document.querySelector('[data-filter="all"]').classList.add('active');
            }
        }
        
        // Filter projects
        filterProjects();
    });
});

function filterProjects() {
    projectCards.forEach(card => {
        const cardTags = card.getAttribute('data-tags').split(',');
        
        // Show all if "all" is active
        if (activeFilters.has('all')) {
            card.classList.remove('hidden');
        } else {
            // Check if card has ANY of the active filters
            const hasActiveTag = cardTags.some(tag => activeFilters.has(tag));
            
            if (hasActiveTag) {
                card.classList.remove('hidden');
            } else {
                card.classList.add('hidden');
            }
        }
    });
}

// Add active class to navigation links on scroll
// Navbar Background on Scroll

const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    // Add shadow to navbar when scrolling
    if (currentScroll > 50) {
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.boxShadow = 'none';
    }
    
    lastScroll = currentScroll;
});

// Intersection Observer for Scroll Animations

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all project cards for animation
projectCards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    observer.observe(card);
});

// Dynamic Year in Footer

const currentYear = new Date().getFullYear();
const footerText = document.querySelector('.footer p');
if (footerText) {
    footerText.innerHTML = footerText.innerHTML.replace('2025', currentYear);
}

// Project Card Hover Effects

const projectImages = document.querySelectorAll('.project-image');

projectImages.forEach(image => {
    image.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.02)';
        this.style.transition = 'transform 0.3s ease';
    });
    
    image.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
    });
});

// Active Navigation Link Based on Scroll Position

const sections = document.querySelectorAll('section[id]');

function highlightNavigation() {
    const scrollPosition = window.pageYOffset;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', highlightNavigation);

// Preload Images for Better Performance

function preloadImages() {
    const images = document.querySelectorAll('img[data-src]');
    
    images.forEach(img => {
        img.src = img.dataset.src;
        img.removeAttribute('data-src');
    });
}

// Run preload when page loads
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', preloadImages);
} else {
    preloadImages();
}

// Form Validation (if you add a contact form)

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Accessibility Improvements

// Add keyboard navigation for project cards
projectCards.forEach(card => {
    const link = card.querySelector('.project-link');
    
    card.setAttribute('tabindex', '0');
    
    card.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && link) {
            link.click();
        }
    });
});

// Skip to main content functionality
const skipLink = document.createElement('a');
skipLink.href = '#work';
skipLink.textContent = 'Skip to main content';
skipLink.className = 'skip-link';
skipLink.style.cssText = `
    position: absolute;
    top: -40px;
    left: 0;
    background: var(--primary-color);
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
