'use client';

import React, { useState, useEffect } from 'react';

interface ResponsiveWrapperProps {
  children: React.ReactNode;
}

export default function ResponsiveWrapper({ children }: ResponsiveWrapperProps) {
  const [isMounted, setIsMounted] = useState(false);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    setIsMounted(true);
    
    const updateScale = () => {
      if (typeof window !== 'undefined') {
        // Only apply scaling for very small screens
        const minWidth = 393;
        const currentWidth = window.innerWidth;
        
        if (currentWidth < minWidth) {
          setScale(Math.max(0.8, (currentWidth * 0.9) / minWidth));
        } else {
          setScale(1);
        }
      }
    };

    updateScale();
    window.addEventListener('resize', updateScale);
    
    return () => window.removeEventListener('resize', updateScale);
  }, []);

  const isScaled = isMounted && scale < 1;

  return (
    <div 
      style={isScaled ? { 
        transform: `scale(${scale})`,
        transformOrigin: 'center top',
        width: '100%',
        minHeight: `${scale * 100}vh`,
      } : {
        minHeight: '100vh',
      }}
      className="w-full flex flex-col"
    >
      {children}
    </div>
  );
} 