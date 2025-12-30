/* =========================================
   ZALLA SOFTWARE - MAIN SCRIPT
   ========================================= */

document.addEventListener('DOMContentLoaded', () => {
    // === DOM Elements ===
    const navbar = document.querySelector('.navbar');
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const themeToggle = document.getElementById('theme-toggle');
    const signupBtn = document.getElementById('signup-btn');
    const modalOverlay = document.querySelector('.modal-overlay');
    const closeModal = document.querySelector('.close-modal');
    const signupForm = document.querySelector('.signup-form'); // Use a class for the form if not present by ID selector logic
    const body = document.body;

    // === Mobile Menu Toggle ===
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        // Animate hamburger bars
        const bars = hamburger.querySelectorAll('.bar');
        if (navLinks.classList.contains('active')) {
            bars[0].style.transform = 'rotate(-45deg) translate(-5px, 6px)';
            bars[1].style.opacity = '0';
            bars[2].style.transform = 'rotate(45deg) translate(-5px, -6px)';
        } else {
            bars.forEach(bar => bar.style.transform = 'none');
            bars[1].style.opacity = '1';
        }
    });

    // Close menu when clicking a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            hamburger.querySelectorAll('.bar').forEach(bar => {
                bar.style.transform = 'none';
                bar.style.opacity = '1';
            });
        });
    });

    // === Sticky Navbar Effect ===
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
            navbar.style.background = 'var(--glass-bg)';
            // Possibly adjust opacity or padding here if desired
        } else {
            navbar.style.boxShadow = 'none';
        }
    });

    // === Dark Mode Toggle ===
    // Check local storage for preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        body.setAttribute('data-theme', 'dark');
        updateThemeIcon(true);
    }

    themeToggle.addEventListener('click', () => {
        const isDark = body.getAttribute('data-theme') === 'dark';
        if (isDark) {
            body.setAttribute('data-theme', 'light');
            localStorage.setItem('theme', 'light');
            updateThemeIcon(false);
        } else {
            body.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
            updateThemeIcon(true);
        }
    });

    function updateThemeIcon(isDark) {
        const icon = themeToggle.querySelector('i');
        if (isDark) {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
        } else {
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
        }
    }

    // === Sign Up Modal ===
    if (signupBtn) {
        signupBtn.addEventListener('click', (e) => {
            e.preventDefault();
            modalOverlay.classList.add('active');
        });
    }

    if (closeModal) {
        closeModal.addEventListener('click', () => {
            modalOverlay.classList.remove('active');
        });
    }

    // Close modal on outside click
    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) {
            modalOverlay.classList.remove('active');
        }
    });

    // === Smooth Scrolling for Anchor Links ===
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId && targetId !== '#') {
                document.querySelector(targetId).scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
});
