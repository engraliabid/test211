document.addEventListener('DOMContentLoaded', () => {
    // --- Mobile Navigation Toggle ---
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mainNav = document.getElementById('main-nav');
    const header = document.getElementById('main-header');

    mobileMenuBtn.addEventListener('click', () => {
        mainNav.classList.toggle('active');
        const icon = mobileMenuBtn.querySelector('i');
        if (mainNav.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-xmark');
        } else {
            icon.classList.remove('fa-xmark');
            icon.classList.add('fa-bars');
        }
    });

    // Close mobile menu when clicking a link
    const navLinks = document.querySelectorAll('.nav-link, .nav-btn');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 768) {
                mainNav.classList.remove('active');
                const icon = mobileMenuBtn.querySelector('i');
                icon.classList.remove('fa-xmark');
                icon.classList.add('fa-bars');
            }
        });
    });

    // --- Header Scroll Effect ---
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.boxShadow = '0 5px 20px rgba(0,0,0,0.1)';
            header.style.backgroundColor = 'rgba(255, 255, 255, 0.98)';
        } else {
            header.style.boxShadow = '0 2px 15px rgba(0, 0, 0, 0.05)';
            header.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
        }

        // Active Link Update on Scroll
        let current = '';
        const sections = document.querySelectorAll('section, footer');
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= (sectionTop - 150)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    });

    // --- Stats Counter Animation ---
    const counters = document.querySelectorAll('.counter');
    let hasAnimated = false;

    const runCounterAnimation = () => {
        counters.forEach(counter => {
            counter.innerText = '0';
            const updateCounter = () => {
                const target = +counter.getAttribute('data-target');
                const count = +counter.innerText;
                const increment = target / 50; // Controls speed

                if (count < target) {
                    counter.innerText = `${Math.ceil(count + increment)}`;
                    setTimeout(updateCounter, 40);
                } else {
                    counter.innerText = target + '+';
                    if (target === 15) {
                        counter.innerText = target;
                    }
                }
            };
            updateCounter();
        });
    };

    // Trigger counter animation on scroll
    const statsSection = document.getElementById('stats');
    if (statsSection) {
        window.addEventListener('scroll', () => {
            const sectionPos = statsSection.getBoundingClientRect().top;
            const screenPos = window.innerHeight;

            if (sectionPos < screenPos && !hasAnimated) {
                runCounterAnimation();
                hasAnimated = true;
            }
        });
    }
});
