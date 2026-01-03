document.addEventListener('DOMContentLoaded', () => {

    // Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            document.body.classList.toggle('no-scroll'); // Lock scroll

            // Optional: Animate hamburger icon
            const icon = menuToggle.querySelector('i');
            if (icon) {
                if (navLinks.classList.contains('active')) {
                    icon.classList.remove('fa-bars');
                    icon.classList.add('fa-times');
                } else {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            }
        });

        // Close menu when a link is clicked (excluding dropdown triggers)
        const links = navLinks.querySelectorAll('a:not(.dropdown-trigger)');
        links.forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                document.body.classList.remove('no-scroll');
                const icon = menuToggle.querySelector('i');
                if (icon) {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            });
        });
        // Dropdown Toggle for Mobile
        const dropdowns = document.querySelectorAll('.nav-item-dropdown');
        dropdowns.forEach(drop => {
            const trigger = drop.querySelector('.dropdown-trigger');
            if (trigger) {
                trigger.addEventListener('click', (e) => {
                    // Only prevent default if window width is small (mobile)
                    if (window.innerWidth <= 968) {
                        e.preventDefault();
                        drop.classList.toggle('active');
                    }
                });
            }
        });
    }

    // Scroll Observer for Fade In Animations
    const observerOptions = {
        threshold: 0.2
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optional: Stop observing once visible
                // observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        section.classList.add('fade-in-section'); // Add initial CSS class
        observer.observe(section);
    });

    // Add CSS for fade-in programmatically if not in CSS
    const styleSheet = document.createElement("style");
    styleSheet.innerText = `
        .fade-in-section {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.6s ease-out, transform 0.6s ease-out;
        }
        .fade-in-section.visible {
            opacity: 1;
            transform: translateY(0);
        }
    `;
    document.head.appendChild(styleSheet);
});

/* Dynamic Active Link Highlighting */
const currentPath = window.location.pathname.split('/').pop() || 'index.html';
const navItems = document.querySelectorAll('.nav-links a');

navItems.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPath) {
        link.classList.add('active');
        // If it's inside a dropdown, highlight the parent trigger too
        const parentDropdown = link.closest('.nav-item-dropdown');
        if (parentDropdown) {
            const trigger = parentDropdown.querySelector('.dropdown-trigger');
            if (trigger) trigger.classList.add('active');
            // Ensure dropdown is expanded on desktop if needed (optional, usually hover handled by CSS)
        }
    } else {
        // Clean up hardcoded actives if any (except for specific cases if needed)
        link.classList.remove('active');
    }
});

/* Project Data removed in favor of static pages for reliability */

/* Command Palette Implementation */
document.addEventListener('DOMContentLoaded', () => {
    // 1. Inject HTML
    const cmdPaletteHTML = `
        <div class="cmd-palette-overlay" id="cmdOverlay">
            <div class="cmd-palette-modal">
                <div class="cmd-bar">
                    <i class="fas fa-search"></i>
                    <input type="text" class="cmd-input" id="cmdInput" placeholder="Type a command or search...">
                </div>
                <ul class="cmd-results" id="cmdResults">
                    <!-- Results injected here -->
                </ul>
                <div class="cmd-footer">
                    <span><span class="cmd-key">↑↓</span>to navigate</span>
                    <span><span class="cmd-key">↵</span>to select</span>
                    <span><span class="cmd-key">esc</span>to close</span>
                </div>
            </div>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', cmdPaletteHTML);

    // 2. Data
    const pages = [
        { title: 'Home', url: 'index.html', icon: 'fa-home', type: 'Page' },
        { title: 'About', url: 'about.html', icon: 'fa-user', type: 'Page' },
        { title: 'Experience', url: 'experience.html', icon: 'fa-briefcase', type: 'Page' },
        { title: 'Projects', url: 'projects.html', icon: 'fa-code', type: 'Page' },
        { title: 'Testimonials', url: 'testimonials.html', icon: 'fa-comment-alt', type: 'Page' },
        { title: 'Contact', url: 'contact.html', icon: 'fa-envelope', type: 'Page' },
        { title: 'Uses', url: 'uses.html', icon: 'fa-laptop-code', type: 'Page' },
        { title: 'Resume', url: 'resume.pdf', icon: 'fa-file-pdf', type: 'Document' },
        // Project Shortcuts
        { title: 'Project: Civic24', url: 'project-civic24.html', icon: 'fa-mobile-alt', type: 'Project' },
        { title: 'Project: FinTech Vault', url: 'project-fintech-vault.html', icon: 'fa-shield-alt', type: 'Project' },
        { title: 'Project: HealthTrack', url: 'project-healthtrack.html', icon: 'fa-heartbeat', type: 'Project' },
    ];

    // 3. Logic
    const overlay = document.getElementById('cmdOverlay');
    const input = document.getElementById('cmdInput');
    const resultsList = document.getElementById('cmdResults');
    let isOpen = false;
    let selectedIndex = 0;
    let filteredItems = [];

    // Toggle Palette
    function togglePalette(show) {
        isOpen = show;
        if (show) {
            overlay.classList.add('visible');
            input.value = '';
            input.focus();
            filterItems('');
        } else {
            overlay.classList.remove('visible');
        }
    }

    // Render List
    function renderList() {
        resultsList.innerHTML = '';
        filteredItems.forEach((item, index) => {
            const li = document.createElement('li');
            li.className = `cmd-item ${index === selectedIndex ? 'active' : ''}`;
            li.innerHTML = `
                <div class="cmd-item-left">
                    <i class="fas ${item.icon} cmd-icon"></i>
                    <span>${item.title}</span>
                </div>
                <span class="cmd-shortcut">${item.type}</span>
            `;
            li.addEventListener('click', () => {
                window.location.href = item.url;
                togglePalette(false);
            });
            resultsList.appendChild(li);
        });

        if (filteredItems.length === 0) {
            resultsList.innerHTML = `<li class="cmd-item" style="justify-content:center; opacity:0.5;">No results found</li>`;
        }
    }

    // Filter Items
    function filterItems(query) {
        const q = query.toLowerCase();
        filteredItems = pages.filter(page =>
            page.title.toLowerCase().includes(q)
        );
        selectedIndex = 0;
        renderList();
    }

    // Keyboard Events
    document.addEventListener('keydown', (e) => {
        // Toggle Cmd+K / Ctrl+K
        if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
            e.preventDefault();
            togglePalette(!isOpen);
        }

        if (!isOpen) return;

        // Navigation
        if (e.key === 'Escape') {
            togglePalette(false);
        } else if (e.key === 'ArrowDown') {
            e.preventDefault();
            selectedIndex = (selectedIndex + 1) % filteredItems.length;
            renderList();
            scrollToSelected();
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            selectedIndex = (selectedIndex - 1 + filteredItems.length) % filteredItems.length;
            renderList();
            scrollToSelected();
        } else if (e.key === 'Enter') {
            if (filteredItems[selectedIndex]) {
                window.location.href = filteredItems[selectedIndex].url;
                togglePalette(false);
            }
        }
    });

    input.addEventListener('input', (e) => {
        filterItems(e.target.value);
    });

    // Close on backdrop click
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
            togglePalette(false);
        }
    });

    function scrollToSelected() {
        const activeItem = resultsList.children[selectedIndex];
        if (activeItem) {
            activeItem.scrollIntoView({ block: 'nearest' });
        }
    }
});
