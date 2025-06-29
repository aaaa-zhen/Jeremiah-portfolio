import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useState, useRef } from 'react';
import './BottomNav.css';

const navItems = [
  { 
    id: 'home', 
    path: '/', 
    tooltip: 'Home',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
        <polyline points="9,22 9,12 15,12 15,22"/>
      </svg>
    )
  },
  { 
    id: 'projects', 
    path: '/projects', 
    tooltip: 'Projects',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/>
        <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
      </svg>
    )
  },
  { 
    id: 'posts', 
    path: '/posts', 
    tooltip: 'Posts',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
        <polyline points="14,2 14,8 20,8"/>
        <line x1="16" y1="13" x2="8" y2="13"/>
        <line x1="16" y1="17" x2="8" y2="17"/>
        <polyline points="10,9 9,9 8,9"/>
      </svg>
    )
  },
  { 
    id: 'twitter', 
    path: 'https://x.com/40973894', 
    tooltip: 'Twitter/X',
    external: true,
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
      </svg>
    )
  },
  { 
    id: 'github', 
    path: 'https://github.com/aaaa-zhen', 
    tooltip: 'GitHub',
    external: true,
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
      </svg>
    )
  },
  { 
    id: 'about', 
    path: '/about', 
    tooltip: 'About Me',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
        <circle cx="12" cy="7" r="4"/>
      </svg>
    )
  }
];

export default function BottomNav() {
  const navigate = useNavigate();
  const location = useLocation();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const dockRef = useRef(null);
  
  
  const handleNavClick = (item) => {
    if (item.external) {
      window.open(item.path, '_blank');
      return;
    }
    
    if (location.pathname !== item.path) {
      setTimeout(() => {
        navigate(item.path);
      }, 50);
    }
  };

  const handleMouseMove = (e) => {
    if (dockRef.current) {
      const rect = dockRef.current.getBoundingClientRect();
      setMousePosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      });
    }
  };

  const getItemProps = (index) => {
    if (!isHovering) {
      return { scale: 1, marginLeft: 10, marginRight: 10 };
    }

    const itemWidth = 40;
    const baseSpacing = 10;
    const itemCenter = (itemWidth + baseSpacing * 2) * index + itemWidth / 2 + baseSpacing * (index + 1);
    const distance = Math.abs(mousePosition.x - itemCenter);
    
    let scale = 1;
    let marginMultiplier = 1;
    
    if (distance < 40) {
      scale = 1.3;
      marginMultiplier = 1.4; // 更大的间距
    } else if (distance < 80) {
      scale = 1.2;
      marginMultiplier = 1.2;
    } else if (distance < 120) {
      scale = 1.1;
      marginMultiplier = 1.1;
    }
    
    const dynamicMargin = baseSpacing * marginMultiplier;
    
    return { 
      scale, 
      marginLeft: dynamicMargin, 
      marginRight: dynamicMargin 
    };
  };

  return (
    <div className="dock-container">
      <motion.div 
        className="dock-wrapper"
        initial={{ 
          opacity: 0,
          y: 100,
          scale: 0.9
        }}
        animate={{ 
          opacity: 1,
          y: 0,
          scale: 1
        }}
        transition={{
          opacity: { duration: 0.15, delay: 0.5 },
          y: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.5 },
          scale: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.5 }
        }}
        whileHover={{
          scale: 1.015,
          y: -3
        }}
      >
      <motion.div 
        ref={dockRef}
        className="dock"
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        {navItems.map((item, index) => {
          const isActive = !item.external && location.pathname === item.path;
          const itemProps = getItemProps(index);
          
          return (
            <motion.div
              key={item.id}
              className={`dock-item ${isActive ? 'active' : ''}`}
              onClick={() => handleNavClick(item)}
              animate={itemProps}
              whileHover={{
                scale: itemProps.scale * 1.2,
                transition: {
                  type: "spring",
                  stiffness: 300,
                  damping: 20,
                  mass: 0.6
                }
              }}
              whileTap={{ 
                scale: itemProps.scale * 0.95,
                transition: {
                  type: "spring",
                  stiffness: 500,
                  damping: 30
                }
              }}
              transition={{
                type: "spring",
                stiffness: 400,
                damping: 25,
                mass: 0.6
              }}
              data-tooltip={item.tooltip}
            >
              {item.icon}
            </motion.div>
          );
        })}
      </motion.div>
      </motion.div>
    </div>
  );
}