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

    // ── Signup modal: "Get Started" opens a 3-path chooser ──────────────
    (function () {
        if (document.getElementById('signup-modal')) return;

        var css = [
            '.signup-dialog{width:min(600px,calc(100vw - 32px));max-height:min(88vh,760px);border:0;border-radius:16px;padding:0;color:#1a1a1a;background:#fff;box-shadow:0 30px 60px -20px rgba(0,0,0,0.45);}',
            '.signup-dialog::backdrop{background:rgba(26,26,26,0.55);}',
            '.signup-dialog__body{padding:28px;overflow-y:auto;max-height:inherit;}',
            '.signup-dialog__head{padding-right:48px;}',
            '[dir="rtl"] .signup-dialog__head{padding-right:0;padding-left:48px;}',
            '.signup-dialog h2{font-size:1.5rem;line-height:1.2;font-weight:800;color:#1a1a1a;margin:0 0 6px;}',
            '.signup-dialog p.su-sub{color:#4a4a4a;margin:0 0 20px;font-size:0.95rem;}',
            '.signup-opts{display:flex;flex-direction:column;gap:12px;}',
            '.signup-opt{display:flex;align-items:center;gap:16px;text-decoration:none;border:1px solid rgba(26,26,26,0.12);border-radius:12px;padding:16px 18px;background:#fff;transition:border-color .18s,transform .18s,box-shadow .18s;}',
            '.signup-opt:hover{border-color:#FF6B35;transform:translateY(-2px);box-shadow:0 12px 28px -18px rgba(0,0,0,0.4);}',
            '.signup-opt:focus-visible{outline:2px solid #FF6B35;outline-offset:2px;}',
            '.signup-opt__ico{width:48px;height:48px;flex-shrink:0;border-radius:12px;background:rgba(255,107,53,0.12);color:#FF6B35;display:flex;align-items:center;justify-content:center;}',
            '.signup-opt__txt{flex:1;min-width:0;}',
            '.signup-opt__tag,.signup-opt__title,.signup-opt__desc{display:block;}',
            '.signup-opt__tag{font-family:"IBM Plex Mono",monospace;font-size:0.66rem;letter-spacing:0.12em;text-transform:uppercase;color:#FF6B35;}',
            '.signup-opt__title{font-size:1.05rem;font-weight:700;color:#1a1a1a;margin:1px 0 2px;}',
            '.signup-opt__desc{font-size:0.88rem;color:#4a4a4a;}',
            '.signup-opt__arrow{flex-shrink:0;color:#808080;transition:transform .18s,color .18s;}',
            '.signup-opt:hover .signup-opt__arrow{color:#FF6B35;transform:translateX(3px);}',
            '[dir="rtl"] .signup-opt__arrow svg{transform:scaleX(-1);}',
            '[dir="rtl"] .signup-opt:hover .signup-opt__arrow{transform:translateX(-3px);}',
            '.signup-close{position:absolute;top:12px;right:12px;z-index:2;width:44px;height:44px;display:inline-flex;align-items:center;justify-content:center;border:0;border-radius:10px;background:#f5f5f5;color:#4a4a4a;cursor:pointer;transition:background .18s,color .18s;}',
            '.signup-close:hover{background:#ececec;color:#1a1a1a;}',
            '.signup-close:focus-visible{outline:2px solid #FF6B35;outline-offset:2px;}',
            '[dir="rtl"] .signup-close{right:auto;left:12px;}',
            '.su-sr{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0;}',
            '@media (prefers-reduced-motion: no-preference){.signup-dialog[open]{animation:su-in .22s cubic-bezier(0.23,1,0.32,1);}.signup-dialog[open]::backdrop{animation:su-fade .22s ease-out;}}',
            '@keyframes su-in{from{opacity:0;transform:translateY(8px) scale(0.97);}to{opacity:1;transform:none;}}',
            '@keyframes su-fade{from{opacity:0;}to{opacity:1;}}'
        ].join('');
        var style = document.createElement('style');
        style.id = 'signup-modal-style';
        style.textContent = css;
        document.head.appendChild(style);

        var ARROW = '<span class="signup-opt__arrow"><svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5-5 5M6 12h12"></path></svg></span>';
        function opt(href, external, ico, tagKey, titleKey, descKey) {
            var attrs = external ? ' target="_blank" rel="noopener noreferrer"' : '';
            return '<a class="signup-opt" href="' + href + '"' + attrs + ' data-cta="signup">' +
                '<span class="signup-opt__ico">' + ico + '</span>' +
                '<span class="signup-opt__txt">' +
                    '<span class="signup-opt__tag" data-i18n="' + tagKey + '"></span>' +
                    '<span class="signup-opt__title" data-i18n="' + titleKey + '"></span>' +
                    '<span class="signup-opt__desc" data-i18n="' + descKey + '"></span>' +
                '</span>' + ARROW + '</a>';
        }
        var icoSeller = '<svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5a2 2 0 011.414.586l7 7a2 2 0 010 2.828l-5 5a2 2 0 01-2.828 0l-7-7A2 2 0 013 10V5a2 2 0 012-2z"></path></svg>';
        var icoBuyer = '<svg width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24" aria-hidden="true"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"></path><path d="M3 6h18"></path><path d="M16 10a4 4 0 01-8 0"></path></svg>';
        var icoPartner = '<svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>';

        var dlg = document.createElement('dialog');
        dlg.id = 'signup-modal';
        dlg.className = 'signup-dialog';
        dlg.setAttribute('aria-labelledby', 'signup-modal-title');
        dlg.innerHTML =
            '<button type="button" class="signup-close" id="signup-close">' +
                '<svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>' +
                '<span class="su-sr" data-i18n="common.signupModal.close">Close</span>' +
            '</button>' +
            '<div class="signup-dialog__body">' +
                '<div class="signup-dialog__head">' +
                    '<h2 id="signup-modal-title" data-i18n="common.signupModal.title">Get started with Mezzofy</h2>' +
                    '<p class="su-sub" data-i18n="common.signupModal.subtitle">Pick the path that fits you.</p>' +
                '</div>' +
                '<div class="signup-opts">' +
                    opt('https://merchant.mezzofy.com/register', true, icoSeller, 'common.signupModal.seller.tag', 'common.signupModal.seller.title', 'common.signupModal.seller.desc') +
                    opt('https://exchange.mezzofy.com/signup', true, icoBuyer, 'common.signupModal.buyer.tag', 'common.signupModal.buyer.title', 'common.signupModal.buyer.desc') +
                    opt('contact.html', false, icoPartner, 'common.signupModal.partner.tag', 'common.signupModal.partner.title', 'common.signupModal.partner.desc') +
                '</div>' +
            '</div>';
        document.body.appendChild(dlg);

        // Localize the injected nodes (re-localizes automatically on language switch)
        try { if (window.i18n && window.i18n.applyTranslations) window.i18n.applyTranslations(); } catch (e) {}

        var closeBtn = document.getElementById('signup-close');
        if (closeBtn) closeBtn.addEventListener('click', function () { dlg.close(); });
        dlg.addEventListener('click', function (e) { if (e.target === dlg) dlg.close(); });

        document.querySelectorAll('[data-i18n="common.nav.getStarted"]').forEach(function (btn) {
            btn.addEventListener('click', function (e) {
                e.preventDefault();
                if (typeof dlg.showModal === 'function') { dlg.showModal(); } else { dlg.setAttribute('open', ''); }
            });
        });
    })();

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
