import React from 'react';

const Shimmer: React.FC = () => {
  return (
    <div className="animate-pulse flex space-x-4">
      <div className="w-full h-48 bg-gray-200 rounded"></div>
    </div>
  );
};

export default Shimmer;
