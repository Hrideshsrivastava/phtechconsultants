// src/hooks/useIsMobile.js
import { useState, useEffect } from 'react';

// Tailwind's 'md' breakpoint is 768px
const MOBILE_BREAKPOINT = 768; 

export const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < MOBILE_BREAKPOINT);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    };

    window.addEventListener('resize', handleResize);
    // Cleanup the event listener on component unmount
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return isMobile;
};