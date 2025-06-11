import React from 'react';

interface ColonProps {
  className?: string;
  width?: number;
  height?: number;
}

const Colon: React.FC<ColonProps> = ({ 
  className = "", 
  width, 
  height 
}) => {
  return (
    <svg 
      width={width || "71"} 
      height={height || "196"} 
      viewBox="0 0 71 196" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Grid pattern - 3 columns instead of 5 */}
      <rect x="0.5" y="0.5" width="20" height="20" stroke="#D0D0D0" strokeOpacity="0.33"/>
      <rect x="0.5" y="25.5" width="20" height="20" stroke="#D0D0D0" strokeOpacity="0.33"/>
      <rect x="0.5" y="50.5" width="20" height="20" stroke="#D0D0D0" strokeOpacity="0.33"/>
      <rect x="0.5" y="75.5" width="20" height="20" stroke="#D0D0D0" strokeOpacity="0.33"/>
      <rect x="0.5" y="100.5" width="20" height="20" stroke="#D0D0D0" strokeOpacity="0.33"/>
      <rect x="0.5" y="125.5" width="20" height="20" stroke="#D0D0D0" strokeOpacity="0.33"/>
      <rect x="0.5" y="150.5" width="20" height="20" stroke="#D0D0D0" strokeOpacity="0.33"/>
      <rect x="0.5" y="175.5" width="20" height="20" stroke="#D0D0D0" strokeOpacity="0.33"/>
      
      <rect x="25.5" y="0.5" width="20" height="20" stroke="#D0D0D0" strokeOpacity="0.33"/>
      <rect x="25.5" y="25.5" width="20" height="20" stroke="#D0D0D0" strokeOpacity="0.33"/>
      <rect x="25.5" y="50.5" width="20" height="20" stroke="#D0D0D0" strokeOpacity="0.33"/>
      <rect x="25.5" y="75.5" width="20" height="20" stroke="#D0D0D0" strokeOpacity="0.33"/>
      <rect x="25.5" y="100.5" width="20" height="20" stroke="#D0D0D0" strokeOpacity="0.33"/>
      <rect x="25.5" y="125.5" width="20" height="20" stroke="#D0D0D0" strokeOpacity="0.33"/>
      <rect x="25.5" y="150.5" width="20" height="20" stroke="#D0D0D0" strokeOpacity="0.33"/>
      <rect x="25.5" y="175.5" width="20" height="20" stroke="#D0D0D0" strokeOpacity="0.33"/>
      
      <rect x="50.5" y="0.5" width="20" height="20" stroke="#D0D0D0" strokeOpacity="0.33"/>
      <rect x="50.5" y="25.5" width="20" height="20" stroke="#D0D0D0" strokeOpacity="0.33"/>
      <rect x="50.5" y="50.5" width="20" height="20" stroke="#D0D0D0" strokeOpacity="0.33"/>
      <rect x="50.5" y="75.5" width="20" height="20" stroke="#D0D0D0" strokeOpacity="0.33"/>
      <rect x="50.5" y="100.5" width="20" height="20" stroke="#D0D0D0" strokeOpacity="0.33"/>
      <rect x="50.5" y="125.5" width="20" height="20" stroke="#D0D0D0" strokeOpacity="0.33"/>
      <rect x="50.5" y="150.5" width="20" height="20" stroke="#D0D0D0" strokeOpacity="0.33"/>
      <rect x="50.5" y="175.5" width="20" height="20" stroke="#D0D0D0" strokeOpacity="0.33"/>
      
      {/* Colon dots - just 2 single dots */}
      {/* Upper dot */}
      <rect x="25" y="75" width="21" height="21" fill="white"/>
      
      {/* Lower dot */}
      <rect x="25" y="125" width="21" height="21" fill="white"/>
    </svg>
  );
};

export default Colon; 