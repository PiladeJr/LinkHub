import React, { useState, useRef } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
import { formatRelativeTime } from '../../../utils/dateUtils';

const RecentlyAddedCarousel = ({ recentLinks, onLinkClick, onToggleFavorite }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollContainerRef = useRef(null);

  const scrollToNext = () => {
    if (scrollContainerRef?.current) {
      const container = scrollContainerRef?.current;
      const cardWidth = 280; // Card width + gap
      container?.scrollBy({ left: cardWidth, behavior: 'smooth' });
    }
  };

  const scrollToPrev = () => {
    if (scrollContainerRef?.current) {
      const container = scrollContainerRef?.current;
      const cardWidth = 280;
      container?.scrollBy({ left: -cardWidth, behavior: 'smooth' });
    }
  };

  if (!recentLinks || recentLinks?.length === 0) {
    return (
      <div className="bg-card rounded-lg p-6 border border-border">
        <h2 className="text-lg font-semibold text-foreground mb-4">Recently Added</h2>
        <div className="text-center py-8">
          <Icon name="Clock" size={48} className="text-muted-foreground mx-auto mb-3" />
          <p className="text-muted-foreground">No recent links yet</p>
          <p className="text-sm text-muted-foreground mt-1">Links you add will appear here</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card rounded-lg p-6 border border-border">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-foreground">Recently Added</h2>
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={scrollToPrev}
            iconName="ChevronLeft"
            className="text-muted-foreground hover:text-foreground"
          />
          <Button
            variant="ghost"
            size="sm"
            onClick={scrollToNext}
            iconName="ChevronRight"
            className="text-muted-foreground hover:text-foreground"
          />
        </div>
      </div>
      <div
        ref={scrollContainerRef}
        className="flex space-x-4 overflow-x-auto scrollbar-hide pb-2"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {recentLinks?.map((link) => (
          <div
            key={link?.id}
            className="flex-shrink-0 w-64 bg-muted/30 rounded-lg p-4 cursor-pointer transition-micro hover:bg-muted/50 hover:shadow-subtle group"
          >
            <div 
              onClick={() => onLinkClick(link)}
              className="flex items-start space-x-3"
            >
              <div className="w-12 h-12 rounded-lg overflow-hidden bg-background border border-border flex-shrink-0">
                <Image
                  src={link?.thumbnail}
                  alt={link?.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between">
                  <h3 className="font-medium text-foreground text-sm truncate flex-1">
                    {link?.title}
                  </h3>
                  <button
                    onClick={(e) => {
                      e?.stopPropagation();
                      onToggleFavorite?.(link?.id);
                    }}
                    className={`p-1 rounded-md transition-colors flex-shrink-0 ml-2 ${
                      link?.isFavorite 
                        ? 'text-accent hover:text-accent/80' 
                        : 'text-muted-foreground hover:text-foreground'
                    }`}
                    title={link?.isFavorite ? 'Remove from favorites' : 'Add to favorites'}
                  >
                    <Icon name={link?.isFavorite ? 'Star' : 'StarOff'} size={14} />
                  </button>
                </div>
                <p className="text-xs text-muted-foreground truncate mt-1">
                  {link?.url}
                </p>
                <div className="flex items-center space-x-2 mt-2">
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-primary/10 text-primary">
                    {link?.category}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {formatRelativeTime(link?.addedAt)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentlyAddedCarousel;