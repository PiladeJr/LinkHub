import React, { useState } from 'react';
import Button from './Button';

const FloatingActionButton = ({ onClick, className = '' }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };

  return (
    <div className={`fixed bottom-6 right-6 z-50 ${className}`}>
      <Button
        variant="default"
        size="icon"
        onClick={handleClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        iconName="Link"
        iconSize={24}
        className={`
          w-14 h-14 rounded-full shadow-elevated hover:shadow-card
          transition-all duration-300 ease-out
          ${isHovered ? 'scale-110' : 'scale-100'}
          bg-primary hover:bg-primary/90 text-primary-foreground
          border-0 focus:ring-4 focus:ring-primary/20
        `}
        title="Add new link"
      />
      
      {/* Tooltip */}
      {isHovered && (
        <div className="absolute bottom-full right-0 mb-2 px-3 py-1 bg-foreground text-background text-sm rounded-md whitespace-nowrap animate-fade-in">
          Add Link
          <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-foreground"></div>
        </div>
      )}
    </div>
  );
};

export default FloatingActionButton;