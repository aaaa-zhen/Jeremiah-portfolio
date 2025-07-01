import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import VideoPlayer from '../components/VideoPlayer';
import videoMP4 from '../assets/videos/video.mp4';
import aicyMP4 from '../assets/videos/aicy.mp4';
import aicyuiMP4 from '../assets/videos/aicyui.mp4';
import removethirdpersonMP4 from '../assets/videos/removethirdperson.mp4';
import photoexpandMP4 from '../assets/videos/photoexpand.mp4';
import scanMP4 from '../assets/videos/scan.mp4';
import rubberbandVolumeMP4 from '../assets/videos/rubberband volume.mp4';
import shaderglowMP4 from '../assets/videos/shaderglow.mp4';
import workoutMP4 from '../assets/videos/workout.mp4';
import watchVideo from '../assets/videos/watchcover.mp4';
import iconsMP4 from '../assets/videos/icons.mp4';
import autoaicyMP4 from '../assets/videos/autoaciy.mp4';
import aiagentconceptMP4 from '../assets/videos/aiagentconcept.mp4';
import aiagentconceptmakingMP4 from '../assets/videos/aiagentconceptmaking.mp4';
import weatherMP4 from '../assets/videos/weather.mp4';
import arMP4 from '../assets/videos/ar.mp4';
import arcommentsMP4 from '../assets/videos/arcomments.mp4';
import armutiblesstateMP4 from '../assets/videos/armutiblesstate.mp4';
import arwithmusicMP4 from '../assets/videos/arwithmusic.mp4';
import filingMP4 from '../assets/videos/filing.mp4';
import filingexampleMP4 from '../assets/videos/filingexample.mp4';
import './ProjectDetail.css';

export default function ProjectDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);

  const handleBackToHome = () => {
    navigate('/');
  };

  // ESC 键返回功能
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        navigate('/');
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [navigate]);

  // 滚动监听，控制关闭按钮背景
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      setIsScrolled(scrollTop > 100); // 滚动超过100px时隐藏背景
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  // Mobile Interface project data
  const mobileInterfaceProject = {
    category: "MOBILE INTERACTION DESIGN",
    title: "Flyme OS: System Interface Design",
    description: "As a mobile interaction designer for Flyme OS, I focus on creating intuitive and smooth user experiences. Through deep understanding of user needs and behavioral patterns, I designed a series of innovative interface interaction solutions that enhance user efficiency and delight on mobile devices.",
    meta: "FLYME OS, MEIZU",
    videos: [
      {
        label: "Flyme OS Interface",
        src: videoMP4
      },
      {
        label: "AI Assistant",
        src: aicyMP4
      },
      {
        label: "AI Interface Design",
        src: aicyuiMP4
      },
      {
        label: "Smart Object Removal",
        src: removethirdpersonMP4
      },
      {
        label: "Shader Glow Effect",
        src: shaderglowMP4
      },
      {
        label: "Smart Scan",
        src: scanMP4
      },
      {
        label: "Rubberband Volume",
        src: rubberbandVolumeMP4
      },
      {
        label: "Photo Expansion",
        src: photoexpandMP4
      },
      {
        label: "Icons Animation",
        src: iconsMP4
      },
      {
        label: "AI Agent Concept",
        src: aiagentconceptMP4
      },
      {
        label: "AI Concept Making",
        src: aiagentconceptmakingMP4
      },
      {
        label: "Weather Interface",
        src: weatherMP4
      }
    ],
    sections: [
      {
        title: "Design Challenge",
        content: "The main challenge was balancing visual aesthetics with functionality and usability within limited screen space. Particularly in modern interface design, finding the right balance between offering more features while maintaining simplicity. Through in-depth research of user behavior and usage scenarios, I developed a comprehensive set of interaction guidelines and visual language."
      },
      {
        title: "Technical Implementation",
        content: "The interface design adopted modern design system methodologies, establishing unified color specifications, typography hierarchy, and component libraries. Animation design follows iOS Human Interface Guidelines to ensure natural and responsive interactions. Design feasibility and user acceptance were validated through prototyping tools."
      }
    ],
    skills: ["Figma", "Sketch", "Principle", "iOS Design", "Prototyping", "Motion Design", "Design System"]
  };

  // Smart Glasses AR project data
  const smartGlassesProject = {
    category: "AR INTERFACE DESIGN",
    title: "Smart Glasses: AR Experience Design",
    description: "Focused on creating intuitive AR interface concepts and developing a web-based 3D preview platform. This project involved conceptual design work and building tools to help developers and visual designers collaborate more effectively through OBJ model uploads, 3D previews, and animation creation.",
    meta: "AR CONCEPT, WEB DEVELOPMENT",
    videos: [
      {
        label: "AR Interface Demo",
        src: arMP4
      },
      {
        label: "AR Comments System",
        src: arcommentsMP4
      },
      {
        label: "AR Mutable State",
        src: armutiblesstateMP4
      },
      {
        label: "AR with Music",
        src: arwithmusicMP4
      }
    ],
    sections: [
      {
        title: "Design Concept",
        content: "The project focused on exploring AR interface paradigms and user interaction patterns in augmented reality environments. Key challenges included designing for spatial computing, maintaining visual hierarchy in 3D space, and creating intuitive gesture-based interactions that feel natural to users."
      },
      {
        title: "Development Platform",
        content: "Built a comprehensive web-based platform that allows designers and developers to upload OBJ files and preview 3D models in real-time. The platform features animation tools, lighting controls, and collaborative features that streamline the AR content creation workflow."
      }
    ],
    skills: ["AR Design", "Three.js", "WebGL", "3D Modeling", "Spatial UI", "Web Development", "OBJ Processing"]
  };

  // Flyme Watch project data
  const flymeWatchProject = {
    category: "WEARABLE MOTION DESIGN",
    title: "Flyme Watch: Watch OS Motion Design",
    description: "As the lead motion designer for Flyme Watch OS, I was responsible for creating engaging motion graphics and animations throughout the watch interface. I designed health-focused character animations and collaborated closely with development partners to ensure seamless implementation of motion systems.",
    meta: "FLYME WATCH, MEIZU",
    videos: [
      {
        label: "Workout Animation",
        src: workoutMP4
      }
    ],
    sections: [
      {
        title: "Motion Design Leadership",
        content: "Led the motion design efforts for Flyme Watch OS, focusing on creating smooth, intuitive animations that enhance the user experience on small screen devices. Developed a comprehensive motion language that balances performance optimization with visual delight, ensuring animations feel responsive and purposeful."
      },
      {
        title: "Health & Character Animation",
        content: "Designed and animated health-focused character personas and workout animations that motivate users during fitness activities. Collaborated extensively with development partners and stakeholders to establish technical requirements, animation specifications, and implementation guidelines for the watch platform."
      }
    ],
    skills: ["Motion Design", "Character Animation", "Watch OS", "Health UI", "Animation Systems", "Cross-team Collaboration", "Performance Optimization"]
  };

  // Flyme Auto project data
  const flymeAutoProject = {
    category: "AUTOMOTIVE INTERACTION DESIGN",
    title: "Flyme Auto: System Applications & Gesture Interactions",
    description: "As the lead interaction designer for Flyme Auto system applications, I was responsible for designing and implementing motion graphics for core system functions including Control Center, Desktop, and various gesture-based interactions. I focused on creating intuitive and safe automotive interface experiences that enhance driver efficiency while maintaining attention on the road.",
    meta: "FLYME AUTO, MEIZU",
    videos: [
      {
        label: "Auto AICY Interface",
        src: autoaicyMP4
      }
    ],
    sections: [
      {
        title: "System Applications Design",
        content: "Led the design of core Flyme Auto system applications including the Control Center for quick access to vehicle functions, Desktop customization for personalized driving experiences, and system-wide navigation patterns. Developed comprehensive interaction guidelines that prioritize driver safety through simplified gesture controls and clear visual hierarchies optimized for automotive environments."
      },
      {
        title: "Gesture Interaction & Motion Design",
        content: "Created intuitive gesture-based interaction systems that allow drivers to control various vehicle functions with minimal distraction. Designed and implemented motion graphics for system transitions, feedback animations, and contextual interfaces that adapt to different driving scenarios. Collaborated closely with automotive engineers to ensure motion designs met safety standards and performance requirements."
      }
    ],
    skills: ["Automotive UX", "Gesture Design", "Motion Graphics", "System UI", "Safety-First Design", "Cross-platform Integration", "Automotive Standards"]
  };

  if (slug === 'mobile-interface') {
    return (
      <motion.div
        className="project-detail"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          type: "spring",
          stiffness: 120,
          damping: 35,
          mass: 1.8,
          delay: 0.1
        }}
      >
        <motion.button 
          onClick={handleBackToHome} 
          className="close-button"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ 
            opacity: 1, 
            scale: 1,
            backgroundColor: isScrolled ? 'rgba(255, 255, 255, 0)' : 'rgba(255, 255, 255, 0.1)',
            backdropFilter: isScrolled ? 'blur(0px)' : 'blur(20px)',
            borderColor: isScrolled ? 'rgba(255, 255, 255, 0)' : 'rgba(255, 255, 255, 0.2)'
          }}
          transition={{ 
            delay: 0.1, 
            duration: 0.3,
            backgroundColor: { duration: 0.3 },
            backdropFilter: { duration: 0.3 },
            borderColor: { duration: 0.3 }
          }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </motion.button>

        <div className="container">
          <motion.header 
            className="header"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <div className="category">{mobileInterfaceProject.category}</div>
            <h1 className="title">{mobileInterfaceProject.title}</h1>
            <p className="description">{mobileInterfaceProject.description}</p>
            <div className="meta">{mobileInterfaceProject.meta}</div>
          </motion.header>

          <motion.section 
            className="showcase"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <div className="video-grid">
              {mobileInterfaceProject.videos.slice(0, 8).map((video, index) => (
                <div key={index} className="video-section">
                  <div className="section-label">{video.label}</div>
                  <div className="video-container-card">
                    <VideoPlayer src={video.src} />
                  </div>
                </div>
              ))}
            </div>
          </motion.section>

          {/* Fling Animation Section */}
          <motion.section 
            className="showcase fling-section"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            <div className="section-label">Jetpack Compose Fling Interactions</div>
            <div className="fling-container">
              <div className="fling-video-item">
                <div className="fling-video-label">Fling Animation (Jetpack Compose)</div>
                <VideoPlayer 
                  src={filingMP4}
                  className="fling-video"
                />
              </div>
              <div className="fling-video-item">
                <div className="fling-video-label">Fling Interaction Example</div>
                <VideoPlayer 
                  src={filingexampleMP4}
                  className="fling-video"
                />
              </div>
            </div>
          </motion.section>

          {/* Remaining Videos */}
          <motion.section 
            className="showcase"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
          >
            <div className="video-grid">
              {mobileInterfaceProject.videos.slice(8).map((video, index) => (
                <div key={index + 8} className="video-section">
                  <div className="section-label">{video.label}</div>
                  <div className="video-container-card">
                    <VideoPlayer src={video.src} />
                  </div>
                </div>
              ))}
            </div>
          </motion.section>

          {mobileInterfaceProject.sections.map((section, index) => (
            <motion.section 
              key={index}
              className="content-section"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 + index * 0.2, duration: 0.6 }}
            >
              <h2 className="section-title">{section.title}</h2>
              <p className="section-text">{section.content}</p>
              
              {index === 1 && (
                <div className="skills">
                  <div className="skill-tags">
                    {mobileInterfaceProject.skills.map((skill, skillIndex) => (
                      <span key={skillIndex} className="skill-tag">{skill}</span>
                    ))}
                  </div>
                </div>
              )}
            </motion.section>
          ))}

        </div>
      </motion.div>
    );
  }

  if (slug === 'smart-glasses') {
    return (
      <motion.div
        className="project-detail"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          type: "spring",
          stiffness: 120,
          damping: 35,
          mass: 1.8,
          delay: 0.1
        }}
      >
        <motion.button 
          onClick={handleBackToHome} 
          className="close-button"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ 
            opacity: 1, 
            scale: 1,
            backgroundColor: isScrolled ? 'rgba(255, 255, 255, 0)' : 'rgba(255, 255, 255, 0.1)',
            backdropFilter: isScrolled ? 'blur(0px)' : 'blur(20px)',
            borderColor: isScrolled ? 'rgba(255, 255, 255, 0)' : 'rgba(255, 255, 255, 0.2)'
          }}
          transition={{ 
            delay: 0.1, 
            duration: 0.3,
            backgroundColor: { duration: 0.3 },
            backdropFilter: { duration: 0.3 },
            borderColor: { duration: 0.3 }
          }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </motion.button>

        <div className="container">
          <motion.header 
            className="header"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <div className="category">{smartGlassesProject.category}</div>
            <h1 className="title">{smartGlassesProject.title}</h1>
            <p className="description">{smartGlassesProject.description}</p>
            <div className="meta">{smartGlassesProject.meta}</div>
          </motion.header>

          <motion.section 
            className="showcase"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <div className="video-grid ar-videos">
              {smartGlassesProject.videos.map((video, index) => (
                <div key={index} className="video-section">
                  <div className="section-label">{video.label}</div>
                  <div className="video-container-card">
                    <VideoPlayer src={video.src} />
                  </div>
                </div>
              ))}
            </div>
          </motion.section>

          {smartGlassesProject.sections.map((section, index) => (
            <motion.section 
              key={index}
              className="content-section"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 + index * 0.2, duration: 0.6 }}
            >
              <h2 className="section-title">{section.title}</h2>
              <p className="section-text">{section.content}</p>
              
              {index === 1 && (
                <div className="skills">
                  <div className="skill-tags">
                    {smartGlassesProject.skills.map((skill, skillIndex) => (
                      <span key={skillIndex} className="skill-tag">{skill}</span>
                    ))}
                  </div>
                </div>
              )}
            </motion.section>
          ))}
        </div>
      </motion.div>
    );
  }

  if (slug === 'flyme-watch') {
    return (
      <motion.div
        className="project-detail"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          type: "spring",
          stiffness: 120,
          damping: 35,
          mass: 1.8,
          delay: 0.1
        }}
      >
        <motion.button 
          onClick={handleBackToHome} 
          className="close-button"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ 
            opacity: 1, 
            scale: 1,
            backgroundColor: isScrolled ? 'rgba(255, 255, 255, 0)' : 'rgba(255, 255, 255, 0.1)',
            backdropFilter: isScrolled ? 'blur(0px)' : 'blur(20px)',
            borderColor: isScrolled ? 'rgba(255, 255, 255, 0)' : 'rgba(255, 255, 255, 0.2)'
          }}
          transition={{ 
            delay: 0.1, 
            duration: 0.3,
            backgroundColor: { duration: 0.3 },
            backdropFilter: { duration: 0.3 },
            borderColor: { duration: 0.3 }
          }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </motion.button>

        <div className="container">
          <motion.header 
            className="header"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <div className="category">{flymeWatchProject.category}</div>
            <h1 className="title">{flymeWatchProject.title}</h1>
            <p className="description">{flymeWatchProject.description}</p>
            <div className="meta">{flymeWatchProject.meta}</div>
          </motion.header>

          <motion.section 
            className="showcase"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <div className="video-grid single-video">
              {flymeWatchProject.videos.map((video, index) => (
                <div key={index} className="video-section">
                  <div className="section-label">{video.label}</div>
                  <div className="video-container-card">
                    <VideoPlayer src={video.src} />
                  </div>
                </div>
              ))}
            </div>
          </motion.section>

          {flymeWatchProject.sections.map((section, index) => (
            <motion.section 
              key={index}
              className="content-section"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 + index * 0.2, duration: 0.6 }}
            >
              <h2 className="section-title">{section.title}</h2>
              <p className="section-text">{section.content}</p>
              
              {index === 1 && (
                <div className="skills">
                  <div className="skill-tags">
                    {flymeWatchProject.skills.map((skill, skillIndex) => (
                      <span key={skillIndex} className="skill-tag">{skill}</span>
                    ))}
                  </div>
                </div>
              )}
            </motion.section>
          ))}
        </div>
      </motion.div>
    );
  }

  if (slug === 'flyme-auto') {
    return (
      <motion.div
        className="project-detail"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          type: "spring",
          stiffness: 120,
          damping: 35,
          mass: 1.8,
          delay: 0.1
        }}
      >
        <motion.button 
          onClick={handleBackToHome} 
          className="close-button"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ 
            opacity: 1, 
            scale: 1,
            backgroundColor: isScrolled ? 'rgba(255, 255, 255, 0)' : 'rgba(255, 255, 255, 0.1)',
            backdropFilter: isScrolled ? 'blur(0px)' : 'blur(20px)',
            borderColor: isScrolled ? 'rgba(255, 255, 255, 0)' : 'rgba(255, 255, 255, 0.2)'
          }}
          transition={{ 
            delay: 0.1, 
            duration: 0.3,
            backgroundColor: { duration: 0.3 },
            backdropFilter: { duration: 0.3 },
            borderColor: { duration: 0.3 }
          }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </motion.button>

        <div className="container">
          <motion.header 
            className="header"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <div className="category">{flymeAutoProject.category}</div>
            <h1 className="title">{flymeAutoProject.title}</h1>
            <p className="description">{flymeAutoProject.description}</p>
            <div className="meta">{flymeAutoProject.meta}</div>
          </motion.header>

          <motion.section 
            className="showcase"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <div className="video-grid single-video">
              {flymeAutoProject.videos.map((video, index) => (
                <div key={index} className="video-section">
                  <div className="section-label">{video.label}</div>
                  <div className="video-container-card">
                    <VideoPlayer src={video.src} controls={false} />
                  </div>
                </div>
              ))}
            </div>
          </motion.section>

          {flymeAutoProject.sections.map((section, index) => (
            <motion.section 
              key={index}
              className="content-section"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 + index * 0.2, duration: 0.6 }}
            >
              <h2 className="section-title">{section.title}</h2>
              <p className="section-text">{section.content}</p>
              
              {index === 1 && (
                <div className="skills">
                  <div className="skill-tags">
                    {flymeAutoProject.skills.map((skill, skillIndex) => (
                      <span key={skillIndex} className="skill-tag">{skill}</span>
                    ))}
                  </div>
                </div>
              )}
            </motion.section>
          ))}
        </div>
      </motion.div>
    );
  }

  // Default fallback for other projects
  return (
    <motion.div
      className="project-detail"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.2 }}
    >
      <motion.button 
        onClick={handleBackToHome} 
        className="close-button"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ 
          opacity: 1, 
          scale: 1,
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(20px)',
          borderColor: 'rgba(255, 255, 255, 0.2)'
        }}
        transition={{ 
          delay: 0.1, 
          duration: 0.3
        }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </motion.button>
      
      <div className="container">
        <h1 style={{ fontSize: '48px', marginBottom: '20px', color: '#fff' }}>
          Project: {slug}
        </h1>
        <p style={{ color: '#888', fontSize: '16px' }}>
          Project details coming soon...
        </p>
      </div>
    </motion.div>
  );
}