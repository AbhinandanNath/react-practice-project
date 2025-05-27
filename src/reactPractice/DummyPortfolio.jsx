import React from "react";
import "./Portfolio.css";
import { Github, Linkedin, Mail } from "lucide-react";

export default function Portfolio() {
  return (
    <div className="bodyContainer">
      <div className="container">
        <section className="header">
          <h1>Abhinandan Nath</h1>
          <p>Senior Frontend Developer | React, ExtJS | FinTech Domain</p>
          <div className="social-links">
            <a href="mailto:abhi.nath120@gmail.com" aria-label="Email">
              <Mail />
            </a>
            <a
              href="https://github.com/AbhinandanNath"
              target="_blank"
              aria-label="GitHub"
            >
              <Github />
            </a>
            <a
              href="https://linkedin.com/in/abhinandan-nath-92b9ba185"
              target="_blank"
              aria-label="LinkedIn"
            >
              <Linkedin />
            </a>
          </div>
        </section>

        <section className="grid-section">
          <div className="card">
            <h2>Personal Summary</h2>
            <p>
              Front-End Developer with 6+ years of experience building scalable
              web applications in FinTech. Proficient in React, ExtJS, and
              modern JS practices. Strong in UI/UX design, Micro Frontend
              Architecture, Agile, and backend integration.
            </p>
          </div>
          <div className="card">
            <h2>Skills</h2>
            <ul>
              <li>Frontend: React, ExtJS, JavaScript, Redux, HTML5, CSS3</li>
              <li>Backend: Java, Struts, Hibernate (basic)</li>
              <li>APIs: REST, JSON | Database: MySQL</li>
              <li>Tools: Git, Debugging, Unit Testing</li>
              <li>Practices: Agile, Scrum, Micro Frontend</li>
              <li>Soft Skills: Leadership, Collaboration, Mentorship</li>
            </ul>
          </div>
        </section>

        <section>
          <h2 className="section-title">Professional Experience</h2>
          <div className="card">
            <h3>Senior Software Engineer | HighRadius | Jan 2024 – Present</h3>
            <ul>
              <li>Revamped app navigation, improving usability by 40%</li>
              <li>
                Built Micro Frontend architecture, reducing interdependencies by
                30%
              </li>
              <li>Led 12-member team, improved sprint execution by 10%</li>
              <li>Mentored juniors and created 30+ TDS documents</li>
            </ul>
          </div>

          <div className="card">
            <h3>Software Engineer | HighRadius | Jan 2022 – Dec 2023</h3>
            <ul>
              <li>Developed Treasury modules using React.js, Java</li>
              <li>Optimized cell-editing grid, reducing manual data by 50%</li>
              <li>Built 6+ financial modules for data tracking</li>
              <li>Improved coding standards, reduced bugs by 25%</li>
            </ul>
          </div>

          <div className="card">
            <h3>
              Associate Software Engineer | HighRadius | Sep 2020 – Dec 2021
            </h3>
            <ul>
              <li>Developed Treasury apps using ExtJS, Java</li>
              <li>Improved UI responsiveness by 35%</li>
              <li>Integrated 2FA and currency formatting</li>
            </ul>
          </div>
        </section>

        <section>
          <h2 className="section-title">Education & Awards</h2>
          <div className="card">
            <p>
              <strong>B.Tech in Electronics & Telecommunication</strong> – KIIT,
              2020 | CGPA: 8.44
            </p>
            <p>🏆 Star Performer Award (2022–2024)</p>
            <p>🏆 Star Team Award – Treasury Q2 2020</p>
          </div>
        </section>

        <section className="contact">
          <p>
            Always excited about building impactful, elegant digital
            experiences.
            <br />
            Let’s create something amazing together.
          </p>
          <a className="contact-button" href="mailto:abhi.nath120@gmail.com">
            Contact Me
          </a>
        </section>
      </div>
    </div>
  );
}
