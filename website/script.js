document.addEventListener('DOMContentLoaded', () => {

    // Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
            if (navLinks.style.display === 'flex') {
                navLinks.style.flexDirection = 'column';
                navLinks.style.position = 'absolute';
                navLinks.style.top = '70px';
                navLinks.style.right = '0';
                navLinks.style.width = '100%';
                navLinks.style.background = '#0a0a12';
                navLinks.style.padding = '2rem';
                navLinks.style.borderBottom = '1px solid rgba(255,255,255,0.05)';
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


// --- PROJECT DATA & LOADER ---

const projectsData = {
    "civic24": {
        title: "Civic24",
        tagline: "Bridging the gap between citizens and public services.",
        role: "Founder & Lead Engineer",
        timeline: "Jan 2023 - Present",
        stack: ["Flutter", "Dart", "Firebase", "Node.js", "Google Maps API"],
        heroColor: "linear-gradient(135deg, #13131f 0%, #1c1c2e 100%)",
        videoUrl: "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4", // Placeholder Sample
        links: {
            apple: "#",
            google: "#",
            web: "#"
        },
        challenge: "Public service delivery in Lagos is often fragmented. Citizens lacked a unified platform to report issues, track government projects, or access emergency services quickly. The technical challenge was building a real-time, location-aware system that could handle thousands of concurrent reports without crashing, while remaining accessible on low-bandwidth networks.",
        solution: "I architected a mobile-first solution using **Flutter** for cross-platform consistency. \n\nKey implementations included:\n• **Offline-first architecture** using Hive to cache reports when internet is unstable.\n• **Real-time Geo-fencing** to route reports to the nearest reliable agency.\n• **Optimized Image Compression** in Node.js to reduce upload bandwidth by 80%.\n\nAs the Lead Engineer, I managed the entire lifecycle from Figma prototypes to App Store deployment.",
        gallery: [
            { type: 'color', val: '#1c1c2e' },
            { type: 'color', val: '#2a2a35' },
            { type: 'color', val: '#13131f' }
        ],
        next: { id: "fintech-vault", name: "FinTech Vault" }
    },
    "fintech-vault": {
        title: "FinTech Vault",
        tagline: "Next-gen security for digital assets.",
        role: "Senior iOS Engineer",
        timeline: "2021 - 2022",
        stack: ["SwiftUI", "Combine", "CryptoKit", "FaceID"],
        heroColor: "linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)",
        links: {
            apple: "#",
            code: "#"
        },
        challenge: "Building a fintech app requires military-grade security without compromising user experience. The client needed a way to visualize complex crypto portfolios alongside traditional banking data in real-time.",
        solution: "Leveraged **SwiftUI** for a highly responsive, animated interface. Implemented **CryptoKit** for on-device key storage and biometric authentication steps. Used **Combine** pipelines to merge WebSocket streams from crypto exchanges with REST API data from banking backends seamlessly.",
        gallery: [
            { type: 'color', val: '#16213e' },
            { type: 'color', val: '#0f3460' }
        ],
        next: { id: "healthtrack", name: "HealthTrack Pro" }
    },
    "healthtrack": {
        title: "HealthTrack Pro",
        tagline: "Holistic health monitoring in your pocket.",
        role: "Mobile Engineer",
        timeline: "2020",
        stack: ["Kotlin", "Jetpack Compose", "Health Connect"],
        heroColor: "linear-gradient(135deg, #2c3e50 0%, #000000 100%)",
        links: {
            google: "#"
        },
        challenge: "Fragmented health data across devices made it hard for users to see the big picture. We needed to aggregate simpler metrics into meaningful health insights.",
        solution: "Built a native Android app using **Jetpack Compose**. Integrated **Health Connect** to sync data from wearables. Created custom drawing canvas components to render interactive sleep and heart-rate charts that perform at 60fps.",
        gallery: [
            { type: 'color', val: '#2c3e50' },
            { type: 'color', val: '#4ca1af' }
        ],
        next: { id: "civic24", name: "Civic24" }
    }
};

window.loadProjectData = function (id) {
    const data = projectsData[id];
    if (!data) return;

    // Text Content
    const titleEl = document.getElementById('p-title');
    if (titleEl) titleEl.innerText = data.title;

    const taglineEl = document.getElementById('p-tagline');
    if (taglineEl) taglineEl.innerText = data.tagline;

    const roleEl = document.getElementById('p-role');
    if (roleEl) roleEl.innerText = data.role;

    const timelineEl = document.getElementById('p-timeline');
    if (timelineEl) timelineEl.innerText = data.timeline;

    // Stack
    const stackContainer = document.getElementById('p-stack');
    if (stackContainer) {
        stackContainer.innerHTML = '';
        data.stack.forEach(tech => {
            const span = document.createElement('span');
            span.innerText = tech;
            stackContainer.appendChild(span);
        });
    }

    // Content
    const formatText = (text) => {
        return text.replace(/\n\n/g, '<br><br>').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    }

    const chalEl = document.getElementById('p-challenge');
    if (chalEl) chalEl.innerHTML = formatText(data.challenge);

    const solEl = document.getElementById('p-solution');
    if (solEl) solEl.innerHTML = formatText(data.solution);

    // Links
    if (data.links.apple) {
        const btn = document.getElementById('btn-apple');
        if (btn) { btn.href = data.links.apple; btn.classList.remove('hidden'); }
    }
    if (data.links.google) {
        const btn = document.getElementById('btn-google');
        if (btn) { btn.href = data.links.google; btn.classList.remove('hidden'); }
    }
    if (data.links.web) {
        const btn = document.getElementById('btn-web');
        if (btn) { btn.href = data.links.web; btn.classList.remove('hidden'); }
    }

    // Hero Visual
    const heroScreen = document.getElementById('p-hero-img');
    if (heroScreen) heroScreen.style.background = data.heroColor;

    // Gallery
    const galleryContainer = document.getElementById('p-gallery');
    if (galleryContainer) {
        galleryContainer.innerHTML = '';
        data.gallery.forEach(item => {
            const div = document.createElement('div');
            div.className = 'gallery-item';
            div.style.background = item.val;
            galleryContainer.appendChild(div);
        });
    }

    // Next Project
    if (data.next) {
        const nextName = document.getElementById('next-project-name');
        if (nextName) nextName.innerText = data.next.name;

        const nextLink = document.getElementById('next-project-link');
        if (nextLink) nextLink.href = `project-details.html?id=${data.next.id}`;
    }
};
