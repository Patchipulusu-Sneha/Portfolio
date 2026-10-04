# Patchipulusu Sneha - Personal Portfolio Website

A modern, responsive, high-performance personal portfolio website built with **HTML5, CSS3, Bootstrap 5, and Vanilla JavaScript (ES6+)**. Engineered for a Full Stack Development college assignment demonstration.

---

## 🌟 Live Preview & Features

- **Dark Navy Theme with Electric Blue & Purple Accents**: Sleek, glassmorphic card design with modern contrast.
- **Light/Dark Mode Toggle**: Persistent theme preference stored via browser `localStorage`.
- **Dynamic Project Filtering**: Filter projects in real-time by technology tags (*All, React.js, Node.js, JavaScript*).
- **Responsive Navigation**: Bootstrap 5 sticky navbar with active section scroll-spy indicator and mobile auto-collapsing.
- **Client-Side Form Validation**: Real-time inline field validation and submission handling with informative browser demo alerts.
- **In-Browser Resume Generator & Download**: One-click resume generator producing a formatted HTML document and auto-triggering the browser's PDF print dialog without external dependencies.
- **CSS-Generated Avatar & Visual Mockups**: Stylized SVG vector illustration and device frames without broken image dependencies.
- **Scroll-Reveal Animations**: Native `IntersectionObserver` animations with respect for `prefers-reduced-motion`.
- **Back-to-Top Button**: Smooth floating button dynamically revealed upon page scroll.

---

## 📁 Project Structure

This project is completely self-contained within four core files:

```text
portfolio/
├── index.html        # Semantic HTML5 document structure
├── style.css         # Custom CSS3 styles, CSS variables, & responsive rules
├── script.js         # Vanilla ES6+ JavaScript interactivity and validation
└── README.md         # Documentation & deployment guide
```

*Note: No external build step, npm modules, or image folders are required.*

---

## 🚀 How to Run Locally

### Option 1: VS Code Live Server (Recommended)
1. Open the project folder (`portfolio`) in **Visual Studio Code**.
2. Install the **Live Server** extension by *Ritwick Dey* (if not already installed).
3. Right-click on `index.html` and select **"Open with Live Server"**.
4. The portfolio will automatically open in your default browser at `http://127.0.0.1:5500/index.html`.

### Option 2: Direct Browser Launch
1. Navigate to the project directory in your file explorer.
2. Double-click `index.html` to open it directly in Chrome, Edge, Firefox, or Safari.

---

## 🌐 How to Deploy to GitHub Pages

1. **Initialize Git Repository**:
   ```bash
   git init
   git add .
   git commit -m "Initial commit of Patchipulusu Sneha portfolio website"
   ```

2. **Push to GitHub**:
   - Create a new public repository on [GitHub](https://github.com) named `portfolio` or `<your-username>.github.io`.
   - Link your remote repository and push:
     ```bash
     git branch -M main
     git remote add origin https://github.com/<your-username>/<your-repo-name>.git
     git push -u origin main
     ```

3. **Enable GitHub Pages**:
   - Go to your repository settings on GitHub (**Settings** > **Pages**).
   - Under **Build and deployment** > **Source**, choose **Deploy from a branch**.
   - Select the branch `main` and folder `/ (root)`, then click **Save**.
   - Within 1–2 minutes, your live portfolio will be accessible at:
     `https://<your-username>.github.io/<your-repo-name>/`

---

## 📋 Evaluation Checklist (College Assignment)

| Requirement | Implementation Details | Status |
| :--- | :--- | :---: |
| **HTML5 Structure** | Semantic tags (`<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`, `<form>`), ARIA labels | ✅ Passed |
| **CSS3 Styling** | CSS variables, Flexbox, Grid, Glassmorphism, animations, responsive breakpoints | ✅ Passed |
| **Bootstrap 5** | Grid system, Navbar, Responsive utilities, CDN integration | ✅ Passed |
| **Vanilla JS (ES6+)** | Arrow functions, template literals, `localStorage`, `IntersectionObserver`, DOM event listeners | ✅ Passed |
| **Client Validation** | Real-time feedback, email regex, error states, assignment demo notice | ✅ Passed |
| **Theme Toggle** | Dark / Light theme toggle with persistence in `localStorage` | ✅ Passed |
| **Project Filter** | Filter project items dynamically by category without reload | ✅ Passed |
| **Resume Download** | Self-contained, generates clean printable HTML/PDF directly in-browser | ✅ Passed |
| **Zero Missing Assets** | Inline SVG vectors, CSS avatar, and CDN fonts; no missing file errors | ✅ Passed |

---

## 👤 Candidate Information

- **Name**: Patchipulusu Sneha
- **Email**: [patchipulususneha@gmail.com](mailto:patchipulususneha@gmail.com)
- **Phone**: +91-9032255883
- **Location**: Hyderabad, India
- **LinkedIn**: [linkedin.com/in/patchipulusu-sneha-328bb7308](https://www.linkedin.com/in/patchipulusu-sneha-328bb7308)
- **College**: Stanley College of Engineering and Technology for Women, Hyderabad
- **Degree**: B.E. Computer Science Engineering (2023–2027) | CGPA: 8.88
