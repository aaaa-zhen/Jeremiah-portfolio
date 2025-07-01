import { useCallback } from 'react';

export default function VideoPlayer({ 
  src, 
  className = "demo-video-clean", 
  autoPlay = true, 
  muted = true, 
  loop = true, 
  playsInline = true,
  controls = false,
  preload = "metadata",
  ...props 
}) {
  const handleVideoLoad = useCallback((event) => {
    event.target.classList.add('loaded');
  }, []);

  return (
    <video 
      className={className}
      autoPlay={autoPlay}
      muted={muted}
      loop={loop}
      playsInline={playsInline}
      controls={controls}
      onLoadedData={handleVideoLoad}
      preload={preload}
      {...props}
    >
      <source src={src} type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  );
}