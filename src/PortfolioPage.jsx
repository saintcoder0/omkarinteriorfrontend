import React, { useState, useMemo } from 'react';

// --- DATA: Updated with local asset paths ---
const portfolioProjects = [
  {
    id: 1,
    title: 'Compact Urban Oasis',
    bhkType: '1BHK',
    style: 'Modern Minimalist',
    description: 'A serene 1BHK apartment maximizing space with smart storage and a neutral color palette.',
    imageUrl: '1bhk.mp4',
  },
  {
    id: 2,
    title: 'The Professional\'s Pad',
    bhkType: '1BHK',
    style: 'Industrial Chic',
    description: 'Exposed brick and metal accents define this stylish and functional 1BHK for the modern professional.',
    imageUrl: '820f1b57-c0c4-450a-b36f-ba6135416761.jpg',
  },
  {
    id: 3,
    title: 'Family First Living',
    bhkType: '2BHK',
    style: 'Contemporary Comfort',
    description: 'A warm and inviting 2BHK designed for family life, featuring a spacious living area and cozy bedrooms.',
    imageUrl: '9317964d-207f-4cf0-aa6b-bfe8c194a3b0.jpg',
  },
  {
    id: 4,
    title: 'Scandinavian Dream',
    bhkType: '2BHK',
    style: 'Scandinavian',
    description: 'Light woods, clean lines, and a focus on functionality create a peaceful retreat in this 2BHK home.',
    imageUrl: '3bhk(9).jpg',
  },
  {
    id: 5,
    title: 'Entertainer\'s Paradise',
    bhkType: '3BHK',
    style: 'Luxury Modern',
    description: 'An expansive 3BHK with an open-plan kitchen and living area, perfect for hosting guests in style.',
    imageUrl: '3bhk.jpg',
  },
  {
    id: 6,
    title: 'Bohemian Rhapsody',
    bhkType: '2BHK',
    style: 'Bohemian',
    description: 'Rich textures, eclectic patterns, and a vibrant color scheme make this 2BHK a unique and artistic home.',
    imageUrl: '3bhk(1).jpg',
  },
  {
    id: 7,
    title: 'The Executive Suite',
    bhkType: '3BHK',
    style: 'Elegant & Sophisticated',
    description: 'Dark wood tones, marble accents, and premium finishes create an atmosphere of luxury in this 3BHK residence.',
    imageUrl: '3bhk(2).jpg',
  },
  {
    id: 8,
    title: 'Coastal Charm',
    bhkType: '3BHK',
    style: 'Coastal',
    description: 'A light and airy 3BHK that brings the tranquility of the beach indoors with blues, whites, and natural textures.',
    imageUrl: '3bhk(3).jpg',
  },
  {
    id: 9,
    title: 'Smart & Sleek Studio',
    bhkType: '1BHK',
    style: 'Tech-Integrated',
    description: 'A compact 1BHK that integrates smart home technology for ultimate convenience and modern living.',
    imageUrl: '3bhk(4).jpg',
  },
  {
    id: 10,
    title: 'Rustic Farmhouse Kitchen',
    bhkType: '3BHK',
    style: 'Modern Farmhouse',
    description: 'A spacious kitchen in a 3BHK home featuring reclaimed wood, shiplap walls, and state-of-the-art appliances.',
    imageUrl: '3bhk(5).jpg',
  },
  {
    id: 11,
    title: 'Art Deco Living Room',
    bhkType: '2BHK',
    style: 'Art Deco Revival',
    description: 'Geometric patterns, bold colors, and metallic finishes bring a touch of glamour to this 2BHK living space.',
    imageUrl: '3bhk(6).jpg',
  },
  {
    id: 12,
    title: 'Zen Bathroom Sanctuary',
    bhkType: '3BHK',
    style: 'Japandi',
    description: 'A tranquil bathroom in a 3BHK combining Japanese minimalism with Scandinavian function for a spa-like experience.',
    imageUrl: '3bhk(7).jpg',
  },
  {
    id: 13,
    title: 'Mid-Century Modern Dining',
    bhkType: '2BHK',
    style: 'Mid-Century Modern',
    description: 'Clean lines, organic shapes, and a focus on functionality define this classic dining area in a 2BHK apartment.',
    imageUrl: '3bhk(8).jpg',
  }
];

// --- STYLES: Moved into a component to resolve import errors ---
const PortfolioStyles = () => (
  <style>{`
    /* General Body & Font Styling */
    .portfolio-body { background-color: #f9fafb; min-height: 100vh; font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif; color: #1f2937; }
    .container { width: 100%; max-width: 1280px; margin-left: auto; margin-right: auto; padding: 4rem 1rem; }
    /* Header Section */
    .portfolio-header { text-align: center; margin-bottom: 3rem; }
    .portfolio-header h1 { font-size: 2.25rem; font-weight: 700; letter-spacing: -0.025em; color: #111827; }
    .portfolio-header p { margin-top: 1rem; font-size: 1.125rem; color: #4b5563; max-width: 42rem; margin-left: auto; margin-right: auto; }
    /* Filter Navigation */
    .portfolio-filters { display: flex; justify-content: center; align-items: flex-end; gap: 0.75rem; margin-bottom: 3rem; }
    .filter-btn { display: flex; flex-direction: column; align-items: center; gap: 0.5rem; padding: 0.5rem 1rem; border: 2px solid transparent; border-radius: 0.5rem; font-weight: 600; cursor: pointer; background-color: #ffffff; color: #4b5563; transition: all 0.3s ease-in-out; }
    .filter-btn:hover { transform: translateY(-4px); background-color: #f3f4f6; }
    .filter-btn.active { background-color: #4f46e5; color: #ffffff; box-shadow: 0 4px 14px rgba(79, 70, 229, 0.3); transform: translateY(-4px); }
    .filter-btn svg { width: 28px; height: 28px; }
    /* Portfolio Grid & Cards */
    .portfolio-grid { display: grid; grid-template-columns: repeat(1, 1fr); gap: 2rem; }
    .project-card { position: relative; overflow: hidden; border-radius: 0.75rem; box-shadow: 0 8px 25px rgba(0,0,0,0.1); cursor: pointer; height: 24rem; }
    .project-card img, .project-card video { width: 100%; height: 100%; object-fit: cover; transition: transform 0.5s ease-in-out; }
    .project-card:hover img, .project-card:hover video { transform: scale(1.1); }
    .gradient-overlay { position: absolute; inset: 0; background-image: linear-gradient(to top, rgba(0,0,0,0.7), rgba(0,0,0,0.3), transparent); }
    .content-container { position: absolute; inset: 0; padding: 1.5rem; display: flex; flex-direction: column; justify-content: flex-end; color: #ffffff; }
    .style-tag { display: inline-block; background-color: rgba(255, 255, 255, 0.2); font-size: 0.75rem; font-weight: 600; padding: 0.25rem 0.75rem; border-radius: 9999px; margin-bottom: 0.5rem; backdrop-filter: blur(4px); }
    .content-container h3 { font-size: 1.5rem; font-weight: 700; }
    .hover-content { margin-top: 1rem; transform: translateY(2rem); opacity: 0; transition: all 0.5s ease-in-out; max-height: 0; overflow: hidden; }
    .project-card:hover .hover-content { transform: translateY(0); opacity: 1; max-height: 10rem; }
    .hover-content p { color: #d1d5db; font-size: 0.875rem; line-height: 1.6; }
    .view-more-icon { position: absolute; top: 1rem; right: 1rem; padding: 0.5rem; background-color: rgba(255, 255, 255, 0.2); border-radius: 9999px; backdrop-filter: blur(4px); transform: scale(0); transition: transform 0.3s ease-in-out; }
    .project-card:hover .view-more-icon { transform: scale(1); }
    /* Responsive Grid Adjustments */
    @media (min-width: 640px) { .portfolio-grid { grid-template-columns: repeat(2, 1fr); } }
    @media (min-width: 1024px) { .portfolio-grid { grid-template-columns: repeat(3, 1fr); } }
    @media (min-width: 1280px) { .portfolio-grid { grid-template-columns: repeat(4, 1fr); } .portfolio-header h1 { font-size: 3rem; } }
  `}</style>
);

// --- SVG ICONS: Inlined to remove external dependency error ---
const LayoutGridIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect width="7" height="7" x="3" y="3" rx="1"></rect>
    <rect width="7" height="7" x="14" y="3" rx="1"></rect>
    <rect width="7" height="7" x="3" y="14" rx="1"></rect>
    <rect width="7" height="7" x="14" y="14" rx="1"></rect>
  </svg>
);

const ArrowUpRightIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M7 17l9.2-9.2M17 17V7H7"></path>
  </svg>
);

const FloorPlanIcon = ({ type }) => {
    const dimensions = {
        '1BHK': { width: "28", height: "28" },
        '2BHK': { width: "32", height: "32" },
        '3BHK': { width: "36", height: "36" }
    };
    const config = dimensions[type];
    if (!config) return null;
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={config.width} height={config.height} viewBox={`0 0 ${config.width} ${config.height}`} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
             <rect x="2" y="2" width={config.width-4} height={config.height-4} rx="2" ry="2"></rect>
             <line x1="12" y1="2" x2="12" y2={config.height-2}></line>
             <line x1="2" y1="12" x2={config.width-2} y2="12"></line>
        </svg>
    );
};

// --- MAIN COMPONENT ---
export default function PortfolioPage() {
  const [activeFilter, setActiveFilter] = useState('All');

  const filteredProjects = useMemo(() => {
    if (activeFilter === 'All') return portfolioProjects;
    return portfolioProjects.filter(project => project.bhkType === activeFilter);
  }, [activeFilter]);

  const filters = ['All', '1BHK', '2BHK', '3BHK'];

  return (
    <>
      <PortfolioStyles />
      <div className="portfolio-body">
        <div className="container">
          <header className="portfolio-header">
            <h1>Our Portfolio</h1>
            <p>Discover the spaces we've transformed. Filter by project size to find your inspiration.</p>
          </header>

          <nav className="portfolio-filters">
            {filters.map(filter => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`filter-btn ${activeFilter === filter ? 'active' : ''}`}
              >
                {filter === 'All' ? <LayoutGridIcon /> : <FloorPlanIcon type={filter} />}
                <span>{filter}</span>
              </button>
            ))}
          </nav>

          <main className="portfolio-grid">
            {filteredProjects.map((project) => (
              <div key={project.id} className="project-card">
                {project.imageUrl.endsWith('.mp4') ? (
                  <video
                    src={project.imageUrl}
                    autoPlay
                    loop
                    muted
                    playsInline
                  >
                    Your browser does not support the video tag.
                  </video>
                ) : (
                  <img
                    src={project.imageUrl}
                    alt={project.title}
                  />
                )}
                <div className="gradient-overlay"></div>
                <div className="content-container">
                  <div className="visible-content">
                    <span className="style-tag">{project.style}</span>
                    <h3>{project.title}</h3>
                  </div>
                  <div className="hover-content">
                      <p>{project.description}</p>
                  </div>
                  <div className="view-more-icon">
                      <ArrowUpRightIcon />
                  </div>
                </div>
              </div>
            ))}
          </main>
        </div>
      </div>
    </>
  );
}









