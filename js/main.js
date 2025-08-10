document.addEventListener('DOMContentLoaded', function() {

    // --- CV DOWNLOAD DROPDOWN ---
    const cvButton = document.getElementById('cv-button');
    const cvDropdown = document.getElementById('cv-dropdown');

    if (cvButton && cvDropdown) {
        cvButton.addEventListener('click', function(event) {
            event.stopPropagation(); // Prevents the window click listener from firing immediately
            cvDropdown.classList.toggle('show');
        });

        // Close the dropdown if the user clicks outside of it
        window.addEventListener('click', function(event) {
            if (!cvButton.contains(event.target)) {
                if (cvDropdown.classList.contains('show')) {
                    cvDropdown.classList.remove('show');
                }
            }
        });
    }

    // --- SCROLL ANIMATIONS ---
    const sections = document.querySelectorAll('.content-section, .hero-section');

    const observerOptions = {
        root: null, // relative to the viewport
        rootMargin: '0px',
        threshold: 0.1 // 10% of the item must be visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Optional: stop observing after it's visible
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        observer.observe(section);
    });

    // --- SMOOTH SCROLL FOR NAV LINKS ---
    // Note: `scroll-behavior: smooth;` in CSS handles this for modern browsers.
    // This JS is for wider compatibility or more complex scenarios.
    const navLinks = document.querySelectorAll('.main-nav a');

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            // Check if it's an internal link
            if (targetId.startsWith('#')) {
                e.preventDefault();
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

});
