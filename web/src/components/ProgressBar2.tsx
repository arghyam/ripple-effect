import React from 'react';

interface ProgressBarProps {
  progress: number;
  color: string;
}

const ProgressBar2: React.FC<ProgressBarProps> = ({ progress, color }) => {
  return (
    <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
      <div 
        className="h-3 rounded-full transition-all duration-300"
        style={{ 
          width: `${progress}%`,
          backgroundColor: color
        }}
      />
    </div>
  );
};

export default ProgressBar2;