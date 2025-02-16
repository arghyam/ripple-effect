import React, { useState, useEffect } from 'react';

interface NewsCarouselProps {
  items: string[];
  interval: number;
}

const NewsCarousel: React.FC<NewsCarouselProps> = ({ items, interval }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex(prev => (prev + 1) % items.length);
    }, interval);
    
    return () => clearInterval(timer);
  }, [items.length, interval]);

  return (
    <div className="overflow-hidden h-20 relative">
      {items.map((item, index) => (
        <div
          key={index}
          className={`absolute w-full transition-opacity duration-500 ${
            index === activeIndex ? 'opacity-100' : 'opacity-0'
          }`}
          style={{ top: `${(index - activeIndex) * 100}%` }}
        >
          <p className="text-gray-600 text-center p-4">{item}</p>
        </div>
      ))}
    </div>
  );
};

export default NewsCarousel;