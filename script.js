document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. Theme Switcher Logic ---
    const themeToggleBtn = document.getElementById('theme-toggle');
    const themeIcon = themeToggleBtn.querySelector('i');
    
    // Check current theme applied by the inline script in HTML head
    let currentTheme = document.documentElement.getAttribute('data-theme');
    updateIcon(currentTheme);

    themeToggleBtn.addEventListener('click', () => {
        currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateIcon(newTheme);
    });

    function updateIcon(theme) {
        if (theme === 'dark') {
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
        } else {
            themeIcon.classList.remove('fa-sun');
            themeIcon.classList.add('fa-moon');
        }
    }

    // --- 2. Mobile Menu Toggle ---
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    mobileBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        const icon = mobileBtn.querySelector('i');
        if (navLinks.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-xmark');
        } else {
            icon.classList.remove('fa-xmark');
            icon.classList.add('fa-bars');
        }
    });

    // Close mobile menu when a link is clicked
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            const icon = mobileBtn.querySelector('i');
            icon.classList.remove('fa-xmark');
            icon.classList.add('fa-bars');
        });
    });

    // --- 3. Dynamic Footer Year ---
    document.getElementById('current-year').textContent = new Date().getFullYear();

    // --- 4. Contact Form Handling (Client-side prevent default) ---
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault(); // Prevent page reload
            
            // Because there is no backend provided, we simulate success
            const btn = contactForm.querySelector('button[type="submit"]');
            const originalText = btn.textContent;
            
            btn.textContent = 'Message Ready!';
            btn.style.backgroundColor = '#10B981'; // Success Green
            btn.style.color = '#FFF';
            
            // You can integrate Formspree or an email client link here later
            
            setTimeout(() => {
                btn.textContent = originalText;
                btn.style.backgroundColor = ''; // Revert to CSS variable
                contactForm.reset();
            }, 3000);
        });
    }
});