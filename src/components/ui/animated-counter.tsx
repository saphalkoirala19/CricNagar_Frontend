
import React, { useState, useEffect, useRef } from 'react';

interface AnimatedCounterProps {
  end: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
}

const AnimatedCounter = ({
  end,
  duration = 2000,
  prefix = '',
  suffix = '',
  className = 'text-4xl font-bold',
}: AnimatedCounterProps) => {
  const [count, setCount] = useState(0);
  const counterRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          
          let startTime: number;
          let animationFrameId: number;
          
          const step = (timestamp: number) => {
            if (!startTime) startTime = timestamp;
            const progress = timestamp - startTime;
            
            const percentage = Math.min(progress / duration, 1);
            const easedPercentage = easeOutCubic(percentage);
            const currentCount = Math.floor(easedPercentage * end);
            
            setCount(currentCount);
            
            if (progress < duration) {
              animationFrameId = requestAnimationFrame(step);
            } else {
              setCount(end);
            }
          };
          
          animationFrameId = requestAnimationFrame(step);
          
          return () => {
            cancelAnimationFrame(animationFrameId);
          };
        }
      },
      { threshold: 0.1 }
    );
    
    if (counterRef.current) {
      observer.observe(counterRef.current);
    }
    
    return () => {
      if (counterRef.current) {
        observer.unobserve(counterRef.current);
      }
    };
  }, [end, duration]);
  
  // Easing function for smoothing the animation
  const easeOutCubic = (x: number): number => {
    return 1 - Math.pow(1 - x, 3);
  };
  
  return (
    <div ref={counterRef} className={className}>
      {prefix}
      {count.toLocaleString()}
      {suffix}
    </div>
  );
};

export default AnimatedCounter;
