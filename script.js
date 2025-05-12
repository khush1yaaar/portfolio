document.addEventListener('DOMContentLoaded', function() {
    // Custom Cursor
    const cursor = document.querySelector('.cursor');
    
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.pageX + 'px';
        cursor.style.top = e.pageY + 'px';
    });
    
    document.addEventListener('mouseenter', () => {
        cursor.style.opacity = '1';
    });
    
    document.addEventListener('mouseleave', () => {
        cursor.style.opacity = '0';
    });
    
    // Links hover effect for cursor
    const hoverElements = document.querySelectorAll('a, button, .project-card, .detail-item, .skill-icon');
    
    hoverElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
            cursor.style.backgroundColor = 'var(--primary-color)';
        });
        
        el.addEventListener('mouseleave', () => {
            cursor.style.transform = 'translate(-50%, -50%) scale(1)';
            cursor.style.backgroundColor = 'var(--primary-color)';
        });
    });

    // Navbar scroll effect
    const nav = document.querySelector('nav');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });

    // Mobile menu toggle
    const burger = document.querySelector('.burger');
    const navLinks = document.querySelector('.nav-links');
    
    burger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        burger.classList.toggle('active');
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            if (this.getAttribute('href') === '#') return;
            
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    burger.classList.remove('active');
                }
            }
        });
    });

    // Animate hero shapes on scroll
    const heroShapes = document.querySelectorAll('.shape');
    
    window.addEventListener('scroll', () => {
        const scrollPosition = window.scrollY;
        
        heroShapes.forEach(shape => {
            const speed = parseFloat(shape.getAttribute('data-speed')) || 0.2;
            const direction = shape.classList.contains('reverse') ? -1 : 1;
            const translateY = scrollPosition * speed * direction;
            
            if (shape.classList.contains('circle')) {
                shape.style.transform = `translateY(${translateY}px) rotate(${scrollPosition * 0.2}deg)`;
            } else if (shape.classList.contains('triangle')) {
                shape.style.transform = `translateY(${translateY}px) rotate(${45 + scrollPosition * 0.1}deg)`;
            } else if (shape.classList.contains('square')) {
                shape.style.transform = `translateY(${translateY}px) rotate(${15 + scrollPosition * 0.15}deg)`;
            }
        });
    });

    // Intersection Observer for fade-in animations
    const fadeElements = document.querySelectorAll('.about-content, .projects-container, .skills-container, .contact-container');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });
    
    fadeElements.forEach(el => {
        observer.observe(el);
    });

    // Hero title animation
    const heroTitle = document.querySelector('.hero-title');
    
    if (heroTitle) {
        // Split the title into letters for animation
        const text = heroTitle.textContent;
        heroTitle.textContent = '';
        
        for (let i = 0; i < text.length; i++) {
            const span = document.createElement('span');
            span.textContent = text[i];
            span.style.display = 'inline-block';
            span.style.opacity = '0';
            span.style.transform = 'translateY(20px)';
            span.style.transition = `opacity 0.5s ${i * 0.05}s, transform 0.5s ${i * 0.05}s`;
            heroTitle.appendChild(span);
            
            // Animate each letter after a short delay
            setTimeout(() => {
                span.style.opacity = '1';
                span.style.transform = 'translateY(0)';
            }, 500 + i * 50);
        }
    }

    // Skill icons floating animation
    const skillIcons = document.querySelectorAll('.skill-icon');
    
    skillIcons.forEach((icon, index) => {
        // Random initial position for more organic movement
        const randomX = (Math.random() - 0.5) * 20;
        const randomY = (Math.random() - 0.5) * 20;
        icon.style.transform = `translate(${randomX}px, ${randomY}px)`;
        
        // Add mouse move parallax effect
        icon.addEventListener('mousemove', (e) => {
            const xAxis = (window.innerWidth / 2 - e.pageX) / 25;
            const yAxis = (window.innerHeight / 2 - e.pageY) / 25;
            icon.style.transform = `translate(${xAxis}px, ${yAxis}px) rotate(${xAxis}deg)`;
        });
        
        icon.addEventListener('mouseleave', () => {
            icon.style.transform = `translate(${randomX}px, ${randomY}px)`;
        });
    });
});