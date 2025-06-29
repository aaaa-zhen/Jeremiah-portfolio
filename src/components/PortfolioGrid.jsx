// src/components/PortfolioGrid.jsx
import { useState, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";

const portfolioItems = [
  {
    id: "phone",
    slug: "mobile-interface",
    title: "Mobile Interface",
    description: "iOS interface design system",
    background: "linear-gradient(135deg, #333 0%, #1a1a1a 100%)",
    textColor: "#fff",
    descColor: "#ccc",
    area: "phone",
    size: "square",
  },
  {
    id: "glasses",
    slug: "smart-glasses",
    title: "Smart Glasses",
    description: "AR interface exploration",
    background: "linear-gradient(135deg, #333 0%, #1a1a1a 100%)",
    textColor: "#fff",
    descColor: "#ccc",
    area: "glasses",
    size: "square",
  },
  {
    id: "watch",
    slug: "apple-watch",
    title: "Apple Watch",
    description: "Wearable interaction design",
    background: "linear-gradient(135deg, #2c2c2c 0%, #1a1a1a 100%)",
    textColor: "#fff",
    descColor: "#888",
    area: "watch",
    size: "square",
  },
  {
    id: "flyme",
    slug: "flyme-auto",
    title: "Flyme Auto",
    description: "Automotive interface system",
    background: "linear-gradient(135deg, #1a1a1a 0%, #0d0d0d 100%)",
    textColor: "#fff",
    descColor: "#888",
    area: "flyme",
    size: "wide",
    hasIndicator: true,
  },
  {
    id: "live",
    slug: "live-app",
    title: "Live APP",
    description: "Social streaming platform",
    background: "linear-gradient(135deg, #333 0%, #1a1a1a 100%)",
    textColor: "#fff",
    descColor: "#ccc",
    area: "live",
    size: "square",
  },
  {
    id: "uilab",
    slug: "uilab-design",
    title: "UILAB Design Studio",
    description: "Design system and branding",
    background: "linear-gradient(135deg, #333 0%, #1a1a1a 100%)",
    textColor: "#fff",
    descColor: "#ccc",
    area: "uilab",
    size: "half",
  },
];

const PortfolioItem = ({ item, index, onItemClick }) => {
  const controls = useAnimation();

  useEffect(() => {
    controls.start({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        delay: 0.4 + index * 0.1,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    });
  }, [controls, index]);

  const itemVariants = {
    normal: {
      scale: 1,
      zIndex: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 25,
      },
    },
    hovered: {
      scale: 1.02,
      y: -8,
      zIndex: 10,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 25,
      },
    },
  };

  const textVariants = {
    hidden: {
      opacity: 0,
      y: 10,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        ease: "easeOut",
      },
    },
  };

  return (
    <motion.div
      className={`portfolio-item ${item.size}`}
      style={{
        gridArea: item.area,
        background: item.background,
        color: item.textColor,
        borderRadius: "6px",
        overflow: "hidden",
        cursor: "pointer",
        position: "relative",
        aspectRatio: item.size === "square" ? "1" : "auto",
        minHeight: item.size === "half" ? "200px" : "300px",
      }}
      initial={{ opacity: 0, y: 40 }}
      animate={controls}
      variants={itemVariants}
      whileHover="hovered"
      onClick={() => onItemClick(item.slug)}
    >
      {item.hasIndicator && (
        <motion.div
          style={{
            position: "absolute",
            top: "20px",
            left: "20px",
            width: "8px",
            height: "8px",
            background: "#4CAF50",
            borderRadius: "50%",
            boxShadow: "0 0 20px #4CAF50",
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [1, 0.7, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      )}

      <div
        style={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          padding: "40px",
          position: "relative",
        }}
      >
        <motion.div
          variants={textVariants}
          initial="hidden"
          whileHover="visible"
          style={{ paddingTop: "16px" }}
        >
          <h3
            style={{
              fontSize: "20px",
              fontWeight: "700",
              marginBottom: "8px",
              position: "relative",
              zIndex: 2,
            }}
          >
            {item.title}
          </h3>
          <p
            style={{
              fontSize: "12px",
              color: item.descColor,
              position: "relative",
              zIndex: 2,
            }}
          >
            {item.description}
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default function PortfolioGrid({ onProjectClick }) {
  return (
    <section style={{ padding: "40px 0 80px" }}>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "30px",
          gridTemplateAreas: `
            "phone glasses watch ."
            "flyme flyme flyme live"
            "uilab uilab . ."
          `,
        }}
        className="portfolio-grid"
      >
        {portfolioItems.map((item, index) => (
          <PortfolioItem
            key={item.id}
            item={item}
            index={index}
            onItemClick={onProjectClick}
          />
        ))}
      </div>
    </section>
  );
}