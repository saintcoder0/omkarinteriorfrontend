import React, { useEffect, useRef } from 'react';
import { animate, inView, stagger } from "motion";
import { portfolioImages } from './portfolio-data.js';

const PortfolioPage = ({ onNavigate }) => {
  const headerRef = useRef(null);
  const gridRef = useRef(null);

  // Animate header on page load
  useEffect(() => {
    const headerElements = headerRef.current.querySelectorAll(".back-link, .portfolio-title, .portfolio-subtitle");
    animate(
      headerElements,
      { opacity: [0, 1], y: [20, 0] },
      { delay: stagger(0.2), duration: 0.8, easing: "ease-out" }
    );
  }, []);

  // Animate grid items when they scroll into view
  useEffect(() => {
    const gridItems = gridRef.current.querySelectorAll(".grid-item");
    inView(gridRef.current, () => {
      animate(
        gridItems,
        { opacity: [0, 1], y: [20, 0] },
        { delay: stagger(0.1), duration: 0.6, easing: "ease-out" }
      );
    }, { amount: 0.1 }); // Trigger when 10% of the grid is visible
  }, []);

  return (
    <div className="page-container">
      <header className="portfolio-header" ref={headerRef}>
        <div className="container">
          <a href="#" onClick={(e) => { e.preventDefault(); onNavigate('home'); }} className="back-link">
            &larr; Back to Home
          </a>
          <h1 className="portfolio-title">Our Work</h1>
          <p className="portfolio-subtitle">A curated selection of our finest projects, showcasing our commitment to detail and quality.</p>
        </div>
          </header>
      <main className="section">
        <div className="container">
          <div className="portfolio-full-grid" ref={gridRef}>
            {portfolioImages.map(project => (
              <div key={project.id} className="grid-item">
                <img src={project.imageUrl} alt={project.title} className="grid-image" />
                <div className="grid-overlay">
                    <h3>{project.title}</h3>
                  <p>{project.category}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      </div>
  );
};

export default PortfolioPage;


