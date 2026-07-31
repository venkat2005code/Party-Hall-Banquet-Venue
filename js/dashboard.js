// Dashboard Specific Interactions

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Sidebar Toggle
    const sidebar = document.querySelector('.sidebar');
    const toggleBtn = document.createElement('button');
    if (sidebar) {
        toggleBtn.className = 'sidebar-toggle-btn';
        toggleBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 18l-6-6 6-6"/></svg>';
        sidebar.appendChild(toggleBtn);

        toggleBtn.addEventListener('click', () => {
            sidebar.classList.toggle('collapsed');
        });
    }

    // 2. ScrollSpy via IntersectionObserver
    const sections = document.querySelectorAll('.dash-section');
    const navItems = document.querySelectorAll('.sidebar-item');

    if (sections.length > 0 && navItems.length > 0) {
        const observerOptions = {
            root: null,
            rootMargin: '-20% 0px -60% 0px', // Trigger when section is in middle of viewport
            threshold: 0
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const id = entry.target.getAttribute('id');
                    // Remove active from all
                    navItems.forEach(item => item.classList.remove('active'));
                    // Add active to current
                    const activeLink = document.querySelector(`.sidebar-item[href="#${id}"]`);
                    if (activeLink) {
                        activeLink.classList.add('active');
                    }
                }
            });
        }, observerOptions);

        sections.forEach(section => {
            observer.observe(section);
        });

        // 3. Smooth scroll for sidebar links (intercept click)
        navItems.forEach(item => {
            item.addEventListener('click', function(e) {
                const targetId = this.getAttribute('href');
                if (targetId.startsWith('#')) {
                    e.preventDefault();
                    const targetSection = document.querySelector(targetId);
                    if (targetSection) {
                        targetSection.scrollIntoView({
                            behavior: 'smooth'
                        });
                        // Optional: close sidebar on mobile after click
                        if (window.innerWidth < 768) {
                            sidebar.classList.add('collapsed');
                        }
                    }
                }
            });
        });
    }

    // 4. Back to top FAB
    const backToTop = document.getElementById('fab-back-to-top');
    if (backToTop) {
        backToTop.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

});
