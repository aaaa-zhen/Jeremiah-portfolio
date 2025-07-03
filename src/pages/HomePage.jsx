import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
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
  // 移除hover状态管理，使用固定3x3网格

  // 创建3x3项目数据
  const projects = [
    { id: 1, title: 'Mobile Interface', slug: 'mobile-interface', color: '#FF6B6B', image: phoneImage, isClean: false },
    { id: 2, title: 'Smart Glasses', slug: 'smart-glasses', color: '#4ECDC4', image: glassesImage, isClean: false },
    { id: 3, title: 'Flyme Watch', slug: 'flyme-watch', color: '#45B7D1', video: watchVideo, isClean: false, hasBackground: false },
    { id: 4, title: 'Flyme Auto', slug: 'flyme-auto', color: '#96CEB4', image: flymeAutoImage, isClean: false },
    { id: 5, title: '智己汽车', slug: 'cover-design', color: '#000000', image: coverImage, isClean: false },
    { id: 6, title: 'Live APP', slug: 'live-app', color: '#DDA0DD', image: liveAppImage, isClean: false },
    { id: 7, title: 'UILAB Design', slug: 'uilab-design', color: '#98D8C8', image: uilabImage, isClean: false },
    { id: 8, title: 'Coming Soon', slug: '#', color: '#F7DC6F', isClean: false, hasBackground: true },
    { id: 9, title: 'Coming Soon', slug: '#', color: '#BB8FCE', isClean: false, hasBackground: true },
  ];

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
    if (projectSlug !== '#') {
      navigate(`/projects/${projectSlug}`);
    }
  };

  // 固定的3x3网格，无变形效果

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

        {/* Dynamic 3x3 Portfolio Grid */}
        <section className="portfolio" data-delay style={{'--delay': 3}}>
          <div 
            className="dynamic-grid"
            style={{
              display: "grid",
              gridTemplateRows: "repeat(3, minmax(0, 1fr))",
              gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
              gap: "24px",
              width: "100%",
              maxWidth: "1160px",
              margin: "0 auto"
            }}
          >
            {projects.map((project) => (
              <motion.div
                key={project.id}
                className="grid-item"
                style={{
                  backgroundColor: project.hasBackground ? project.color : 'transparent',
                  borderRadius: "6px",
                  overflow: "hidden",
                  cursor: "pointer",
                  position: "relative",
                  border: (project.slug === 'flyme-watch') ? 'none' : 'none',
                  aspectRatio: "1 / 1",
                  width: "100%"
                }}
                onClick={() => handleProjectClick(project.slug)}
                whileHover={{ 
                  scale: 1.05,
                  transition: { 
                    type: "spring", 
                    stiffness: 300, 
                    damping: 25 
                  }
                }}
              >
                {/* 背景媒体 */}
                {project.video ? (
                  <video 
                    src={project.video} 
                    className="media-background" 
                    autoPlay 
                    muted 
                    loop 
                    playsInline
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      zIndex: 1
                    }}
                  />
                ) : project.image ? (
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="media-background"
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      zIndex: 1
                    }}
                  />
                ) : null}
                
                {/* hover时的遮罩层 - Cover除外 */}
                {project.slug !== 'cover-design' && (
                  <div 
                    className="hover-overlay"
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      background: project.hasBackground ? 
                        "linear-gradient(to top, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.2) 50%, transparent 100%)" :
                        "linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 50%, transparent 100%)",
                      zIndex: 2,
                      opacity: 0,
                      transition: "opacity 0.3s ease"
                    }}
                  />
                )}
                
                {/* Cover项目的特殊遮罩层 */}
                {project.slug === 'cover-design' && (
                  <div 
                    className="hover-overlay"
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      background: "linear-gradient(to top, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.2) 50%, transparent 100%)",
                      zIndex: 2,
                      opacity: 0,
                      transition: "opacity 0.3s ease"
                    }}
                  />
                )}

                {/* 项目标题 - hover时显示 */}
                {project.title && (
                  <div 
                    className="project-title"
                    style={{
                      position: "absolute",
                      bottom: "20px",
                      left: "20px",
                      right: "20px",
                      zIndex: 3,
                      color: "white",
                      fontWeight: "600",
                      fontSize: "clamp(14px, 2vw, 18px)",
                      textShadow: "0 2px 4px rgba(0,0,0,0.5)",
                      opacity: 0,
                      transform: "translateY(10px)",
                      transition: "all 0.3s ease"
                    }}
                  >
                    {project.title}
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </section>
      </motion.div>
    </motion.div>
  );
}