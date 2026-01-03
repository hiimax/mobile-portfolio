# Mobile Portfolio | Production Ready

This is a premium, mobile-first portfolio website built for a Senior Mobile Engineer. It features high-end animations, a terminal-style bio, and a dynamic project details system.

## 🚀 Deployment Guide

### 1. Upload to Hosting
This site is static HTML/CSS/JS. You can host it anywhere.
**Recommended:** [Netlify](https://www.netlify.com/) or [Vercel](https://vercel.com/):
1.  Drag and drop this entire folder into their dashboard.
2.  It will be live in seconds.

### 2. Custom Domain
After deploying, go to your host settings and add your domain (e.g., `barryshodeke.com`).

## 🛠 Content Management

### Making Changes
*   **Location:** `/Users/mac/frontend_project/mobile_portfolio`
*   **Bio/Socials:** Edit `index.html` and `about.html`.
*   **Projects:** 
    *   To change the list on the main page: Edit `projects.html`.
    *   To change the **details** (text, stack, images): Edit `script.js` (Search for `const projectsData`).
*   **Experiences:** Edit `experience.html`.

### Adding Images & Videos
1.  Create an `images/` folder for screenshots and a `videos/` folder for clips.
2.  **To add a Hero Video:**
    Open `script.js` and add a `videoUrl` property to your project:
    ```javascript
    "civic24": {
        // ...
        videoUrl: "videos/civic24-demo.mp4", 
        // ...
    }
    ```
    *Note: Use MP4 or WebM formats. Keep them short (under 10s) and small size for best performance.*

3.  **To add Gallery Images:**
    Update the `gallery` array in `script.js`:
    ```javascript
    gallery: [
        { type: 'image', url: 'images/civic24-1.png' },
        { type: 'image', url: 'images/civic24-2.png' }
    ]
    ```

### Resume
*   A placeholder `resume.pdf` exists.
*   **Action:** Replace `resume.pdf` with your actual PDF file (keep the same name, or update links in all HTML files).

## 🎨 Tech Stack
*   **HTML5:** Semantic and SEO optimized.
*   **CSS3:** Custom variables, glassmorphism, flexbox/grid. No frameworks.
*   **Vanilla JS:** specialized data loader for project details (`script.js`).

## 📱 Features
*   **Dark Mode Premium UI:** Custom cursors and gradients.
*   **Dynamic Project Pages:** `project-details.html?id=xyz` loads data dynamically.
*   **Video Support:** Auto-playing project demos in phone frames.
*   **Mobile First:** Hamburger menus and touch-friendly layouts.
*   **SEO Ready:** Meta tags and Favicons included.

---
© 2025 Barry Shodeke
