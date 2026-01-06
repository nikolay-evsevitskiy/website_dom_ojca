import React, { useState } from 'react';

export const Logo: React.FC<{ className?: string }> = ({ className = "w-12 h-12" }) => {
  const [imgSrc, setImgSrc] = useState(() => {
    // Используем BASE_URL из Vite для правильной работы с GitHub Pages
    const baseUrl = import.meta.env.BASE_URL || '/';
    // Собираем путь правильно: baseUrl уже содержит слэш в конце если нужен
    // Если baseUrl = '/' то путь будет '/components/images/logo1.png'
    // Если baseUrl = '/website_dom_ojca/' то путь будет '/website_dom_ojca/components/images/logo1.png'
    const path = baseUrl === '/' 
      ? '/components/images/logo1.png'
      : `${baseUrl}components/images/logo1.png`;
    return path;
  });

  const handleError = () => {
    // Fallback на альтернативные пути
    const alternatives = [
      '/components/images/logo1.png',
      './components/images/logo1.png',
      'components/images/logo1.png'
    ];
    
    const currentIndex = alternatives.indexOf(imgSrc);
    if (currentIndex < alternatives.length - 1) {
      setImgSrc(alternatives[currentIndex + 1]);
    }
  };
  
  return (
    <img 
      src={imgSrc}
      alt="Dom Ojca Logo"
      className={`${className} object-contain`}
      style={{ 
        backgroundColor: 'transparent',
        mixBlendMode: 'normal'
      }}
      onError={handleError}
    />
  );
};