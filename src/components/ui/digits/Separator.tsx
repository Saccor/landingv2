import React from 'react';

interface SeparatorProps {
  className?: string;
  width?: number;
  height?: number;
}

const Separator: React.FC<SeparatorProps> = ({ 
  className = "", 
  width, 
  height 
}) => {
  return (
    <svg 
      width={width || "21"} 
      height={height || "196"} 
      viewBox="0 0 21 196" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Full column of empty grid squares */}
      <rect x="0.5" y="0.5" width="20" height="20" stroke="#D0D0D0" strokeOpacity="0.33"/>
      <rect x="0.5" y="25.5" width="20" height="20" stroke="#D0D0D0" strokeOpacity="0.33"/>
      <rect x="0.5" y="50.5" width="20" height="20" stroke="#D0D0D0" strokeOpacity="0.33"/>
      <rect x="0.5" y="75.5" width="20" height="20" stroke="#D0D0D0" strokeOpacity="0.33"/>
      <rect x="0.5" y="100.5" width="20" height="20" stroke="#D0D0D0" strokeOpacity="0.33"/>
      <rect x="0.5" y="125.5" width="20" height="20" stroke="#D0D0D0" strokeOpacity="0.33"/>
      <rect x="0.5" y="150.5" width="20" height="20" stroke="#D0D0D0" strokeOpacity="0.33"/>
      <rect x="0.5" y="175.5" width="20" height="20" stroke="#D0D0D0" strokeOpacity="0.33"/>
    </svg>
  );
};

export default Separator; 