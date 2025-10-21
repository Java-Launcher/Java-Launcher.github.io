// ============================================================================
// JavaLauncher — SCRIPT.JS
// Enhanced animations and functionality
// ============================================================================

document.addEventListener('DOMContentLoaded', function() {
    
    // Header scroll effect
    window.addEventListener('scroll', function() {
        const header = document.querySelector('.site-header');
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Enhanced download button effects
    const downloadBtn = document.getElementById('download-btn');
    const winDownload = document.getElementById('win-download');
    
    if (downloadBtn) {
        downloadBtn.addEventListener('mouseenter', function() {
            this.style.animation = 'pixel-glow 0.8s infinite, pixel-border 1s infinite';
        });
        
        downloadBtn.addEventListener('mouseleave', function() {
            this.style.animation = 'pixel-border 3s infinite';
        });
        
        // Real download link
        downloadBtn.href = "downloads/JavaLauncher.jar";
        downloadBtn.addEventListener('click', function(e) {
            if (this.href.includes("#")) {
                e.preventDefault();
                alert('JavaLauncher будет доступен для скачивания скоро! Следите за обновлениями на GitHub.');
            }
        });
    }
    
    if (winDownload) {
        winDownload.href = "downloads/JavaLauncher.exe";
        winDownload.addEventListener('click', function(e) {
            if (this.href.includes("#")) {
                e.preventDefault();
                alert('JavaLauncher будет доступен для скачивания скоро! Следите за обновлениями на GitHub.');
            }
        });
    }

    // Enhanced theme toggle with animation
    const themeToggler = document.getElementById('theme-toggle');
    if (themeToggler) {
        themeToggler.addEventListener('click', function() {
            document.body.classList.toggle('theme-light');
            const isLight = document.body.classList.contains('theme-light');
            localStorage.setItem('theme', isLight ? 'light' : 'dark');
            
            // Update button icon
            this.textContent = isLight ? '🌙' : '🌓';
            
            // Add rotation effect
            this.style.transform = 'rotate(360deg)';
            setTimeout(() => {
                this.style.transform = '';
            }, 500);
        });

        // Load saved theme
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'light') {
            document.body.classList.add('theme-light');
            if (themeToggler) themeToggler.textContent = '🌙';
        }
    }

    // Enhanced GitHub button animation
    const githubBtn = document.querySelector('.btn.ghost[href*="github"]');
    if (githubBtn) {
        githubBtn.classList.add('github-btn');
        
        githubBtn.addEventListener('mouseenter', function() {
            this.style.animation = 'pixel-glow 1.2s infinite, pixel-border 1.2s infinite';
        });
        
        githubBtn.addEventListener('mouseleave', function() {
            this.style.animation = '';
        });
    }

    // Enhanced Donate button animation
    const donateBtn = document.querySelector('.btn.donate');
    if (donateBtn) {
        donateBtn.addEventListener('mouseenter', function() {
            this.style.animation = 'pixel-glow 1.2s infinite, pixel-border 1.2s infinite';
        });
        
        donateBtn.addEventListener('mouseleave', function() {
            this.style.animation = 'pixel-border 3s infinite';
        });
    }

    // Crypto address copy functionality
    document.querySelectorAll('.crypto-address').forEach(addr => {
        addr.style.cursor = 'pointer';
        addr.title = 'Нажми чтобы скопировать';
        
        addr.addEventListener('click', function() {
            const text = this.textContent.trim();
            copyToClipboard(text);
            
            // Visual feedback
            this.classList.add('copied');
            const originalText = this.textContent;
            this.textContent = '✅ Скопировано!';
            
            setTimeout(() => {
                this.textContent = originalText;
                this.classList.remove('copied');
            }, 2000);
        });
    });

    // Smooth scroll with offset for fixed header
    const scrollLinks = document.querySelectorAll('a[href^="#"]');
    scrollLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href === '#') return;
            
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                const headerHeight = document.querySelector('.site-header').offsetHeight;
                const targetPosition = target.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Modal functionality
    const modal = document.getElementById('versions-modal');
    const modalOverlay = document.getElementById('modal-overlay');
    const modalOpenBtn = document.querySelectorAll('[data-modal-open]');
    const modalCloseBtn = document.querySelectorAll('[data-modal-close]');

    function openModal() {
        if (modal && modalOverlay) {
            modal.classList.add('active');
            modalOverlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }

    function closeModal() {
        if (modal && modalOverlay) {
            modal.classList.remove('active');
            modalOverlay.classList.remove('active');
            document.body.style.overflow = '';
        }
    }

    modalOpenBtn.forEach(btn => {
        btn.addEventListener('click', openModal);
    });

    modalCloseBtn.forEach(btn => {
        btn.addEventListener('click', closeModal);
    });

    if (modalOverlay) {
        modalOverlay.addEventListener('click', closeModal);
    }

    // FAQ accordion
    document.querySelectorAll('.faq__q').forEach(q => {
        q.addEventListener('click', function() {
            const item = this.parentElement;
            const isOpen = item.classList.contains('open');
            
            // Close all other items
            document.querySelectorAll('.faq__item').forEach(i => {
                i.classList.remove('open');
            });
            
            // Toggle current item
            if (!isOpen) {
                item.classList.add('open');
            }
        });
    });

    // Add loading animation to cards
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
            }
        });
    }, observerOptions);

    // Observe all animated elements
    document.querySelectorAll('.feature-card, .download-card, .change, .faq__item').forEach(element => {
        if (element.style.animation) {
            element.style.animationPlayState = 'paused';
            observer.observe(element);
        }
    });

    console.log('%c🚀 JavaLauncher Enhanced Animations Loaded!', 'color:#3AA655;font-size:16px;font-weight:bold;');
});

// Enhanced preloader
window.addEventListener('load', function() {
    const preloader = document.getElementById('preloader');
    if (preloader) {
        // Add fade out animation
        preloader.style.opacity = '0';
        preloader.style.transition = 'opacity 0.8s ease';
        
        setTimeout(() => {
            preloader.classList.add('hidden');
        }, 800);
    }
});

// Copy to clipboard function
function copyToClipboard(text) {
    if (navigator.clipboard && window.isSecureContext) {
        return navigator.clipboard.writeText(text);
    } else {
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.position = 'fixed';
        textArea.style.opacity = '0';
        document.body.appendChild(textArea);
        textArea.select();
        try {
            document.execCommand('copy');
            return Promise.resolve();
        } catch (err) {
            return Promise.reject(err);
        } finally {
            document.body.removeChild(textArea);
        }
    }
}

// Crypto info toggle for donate page
function showCryptoInfo() {
    const cryptoInfo = document.getElementById('cryptoInfo');
    if (cryptoInfo) {
        const isVisible = cryptoInfo.style.display === 'block';
        cryptoInfo.style.display = isVisible ? 'none' : 'block';
        
        if (!isVisible) {
            cryptoInfo.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
    }
}
