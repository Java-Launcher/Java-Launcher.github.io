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
    }

    // Set download links (placeholder until we have actual files)
    if (downloadBtn) {
        downloadBtn.href = "#";
        downloadBtn.addEventListener('click', function(e) {
            e.preventDefault();
            alert('JavaLauncher будет доступен для скачивания скоро! Следите за обновлениями на GitHub.');
        });
    }
    
    if (winDownload) {
        winDownload.href = "#";
        winDownload.addEventListener('click', function(e) {
            e.preventDefault();
            alert('JavaLauncher будет доступен для скачивания скоро! Следите за обновлениями на GitHub.');
        });
    }

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

    // Enhanced theme toggle with animation
    const themeToggler = document.getElementById('theme-toggle');
    if (themeToggler) {
        themeToggler.addEventListener('click', function() {
            document.body.classList.toggle('theme-light');
            localStorage.setItem('theme', document.body.classList.contains('theme-light') ? 'light' : 'dark');
            
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
        }
    }

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
