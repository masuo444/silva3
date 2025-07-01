/*
===========================================
SILVA - Advanced Components & Interactions
Version: 7.0 (Ultimate Edition)
Author: KUKU DAO
===========================================
*/

// Advanced Component System
class SilvaComponents {
    constructor() {
        this.components = new Map();
        this.init();
    }

    init() {
        this.initializeTooltips();
        this.initializeNotifications();
        this.initializeImageLazyLoading();
        this.initializeAdvancedModal();
        this.initializeProgressBars();
        this.initializeSearchFilter();
        this.initializeThemeSystem();
    }

    // Tooltip System
    initializeTooltips() {
        const tooltipElements = document.querySelectorAll('[data-tooltip]');
        
        tooltipElements.forEach(element => {
            const tooltip = this.createTooltip(element.dataset.tooltip);
            
            element.addEventListener('mouseenter', (e) => {
                this.showTooltip(e.target, tooltip);
            });
            
            element.addEventListener('mouseleave', () => {
                this.hideTooltip(tooltip);
            });
        });
    }

    createTooltip(text) {
        const tooltip = document.createElement('div');
        tooltip.className = 'silva-tooltip';
        tooltip.textContent = text;
        tooltip.style.cssText = `
            position: absolute;
            background: rgba(0, 0, 0, 0.9);
            color: white;
            padding: 8px 12px;
            border-radius: 6px;
            font-size: 12px;
            white-space: nowrap;
            pointer-events: none;
            z-index: 10000;
            opacity: 0;
            transform: translateY(10px);
            transition: all 0.3s ease;
            border: 1px solid var(--color-primary);
        `;
        document.body.appendChild(tooltip);
        return tooltip;
    }

    showTooltip(element, tooltip) {
        const rect = element.getBoundingClientRect();
        const tooltipRect = tooltip.getBoundingClientRect();
        
        let top = rect.top - tooltipRect.height - 10;
        let left = rect.left + (rect.width - tooltipRect.width) / 2;
        
        // Adjust if tooltip goes off screen
        if (top < 0) {
            top = rect.bottom + 10;
        }
        if (left < 0) {
            left = 10;
        }
        if (left + tooltipRect.width > window.innerWidth) {
            left = window.innerWidth - tooltipRect.width - 10;
        }
        
        tooltip.style.top = top + window.scrollY + 'px';
        tooltip.style.left = left + 'px';
        tooltip.style.opacity = '1';
        tooltip.style.transform = 'translateY(0)';
    }

    hideTooltip(tooltip) {
        tooltip.style.opacity = '0';
        tooltip.style.transform = 'translateY(10px)';
    }

    // Notification System
    initializeNotifications() {
        this.notificationContainer = document.createElement('div');
        this.notificationContainer.className = 'notification-container';
        this.notificationContainer.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            z-index: 10000;
            display: flex;
            flex-direction: column;
            gap: 10px;
            pointer-events: none;
        `;
        document.body.appendChild(this.notificationContainer);
    }

    showNotification(message, type = 'info', duration = 5000) {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        
        const colors = {
            success: '#10b981',
            error: '#ef4444',
            warning: '#f59e0b',
            info: '#00d4ff'
        };
        
        notification.style.cssText = `
            background: rgba(0, 0, 0, 0.9);
            color: white;
            padding: 16px 20px;
            border-radius: 8px;
            border-left: 4px solid ${colors[type]};
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
            max-width: 350px;
            opacity: 0;
            transform: translateX(100%);
            transition: all 0.3s ease;
            pointer-events: auto;
            font-size: 14px;
            line-height: 1.4;
        `;
        
        notification.innerHTML = `
            <div style="display: flex; align-items: center; gap: 8px;">
                <span style="font-size: 16px;">${this.getNotificationIcon(type)}</span>
                <span>${message}</span>
                <button onclick="this.parentElement.parentElement.remove()" style="
                    background: none;
                    border: none;
                    color: white;
                    font-size: 18px;
                    cursor: pointer;
                    margin-left: auto;
                    padding: 0;
                    line-height: 1;
                ">×</button>
            </div>
        `;
        
        this.notificationContainer.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.opacity = '1';
            notification.style.transform = 'translateX(0)';
        }, 10);
        
        // Auto remove
        setTimeout(() => {
            if (notification.parentElement) {
                notification.style.opacity = '0';
                notification.style.transform = 'translateX(100%)';
                setTimeout(() => notification.remove(), 300);
            }
        }, duration);
    }

    getNotificationIcon(type) {
        const icons = {
            success: '✅',
            error: '❌',
            warning: '⚠️',
            info: 'ℹ️'
        };
        return icons[type] || icons.info;
    }

    // Image Lazy Loading
    initializeImageLazyLoading() {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    this.loadImage(img);
                    imageObserver.unobserve(img);
                }
            });
        }, {
            rootMargin: '50px'
        });

        const lazyImages = document.querySelectorAll('[data-src]');
        lazyImages.forEach(img => {
            imageObserver.observe(img);
        });
    }

    loadImage(img) {
        const src = img.dataset.src;
        if (!src) return;

        // Create temporary image to preload
        const tempImg = new Image();
        tempImg.onload = () => {
            img.src = src;
            img.classList.add('loaded');
            img.removeAttribute('data-src');
        };
        tempImg.onerror = () => {
            img.classList.add('error');
            // Show placeholder or fallback
            this.showImageFallback(img);
        };
        tempImg.src = src;
    }

    showImageFallback(img) {
        const fallback = document.createElement('div');
        fallback.className = 'image-fallback';
        fallback.style.cssText = `
            display: flex;
            align-items: center;
            justify-content: center;
            background: linear-gradient(45deg, #1a1a1a, #2a2a2a);
            color: var(--color-primary);
            font-size: 2rem;
            min-height: 200px;
            border-radius: 8px;
        `;
        fallback.textContent = '🖼️';
        
        if (img.parentElement) {
            img.parentElement.replaceChild(fallback, img);
        }
    }

    // Advanced Modal System
    initializeAdvancedModal() {
        // Multi-modal support
        this.activeModals = [];
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (this.activeModals.length > 0) {
                const activeModal = this.activeModals[this.activeModals.length - 1];
                
                switch (e.key) {
                    case 'Escape':
                        this.closeModal(activeModal);
                        break;
                    case 'Tab':
                        this.handleModalTabNavigation(e, activeModal);
                        break;
                }
            }
        });
    }

    openModal(modalElement) {
        if (!modalElement) return;
        
        modalElement.style.display = 'block';
        document.body.style.overflow = 'hidden';
        
        // Focus management
        const focusableElements = modalElement.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        
        if (focusableElements.length > 0) {
            focusableElements[0].focus();
        }
        
        this.activeModals.push(modalElement);
        
        // Animation
        setTimeout(() => {
            modalElement.classList.add('modal-open');
        }, 10);
    }

    closeModal(modalElement) {
        if (!modalElement) return;
        
        modalElement.classList.remove('modal-open');
        
        setTimeout(() => {
            modalElement.style.display = 'none';
            
            // Remove from active modals
            const index = this.activeModals.indexOf(modalElement);
            if (index > -1) {
                this.activeModals.splice(index, 1);
            }
            
            // Restore body scroll if no modals are open
            if (this.activeModals.length === 0) {
                document.body.style.overflow = '';
            }
        }, 300);
    }

    handleModalTabNavigation(e, modal) {
        const focusableElements = modal.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];
        
        if (e.shiftKey && document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
        } else if (!e.shiftKey && document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
        }
    }

    // Progress Bars
    initializeProgressBars() {
        const progressBars = document.querySelectorAll('[data-progress]');
        
        const progressObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateProgressBar(entry.target);
                    progressObserver.unobserve(entry.target);
                }
            });
        });

        progressBars.forEach(bar => {
            progressObserver.observe(bar);
        });
    }

    animateProgressBar(progressBar) {
        const targetWidth = progressBar.dataset.progress + '%';
        const duration = 1500;
        
        progressBar.style.width = '0%';
        progressBar.style.transition = `width ${duration}ms ease-out`;
        
        setTimeout(() => {
            progressBar.style.width = targetWidth;
        }, 100);
    }

    // Search and Filter System
    initializeSearchFilter() {
        const searchInput = document.getElementById('cardSearch');
        if (!searchInput) return;

        let searchTimeout;
        searchInput.addEventListener('input', (e) => {
            clearTimeout(searchTimeout);
            searchTimeout = setTimeout(() => {
                this.performSearch(e.target.value);
            }, 300);
        });
    }

    performSearch(query) {
        const cards = document.querySelectorAll('.game-card');
        const normalizedQuery = query.toLowerCase().trim();
        
        cards.forEach(card => {
            const cardName = card.querySelector('.card-name').textContent.toLowerCase();
            const cardDescription = card.querySelector('.card-description').textContent.toLowerCase();
            const cardEffect = card.querySelector('.card-effect').textContent.toLowerCase();
            
            const matches = cardName.includes(normalizedQuery) ||
                           cardDescription.includes(normalizedQuery) ||
                           cardEffect.includes(normalizedQuery);
            
            if (matches) {
                card.style.display = 'flex';
                card.classList.add('search-match');
            } else {
                card.style.display = 'none';
                card.classList.remove('search-match');
            }
        });
        
        // Update results count
        const visibleCards = document.querySelectorAll('.game-card[style="display: flex;"]').length;
        this.updateSearchResults(visibleCards, query);
    }

    updateSearchResults(count, query) {
        let resultsElement = document.getElementById('searchResults');
        
        if (!resultsElement) {
            resultsElement = document.createElement('div');
            resultsElement.id = 'searchResults';
            resultsElement.className = 'search-results';
            
            const cardsSection = document.getElementById('cards');
            if (cardsSection) {
                cardsSection.querySelector('.container').insertBefore(
                    resultsElement, 
                    cardsSection.querySelector('.cards-grid')
                );
            }
        }
        
        if (query.trim()) {
            resultsElement.textContent = `${count}件のカードが見つかりました`;
            resultsElement.style.display = 'block';
        } else {
            resultsElement.style.display = 'none';
        }
    }

    // Theme System
    initializeThemeSystem() {
        this.currentTheme = localStorage.getItem('silva-theme') || 'dark';
        this.applyTheme(this.currentTheme);
        
        const themeToggle = document.getElementById('themeToggle');
        if (themeToggle) {
            themeToggle.addEventListener('click', () => {
                this.toggleTheme();
            });
        }
    }

    toggleTheme() {
        this.currentTheme = this.currentTheme === 'dark' ? 'light' : 'dark';
        this.applyTheme(this.currentTheme);
        localStorage.setItem('silva-theme', this.currentTheme);
        
        // Show notification
        this.showNotification(
            `${this.currentTheme === 'dark' ? 'ダーク' : 'ライト'}テーマに切り替えました`,
            'success',
            3000
        );
    }

    applyTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        
        const themeIcon = document.querySelector('.theme-icon');
        if (themeIcon) {
            themeIcon.textContent = theme === 'dark' ? '☀️' : '🌙';
        }
        
        // Update CSS custom properties if needed
        if (theme === 'light') {
            document.documentElement.style.setProperty('--color-bg-primary', '#ffffff');
            document.documentElement.style.setProperty('--color-bg-secondary', '#f8f9fa');
            document.documentElement.style.setProperty('--color-text-primary', '#1a1a1a');
            document.documentElement.style.setProperty('--color-text-secondary', '#4a5568');
        } else {
            document.documentElement.style.setProperty('--color-bg-primary', '#0a0a0a');
            document.documentElement.style.setProperty('--color-bg-secondary', '#111111');
            document.documentElement.style.setProperty('--color-text-primary', '#ffffff');
            document.documentElement.style.setProperty('--color-text-secondary', '#cccccc');
        }
    }

    // Performance Monitor
    initializePerformanceMonitor() {
        if (typeof performance !== 'undefined' && performance.mark) {
            performance.mark('silva-components-start');
            
            window.addEventListener('load', () => {
                performance.mark('silva-components-end');
                performance.measure('silva-components-load', 'silva-components-start', 'silva-components-end');
                
                const measure = performance.getEntriesByName('silva-components-load')[0];
                console.log(`🚀 SILVA Components loaded in ${measure.duration.toFixed(2)}ms`);
            });
        }
    }

    // Error Handling
    handleError(error, context = 'Unknown') {
        console.error(`SILVA Component Error [${context}]:`, error);
        
        // Show user-friendly error notification
        this.showNotification(
            'システムエラーが発生しました。ページを再読み込みしてください。',
            'error',
            10000
        );
        
        // Send error to analytics if available
        if (typeof gtag !== 'undefined') {
            gtag('event', 'exception', {
                description: `${context}: ${error.message}`,
                fatal: false
            });
        }
    }

    // Cleanup method
    destroy() {
        // Clean up event listeners and observers
        this.components.clear();
        
        // Remove notification container
        if (this.notificationContainer) {
            this.notificationContainer.remove();
        }
        
        // Close any open modals
        this.activeModals.forEach(modal => {
            this.closeModal(modal);
        });
    }
}

// Advanced Form Handler
class SilvaFormHandler {
    constructor() {
        this.forms = new Map();
        this.validators = new Map();
        this.init();
    }

    init() {
        this.setupFormValidation();
        this.setupFormSubmission();
    }

    setupFormValidation() {
        const forms = document.querySelectorAll('form[data-silva-form]');
        
        forms.forEach(form => {
            this.forms.set(form, {
                fields: new Map(),
                isValid: false
            });
            
            // Setup field validation
            const fields = form.querySelectorAll('[data-validate]');
            fields.forEach(field => {
                this.setupFieldValidation(field, form);
            });
        });
    }

    setupFieldValidation(field, form) {
        const rules = field.dataset.validate.split('|');
        
        field.addEventListener('blur', () => {
            this.validateField(field, rules, form);
        });
        
        field.addEventListener('input', () => {
            // Clear error on input
            this.clearFieldError(field);
        });
    }

    validateField(field, rules, form) {
        const value = field.value.trim();
        let isValid = true;
        let errorMessage = '';
        
        for (const rule of rules) {
            const [ruleName, ruleValue] = rule.split(':');
            
            switch (ruleName) {
                case 'required':
                    if (!value) {
                        isValid = false;
                        errorMessage = 'この項目は必須です';
                    }
                    break;
                    
                case 'email':
                    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    if (value && !emailRegex.test(value)) {
                        isValid = false;
                        errorMessage = '有効なメールアドレスを入力してください';
                    }
                    break;
                    
                case 'min':
                    if (value.length < parseInt(ruleValue)) {
                        isValid = false;
                        errorMessage = `${ruleValue}文字以上で入力してください`;
                    }
                    break;
                    
                case 'max':
                    if (value.length > parseInt(ruleValue)) {
                        isValid = false;
                        errorMessage = `${ruleValue}文字以下で入力してください`;
                    }
                    break;
            }
            
            if (!isValid) break;
        }
        
        if (isValid) {
            this.clearFieldError(field);
        } else {
            this.showFieldError(field, errorMessage);
        }
        
        this.updateFormState(form);
        return isValid;
    }

    showFieldError(field, message) {
        field.classList.add('error');
        
        let errorElement = field.nextElementSibling;
        if (!errorElement || !errorElement.classList.contains('field-error')) {
            errorElement = document.createElement('div');
            errorElement.className = 'field-error';
            field.parentNode.insertBefore(errorElement, field.nextElementSibling);
        }
        
        errorElement.textContent = message;
        errorElement.style.cssText = `
            color: #ef4444;
            font-size: 12px;
            margin-top: 4px;
            animation: fadeInUp 0.3s ease;
        `;
    }

    clearFieldError(field) {
        field.classList.remove('error');
        
        const errorElement = field.nextElementSibling;
        if (errorElement && errorElement.classList.contains('field-error')) {
            errorElement.remove();
        }
    }

    updateFormState(form) {
        const fields = form.querySelectorAll('[data-validate]');
        const submitButton = form.querySelector('[type="submit"]');
        
        let allValid = true;
        fields.forEach(field => {
            if (field.classList.contains('error') || !field.value.trim()) {
                allValid = false;
            }
        });
        
        if (submitButton) {
            submitButton.disabled = !allValid;
            submitButton.classList.toggle('disabled', !allValid);
        }
        
        const formData = this.forms.get(form);
        if (formData) {
            formData.isValid = allValid;
        }
    }

    setupFormSubmission() {
        document.addEventListener('submit', (e) => {
            const form = e.target;
            if (form.hasAttribute('data-silva-form')) {
                e.preventDefault();
                this.handleFormSubmit(form);
            }
        });
    }

    async handleFormSubmit(form) {
        const formData = new FormData(form);
        const action = form.action || '';
        const method = form.method || 'POST';
        
        // Show loading state
        const submitButton = form.querySelector('[type="submit"]');
        const originalText = submitButton.textContent;
        submitButton.textContent = '送信中...';
        submitButton.disabled = true;
        
        try {
            const response = await fetch(action, {
                method: method,
                body: formData
            });
            
            if (response.ok) {
                this.handleFormSuccess(form);
            } else {
                throw new Error('Network response was not ok');
            }
        } catch (error) {
            this.handleFormError(form, error);
        } finally {
            // Restore button state
            submitButton.textContent = originalText;
            submitButton.disabled = false;
        }
    }

    handleFormSuccess(form) {
        // Show success message
        silvaComponents.showNotification(
            'フォームが正常に送信されました',
            'success'
        );
        
        // Reset form
        form.reset();
        
        // Clear any validation states
        const fields = form.querySelectorAll('[data-validate]');
        fields.forEach(field => {
            this.clearFieldError(field);
        });
    }

    handleFormError(form, error) {
        console.error('Form submission error:', error);
        
        silvaComponents.showNotification(
            'フォームの送信に失敗しました。もう一度お試しください。',
            'error'
        );
    }
}

// Initialize components when DOM is loaded
let silvaComponents;
let silvaFormHandler;

document.addEventListener('DOMContentLoaded', () => {
    try {
        silvaComponents = new SilvaComponents();
        silvaFormHandler = new SilvaFormHandler();
        
        // Initialize performance monitoring
        silvaComponents.initializePerformanceMonitor();
        
        console.log('🎮 SILVA Components initialized successfully');
        
    } catch (error) {
        console.error('Failed to initialize SILVA components:', error);
    }
});

// Global error handler
window.addEventListener('error', (e) => {
    if (silvaComponents) {
        silvaComponents.handleError(e.error, 'Global');
    }
});

// Export for module use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        SilvaComponents,
        SilvaFormHandler
    };
}