document.addEventListener('DOMContentLoaded', () => {

    const loader = document.getElementById('loader');
    window.addEventListener('load', () => {
        setTimeout(() => {
            if (loader) loader.classList.add('hidden');
        }, 400);
    });
/
    const themeToggleBtn = document.getElementById('theme-toggle');
    const htmlElement = document.documentElement;

    const savedTheme = localStorage.getItem('theme');
    const systemPrefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;

    if (savedTheme) {
        htmlElement.setAttribute('data-theme', savedTheme);
    } else if (systemPrefersLight) {
        htmlElement.setAttribute('data-theme', 'light');
    }

    themeToggleBtn.addEventListener('click', () => {
        const currentTheme = htmlElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        htmlElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    });

    const navbar = document.getElementById('navbar');
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
       
        if (window.scrollY > 40) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        let currentSectionId = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                currentSectionId = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('active');
            }
        });
    });

    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');

    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('open');
        hamburger.classList.toggle('active');
    });

   
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('open');
            hamburger.classList.remove('active');
        });
    });

  
    const cursorGlow = document.getElementById('cursor-glow');
    if (cursorGlow && window.innerWidth > 768) {
        window.addEventListener('mousemove', (e) => {
            cursorGlow.style.left = `${e.clientX}px`;
            cursorGlow.style.top = `${e.clientY}px`;
        });
    }


    const typingTextElement = document.getElementById('typing-text');
    const words = ['Web Developer', 'Frontend Specialist', 'Full Stack Builder', 'Problem Solver'];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function typeEffect() {
        const currentWord = words[wordIndex];
        
        if (isDeleting) {
            typingTextElement.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typingTextElement.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
        }

        let typeSpeed = isDeleting ? 60 : 120;

        if (!isDeleting && charIndex === currentWord.length) {
            typeSpeed = 2000; // Pause at end
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            typeSpeed = 500;
        }

        setTimeout(typeEffect, typeSpeed);
    }
    
    if (typingTextElement) typeEffect();

    const revealElements = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target); // Reveal once
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    });

    revealElements.forEach(el => revealObserver.observe(el));

   
    const statNumbers = document.querySelectorAll('.stat-number');
    let counted = false;

    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !counted) {
                statNumbers.forEach(counter => {
                    const target = +counter.getAttribute('data-target');
                    const duration = 1500; // ms
                    const stepTime = 20;
                    const steps = duration / stepTime;
                    const increment = target / steps;
                    let current = 0;

                    const timer = setInterval(() => {
                        current += increment;
                        if (current >= target) {
                            counter.textContent = target + '+';
                            clearInterval(timer);
                        } else {
                            counter.textContent = Math.ceil(current);
                        }
                    }, stepTime);
                });
                counted = true;
            }
        });
    }, { threshold: 0.5 });

    const statsSection = document.querySelector('.about-stats');
    if (statsSection) statsObserver.observe(statsSection);

  
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            projectCards.forEach(card => {
                const category = card.getAttribute('data-category');
                if (filterValue === 'all' || filterValue === category) {
                    card.style.display = 'block';
                    setTimeout(() => { card.style.opacity = '1'; card.style.transform = 'scale(1)'; }, 50);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'scale(0.95)';
                    setTimeout(() => { card.style.display = 'none'; }, 300);
                }
            });
        });
    });

    
    const contactForm = document.getElementById('contact-form');
    const formAlert = document.getElementById('form-alert');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            let isValid = true;

            const name = document.getElementById('name');
            const email = document.getElementById('email');
            const subject = document.getElementById('subject');
            const message = document.getElementById('message');

            const inputs = [name, email, subject, message];

            inputs.forEach(input => {
                const group = input.parentElement;
                if (!input.value.trim()) {
                    group.classList.add('invalid');
                    isValid = false;
                } else {
                    group.classList.remove('invalid');
                }
            });

      
            if (email.value.trim() && !/\S+@\S+\.\S+/.test(email.value)) {
                email.parentElement.classList.add('invalid');
                isValid = false;
            }

            if (isValid) {
                formAlert.className = 'form-alert success';
                formAlert.textContent = 'Thank you! Your message has been validation-checked and is ready for backend routing.';
                contactForm.reset();
                setTimeout(() => {
                    formAlert.style.display = 'none';
                }, 5000);
            }
        });
    }

    const backToTopBtn = document.getElementById('back-to-top');
    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
});