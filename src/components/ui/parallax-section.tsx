
import React, { useEffect, useRef } from 'react';

interface ParallaxSectionProps {
  children: React.ReactNode;
  bgImage?: string;
  overlay?: boolean;
  className?: string;
  speed?: number;
}

const ParallaxSection = ({
  children,
  bgImage,
  overlay = true,
  className = '',
  speed = 0.5,
}: ParallaxSectionProps) => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (sectionRef.current) {
        const scrollPosition = window.scrollY;
        const sectionTop = sectionRef.current.offsetTop;
        const sectionHeight = sectionRef.current.offsetHeight;
        
        // Only apply parallax when section is in viewport
        if (
          scrollPosition + window.innerHeight > sectionTop &&
          scrollPosition < sectionTop + sectionHeight
        ) {
          const yPos = (scrollPosition - sectionTop) * speed;
          sectionRef.current.style.backgroundPositionY = `${yPos}px`;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [speed]);

  return (
    <div
      ref={sectionRef}
      className={`relative bg-fixed bg-no-repeat bg-cover ${className}`}
      style={{ backgroundImage: bgImage ? `url(${bgImage})` : undefined }}
    >
      {overlay && (
        <div className="absolute inset-0 bg-black/50 dark:bg-black/70"></div>
      )}
      <div className="relative z-10">{children}</div>
    </div>
  );
};

export default ParallaxSection;
