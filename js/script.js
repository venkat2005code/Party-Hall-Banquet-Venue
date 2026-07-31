document.addEventListener('DOMContentLoaded', () => {
    // --- Theme Toggle Logic ---
    const themeToggleBtn = document.getElementById('theme-toggle');
    const htmlElement = document.documentElement;

    // Check local storage for theme preference, default to light
    const currentTheme = localStorage.getItem('theme') || 'light';
    htmlElement.setAttribute('data-theme', currentTheme);
    updateThemeButtonText(currentTheme);

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            let theme = htmlElement.getAttribute('data-theme');
            let newTheme = theme === 'dark' ? 'light' : 'dark';
            htmlElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            updateThemeButtonText(newTheme);
        });
    }

    function updateThemeButtonText(theme) {
        if (themeToggleBtn) {
            themeToggleBtn.innerHTML = theme === 'dark' 
                ? '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>' 
                : '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>';
        }
    }


    // --- RTL/LTR Toggle Logic ---
    const dirToggleBtn = document.getElementById('dir-toggle');
    
    // Check local storage for direction, default to ltr
    const currentDir = localStorage.getItem('dir') || 'ltr';
    htmlElement.setAttribute('dir', currentDir);
    
    if (dirToggleBtn) {
        // Initial text should be the CURRENT mode
        dirToggleBtn.textContent = currentDir.toUpperCase();

        dirToggleBtn.addEventListener('click', () => {
            let dir = htmlElement.getAttribute('dir');
            let newDir = dir === 'rtl' ? 'ltr' : 'rtl';
            htmlElement.setAttribute('dir', newDir);
            localStorage.setItem('dir', newDir);
            
            // "Display only the active mode in the RTL/LTR toggle — show 'LTR' when in LTR mode and 'RTL' when in RTL mode"
            dirToggleBtn.textContent = newDir.toUpperCase();
        });
    }
    // --- Active Nav Link Logic ---
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    
    document.querySelectorAll('.nav-menu a').forEach(link => {
        const linkPath = link.getAttribute('href');
        if (linkPath === currentPath) {
            link.classList.add('active');
            
            // If it's a dropdown item, also highlight the parent nav-item span
            if (link.classList.contains('dropdown-item')) {
                const parentItem = link.closest('.nav-item');
                if (parentItem) {
                    const parentSpan = parentItem.querySelector('span');
                    if (parentSpan) parentSpan.classList.add('active');
                }
            }
        }
    });

    // --- Mobile Hamburger Menu Logic ---
    const headerUtils = document.querySelector('.header-utils');
    const navContainer = document.querySelector('.nav-container');
    const navMenu = document.querySelector('.nav-menu');

    if (navContainer && navMenu) {
        // Ensure hamburger button exists
        let hamburgerBtn = navContainer.querySelector('.hamburger-btn');
        if (!hamburgerBtn) {
            hamburgerBtn = document.createElement('button');
            hamburgerBtn.className = 'hamburger-btn';
            hamburgerBtn.setAttribute('aria-label', 'Toggle Navigation Menu');
            hamburgerBtn.innerHTML = '<span></span><span></span><span></span>';
            navContainer.appendChild(hamburgerBtn);
        }

        // Render mobile drawer toggles clone if not present
        if (headerUtils) {
            let mobileUtils = navMenu.querySelector('.mobile-drawer-utils');
            if (!mobileUtils) {
                mobileUtils = document.createElement('div');
                mobileUtils.className = 'mobile-drawer-utils';
                mobileUtils.innerHTML = headerUtils.innerHTML;
                
                // Re-bind cloned button listeners for mobile view
                const dirBtnMobile = mobileUtils.querySelector('#dir-toggle');
                const themeBtnMobile = mobileUtils.querySelector('#theme-toggle');
                
                if (dirBtnMobile) {
                    dirBtnMobile.removeAttribute('id');
                    dirBtnMobile.addEventListener('click', () => {
                        const currentDir = document.documentElement.getAttribute('dir') || 'ltr';
                        const newDir = currentDir === 'rtl' ? 'ltr' : 'rtl';
                        document.documentElement.setAttribute('dir', newDir);
                        localStorage.setItem('dir', newDir);
                        document.querySelectorAll('#dir-toggle, .mobile-drawer-utils .toggle-btn').forEach(btn => {
                            btn.textContent = newDir.toUpperCase();
                        });
                    });
                }
                
                if (themeBtnMobile) {
                    themeBtnMobile.removeAttribute('id');
                    themeBtnMobile.addEventListener('click', () => {
                        const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
                        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
                        document.documentElement.setAttribute('data-theme', newTheme);
                        localStorage.setItem('theme', newTheme);
                        const sunIcon = '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>';
                        const moonIcon = '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>';
                        document.querySelectorAll('#theme-toggle, .mobile-drawer-utils .btn-icon').forEach(btn => {
                            btn.innerHTML = newTheme === 'dark' ? sunIcon : moonIcon;
                        });
                    });
                }
                
                navMenu.appendChild(mobileUtils);
            }
        }

        hamburgerBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            hamburgerBtn.classList.toggle('active');
            navMenu.classList.toggle('active');
            document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
        });

        // Click to expand accordion for Home and Dashboards on mobile
        navMenu.querySelectorAll('.nav-item > span').forEach(span => {
            span.addEventListener('click', (e) => {
                if (window.innerWidth <= 768) {
                    e.preventDefault();
                    e.stopPropagation();
                    const parentItem = span.closest('.nav-item');
                    const isOpen = parentItem.classList.contains('open');

                    // Close all other dropdowns
                    navMenu.querySelectorAll('.nav-item').forEach(item => item.classList.remove('open'));

                    // Toggle clicked dropdown
                    if (!isOpen) {
                        parentItem.classList.add('open');
                    }
                }
            });
        });

        // Close menu when clicking outside or clicking any nav link
        document.addEventListener('click', (e) => {
            if (navMenu.classList.contains('active') && !navMenu.contains(e.target) && !hamburgerBtn.contains(e.target)) {
                hamburgerBtn.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            }
        });

        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                hamburgerBtn.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
    }
});
