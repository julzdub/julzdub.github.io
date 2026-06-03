// Main JavaScript file for the resume website

document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 56, // Adjust for navbar height
                    behavior: 'smooth'
                });
                
                // Update active navigation link
                document.querySelectorAll('.nav-link').forEach(navLink => {
                    navLink.classList.remove('active');
                });
                this.classList.add('active');
            }
        });
    });
    
    // Load and parse resume markdown
    loadResumeMarkdown();
    
    // Highlight current section in navbar based on scroll position
    window.addEventListener('scroll', updateActiveNavLink);
});

// Function to load and parse resume markdown
function loadResumeMarkdown() {
    const fallbackMarkdown = `# Julian Welge

Spokane, WA (Open to Hybrid/Relocation) | 509-251-0217 | julianwelge@gmail.com

[LinkedIn](https://www.linkedin.com/in/julian-welge-193b44132) | [GitHub](https://github.com/julzdub) | [Portfolio](https://julzdub.github.io)

## Professional Summary

Full Stack Engineer with 4+ years of experience designing scalable web applications, backend services, and operational software systems. Strong background in Angular, C#, SQL Server, REST APIs, and Azure cloud services, with growing specialization in AI-augmented development workflows and modern product engineering.

## Technical Skills

- **Frontend:** Angular, TypeScript, HTML, CSS
- **Backend:** C#, .NET, REST APIs, Microservices (TypeScript/Bun)
- **Database:** SQL Server, Relational Data Modeling
- **Cloud:** Azure App Services, Blob Storage, Docker, Linux
- **AI:** OpenAI APIs, AI-assisted workflows, Prompt Engineering
- **Tools:** Git, Postman, Agile/Scrum

## Professional Experience

### Full Stack Engineer - Groundwork Systems, Yakima, WA
**March 2022 - Present**

- Designed and built operational software platforms using Angular, C#, and SQL Server for large-scale agricultural operations.
- Architected systems supporting inventory management, logistics workflows, contracts, customer operations, and internal business tooling.
- Developed RESTful APIs and backend services powering internal applications, customer-facing portals, and integrations.
- Owned full lifecycle development including architecture, implementation, testing, deployment, and stakeholder collaboration.
- Collaborated with cross-functional teams and end users in fast-paced startup environments.

**Key Systems & Impact:**
- **Inventory & Operations Platform:** Built and maintained a mission-critical inventory management application supporting centralized workflows.
- **Customer Portal (In Progress):** Developing authenticated platform for external users to manage orders, shipments, contracts, and payments using OAuth2 and RBAC principles.
- **Public Website + CMS:** Developed dynamic website integrated with backend systems and Azure Blob Storage for media and content management.
- **Agricultural Event System:** Supported deployment of a QR-based certification tracking system and provided live technical guidance for 200+ users.

## Projects

### Basketball Training Platform
**In Development**

Designing a scalable coach-client system for video-based training, workout management, and AI-assisted performance analysis.

## Education

### Eastern Washington University - Cheney, WA
**Bachelor of Science in Computer Science** (2022)`;

    const resumeContent = document.getElementById('resume-content');
    if (resumeContent) {
        fetch('resume.md')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Resume markdown could not be loaded');
                }
                return response.text();
            })
            .catch(() => fallbackMarkdown)
            .then(markdown => {
                resumeContent.innerHTML = marked.parse(markdown);
            });
    }
}

// Update active nav link based on scroll position
function updateActiveNavLink() {
    const sections = document.querySelectorAll('.section-container');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;
        
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            currentSection = '#' + section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === currentSection) {
            link.classList.add('active');
        }
    });
}
