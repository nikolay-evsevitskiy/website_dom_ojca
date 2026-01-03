import React from 'react';

export const Logo: React.FC<{ className?: string }> = ({ className = "w-12 h-12" }) => {
  
  return (
    <img 
      src="/components/images/logo1.png"
      alt="Dom Ojca Logo"
      className={`${className} object-contain`}
      style={{ 
        backgroundColor: 'transparent',
        mixBlendMode: 'normal'
      }}
    />
  );
};