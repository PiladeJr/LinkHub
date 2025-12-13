import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const FavoritesBar = ({ favoriteLinks, onLinkClick }) => {
  if (!favoriteLinks || favoriteLinks?.length === 0) {
    return (
      <div className="bg-card rounded-lg p-4 border border-border">
        <div className="flex items-center space-x-2 mb-3">
          <Icon name="Star" size={18} className="text-accent" />
          <h3 className="font-medium text-foreground">Favorites</h3>
        </div>
        <div className="text-center py-4">
          <Icon name="Star" size={32} className="text-muted-foreground mx-auto mb-2" />
          <p className="text-sm text-muted-foreground">No favorites yet</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card rounded-lg p-4 border border-border">
      <div className="flex items-center space-x-2 mb-3">
        <Icon name="Star" size={18} className="text-accent" />
        <h3 className="font-medium text-foreground">Favorites</h3>
      </div>
      <div className="flex space-x-3 overflow-x-auto scrollbar-hide pb-2">
        {favoriteLinks?.map((link) => (
          <div
            key={link?.id}
            onClick={() => onLinkClick(link)}
            className="flex-shrink-0 cursor-pointer group"
          >
            <div className="w-12 h-12 rounded-lg overflow-hidden bg-background border border-border transition-micro group-hover:shadow-subtle">
              <Image
                src={link?.thumbnail}
                alt={link?.title}
                className="w-full h-full object-cover"
              />
            </div>
            <p className="text-xs text-muted-foreground text-center mt-1 truncate w-12">
              {link?.title}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FavoritesBar;