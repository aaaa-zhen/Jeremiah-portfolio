import { motion } from 'framer-motion';

export default function AboutPage() {
  return (
    <motion.div
      style={{
        minHeight: '100vh',
        backgroundColor: '#000000',
        color: '#ffffff',
        padding: '80px 15px 120px',
        fontFamily: "'Sansation', sans-serif"
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.2 }}
    >
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <h1 style={{ fontSize: '48px', marginBottom: '20px' }}>
          About Me
        </h1>
        <p style={{ color: '#ccc', fontSize: '16px', lineHeight: '1.6' }}>
          I'm Jeremiah, an interaction designer and motion designer passionate about creating 
          intuitive and delightful digital experiences.
        </p>
      </div>
    </motion.div>
  );
}