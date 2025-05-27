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
    // Instead of fetching from a file, we'll use the markdown content directly
    const markdown = `# Julian Welge

509-251-0217 | julianwelge@gmail.com | [LinkedIn](https://www.linkedin.com/in/julian-welge-193b44132) | [GitHub](https://github.com/julzdub)

## Professional Summary

Dedicated Full Stack Engineer with a proven track record in designing, developing, and maintaining robust web and mobile applications. Proficient in Angular, C# RESTful APIs, and SQL, with experience creating innovative solutions for the agricultural community. Strong problem-solving skills and a passion for delivering high-quality, user-centric software solutions.

## Technical Skills

- **Front-End Development:** Angular, HTML, CSS, JavaScript/TypeScript
- **Back-End Development:** C#, .NET, Developing and Testing RESTful APIs & Microservices (TypeScript)
- **Database:** SQL, SQL Server
- **Other Tools & Technologies:** Git, Agile/Scrum, Postman, Azure, Linux

## Professional Experience

### Groundwork Systems – Yakima, Washington
**Full Stack Engineer** (June 2022 – Present)

- Designing and implementing scalable web applications tailored for the agricultural industry primarily using Angular and C#.
- Developing and maintaining RESTful APIs to facilitate seamless integration between front-end interfaces and back-end systems.
- Optimizing SQL database structures to enhance application performance and ensure data integrity.
- Regularly collaborating to define project requirements, timelines, and deliverables.
- Designing multiple mobile-friendly web applications, ensuring responsive and intuitive user experiences.

**Key Projects:**
- Built real-time inventory management systems for agricultural businesses.
- Developed a mobile-first application for farm workers to log and monitor daily activities.
- Built an application for managing permissions across multiple systems.

## Education

### Eastern Washington University – Cheney, WA
**Bachelor of Science in Computer Science** (Graduated: 2022)

- **Relevant Coursework:** Software Engineering, Database Systems, Web Development, Algorithms & Data Structures
- **Senior Capstone:** Developed a multiplayer first-person-shooter video game using C# and the Unity Framework`;

    const resumeContent = document.getElementById('resume-content');
    if (resumeContent) {
        // Parse markdown to HTML using marked.js
        resumeContent.innerHTML = marked.parse(markdown);
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
