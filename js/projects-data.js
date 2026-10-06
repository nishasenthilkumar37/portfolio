/**
 * Portfolio Projects & Case Studies Data
 * Easily customizable for adding new projects, screenshots, or updating links.
 */

const portfolioProjects = [
  {
    id: "aura-ui",
    title: "Aura UI - Modern Design System",
    tagline: "Accessible UI Component Library & Design Tokens",
    category: "design-system",
    categoryLabel: "Design System & UI",
    image: "assets/images/project-aura-ui.svg",
    badge: "Featured Project",
    shortDesc: "A sleek, accessible design system with 40+ tokens, reusable components, WCAG AAA compliance, and Figma component parity.",
    fullDesc: "A comprehensive design system built from the ground up to bridge the gap between Figma design files and front-end code. It establishes unified typography scales, responsive spacing tokens, accessible contrast ratios, and interactive component states (hover, focus-visible, active, disabled).",
    role: "Lead UI Designer & Front-End Dev",
    duration: "4 Weeks",
    metrics: "40+ Components • 100% WCAG 2.1 AAA Compliant • 98% Lighthouse Score",
    challenge: "Design consistency across projects often suffers due to fragmented color palettes and lack of standardized accessible components.",
    solution: "Created semantic design tokens with CSS custom properties and matching Figma variants. Built keyboard-navigable components with rigorous ARIA states.",
    tags: ["Figma", "CSS3 Variables", "HTML5 Semantics", "Web Accessibility (a11y)", "Storybook Vibe"],
    demoUrl: "#",
    githubUrl: "https://github.com/",
    figmaUrl: "https://figma.com/"
  },
  {
    id: "novasphere",
    title: "Novasphere - SaaS Landing Experience",
    tagline: "High-Converting Dark Mode Product Page",
    category: "web-app",
    categoryLabel: "Front-End & UI",
    image: "assets/images/project-novasphere.svg",
    badge: "Trending",
    shortDesc: "Modern SaaS marketing landing page engineered with responsive CSS Grid layouts, glassmorphic cards, and micro-interactions.",
    fullDesc: "Designed to boost user engagement and product conversions. Features dynamic pricing calculators, interactive feature walkthrough tabs, glowing neon borders, and ultra-smooth CSS scroll transitions.",
    role: "Front-End Developer & UI Designer",
    duration: "3 Weeks",
    metrics: "Sub-second LCP (0.8s) • 100/100 Performance Score • Zero Framework Overhead",
    challenge: "Create a visually rich dark-mode SaaS page that looks premium while maintaining fast load times on low-power mobile devices.",
    solution: "Used pure CSS hardware-accelerated transforms, modern CSS layout techniques (`display: grid` with `subgrid`), and optimized SVG graphics.",
    tags: ["HTML5", "Modern CSS", "JavaScript (ES6+)", "Responsive Design", "UI/UX"],
    demoUrl: "#",
    githubUrl: "https://github.com/",
    figmaUrl: "https://figma.com/"
  },
  {
    id: "zenith-taskflow",
    title: "Zenith TaskFlow - Kanban Workspace",
    tagline: "Productivity Board with LocalStorage & Drag-and-Drop",
    category: "web-app",
    categoryLabel: "Interactive App",
    image: "assets/images/project-zenith-taskflow.svg",
    badge: "Interactive Demo",
    shortDesc: "Intuitive task management app with custom column boards, priority badges, state persistence, and keyboard shortcuts.",
    fullDesc: "A modular, distraction-free productivity app designed to keep solo developers and designers organized. Supports custom task filtering, tag-based search, dynamic task progress meters, and offline persistence via browser LocalStorage.",
    role: "Front-End Developer",
    duration: "2 Weeks",
    metrics: "Full Offline Support • 0 External JS Libraries • Instant Search",
    challenge: "Handling dynamic DOM updates and persistent client-side state without the overhead of heavy SPA frameworks.",
    solution: "Implemented clean Model-View separation in Vanilla JavaScript with event delegation and robust state serialisation.",
    tags: ["Vanilla JavaScript", "DOM API", "LocalStorage API", "CSS Flexbox", "CSS Grid"],
    demoUrl: "#",
    githubUrl: "https://github.com/",
    figmaUrl: null
  },
  {
    id: "foodie-haven",
    title: "FoodieHaven - Gourmet Recipe Finder",
    tagline: "API-Powered Dynamic Recipe & Nutrition Explorer",
    category: "web-app",
    categoryLabel: "API Integration",
    image: "assets/images/project-foodiehaven.svg",
    badge: "API Powered",
    shortDesc: "Recipe discovery platform integrating external REST APIs with debounced search, dietary filters, and nutritional breakdowns.",
    fullDesc: "Allows culinary enthusiasts to browse thousands of global dishes. Features asynchronous data fetching, graceful loading skeleton states, interactive ingredient checklists, and responsive card grids.",
    role: "Front-End Developer",
    duration: "3 Weeks",
    metrics: "Async REST API Fetching • Debounced Search • Skeleton Loading States",
    challenge: "Preventing UI jank during rapid search queries and gracefully handling API rate limits and network errors.",
    solution: "Created custom JavaScript debounce utilities, client-side query caching, and user-friendly error fallback states.",
    tags: ["JavaScript (Async/Await)", "REST APIs", "Fetch API", "CSS Animations", "Mobile First"],
    demoUrl: "#",
    githubUrl: "https://github.com/",
    figmaUrl: null
  },
  {
    id: "ecotrack",
    title: "EcoTrack - Carbon Footprint Dashboard",
    tagline: "Data Visualisation & Sustainability Metrics",
    category: "ui-ux",
    categoryLabel: "UI/UX & Data Viz",
    image: "assets/images/project-ecotrack.svg",
    badge: "Case Study",
    shortDesc: "Interactive environmental dashboard featuring custom SVG charts, emission calculators, and goal tracking milestones.",
    fullDesc: "A case study and interactive UI prototype built to help individuals monitor and reduce their daily ecological footprint. Includes interactive sliders for transport/energy consumption and instant comparative visualizations.",
    role: "UI/UX Designer & Prototyper",
    duration: "2 Weeks",
    metrics: "Custom Dynamic SVG Charts • User Tested with 15 Participants",
    challenge: "Translating complex climate metric equations into simple, engaging, and motivating visual charts.",
    solution: "Conducted user research wireframing in Figma, followed by an interactive dashboard built with semantic HTML and dynamic SVG bar charts.",
    tags: ["Figma Wireframing", "SVG Graphics", "User Research", "Data Visualization", "JavaScript"],
    demoUrl: "#",
    githubUrl: "https://github.com/",
    figmaUrl: "https://figma.com/"
  },
  {
    id: "pixelcraft",
    title: "PixelCraft - Creative Agency Prototype",
    tagline: "Bold Typography & Expressive Motion UI",
    category: "ui-ux",
    categoryLabel: "Creative Design",
    image: "assets/images/project-pixelcraft.svg",
    badge: "Experimental",
    shortDesc: "Experimental agency portfolio concept featuring bold brutalist typography, magnetic button hover physics, and fluid theme transitions.",
    fullDesc: "An exploratory design exploration focusing on micro-interactions, editorial typography, and high-impact visual hierarchy. Tested interactive mouse glow effects and accessible color contrast pairings.",
    role: "UI/UX Designer & Creative Coder",
    duration: "2 Weeks",
    metrics: "60 FPS Micro-Interactions • Custom Cursor & Physics",
    challenge: "Balancing experimental visual flair with clean typography readability and mobile responsiveness.",
    solution: "Crafted modular typographic scale with CSS clamp() and graceful fallbacks for mobile touch devices.",
    tags: ["Creative Direction", "Micro-Interactions", "CSS Transitions", "Figma", "Web Design"],
    demoUrl: "#",
    githubUrl: "https://github.com/",
    figmaUrl: "https://figma.com/"
  }
];

// Testimonials / Recommendations Data
const portfolioTestimonials = [
  {
    quote: "An exceptional eye for layout balance, color harmony, and semantic code structure. Creates websites that are not only beautiful but also accessible and blazing fast.",
    author: "Elena Vance",
    role: "Senior Product Designer",
    company: "Studio Craft",
    avatar: "EV"
  },
  {
    quote: "Very impressed by the clean code quality, attention to responsiveness, and eagerness to adopt modern CSS best practices. A rising front-end talent!",
    author: "Marcus Chen",
    role: "Lead Front-End Engineer",
    company: "TechPulse Labs",
    avatar: "MC"
  },
  {
    quote: "Delivered our landing page wireframes and interactive prototype ahead of schedule. The design system tokens made handoff effortless.",
    author: "Sarah Jenkins",
    role: "Product Manager",
    company: "Novasphere AI",
    avatar: "SJ"
  }
];

// Learning Journey & Milestones Data
const portfolioTimeline = [
  {
    year: "2024 - Present",
    title: "Front-End Developer & UI Designer",
    subtitle: "Freelance & Open Source Projects",
    description: "Building production-ready responsive web apps, creating Figma design systems, and contributing to open-source UI libraries with a focus on web performance (CWV) and WCAG accessibility."
  },
  {
    year: "2023 - 2024",
    title: "Front-End Web Development Specialization",
    subtitle: "Advanced JavaScript & Modern CSS Mastery",
    description: "Deepened core computer science foundations in Vanilla JavaScript (ES6+), asynchronous APIs, DOM manipulation, responsive layouts (CSS Grid, Flexbox), and Git version control workflows."
  },
  {
    year: "2023",
    title: "UI/UX Design Foundation Certification",
    subtitle: "Figma, User Research & Design Systems",
    description: "Completed intensive training on human-centered design, wireframing, high-fidelity interactive prototyping, design tokens, color theory, and typographic hierarchy."
  }
];
