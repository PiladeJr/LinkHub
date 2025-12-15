import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const FavoritesBar = ({ favoriteLinks, onLinkClick, onToggleFavorite }) => {
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
            className="flex-shrink-0 cursor-pointer group relative"
          >
            <div 
              onClick={() => onLinkClick(link)}
              className="w-12 h-12 rounded-lg overflow-hidden bg-background border border-border transition-micro group-hover:shadow-subtle"
            >
              <Image
                src={link?.thumbnail}
                alt={link?.title}
                className="w-full h-full object-cover"
              />
            </div>
            <button
              onClick={(e) => {
                e?.stopPropagation();
                onToggleFavorite?.(link?.id);
              }}
              className="absolute -top-1 -right-1 w-5 h-5 bg-accent text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-sm hover:bg-accent/80"
              title="Remove from favorites"
            >
              <Icon name="X" size={12} />
            </button>
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