/*
===========================================
SILVA - 心理戦カードゲーム Main JavaScript
Version: 7.0 (Ultimate Edition)
Author: KUKU DAO
===========================================
*/

// SILVA Card Data (Updated with Official Information)
const SILVA_CARDS = [
    {
        id: 10,
        name: "ククノチ",
        characterName: "ククノチ",
        effect: "再生",
        description: "場に出せない。捨てさせられると脱落。ただし刀の少女以外で倒されたら手札を全て捨て「再生札」を引き復活。生き返るラスボス。",
        image: "images/10.png",
        category: "high",
        level: "No.10",
        count: 1
    },
    {
        id: 9,
        name: "刀の少女",
        characterName: "刀の少女",
        effect: "一閃",
        description: "指名相手に1枚引かせ2枚とも公開→1枚選んで捨てさせる。ククノチを確実に討つ唯一の存在。",
        image: "images/9.png",
        category: "high",
        level: "No.9",
        count: 1
    },
    {
        id: 8,
        name: "精霊",
        characterName: "精霊",
        effect: "思念",
        description: "指名相手と自分の手札を交換。手札入れ替えの戦術カード。",
        image: "images/8.png",
        category: "high",
        level: "No.8",
        count: 2
    },
    {
        id: 7,
        name: "農家",
        characterName: "農家",
        effect: "栽培／収穫",
        description: "1枚目：次手番のドローが2枚見て1枚選択。2枚目：3枚中1枚選択。残りは山札へ戻す。山札操作の専門家。",
        image: "images/7.png",
        category: "middle",
        level: "No.7",
        count: 2
    },
    {
        id: 6,
        name: "枡職人",
        characterName: "枡職人",
        effect: "製造／守護",
        description: "1枚目は効果なし。2枚目：宣言「FOMUS」で守護枡を召喚し、1度だけ敗北無効化。保険としての役割。",
        image: "images/6.png",
        category: "middle",
        level: "No.6",
        count: 2
    },
    {
        id: 5,
        name: "蔵人",
        characterName: "蔵人",
        effect: "醸造",
        description: "指名相手と手札を見せ合い、小さい数字の方が脱落。同値なら両者脱落。一騎討ちの勝負師。",
        image: "images/5.png",
        category: "middle",
        level: "No.5",
        count: 1
    },
    {
        id: 4,
        name: "戦士",
        characterName: "戦士",
        effect: "格闘",
        description: "指名相手に1枚引かせ、非公開のまま1枚指定して捨てさせる。ハンデ付きガード破壊のエキスパート。",
        image: "images/4.png",
        category: "middle",
        level: "No.4",
        count: 2
    },
    {
        id: 3,
        name: "偵察隊",
        characterName: "偵察隊",
        effect: "偵察",
        description: "指名相手の手札を自分だけ見る。内容は他に言えない。情報収集のスペシャリスト。",
        image: "images/3.png",
        category: "low",
        level: "No.3",
        count: 2
    },
    {
        id: 2,
        name: "訓練生",
        characterName: "訓練生",
        effect: "特攻",
        description: "指名相手の手札を言い当てたら相手脱落。外したら何もなし。ギャンブル性の高い賭けのカード。",
        image: "images/2.png",
        category: "low",
        level: "No.2",
        count: 2
    },
    {
        id: 1,
        name: "少年",
        characterName: "少年",
        effect: "変革",
        description: "1枚目では効果なし。場に2枚目が出ると刀の少女と同じ効果（相手に引かせて公開→1枚捨てさせる）。遅効性フィニッシャー。",
        image: "images/1.png",
        category: "low",
        level: "No.1",
        count: 2
    },
    {
        id: 0,
        name: "幼きククノチ",
        characterName: "幼きククノチ",
        effect: "光合成",
        description: "通常は効果なし。ククノチが再生する時のみ手札に加わる特殊札。山札切れの数字勝負で1 v 1なら精霊(8)にだけ勝つ。復活トークン。",
        image: "images/11.png",
        category: "high",
        level: "No.0",
        count: 1
    }
];

// Global Variables
let currentCardIndex = 0;
let isMenuOpen = false;
let isFabOpen = false;
let scrollProgress = 0;

// DOM Elements
const loadingScreen = document.getElementById('loadingScreen');
const header = document.getElementById('header');
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const navMenu = document.getElementById('navMenu');
const scrollProgressBar = document.getElementById('scrollProgressBar');
const backToTop = document.getElementById('backToTop');
const fabMain = document.getElementById('fabMain');
const fabMenu = document.getElementById('fabMenu');
const cardsGrid = document.getElementById('cardsGrid');
const cardModal = document.getElementById('cardModal');
const modalOverlay = document.getElementById('modalOverlay');
const modalClose = document.getElementById('modalClose');

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

// Main initialization function
function initializeApp() {
    // Initialize all components immediately
    initializeNavigation();
    initializeScrollEffects();
    initializeCards();
    initializeModals();
    initializeCounters();
    initializeParticles();
    initializeTilt();
    initializeFAB();
    
    // Add event listeners
    addEventListeners();
}

// Navigation
function initializeNavigation() {
    // Mobile menu toggle
    if (mobileMenuToggle && navMenu) {
        mobileMenuToggle.addEventListener('click', toggleMobileMenu);
    }

    // Smooth scroll for navigation links
    const navLinks = document.querySelectorAll('a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = header ? header.offsetHeight : 80;
                const targetPosition = targetSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });

                // Close mobile menu if open
                if (isMenuOpen) {
                    toggleMobileMenu();
                }
            }
        });
    });
}

function toggleMobileMenu() {
    isMenuOpen = !isMenuOpen;
    
    if (mobileMenuToggle) {
        mobileMenuToggle.classList.toggle('active');
    }
    
    if (navMenu) {
        if (isMenuOpen) {
            navMenu.style.display = 'flex';
            navMenu.style.position = 'fixed';
            navMenu.style.top = '80px';
            navMenu.style.left = '0';
            navMenu.style.right = '0';
            navMenu.style.backgroundColor = 'rgba(10, 10, 10, 0.98)';
            navMenu.style.flexDirection = 'column';
            navMenu.style.padding = '2rem';
            navMenu.style.zIndex = '999';
        } else {
            navMenu.style.display = '';
            navMenu.style.position = '';
            navMenu.style.top = '';
            navMenu.style.left = '';
            navMenu.style.right = '';
            navMenu.style.backgroundColor = '';
            navMenu.style.flexDirection = '';
            navMenu.style.padding = '';
            navMenu.style.zIndex = '';
        }
    }
}

// Scroll Effects
function initializeScrollEffects() {
    window.addEventListener('scroll', handleScroll);
    
    // Back to top button
    if (backToTop) {
        backToTop.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

function handleScroll() {
    const scrollY = window.scrollY;
    const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
    scrollProgress = scrollY / documentHeight;

    // Update scroll progress bar
    if (scrollProgressBar) {
        scrollProgressBar.style.width = `${scrollProgress * 100}%`;
    }

    // Header background on scroll
    if (header) {
        if (scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }

    // Back to top button visibility
    if (backToTop) {
        if (scrollY > 500) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    }

    // Update active nav link
    updateActiveNavLink();
}

function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link[data-section]');
    
    let currentSection = '';
    
    sections.forEach(section => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= 100 && rect.bottom >= 100) {
            currentSection = section.id;
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.dataset.section === currentSection) {
            link.classList.add('active');
        }
    });
}

// Cards System
function initializeCards() {
    if (!cardsGrid) return;

    renderCards();
    initializeCardFilters();
}

function renderCards(filter = 'all') {
    if (!cardsGrid) return;

    const filteredCards = filter === 'all' 
        ? SILVA_CARDS 
        : SILVA_CARDS.filter(card => card.category === filter);

    cardsGrid.innerHTML = '';

    filteredCards.forEach((card, index) => {
        const cardElement = createCardElement(card, index);
        cardsGrid.appendChild(cardElement);
    });

    // Add animation delay
    const cards = cardsGrid.querySelectorAll('.game-card');
    cards.forEach((card, index) => {
        card.style.animationDelay = `${index * 100}ms`;
        card.classList.add('fade-in-up');
    });
}

function createCardElement(card, index) {
    const cardDiv = document.createElement('div');
    cardDiv.className = 'game-card';
    cardDiv.dataset.category = card.category;
    cardDiv.dataset.cardIndex = index;
    
    cardDiv.innerHTML = `
        <div class="card-header">
            <h3 class="card-name">${card.name}</h3>
            <div class="card-level">
                <span class="character-name">${card.characterName}</span>
                <span class="card-effect">${card.effect}</span>
            </div>
        </div>
        <div class="card-artwork">
            <img src="${card.image}" alt="${card.name}" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
            <div class="card-placeholder" style="display:none;">${card.name}</div>
        </div>
        <div class="card-description">
            <p>${card.description}</p>
        </div>
    `;

    cardDiv.addEventListener('click', () => openCardModal(card, index));
    
    return cardDiv;
}

function initializeCardFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            button.classList.add('active');
            
            // Filter cards
            const filter = button.dataset.filter;
            renderCards(filter);
        });
    });
}

// Modal System
function initializeModals() {
    if (!cardModal) return;

    // Close modal events
    if (modalClose) {
        modalClose.addEventListener('click', closeCardModal);
    }
    
    if (modalOverlay) {
        modalOverlay.addEventListener('click', closeCardModal);
    }

    // Escape key to close modal
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && cardModal.style.display === 'block') {
            closeCardModal();
        }
    });

    // Modal navigation
    const modalPrevCard = document.getElementById('modalPrevCard');
    const modalNextCard = document.getElementById('modalNextCard');
    
    if (modalPrevCard) {
        modalPrevCard.addEventListener('click', () => navigateCard(-1));
    }
    
    if (modalNextCard) {
        modalNextCard.addEventListener('click', () => navigateCard(1));
    }
}

function openCardModal(card, index) {
    if (!cardModal) return;

    currentCardIndex = index;
    
    // Update modal content
    document.getElementById('modalCardName').textContent = card.name;
    document.getElementById('modalCardLevel').textContent = card.level;
    document.getElementById('modalCharacterName').textContent = card.characterName;
    document.getElementById('modalEffect').textContent = card.effect;
    document.getElementById('modalDescription').textContent = card.description;
    
    const modalImage = document.getElementById('modalCardImage');
    modalImage.src = card.image;
    modalImage.alt = card.name;
    
    // Show modal
    cardModal.style.display = 'block';
    
    // Prevent body scroll
    document.body.style.overflow = 'hidden';
    
    // Animation
    setTimeout(() => {
        cardModal.classList.add('show');
    }, 10);
}

function closeCardModal() {
    if (!cardModal) return;

    cardModal.classList.remove('show');
    
    setTimeout(() => {
        cardModal.style.display = 'none';
        document.body.style.overflow = '';
    }, 300);
}

function navigateCard(direction) {
    const newIndex = currentCardIndex + direction;
    
    if (newIndex >= 0 && newIndex < SILVA_CARDS.length) {
        openCardModal(SILVA_CARDS[newIndex], newIndex);
    }
}

// Counter Animation
function initializeCounters() {
    const counters = document.querySelectorAll('[data-count]');
    
    const animateCounter = (counter) => {
        const target = parseInt(counter.dataset.count);
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;
        
        const updateCounter = () => {
            current += increment;
            if (current < target) {
                counter.textContent = Math.floor(current);
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target;
            }
        };
        
        updateCounter();
    };

    // Intersection Observer for counter animation
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                entry.target.classList.add('counted');
                animateCounter(entry.target);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => {
        counterObserver.observe(counter);
    });
}

// Particles System
function initializeParticles() {
    const heroParticles = document.getElementById('heroParticles');
    if (!heroParticles) return;

    // Create floating particles
    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.cssText = `
            position: absolute;
            width: 4px;
            height: 4px;
            background: rgba(0, 212, 255, 0.6);
            border-radius: 50%;
            animation: floatParticle ${5 + Math.random() * 10}s linear infinite;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation-delay: ${Math.random() * 5}s;
        `;
        heroParticles.appendChild(particle);
    }

    // Add particle animation styles
    const style = document.createElement('style');
    style.textContent = `
        @keyframes floatParticle {
            0% {
                transform: translateY(0px) rotate(0deg);
                opacity: 0;
            }
            10% {
                opacity: 1;
            }
            90% {
                opacity: 1;
            }
            100% {
                transform: translateY(-100vh) rotate(360deg);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}

// Tilt Effect
function initializeTilt() {
    const tiltElements = document.querySelectorAll('[data-tilt]');
    
    tiltElements.forEach(element => {
        element.addEventListener('mousemove', handleTilt);
        element.addEventListener('mouseleave', resetTilt);
    });
}

function handleTilt(e) {
    const element = e.currentTarget;
    const rect = element.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = (y - centerY) / 10;
    const rotateY = (centerX - x) / 10;
    
    element.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
}

function resetTilt(e) {
    const element = e.currentTarget;
    element.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)';
}

// Floating Action Button
function initializeFAB() {
    if (!fabMain || !fabMenu) return;

    fabMain.addEventListener('click', toggleFAB);
    
    // Close FAB when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.fab-container') && isFabOpen) {
            toggleFAB();
        }
    });
}

function toggleFAB() {
    isFabOpen = !isFabOpen;
    
    if (fabMenu) {
        if (isFabOpen) {
            fabMenu.classList.add('active');
        } else {
            fabMenu.classList.remove('active');
        }
    }
    
    if (fabMain) {
        if (isFabOpen) {
            fabMain.style.transform = 'rotate(45deg)';
        } else {
            fabMain.style.transform = 'rotate(0deg)';
        }
    }
}

// Additional Event Listeners
function addEventListeners() {
    // Theme toggle (if implemented)
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }

    // Window resize
    window.addEventListener('resize', handleResize);
    
    // Visibility change (for performance)
    document.addEventListener('visibilitychange', handleVisibilityChange);
}

function toggleTheme() {
    // Theme switching functionality can be added here
    console.log('Theme toggle clicked');
}

function handleResize() {
    // Close mobile menu on resize
    if (window.innerWidth > 768 && isMenuOpen) {
        toggleMobileMenu();
    }
}

function handleVisibilityChange() {
    // Pause animations when tab is not visible for performance
    if (document.hidden) {
        // Pause animations
    } else {
        // Resume animations
    }
}

// Utility Functions
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

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Animation CSS for fade-in-up
const animationStyle = document.createElement('style');
animationStyle.textContent = `
    .fade-in-up {
        opacity: 0;
        transform: translateY(30px);
        animation: fadeInUp 0.6s ease forwards;
    }
    
    @keyframes fadeInUp {
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(animationStyle);

// Performance optimizations
const optimizedScroll = throttle(handleScroll, 16);
window.addEventListener('scroll', optimizedScroll);

// Console welcome message
console.log(`
🎮 SILVA Card Game Website v7.0
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🃏 心理戦カードゲームの世界へようこそ！
🚀 Developed by KUKU DAO
💫 Built with ❤️ for the community
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
`);

// Export for potential module use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        SILVA_CARDS,
        initializeApp
    };
}