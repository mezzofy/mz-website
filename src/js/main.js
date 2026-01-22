// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', async function() {
    // Initialize i18n system
    await window.i18n.init();

    // Update language display
    updateLanguageDisplay();

    // Language toggle click handlers
    document.querySelectorAll('.lang-option').forEach(option => {
        option.addEventListener('click', async function(e) {
            e.preventDefault();
            const lang = this.getAttribute('data-lang');

            // Switch language
            await window.i18n.switchLanguage(lang);

            // Update display
            updateLanguageDisplay();

            // Close mobile menu if open
            const mobileMenu = document.getElementById('mobile-menu');
            if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
                mobileMenu.classList.add('hidden');
            }
        });
    });

    // Listen for language changes to update UI
    window.addEventListener('languageChanged', function(e) {
        updateLanguageDisplay();
    });

    // Mobile menu toggle
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');

    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
        });

        // Close mobile menu when clicking on a link
        const mobileLinks = mobileMenu.querySelectorAll('a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', function() {
                mobileMenu.classList.add('hidden');
            });
        });
    }

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');

            // Don't prevent default for just "#" links
            if (href === '#') return;

            e.preventDefault();
            const target = document.querySelector(href);

            if (target) {
                const offsetTop = target.offsetTop - 80; // Account for fixed header
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Add scroll effect to navbar
    const nav = document.querySelector('nav');
    let lastScroll = 0;

    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 100) {
            nav.classList.add('shadow-lg');
        } else {
            nav.classList.remove('shadow-lg');
        }

        lastScroll = currentScroll;
    });

    // Mobile dropdown accordion functionality
    const mobileDropdownTriggers = document.querySelectorAll('.mobile-dropdown-trigger');

    mobileDropdownTriggers.forEach(trigger => {
        trigger.addEventListener('click', function(e) {
            e.preventDefault();
            const menuId = this.getAttribute('data-dropdown');
            const menu = document.querySelector(`[data-menu="${menuId}"]`);
            const chevron = this.querySelector('.chevron');

            // Toggle current menu
            const isActive = menu.classList.contains('active');

            // Close all menus first (accordion behavior)
            document.querySelectorAll('.mobile-dropdown-menu').forEach(otherMenu => {
                otherMenu.classList.remove('active');
            });
            document.querySelectorAll('.mobile-dropdown-trigger .chevron').forEach(otherChevron => {
                otherChevron.classList.remove('rotate-180');
            });

            // If wasn't active, open it
            if (!isActive) {
                menu.classList.add('active');
                chevron.classList.add('rotate-180');
            }
        });
    });

    // Update language display in toggle buttons
    function updateLanguageDisplay() {
        const currentLang = window.i18n.getCurrentLanguage();
        const langName = window.i18n.getLanguageName(currentLang);

        // Update desktop display
        const desktopDisplay = document.getElementById('current-lang-desktop');
        if (desktopDisplay) {
            desktopDisplay.textContent = langName;
        }

        // Update mobile display
        const mobileDisplay = document.getElementById('current-lang-mobile');
        if (mobileDisplay) {
            mobileDisplay.textContent = langName;
        }

        // Highlight active language option
        document.querySelectorAll('.lang-option').forEach(option => {
            const optionLang = option.getAttribute('data-lang');
            if (optionLang === currentLang) {
                option.classList.add('text-primary-orange', 'font-semibold');
            } else {
                option.classList.remove('text-primary-orange', 'font-semibold');
            }
        });
    }
});
