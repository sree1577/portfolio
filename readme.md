# Sri Naga Dhanyata Kothapalli — Personal Portfolio

A modern, minimalistic personal portfolio website built with pure HTML, CSS, and JavaScript. No frameworks, no dependencies — just clean code.

🌐 **Live Site:** _your-netlify-url-here_

---

## Features

- Animated loading screen
- Floating particles background with connected nodes
- Typing animation (Full Stack Developer, AI Enthusiast, etc.)
- Sticky navbar with active link highlighting
- Mobile-responsive hamburger menu
- Scroll reveal animations with stagger effect
- Glassmorphism card design
- Vertical timeline for work experience
- Project cards with GitHub links
- Resume download button (PDF)
- EmailJS-powered contact form (real emails, no backend)
- mailto links with pre-filled subject
- Scroll-to-top button
- Ripple effect on buttons
- Custom scrollbar
- Fully responsive — mobile, tablet, desktop

---

## Sections

| Section | Description |
|---|---|
| Hero | Name, typing animation, intro, CTA buttons |
| About | 4 feature cards + bio + stats |
| Skills | 17 skill cards with hover animations |
| Experience | Timeline with 5 internships |
| Projects | SR-TODO, ThriUCare |
| Education | B.Tech IT — SVECW 2023–2027 |
| Contact | EmailJS form + social links |

---

## Tech Stack

- **HTML5** — semantic structure
- **CSS3** — custom properties, glassmorphism, animations, grid/flexbox
- **JavaScript (ES6+)** — vanilla JS, Canvas API, IntersectionObserver
- **EmailJS** — contact form email delivery
- **Google Fonts** — Inter + Fira Code
- **Font Awesome 6** — icons

---

## Project Structure

```
Portfolio/
├── index.html              # Main HTML file
├── style.css               # All styles
├── script.js               # All JavaScript
├── March-resume-2026.pdf   # Downloadable resume
└── readme.md               # This file
```

---

## EmailJS Configuration

The contact form uses [EmailJS](https://emailjs.com) to send emails without a backend.

| Key | Value |
|---|---|
| Service ID | `service_ydr05ce` |
| Template ID | `template_4e6ulsy` |
| Public Key | stored in `script.js` |

Template variables used: `{{from_name}}`, `{{from_email}}`, `{{message}}`

---

## Deployment

### Netlify (Recommended)
1. Go to [netlify.com](https://netlify.com)
2. Drag and drop the `Portfolio` folder onto the dashboard
3. Site goes live instantly at a `*.netlify.app` URL
4. Rename under **Site Settings → Change site name**

### GitHub Pages
1. Push this folder to a GitHub repository
2. Go to **Settings → Pages**
3. Set source to `main` branch → `/ (root)`
4. Site goes live at `https://username.github.io/repo-name`

---

## Contact

- **Email:** srinagadhanyata06@gmail.com
- **GitHub:** [github.com/sree1577](https://github.com/sree1577)
- **LinkedIn:** [linkedin.com/in/dhanyata-chowdary-kothapalli23b01a1286](https://www.linkedin.com/in/dhanyata-chowdary-kothapalli23b01a1286)

---

Built with ❤️ by **Sri Naga Dhanyata Kothapalli**
