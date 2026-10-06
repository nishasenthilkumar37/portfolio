# 🚀 Professional Personal Portfolio Website

A modern, responsive, and accessible personal portfolio website built with pure semantic **HTML5**, **CSS3 (Custom Properties & Modern Layouts)**, and modular **Vanilla JavaScript (ES6+)**. Specifically tailored for beginner web designers and front-end developers to showcase design systems, interactive web applications, and UI/UX case studies.

---

## ✨ Key Features

- 🎨 **Theme & Accent Color Engine**:
  - Dark / Light mode toggle with `localStorage` persistence and system preference detection (`prefers-color-scheme`).
  - Interactive Accent Color Picker (Indigo, Emerald, Cyan, Violet, Rose, Amber) with live CSS variable propagation.
- ⚡ **Interactive Hero Section**:
  - Dynamic typewriter role rotator (*Front-End Developer*, *UI/UX Web Designer*, *Figma & Design Systems Builder*, etc.).
  - Pulsing live availability badge.
  - Animated stats counters (*15+ Projects*, *100% Responsive*, *40+ Components*, *98% Lighthouse*).
- 🧩 **Curated Case Studies & Filterable Projects**:
  - Filter by category (*All*, *Web Apps & Front-End*, *Design Systems*, *UI/UX & Prototypes*).
  - Deep-dive interactive modal dialog (`<dialog>`) detailing Project Overviews, Challenges, Solutions, Metrics, and Live Demo / GitHub / Figma links.
- 📊 **Skills & Technical Matrix**:
  - Animated proficiency indicators triggered by `IntersectionObserver`.
  - Categorized into UI/UX Design, Front-End Development, and Workflow / Developer Tools.
- 🛤️ **Process & Learning Journey (Timeline)**:
  - 4-step creative process from discovery to deployment.
  - Interactive career & education milestone timeline.
- 💬 **Interactive Contact Form & Feedback**:
  - Live client-side validation, live character counter, simulated loading feedback, and one-click "Copy Email" button.
- ♿ **Accessibility & Performance First**:
  - Semantic HTML landmarks, ARIA attributes, `:focus-visible` styling, and `prefers-reduced-motion` compliance.
  - 100% self-contained SVG graphics — no broken external image links.

---

## 📁 Project Structure

```
portfolio/
├── index.html                   # Semantic HTML5 master document
├── README.md                    # Documentation & setup guide
├── css/
│   └── style.css                # Modular styles, custom properties, animations, & media queries
├── js/
│   ├── main.js                  # Theme engine, rotator, modal, form validation, & scrollspy
│   └── projects-data.js         # Configurable projects, case studies, & testimonials data
└── assets/
    └── images/
        ├── avatar.svg           # Developer character avatar
        ├── project-aura-ui.svg  # Aura UI Design System visual
        ├── project-novasphere.svg # Novasphere SaaS preview
        ├── project-zenith-taskflow.svg # Zenith TaskFlow Kanban preview
        ├── project-foodiehaven.svg # FoodieHaven recipe app preview
        ├── project-ecotrack.svg # EcoTrack sustainability dashboard preview
        └── project-pixelcraft.svg # PixelCraft studio preview
```

---

## 🛠️ How to Customize

### 1. Update Your Name, Bio, and Social Links
Open [`index.html`](index.html) and search for:
- Replace `Alex Rivers` with your real name.
- Replace `alex.developer@example.com` with your email.
- Update your social links:
  - GitHub: `https://github.com/yourusername`
  - LinkedIn: `https://linkedin.com/in/yourusername`
  - Figma: `https://figma.com/@yourusername`

### 2. Add or Edit Projects
Open [`js/projects-data.js`](js/projects-data.js) to easily edit or add new project cards. Each project object contains:
```javascript
{
  id: "my-new-project",
  title: "Project Title",
  tagline: "Short tagline",
  category: "web-app", // 'web-app', 'design-system', or 'ui-ux'
  categoryLabel: "Front-End & UI",
  image: "assets/images/your-screenshot.png",
  badge: "Featured",
  shortDesc: "Brief card description...",
  fullDesc: "Detailed overview...",
  role: "Front-End Developer",
  duration: "2 Weeks",
  metrics: "Key outcomes & performance stats...",
  challenge: "What problem was solved...",
  solution: "Technical & design implementation...",
  tags: ["HTML5", "CSS3", "JavaScript"],
  demoUrl: "https://your-live-demo.com",
  githubUrl: "https://github.com/yourusername/repo",
  figmaUrl: "https://figma.com/file/..."
}
```

### 3. Replace Avatar or Images
You can replace `assets/images/avatar.svg` with your own profile photo (`.png`, `.jpg`, `.webp`) by placing it in `assets/images/` and updating the `src` attribute in [`index.html`](index.html).

---

## 🌐 Free Deployment Options

### Option A: GitHub Pages (Recommended)
1. Initialize a git repository and commit your files:
   ```bash
   git init
   git add .
   git commit -m "Initial portfolio commit"
   ```
2. Create a repository on GitHub (e.g. `portfolio` or `<your-username>.github.io`).
3. Push your code:
   ```bash
   git remote add origin https://github.com/<your-username>/portfolio.git
   git branch -M main
   git push -u origin main
   ```
4. Go to **Settings > Pages** on your GitHub repo and select `main` branch root (`/`). Your site will be live at `https://<your-username>.github.io/portfolio` in seconds!

### Option B: Vercel / Netlify
1. Drag and drop the `portfolio` folder directly into [Vercel](https://vercel.com) or [Netlify Drop](https://app.netlify.com/drop).
2. It will deploy automatically with zero build configuration needed.
