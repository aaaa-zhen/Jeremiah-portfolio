import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import HomePage from './pages/HomePage';
import ProjectDetail from './pages/ProjectDetail';
import AboutPage from './pages/AboutPage';
import BottomNav from './components/BottomNav';
import './App.css';

function AnimatedRoutes() {
  return (
    <div className="page-container">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/projects" element={
          <div className="coming-soon-page">
            <div className="coming-soon-content">
              <h1>Projects</h1>
              <p>Coming Soon</p>
            </div>
          </div>
        } />
        <Route path="/projects/:slug" element={<ProjectDetail />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/posts" element={
          <div className="coming-soon-page">
            <div className="coming-soon-content">
              <h1>Posts</h1>
              <p>Coming Soon</p>
            </div>
          </div>
        } />
      </Routes>
    </div>
  );
}

function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const updateMousePosition = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseEnter = (e) => {
      if (e.target.matches('a, button, [role="button"], .portfolio-item, .dock-item')) {
        setIsHovering(true);
      }
    };

    const handleMouseLeave = (e) => {
      if (e.target.matches('a, button, [role="button"], .portfolio-item, .dock-item')) {
        setIsHovering(false);
      }
    };

    document.addEventListener('mousemove', updateMousePosition);
    document.addEventListener('mouseenter', handleMouseEnter, true);
    document.addEventListener('mouseleave', handleMouseLeave, true);

    return () => {
      document.removeEventListener('mousemove', updateMousePosition);
      document.removeEventListener('mouseenter', handleMouseEnter, true);
      document.removeEventListener('mouseleave', handleMouseLeave, true);
    };
  }, []);

  return (
    <motion.div
      className="custom-cursor"
      style={{
        left: mousePosition.x,
        top: mousePosition.y,
      }}
      animate={{
        scale: isHovering ? 1.5 : 1,
      }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 30,
        mass: 0.8
      }}
    />
  );
}

function App() {
  useEffect(() => {
    // Force scroll to top on app mount/refresh
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);
  }, []);

  return (
    <Router>
      <div className="app">
        <CustomCursor />
        <AnimatedRoutes />
        <BottomNav />
      </div>
    </Router>
  );
}

export default App;