import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { motion } from 'framer-motion';
import './HomePage.css';
import phoneImage from '../assets/images/flymeos.png';
import glassesImage from '../assets/images/arglass.png';
import watchVideo from '../assets/videos/watchcover.mp4';
import flymeAutoImage from '../assets/images/flymeauto.png';
import coverImage from '../assets/images/imcar.png';
import liveAppImage from '../assets/images/liveapp.png';
import uilabImage from '../assets/images/uilab.png';

export default function HomePage() {
  const navigate = useNavigate();

  useEffect(() => {
    // Ensure page starts at top on every load/refresh
    window.scrollTo(0, 0);
    
    // Only animate on true first visit (not refresh, not navigation back)
    const isFirstVisit = !localStorage.getItem('hasVisitedHome');
    
    if (isFirstVisit) {
      localStorage.setItem('hasVisitedHome', 'true');
      document.body.classList.add('animate-appear');
      
      // Remove animation class after animation completes
      const timer = setTimeout(() => {
        document.body.classList.add('did-appear');
      }, 3000);

      return () => {
        clearTimeout(timer);
      };
    }
  }, []);

  const handleProjectClick = (projectSlug) => {
    navigate(`/projects/${projectSlug}`);
  };

  return (
    <motion.div 
      className="home-container"
      initial={{ 
        opacity: 0,
        y: 80
      }}
      animate={{ 
        opacity: 1,
        y: 0
      }}
      transition={{
        type: "spring",
        stiffness: 120,
        damping: 35,
        mass: 1.8,
        delay: 0.1
      }}
    >
      {/* Background texture */}
      <div className="background-texture" />

      <motion.div 
        className="container"
        initial={{ 
          opacity: 0,
          y: 50
        }}
        animate={{ 
          opacity: 1,
          y: 0
        }}
        transition={{
          type: "spring",
          stiffness: 150,
          damping: 30,
          mass: 1.5,
          delay: 0.3
        }}
      >
        {/* Header */}
        <header className="header">
          <h1 className="name" data-text-delay>Jeremiah</h1>
          <p className="title-description" data-text-delay>Interaction designer and motion designer</p>
          <p className="subtitle" data-text-delay>A selection of interaction works from 2018–2025, exploring interface, product, and playful digital storytelling.</p>
        </header>

        {/* Portfolio Grid */}
        <section className="portfolio" data-delay style={{'--delay': 3}}>
          <div className="portfolio-grid">
            <div className="portfolio-item phone square" data-delay style={{'--delay': 4}} onClick={() => handleProjectClick('mobile-interface')}>
              <img src={phoneImage} alt="Mobile Interface" className="portfolio-image" />
              <div className="portfolio-content">
                <div className="portfolio-text">
                  <h3 className="portfolio-title">Mobile Interface</h3>
                  <p className="portfolio-description">iOS interface design system</p>
                  <p className="portfolio-year">2021-2024</p>
                </div>
              </div>
            </div>

            <div className="portfolio-item glasses square" data-delay style={{'--delay': 5}} onClick={() => handleProjectClick('smart-glasses')}>
              <img src={glassesImage} alt="Smart Glasses" className="portfolio-image" />
              <div className="portfolio-content">
                <div className="portfolio-text">
                  <h3 className="portfolio-title">Smart Glasses</h3>
                  <p className="portfolio-description">AR interface exploration</p>
                  <p className="portfolio-year">2022-2023</p>
                </div>
              </div>
            </div>

            <div className="portfolio-item watch square" data-delay style={{'--delay': 6}} onClick={() => handleProjectClick('flyme-watch')}>
              <video 
                src={watchVideo} 
                className="portfolio-image" 
                autoPlay 
                muted 
                loop 
                playsInline
              />
              <div className="portfolio-content">
                <div className="portfolio-text">
                  <h3 className="portfolio-title">Flyme Watch</h3>
                  <p className="portfolio-description">Watch OS motion design</p>
                  <p className="portfolio-year">2022-2023</p>
                </div>
              </div>
            </div>

            <div className="portfolio-item flyme" data-delay style={{'--delay': 7}} onClick={() => handleProjectClick('flyme-auto')}>
              <img src={flymeAutoImage} alt="Flyme Auto" className="portfolio-image" />
              <div className="portfolio-content">
                <div className="portfolio-text">
                  <h3 className="portfolio-title">Flyme Auto</h3>
                  <p className="portfolio-description">Automotive interface system</p>
                  <p className="portfolio-year">2023-2024</p>
                </div>
              </div>
            </div>

            <motion.div 
              className="portfolio-item cover square" 
              data-delay 
              style={{'--delay': 8}} 
              onClick={() => handleProjectClick('cover-design')}
              whileHover={{ 
                scale: 1.05,
                transition: { 
                  type: "spring", 
                  stiffness: 200, 
                  damping: 20 
                }
              }}
            >
              <img src={coverImage} alt="Cover Design" className="portfolio-image" />
              <div className="portfolio-content">
                <div className="portfolio-text">
                  <h3 className="portfolio-title">Cover Design</h3>
                  <p className="portfolio-description">Visual identity exploration</p>
                  <p className="portfolio-year">2024-2025</p>
                </div>
              </div>
            </motion.div>

            <div className="portfolio-item live square" data-delay style={{'--delay': 9}} onClick={() => handleProjectClick('live-app')}>
              <img src={liveAppImage} alt="Live APP" className="portfolio-image" />
              <div className="portfolio-content">
                <div className="portfolio-text">
                  <h3 className="portfolio-title">Live APP</h3>
                  <p className="portfolio-description">Social streaming platform</p>
                  <p className="portfolio-year">2019-2020</p>
                </div>
              </div>
            </div>

            <div className="portfolio-item uilab" data-delay style={{'--delay': 10}} onClick={() => handleProjectClick('uilab-design')}>
              <img src={uilabImage} alt="UILAB Design Studio" className="portfolio-image" />
              <div className="portfolio-content">
                <div className="portfolio-text">
                  <h3 className="portfolio-title">UILAB Design Studio</h3>
                  <p className="portfolio-description">Design system and branding</p>
                  <p className="portfolio-year">2018-2019</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </motion.div>
    </motion.div>
  );
}