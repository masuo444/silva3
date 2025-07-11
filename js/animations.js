/*
===========================================
SILVA - Advanced Animations & Effects
Version: 7.0 (Ultimate Edition)
Author: KUKU DAO
===========================================
*/

// Advanced Animation System
class SilvaAnimations {
    constructor() {
        this.observers = [];
        this.animations = new Map();
        this.isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        
        this.init();
    }

    init() {
        this.setupIntersectionObserver();
        this.setupMouseEffects();
        this.setupParallaxEffects();
        this.setupGlowEffects();
        this.setupTextAnimations();
        this.setupCardAnimations();
    }

    // Intersection Observer for scroll animations
    setupIntersectionObserver() {
        if (this.isReducedMotion) return;

        const observerOptions = {
            threshold: 0.1,
            rootMargin: '-50px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateElement(entry.target);
                }
            });
        }, observerOptions);

        // Observe elements with animation attributes
        const animatedElements = document.querySelectorAll('[data-aos]');
        animatedElements.forEach(el => {
            observer.observe(el);
        });

        this.observers.push(observer);
    }

    // Animate elements based on data attributes
    animateElement(element) {
        const animationType = element.dataset.aos;
        const delay = element.dataset.aosDelay || 0;
        const duration = element.dataset.aosDuration || 600;

        setTimeout(() => {
            element.classList.add('aos-animate');
            this.applyAnimation(element, animationType, duration);
        }, delay);
    }

    // Apply specific animation
    applyAnimation(element, type, duration) {
        const animations = {
            'fade-up': () => this.fadeUp(element, duration),
            'fade-down': () => this.fadeDown(element, duration),
            'fade-left': () => this.fadeLeft(element, duration),
            'fade-right': () => this.fadeRight(element, duration),
            'zoom-in': () => this.zoomIn(element, duration),
            'zoom-out': () => this.zoomOut(element, duration),
            'flip-left': () => this.flipLeft(element, duration),
            'flip-right': () => this.flipRight(element, duration),
            'slide-up': () => this.slideUp(element, duration),
            'bounce-in': () => this.bounceIn(element, duration)
        };

        if (animations[type]) {
            animations[type]();
        }
    }

    // Animation Methods
    fadeUp(element, duration) {
        element.style.animation = `fadeInUp ${duration}ms ease-out forwards`;
    }

    fadeDown(element, duration) {
        element.style.animation = `fadeInDown ${duration}ms ease-out forwards`;
    }

    fadeLeft(element, duration) {
        element.style.animation = `fadeInLeft ${duration}ms ease-out forwards`;
    }

    fadeRight(element, duration) {
        element.style.animation = `fadeInRight ${duration}ms ease-out forwards`;
    }

    zoomIn(element, duration) {
        element.style.animation = `zoomIn ${duration}ms ease-out forwards`;
    }

    zoomOut(element, duration) {
        element.style.animation = `zoomOut ${duration}ms ease-out forwards`;
    }

    flipLeft(element, duration) {
        element.style.animation = `flipInY ${duration}ms ease-out forwards`;
    }

    flipRight(element, duration) {
        element.style.animation = `flipInX ${duration}ms ease-out forwards`;
    }

    slideUp(element, duration) {
        element.style.animation = `slideInUp ${duration}ms ease-out forwards`;
    }

    bounceIn(element, duration) {
        element.style.animation = `bounceIn ${duration}ms ease-out forwards`;
    }

    // Mouse Effects
    setupMouseEffects() {
        this.setupMagneticEffect();
        this.setupCursorEffects();
        this.setupHoverDistortion();
    }

    // Magnetic Effect for buttons and cards
    setupMagneticEffect() {
        const magneticElements = document.querySelectorAll('.btn, .game-card, .community-link');
        
        magneticElements.forEach(element => {
            element.addEventListener('mousemove', (e) => {
                const rect = element.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                
                const strength = 0.1;
                const moveX = x * strength;
                const moveY = y * strength;
                
                element.style.transform = `translate(${moveX}px, ${moveY}px)`;
            });

            element.addEventListener('mouseleave', () => {
                element.style.transform = 'translate(0px, 0px)';
            });
        });
    }

    // Custom Cursor Effects
    setupCursorEffects() {
        const cursor = document.createElement('div');
        cursor.className = 'custom-cursor';
        cursor.innerHTML = `
            <div class="cursor-dot"></div>
            <div class="cursor-outline"></div>
        `;
        document.body.appendChild(cursor);

        let mouseX = 0, mouseY = 0;
        let cursorX = 0, cursorY = 0;

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });

        const animateCursor = () => {
            cursorX += (mouseX - cursorX) * 0.1;
            cursorY += (mouseY - cursorY) * 0.1;
            
            cursor.style.left = cursorX + 'px';
            cursor.style.top = cursorY + 'px';
            
            requestAnimationFrame(animateCursor);
        };
        animateCursor();

        // Hover effects
        const hoverElements = document.querySelectorAll('a, button, .game-card');
        hoverElements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                cursor.classList.add('cursor-hover');
            });
            element.addEventListener('mouseleave', () => {
                cursor.classList.remove('cursor-hover');
            });
        });
    }

    // Hover Distortion Effect
    setupHoverDistortion() {
        const cards = document.querySelectorAll('.game-card');
        
        cards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const rotateX = (y - centerY) / 20;
                const rotateY = (centerX - x) / 20;
                
                card.style.transform = `
                    perspective(1000px) 
                    rotateX(${rotateX}deg) 
                    rotateY(${rotateY}deg) 
                    scale3d(1.05, 1.05, 1.05)
                `;
            });

            card.addEventListener('mouseleave', () => {
                card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
            });
        });
    }

    // Parallax Effects
    setupParallaxEffects() {
        const parallaxElements = document.querySelectorAll('[data-parallax]');
        
        window.addEventListener('scroll', () => {
            const scrollTop = window.pageYOffset;
            
            parallaxElements.forEach(element => {
                const speed = element.dataset.parallax || 0.5;
                const yPos = -(scrollTop * speed);
                element.style.transform = `translateY(${yPos}px)`;
            });
        });
    }

    // Glow Effects
    setupGlowEffects() {
        const glowElements = document.querySelectorAll('.btn-glow, .card-featured');
        
        glowElements.forEach(element => {
            element.addEventListener('mousemove', (e) => {
                const rect = element.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                element.style.setProperty('--mouse-x', x + 'px');
                element.style.setProperty('--mouse-y', y + 'px');
            });
        });
    }

    // Text Animations
    setupTextAnimations() {
        this.setupTypewriterEffect();
        this.setupTextReveal();
        this.setupCountingAnimation();
    }

    // Typewriter Effect
    setupTypewriterEffect() {
        const typewriterElements = document.querySelectorAll('[data-typewriter]');
        
        typewriterElements.forEach(element => {
            const text = element.textContent;
            const speed = element.dataset.typewriterSpeed || 100;
            
            element.textContent = '';
            
            let i = 0;
            const timer = setInterval(() => {
                if (i < text.length) {
                    element.textContent += text.charAt(i);
                    i++;
                } else {
                    clearInterval(timer);
                }
            }, speed);
        });
    }

    // Text Reveal Animation
    setupTextReveal() {
        const textElements = document.querySelectorAll('.hero-title, .section-title');
        
        textElements.forEach(element => {
            const text = element.textContent;
            element.innerHTML = text.split('').map(char => 
                `<span class="char" style="animation-delay: ${Math.random() * 0.5}s">${char}</span>`
            ).join('');
        });
    }

    // Counting Animation
    setupCountingAnimation() {
        const countElements = document.querySelectorAll('[data-count]');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                    entry.target.classList.add('counted');
                    this.animateCount(entry.target);
                }
            });
        });

        countElements.forEach(element => {
            observer.observe(element);
        });
    }

    animateCount(element) {
        const target = parseInt(element.dataset.count);
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;
        
        const updateCount = () => {
            current += increment;
            if (current < target) {
                element.textContent = Math.floor(current);
                requestAnimationFrame(updateCount);
            } else {
                element.textContent = target;
            }
        };
        
        updateCount();
    }

    // Card Animations
    setupCardAnimations() {
        this.setupCardFlip();
        this.setupCardStack();
        this.setupCardFloat();
    }

    // Card Flip Animation
    setupCardFlip() {
        const flipCards = document.querySelectorAll('[data-flip]');
        
        flipCards.forEach(card => {
            card.addEventListener('click', () => {
                card.classList.toggle('flipped');
            });
        });
    }

    // Card Stack Animation
    setupCardStack() {
        const stackElements = document.querySelectorAll('.card-showcase');
        
        stackElements.forEach(stack => {
            const cards = stack.querySelectorAll('.showcase-card');
            
            cards.forEach((card, index) => {
                card.style.zIndex = cards.length - index;
                card.style.transform = `translateY(${index * 10}px) rotate(${index * 5}deg)`;
            });
        });
    }

    // Card Float Animation
    setupCardFloat() {
        const floatingCards = document.querySelectorAll('.floating-card');
        
        floatingCards.forEach((card, index) => {
            const delay = index * 0.5;
            const duration = 3 + Math.random() * 2;
            
            card.style.animation = `cardFloat ${duration}s ease-in-out ${delay}s infinite`;
        });
    }

    // Cleanup method
    destroy() {
        this.observers.forEach(observer => observer.disconnect());
        this.animations.clear();
    }
}

// Particle System
class ParticleSystem {
    constructor(container, options = {}) {
        this.container = container;
        this.particles = [];
        this.options = {
            count: options.count || 50,
            color: options.color || '#00d4ff',
            size: options.size || 2,
            speed: options.speed || 1,
            opacity: options.opacity || 0.6,
            ...options
        };
        
        this.init();
    }

    init() {
        this.createParticles();
        this.animate();
    }

    createParticles() {
        for (let i = 0; i < this.options.count; i++) {
            const particle = {
                x: Math.random() * this.container.offsetWidth,
                y: Math.random() * this.container.offsetHeight,
                vx: (Math.random() - 0.5) * this.options.speed,
                vy: (Math.random() - 0.5) * this.options.speed,
                size: Math.random() * this.options.size + 1,
                opacity: Math.random() * this.options.opacity + 0.1,
                element: this.createParticleElement()
            };
            
            this.particles.push(particle);
            this.container.appendChild(particle.element);
        }
    }

    createParticleElement() {
        const element = document.createElement('div');
        element.className = 'particle';
        element.style.cssText = `
            position: absolute;
            background: ${this.options.color};
            border-radius: 50%;
            pointer-events: none;
        `;
        return element;
    }

    animate() {
        this.particles.forEach(particle => {
            particle.x += particle.vx;
            particle.y += particle.vy;
            
            // Wrap around edges
            if (particle.x < 0) particle.x = this.container.offsetWidth;
            if (particle.x > this.container.offsetWidth) particle.x = 0;
            if (particle.y < 0) particle.y = this.container.offsetHeight;
            if (particle.y > this.container.offsetHeight) particle.y = 0;
            
            // Update element
            particle.element.style.left = particle.x + 'px';
            particle.element.style.top = particle.y + 'px';
            particle.element.style.width = particle.size + 'px';
            particle.element.style.height = particle.size + 'px';
            particle.element.style.opacity = particle.opacity;
        });
        
        requestAnimationFrame(() => this.animate());
    }
}

// Initialize animations when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize main animation system
    const silvaAnimations = new SilvaAnimations();
    
    // Initialize particle systems
    const heroParticles = document.getElementById('heroParticles');
    if (heroParticles) {
        new ParticleSystem(heroParticles, {
            count: 30,
            color: '#00d4ff',
            size: 3,
            speed: 0.5,
            opacity: 0.4
        });
    }
    
    // Add custom styles for animations
    const animationStyles = document.createElement('style');
    animationStyles.textContent = `
        /* Custom Cursor */
        .custom-cursor {
            position: fixed;
            pointer-events: none;
            z-index: 9999;
            mix-blend-mode: difference;
        }
        
        .cursor-dot {
            width: 6px;
            height: 6px;
            background: #00d4ff;
            border-radius: 50%;
            position: absolute;
            transform: translate(-50%, -50%);
        }
        
        .cursor-outline {
            width: 30px;
            height: 30px;
            border: 2px solid rgba(0, 212, 255, 0.3);
            border-radius: 50%;
            position: absolute;
            transform: translate(-50%, -50%);
            transition: all 0.1s ease;
        }
        
        .cursor-hover .cursor-outline {
            width: 50px;
            height: 50px;
            border-color: #00d4ff;
        }
        
        /* Animation Keyframes */
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        @keyframes fadeInDown {
            from {
                opacity: 0;
                transform: translateY(-30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        @keyframes fadeInLeft {
            from {
                opacity: 0;
                transform: translateX(-30px);
            }
            to {
                opacity: 1;
                transform: translateX(0);
            }
        }
        
        @keyframes fadeInRight {
            from {
                opacity: 0;
                transform: translateX(30px);
            }
            to {
                opacity: 1;
                transform: translateX(0);
            }
        }
        
        @keyframes zoomIn {
            from {
                opacity: 0;
                transform: scale(0.8);
            }
            to {
                opacity: 1;
                transform: scale(1);
            }
        }
        
        @keyframes zoomOut {
            from {
                opacity: 0;
                transform: scale(1.2);
            }
            to {
                opacity: 1;
                transform: scale(1);
            }
        }
        
        @keyframes flipInY {
            from {
                opacity: 0;
                transform: rotateY(-90deg);
            }
            to {
                opacity: 1;
                transform: rotateY(0deg);
            }
        }
        
        @keyframes flipInX {
            from {
                opacity: 0;
                transform: rotateX(-90deg);
            }
            to {
                opacity: 1;
                transform: rotateX(0deg);
            }
        }
        
        @keyframes slideInUp {
            from {
                opacity: 0;
                transform: translateY(100%);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        @keyframes bounceIn {
            0% {
                opacity: 0;
                transform: scale(0.3) translateY(50px);
            }
            50% {
                opacity: 1;
                transform: scale(1.05) translateY(-20px);
            }
            70% {
                transform: scale(0.9) translateY(10px);
            }
            100% {
                opacity: 1;
                transform: scale(1) translateY(0);
            }
        }
        
        @keyframes cardFloat {
            0%, 100% {
                transform: translateY(0px) rotate(0deg);
            }
            50% {
                transform: translateY(-20px) rotate(5deg);
            }
        }
        
        /* Text Animation */
        .char {
            display: inline-block;
            opacity: 0;
            animation: charReveal 0.6s ease forwards;
        }
        
        @keyframes charReveal {
            from {
                opacity: 0;
                transform: translateY(20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        /* Card Flip */
        .game-card.flipped {
            transform: rotateY(180deg);
        }
        
        /* Initial states for AOS */
        [data-aos] {
            opacity: 0;
            transition-property: transform, opacity;
        }
        
        [data-aos].aos-animate {
            opacity: 1;
        }
        
        /* Glow Effects */
        .btn-glow {
            position: relative;
            overflow: hidden;
        }
        
        .btn-glow::before {
            content: '';
            position: absolute;
            top: var(--mouse-y, 50%);
            left: var(--mouse-x, 50%);
            width: 100px;
            height: 100px;
            background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%);
            transform: translate(-50%, -50%);
            opacity: 0;
            transition: opacity 0.3s ease;
        }
        
        .btn-glow:hover::before {
            opacity: 1;
        }
        
        /* Performance optimizations */
        .game-card,
        .showcase-card,
        .community-link {
            will-change: transform;
            backface-visibility: hidden;
        }
        
        /* Reduced motion support */
        @media (prefers-reduced-motion: reduce) {
            *,
            *::before,
            *::after {
                animation-duration: 0.01ms !important;
                animation-iteration-count: 1 !important;
                transition-duration: 0.01ms !important;
            }
            
            .custom-cursor {
                display: none;
            }
        }
    `;
    
    document.head.appendChild(animationStyles);
});

// Export for module use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        SilvaAnimations,
        ParticleSystem
    };
}