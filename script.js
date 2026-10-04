/**
 * Portfolio JavaScript Implementation
 * Candidate: Patchipulusu Sneha
 * Features:
 *  - Theme Toggle (Dark/Light) with localStorage persistence
 *  - Project Filtering by Technology (React, Node, JavaScript, All)
 *  - Active Navbar Highlighting via IntersectionObserver & scroll fallback
 *  - Smooth Scrolling with Mobile Navigation Auto-Collapse
 *  - Scroll-reveal Animations using IntersectionObserver
 *  - Back-to-Top Button
 *  - Client-Side Contact Form Validation with real-time feedback
 *  - Dynamic Copyright Year
 *  - In-browser Resume Generator & Downloader (Formatted Clean HTML/Printable PDF)
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // ==========================================
  // 1. DYNAMIC COPYRIGHT YEAR
  // ==========================================
  const yearElement = document.getElementById('currentYear');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  // ==========================================
  // 2. THEME TOGGLE (DARK / LIGHT)
  // ==========================================
  const themeToggleBtn = document.getElementById('themeToggleBtn');
  const htmlRoot = document.documentElement;

  // Retrieve saved theme or default to 'dark'
  const savedTheme = localStorage.getItem('portfolio-theme') || 'dark';
  applyTheme(savedTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = htmlRoot.getAttribute('data-theme') || 'dark';
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      applyTheme(newTheme);
      localStorage.setItem('portfolio-theme', newTheme);
    });
  }

  function applyTheme(theme) {
    htmlRoot.setAttribute('data-theme', theme);
    if (themeToggleBtn) {
      themeToggleBtn.setAttribute('aria-label', `Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`);
    }
  }

  // ==========================================
  // 3. NAVBAR SCROLL EFFECT & MOBILE COLLAPSE
  // ==========================================
  const navbar = document.getElementById('mainNavbar');
  const navLinks = document.querySelectorAll('.nav-pills-custom .nav-link');
  const navbarCollapse = document.getElementById('navbarContent');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      navbar?.classList.add('scrolled');
    } else {
      navbar?.classList.remove('scrolled');
    }
  }, { passive: true });

  // Close mobile collapse when clicking any nav link
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (navbarCollapse && navbarCollapse.classList.contains('show')) {
        const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
        if (bsCollapse) {
          bsCollapse.hide();
        }
      }
    });
  });

  // ==========================================
  // 4. ACTIVE NAVBAR HIGHLIGHTING ON SCROLL
  // ==========================================
  const sections = document.querySelectorAll('section[id]');

  function updateActiveNavLink() {
    const scrollY = window.pageYOffset;

    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute('id');
      const correspondingLink = document.querySelector(`.nav-pills-custom a[href*="${sectionId}"]`);

      if (correspondingLink) {
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          navLinks.forEach(link => link.classList.remove('active'));
          correspondingLink.classList.add('active');
        }
      }
    });
  }

  window.addEventListener('scroll', updateActiveNavLink, { passive: true });
  updateActiveNavLink(); // Initial run

  // ==========================================
  // 5. PROJECT FILTERING BY CATEGORY
  // ==========================================
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectItems = document.querySelectorAll('.project-item');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Toggle active button style
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      projectItems.forEach(item => {
        const categories = (item.getAttribute('data-category') || '').toLowerCase().split(' ');

        if (filterValue === 'all' || categories.includes(filterValue.toLowerCase())) {
          item.style.display = 'block';
          // Trigger slight fade-in animation
          item.classList.add('is-revealed');
        } else {
          item.style.display = 'none';
        }
      });
    });
  });

  // ==========================================
  // 6. SCROLL REVEAL ANIMATIONS (IntersectionObserver)
  // ==========================================
  const revealElements = document.querySelectorAll('.reveal-fade');

  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
          observer.unobserve(entry.target);
        }
      });
    }, {
      root: null,
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));
  } else {
    // Fallback for browsers without IntersectionObserver
    revealElements.forEach(el => el.classList.add('is-revealed'));
  }

  // ==========================================
  // 7. BACK TO TOP BUTTON
  // ==========================================
  const backToTopBtn = document.getElementById('backToTopBtn');

  if (backToTopBtn) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 400) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    }, { passive: true });

    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // ==========================================
  // 8. CONTACT FORM CLIENT-SIDE VALIDATION
  // ==========================================
  const contactForm = document.getElementById('contactForm');
  const senderName = document.getElementById('senderName');
  const senderEmail = document.getElementById('senderEmail');
  const senderSubject = document.getElementById('senderSubject');
  const senderMessage = document.getElementById('senderMessage');

  const formSuccessAlert = document.getElementById('formSuccessAlert');
  const formErrorAlert = document.getElementById('formErrorAlert');
  const formSuccessText = document.getElementById('formSuccessText');
  const formErrorText = document.getElementById('formErrorText');

  // Regex for standard email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  function validateField(input, isValid, feedbackMessage = '') {
    if (isValid) {
      input.classList.remove('is-invalid');
      input.classList.add('is-valid');
      return true;
    } else {
      input.classList.remove('is-valid');
      input.classList.add('is-invalid');
      const feedbackElem = input.nextElementSibling;
      if (feedbackElem && feedbackMessage) {
        feedbackElem.textContent = feedbackMessage;
      }
      return false;
    }
  }

  // Real-time validation on input
  if (senderName) {
    senderName.addEventListener('input', () => {
      validateField(senderName, senderName.value.trim().length >= 2, 'Name must be at least 2 characters long.');
    });
  }

  if (senderEmail) {
    senderEmail.addEventListener('input', () => {
      validateField(senderEmail, emailRegex.test(senderEmail.value.trim()), 'Please provide a valid email address.');
    });
  }

  if (senderSubject) {
    senderSubject.addEventListener('input', () => {
      validateField(senderSubject, senderSubject.value.trim().length >= 3, 'Subject must be at least 3 characters long.');
    });
  }

  if (senderMessage) {
    senderMessage.addEventListener('input', () => {
      validateField(senderMessage, senderMessage.value.trim().length >= 10, 'Message must be at least 10 characters long.');
    });
  }

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const isNameValid = validateField(senderName, senderName.value.trim().length >= 2, 'Please enter your name (minimum 2 characters).');
      const isEmailValid = validateField(senderEmail, emailRegex.test(senderEmail.value.trim()), 'Please enter a valid email address.');
      const isSubjectValid = validateField(senderSubject, senderSubject.value.trim().length >= 3, 'Please enter a subject (minimum 3 characters).');
      const isMessageValid = validateField(senderMessage, senderMessage.value.trim().length >= 10, 'Please enter a message (minimum 10 characters).');

      if (isNameValid && isEmailValid && isSubjectValid && isMessageValid) {
        // Hide error banner if visible
        formErrorAlert.classList.add('d-none');
        formErrorAlert.classList.remove('d-flex');

        // Show detailed success validation banner
        const userName = senderName.value.trim();
        formSuccessText.innerHTML = `<strong>Validated!</strong> Thank you, <strong>${userName}</strong>. Your message was successfully validated client-side. (College Assignment Demo: No server backend is required).`;
        formSuccessAlert.classList.remove('d-none');
        formSuccessAlert.classList.add('d-flex');

        // Reset form controls
        contactForm.reset();
        [senderName, senderEmail, senderSubject, senderMessage].forEach(input => {
          input.classList.remove('is-valid');
          input.classList.remove('is-invalid');
        });

        // Hide success alert automatically after 7 seconds
        setTimeout(() => {
          formSuccessAlert.classList.add('d-none');
          formSuccessAlert.classList.remove('d-flex');
        }, 7000);
      } else {
        formSuccessAlert.classList.add('d-none');
        formSuccessAlert.classList.remove('d-flex');

        formErrorText.textContent = 'Please correct the highlighted fields before submitting.';
        formErrorAlert.classList.remove('d-none');
        formErrorAlert.classList.add('d-flex');
      }
    });
  }
  const downloadResumeBtn = document.getElementById('downloadResumeBtn');
  const downloadResumeBtnContact = document.getElementById('downloadResumeBtnContact');

  function generateAndDownloadResume() {
    const resumeHTML = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Patchipulusu_Sneha_Resume</title>
  <style>
    @page { size: A4; margin: 18mm 16mm; }
    body {
      font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
      color: #1e293b;
      line-height: 1.5;
      font-size: 10pt;
      margin: 0;
      padding: 20px;
    }
    .header {
      border-bottom: 2px solid #0284c7;
      padding-bottom: 12px;
      margin-bottom: 16px;
    }
    .name {
      font-size: 22pt;
      font-weight: bold;
      color: #0f172a;
      margin: 0 0 4px 0;
    }
    .contact-line {
      font-size: 9.5pt;
      color: #475569;
      margin: 2px 0;
    }
    .contact-line a {
      color: #0284c7;
      text-decoration: none;
    }
    .section {
      margin-bottom: 14px;
    }
    .section-title {
      font-size: 11pt;
      font-weight: bold;
      text-transform: uppercase;
      color: #0284c7;
      border-bottom: 1px solid #cbd5e1;
      padding-bottom: 3px;
      margin-bottom: 8px;
      letter-spacing: 0.5px;
    }
    .item-header {
      display: flex;
      justify-content: space-between;
      font-weight: bold;
      color: #0f172a;
      margin-bottom: 2px;
    }
    .item-sub {
      display: flex;
      justify-content: space-between;
      font-style: italic;
      color: #475569;
      margin-bottom: 4px;
    }
    ul {
      margin: 4px 0 8px 18px;
      padding: 0;
    }
    li {
      margin-bottom: 3px;
    }
    .skills-grid p {
      margin: 3px 0;
    }
    .print-bar {
      background: #f1f5f9;
      padding: 10px 16px;
      border-radius: 6px;
      margin-bottom: 16px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-family: sans-serif;
    }
    .print-btn {
      background: #0284c7;
      color: white;
      border: none;
      padding: 6px 14px;
      border-radius: 4px;
      cursor: pointer;
      font-weight: bold;
    }
    @media print {
      .print-bar { display: none; }
      body { padding: 0; }
    }
  </style>
</head>
<body>
  <div class="print-bar">
    <span>💡 <strong>Tip:</strong> Press <strong>Ctrl + P</strong> (or click Save as PDF) in your browser print dialog to save as a clean PDF!</span>
    <button class="print-btn" onclick="window.print()">Print / Save as PDF</button>
  </div>

  <div class="header">
    <div class="name">Patchipulusu Sneha</div>
    <div class="contact-line">
      Hyderabad, India | +91-9032255883 | <a href="mailto:patchipulususneha@gmail.com">patchipulususneha@gmail.com</a>
    </div>
    <div class="contact-line">
      LinkedIn: <a href="https://www.linkedin.com/in/patchipulusu-sneha-328bb7308">linkedin.com/in/patchipulusu-sneha-328bb7308</a>
    </div>
  </div>

  <div class="section">
    <div class="section-title">Profile Summary</div>
    <p style="margin: 0;">
      Computer Science Engineering student with hands-on experience in Full Stack Development using Java, React.js, Node.js, JavaScript, HTML, CSS, and MySQL. Experienced in designing scalable web applications, integrating REST APIs, and building responsive user interfaces. Completed a Full Stack Development Internship at Blackbucks Education Pvt. Ltd. Strong analytical, problem-solving, teamwork, and communication skills with a passion for software engineering and continuous learning.
    </p>
  </div>

  <div class="section">
    <div class="section-title">Education</div>
    <div class="item-header">
      <span>B.E. Computer Science Engineering</span>
      <span>2023 – 2027</span>
    </div>
    <div class="item-sub">
      <span>Stanley College of Engineering and Technology for Women, Hyderabad</span>
      <span>CGPA: 8.88</span>
    </div>

    <div class="item-header" style="margin-top: 6px;">
      <span>Intermediate (MPC)</span>
      <span>2021 – 2023</span>
    </div>
    <div class="item-sub">
      <span>Sri Chaitanya Junior Kalasala, Hyderabad</span>
      <span>95.3%</span>
    </div>

    <div class="item-header" style="margin-top: 6px;">
      <span>Secondary State Board (10th Standard)</span>
      <span>2020 – 2021</span>
    </div>
    <div class="item-sub">
      <span>Petros High School, Hyderabad</span>
      <span>GPA: 10.0</span>
    </div>
  </div>

  <div class="section">
    <div class="section-title">Technical Skills</div>
    <div class="skills-grid">
      <p><strong>Programming:</strong> Java, JavaScript, Python (Basics)</p>
      <p><strong>Frontend:</strong> HTML5, CSS3, React.js</p>
      <p><strong>Backend:</strong> Node.js</p>
      <p><strong>Database:</strong> MySQL</p>
      <p><strong>Tools & Platforms:</strong> Git, GitHub, VS Code</p>
      <p><strong>Core Concepts:</strong> Object-Oriented Programming (OOP), REST APIs, Responsive Web Design</p>
      <p><strong>Soft Skills:</strong> Problem Solving, Communication, Teamwork, Leadership, Time Management</p>
    </div>
  </div>

  <div class="section">
    <div class="section-title">Internship Experience</div>
    <div class="item-header">
      <span>Full Stack Development Intern</span>
      <span>May 2026 – July 2026</span>
    </div>
    <div class="item-sub">
      <span>Blackbucks Education Pvt. Ltd.</span>
      <span>Hyderabad, India</span>
    </div>
    <ul>
      <li>Developed and maintained full-stack web applications using modern web technologies and database systems.</li>
      <li>Collaborated with development teams and solved technical problems within established project timelines.</li>
      <li>Strengthened software engineering, teamwork, and communication skills in an agile setting.</li>
    </ul>
  </div>

  <div class="section">
    <div class="section-title">Key Projects</div>
    <div class="item-header">
      <span>AI-Driven Public Health Chatbot</span>
      <span>Live on Render</span>
    </div>
    <div class="item-sub">
      <span>Technologies: React.js, Node.js, JavaScript, REST APIs</span>
      <span><a href="https://health-chatbot-frontend-4kxu.onrender.com">Live Demo Link</a></span>
    </div>
    <ul>
      <li>Developed an AI-powered chatbot delivering personalized health guidance and medical awareness.</li>
      <li>Integrated frontend and backend using REST APIs and built an accessible responsive user interface.</li>
    </ul>

    <div class="item-header" style="margin-top: 6px;">
      <span>GreedyGrid – Dynamic JSON-Based Game Engine</span>
      <span>Live on Vercel</span>
    </div>
    <div class="item-sub">
      <span>Technologies: React.js, Node.js, JSON Schemas</span>
      <span><a href="https://greedygrid.vercel.app/">Live Demo Link</a></span>
    </div>
    <ul>
      <li>Designed a configurable game engine utilizing JSON schemas instead of hard-coded logic.</li>
      <li>Improved scalability and modularity through dynamic game configuration and responsive UI.</li>
    </ul>
  </div>

  <div class="section">
    <div class="section-title">Publication</div>
    <p style="margin: 0 0 4px 0;">
      <strong>Chapter 13: AI, Human Rights and the Challenge of Algorithmic Accountability</strong> (Co-author)<br>
      Published in: <em>Artificial Intelligence for Sustainable Innovations and Industrial Applications</em><br>
      Cambridge Scholars Publishing, 2026 | ISBN: 978-1-0364-7766-0<br>
      Link: <a href="https://www.cambridgescholars.com/product/978-1-0364-7766-0">cambridgescholars.com/product/978-1-0364-7766-0</a>
    </p>
  </div>

  <div class="section">
    <div class="section-title">Certifications & Achievements</div>
    <ul>
      <li><strong>NPTEL Certification:</strong> Programming in Java</li>
      <li><strong>GeeksforGeeks:</strong> NATION SKILLUP Workshop</li>
      <li><strong>Workshop Expo:</strong> First Prize Winner</li>
    </ul>
  </div>
</body>
</html>`;

    // Create a Blob from the resume HTML and trigger browser download
    const blob = new Blob([resumeHTML], { type: 'text/html;charset=utf-8' });
    const downloadUrl = URL.createObjectURL(blob);
    const downloadAnchor = document.createElement('a');
    downloadAnchor.href = downloadUrl;
    downloadAnchor.download = 'Patchipulusu_Sneha_Resume.html';
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    document.body.removeChild(downloadAnchor);

    // Also open printable window so user can directly print to PDF if desired
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(resumeHTML);
      printWindow.document.close();
      // Wait for rendering then trigger print dialog
      setTimeout(() => {
        try {
          printWindow.print();
        } catch (e) {
          console.log('Auto-print triggered or blocked by browser:', e);
        }
      }, 500);
    }
  }

  if (downloadResumeBtn) {
    downloadResumeBtn.addEventListener('click', generateAndDownloadResume);
  }
  if (downloadResumeBtnContact) {
    downloadResumeBtnContact.addEventListener('click', generateAndDownloadResume);
  }

});
