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

// CustomCursor removed - using liquid glass cursor instead

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
        <AnimatedRoutes />
        <BottomNav />
      </div>
    </Router>
  );
}

export default App;