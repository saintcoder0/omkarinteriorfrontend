import React, { useEffect, useRef, useState } from 'react';
import { animate, inView, stagger } from "motion";
import PortfolioPage from './PortfolioPage'; // Import the new page component

// --- Main App Component (acts as a router) ---
const App = () => {
  const [currentPage, setCurrentPage] = useState('home');

  const navigate = (page) => {
    setCurrentPage(page);
    window.scrollTo(0, 0); // Always scroll to top when changing pages
  };

  if (currentPage === 'portfolio') {
    return <PortfolioPage onNavigate={navigate} />;
  }

  return <HomePage onNavigate={navigate} />;
};


// --- All of your old components are now wrapped in a HomePage component ---
const HomePage = ({ onNavigate }) => {
  return (
    <>
      <Navbar onNavigate={onNavigate} />
      <main>
        <Hero />
        <About />
        <Process />
        <Portfolio onNavigate={onNavigate} />
        <Contact />
      </main>
      <Footer />
    </>
  );
};


// --- Components for the Home Page ---

const Navbar = ({ onNavigate }) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="nav-container">
        <a href="#" onClick={(e) => { e.preventDefault(); onNavigate('home'); }} className="nav-logo">
           <img src="/logo.jpeg" alt="Omkar Interiors Logo" className="logo-image" />
        </a>
        <ul className="nav-menu">
          <li><a href="#about">About</a></li>
          <li><a href="#process">Process</a></li>
          {/* This link now navigates to the new page */}
          <li><a href="#" onClick={(e) => { e.preventDefault(); onNavigate('portfolio'); }}>Portfolio</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
      </div>
    </nav>
  );
};

const Hero = () => {
  const titleRef = useRef(null);
  useEffect(() => {
    animate(titleRef.current, { y: [30, 0], opacity: [0, 1] }, { duration: 1, easing: "ease-out", delay: 0.5 });
  }, []);
  return (
    <section id="home" className="hero-container">
      <h1 ref={titleRef} className="hero-title">Crafting Atmospheric Spaces</h1>
    </section>
  );
};

const About = () => {
  const sectionRef = useRef(null);
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    inView(section, () => {
      animate(section.querySelectorAll(".about-content > *, .about-image"), { opacity: [0, 1], y: [20, 0] }, { delay: stagger(0.2), duration: 0.8 });
    }, { amount: 0.4 });
  }, []);
  return (
    <section id="about" className="section" ref={sectionRef}>
      <div className="container about-container">
        <div className="about-content">
          <h2 className="section-title">We design emotive interiors that tell a story.</h2>
          <p>At Omkar, we believe that true luxury lies in the details. Our approach is holistic and deeply personal, focusing on creating spaces that are not only visually stunning but also profoundly resonant. We blend bold architectural elements with bespoke furnishings and curated art to build immersive environments.</p>
          <a href="#contact" className="cta-link">Begin Your Project</a>
        </div>
        <div className="about-image">
          <img src="/pic6.jpg" alt="Stylish interior with a comfortable chair" />
        </div>
      </div>
    </section>
  );
};

const Process = () => {
  const sectionRef = useRef(null);
  useEffect(() => {
    const section = sectionRef.current;
    inView(section, () => {
      animate(section.querySelectorAll(".section-title, .process-item"), { opacity: [0, 1], y: [20, 0] }, { delay: stagger(0.2), duration: 0.8 });
    }, { amount: 0.2 });
  }, []);
  return (
    <section id="process" className="section process-section" ref={sectionRef}>
      <div className="container">
        <h2 className="section-title" style={{ textAlign: 'center', marginBottom: '4rem' }}>Our Process</h2>
        <div className="process-grid">
           <div className="process-item">
            <div className="number">01</div>
            <h3>Discovery & Vision</h3>
            <p>We start by listening. Understanding your lifestyle, aspirations, and functional needs to craft a personalized design concept.</p>
          </div>
          <div className="process-item">
            <div className="number">02</div>
            <h3>Design & Development</h3>
            <p>From mood boards and 3D renderings to material selection, we develop a detailed blueprint for your space.</p>
          </div>
          <div className="process-item">
            <div className="number">03</div>
            <h3>Execution & Realization</h3>
            <p>Our team manages every aspect of the project, ensuring a seamless execution and bringing the shared vision to life with precision.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

// This is the small portfolio section on your home page.
const Portfolio = ({ onNavigate }) => {
  const sectionRef = useRef(null);
  const homePageProjects = [
      { id: 1, title: 'Residential Haven', category: 'Interior Design', imageUrl: '/pic1.jpg' },
      { id: 2, title: 'Modern Office Space', category: 'Commercial Design', imageUrl: '/pic2.jpg' },
      { id: 3, title: 'Serene Bedroom Retreat', category: 'Renovation', imageUrl: '/pic3.jpg' },
  ];

  useEffect(() => {
    const section = sectionRef.current;
    inView(section, () => {
      animate(section.querySelectorAll(".section-header, .project-card"), { opacity: [0, 1], y: [20, 0] }, { delay: stagger(0.1), duration: 0.8 });
    }, { amount: 0.1 });
  }, []);

  return (
    <section id="portfolio" className="section" ref={sectionRef}>
      <div className="container">
        <div className="section-header">
            <h2 className="section-title" style={{ textAlign: 'left', marginBottom: 0 }}>Selected Works</h2>
            <button onClick={() => onNavigate('portfolio')} className="cta-link">View Full Catalog</button>
        </div>
        <div className="portfolio-grid-home">
          {homePageProjects.map(project => (
            <div className="project-card" key={project.id}>
              <img src={project.imageUrl} alt={project.title} className="project-image" />
              <div className="project-overlay">
                <h3 className="project-title">{project.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};


const Contact = () => {
  const sectionRef = useRef(null);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
  const [status, setStatus] = useState('idle'); // 'idle', 'sending', 'success', 'error'
  const [responseMessage, setResponseMessage] = useState('');

  useEffect(() => {
    const section = sectionRef.current;
    inView(section, () => {
      animate(
        section.querySelectorAll(".section-title, p, .contact-form, .contact-map-wrapper"),
        { opacity: [0, 1], y: [20, 0] },
        { delay: stagger(0.2), duration: 0.8 }
      );
    }, { amount: 0.2 });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    setResponseMessage('');

    try {
      const response = await fetch(import.meta.env.VITE_API_URL + '/api/contact',  {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const result = await response.json();

      if (response.ok) {
        setStatus('success');
        setResponseMessage('Thank you! Your message has been sent.');
        setFormData({ name: '', email: '', phone: '', message: '' });
      } else {
        setStatus('error');
        if (result.errors && Array.isArray(result.errors)) {
          const errorMessages = result.errors.map(err => err.msg).join('. ');
          setResponseMessage(errorMessages || 'Please check your input and try again.');
        } else {
          setResponseMessage(result.error || 'An unexpected error occurred.');
        }
      }
    } catch (error) {
      setStatus('error');
      setResponseMessage('Failed to connect to the server. Please try again later.');
    }
  };

  return (
    <section id="contact" className="section contact-section" ref={sectionRef}>
       <div className="container">
        <div className="contact-layout">
          <div className="contact-form-wrapper">
            <h2 className="section-title">Get in Touch</h2>
            <p>
              Have a project in mind? We’d love to hear from you. Fill out the form below, and we’ll get back to you to discuss your vision.
            </p>
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
              </div>
              <div className="form-group full-width">
                <input type="tel" name="phone" placeholder="Phone (Optional)" value={formData.phone} onChange={handleChange} />
              </div>
              <div className="form-group full-width">
                <textarea name="message" placeholder="Tell us about your project..." rows="5" value={formData.message} onChange={handleChange} required></textarea>
              </div>
              <button type="submit" className="submit-button" disabled={status === 'sending'}>
                {status === 'sending' ? 'Sending...' : 'Send Message'}
              </button>
              {responseMessage && (
                <div className={`response-message ${status === 'error' ? 'error' : 'success'}`}>
                  {responseMessage}
                </div>
              )}
            </form>
          </div>
          <div className="contact-map-wrapper">
            <div className="contact-map">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3765.376991093155!2d72.8524623759163!3d19.30932234388319!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7b1eaffffffff%3A0x2986f4dd6b508e6f!2sShubhlaxmi%20Shopping%20Centre!5e0!3m2!1sen!2sin!4v1724999999999!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
            <a
              href="https://www.google.com/maps/dir/?api=1&destination=Shop%20no.16%2C%20Shubhlaxmi%20Shopping%20Centre%2C%20near%20vasant%20nagri%20ground%2C%20vasant%20nagri%2C%20vasai%20east"
              className="directions-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              Get Directions
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
 return (
    <footer className="footer">
      <div className="container footer-container">
        <div className="footer-brand">
           <img src="/logo.jpeg" alt="Omkar Interiors Logo" className="footer-logo" />
           <p>Crafting atmospheric spaces that tell a story.</p>
        </div>
        <div className="footer-details">
            <h4>Get in Touch</h4>
            <p><strong>Address:</strong><br/>Shop no.16, Shubhlakshmi Shopping Centre, near vasant nagri ground, vasant nagri, vasai east</p>
            <p><strong>Email:</strong> <a href="mailto:omkarinteriorsndecoeators@gmail.com">omkarinteriorsndecoeators@gmail.com</a></p>
            <p><strong>Phone:</strong><br/>+91 70307 39489<br/>+91 98921 01594</p>
        </div>
        <div className="footer-social">
          <h4>Follow Us</h4>
          <a href="https://www.instagram.com/omkar_interiorss/" target="_blank" rel="noopener noreferrer">Instagram</a>
          <a href="#" target="_blank" rel="noopener noreferrer">Facebook</a>
        </div>
      </div>
      <div className="footer-copyright">
        <p>&copy; {new Date().getFullYear()} Omkar Interiors. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default App;



