import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const SearchResults = ({ searchQuery, results, onLinkClick, onClearSearch }) => {
  if (!searchQuery) return null;

  return (
    <div className="bg-card rounded-lg border border-border">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center space-x-2">
          <Icon name="Search" size={18} className="text-muted-foreground" />
          <h2 className="font-semibold text-foreground">
            Search Results for "{searchQuery}"
          </h2>
          <span className="text-sm text-muted-foreground">
            ({results?.length} {results?.length === 1 ? 'result' : 'results'})
          </span>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={onClearSearch}
          iconName="X"
          className="text-muted-foreground hover:text-foreground"
        />
      </div>
      {/* Results */}
      <div className="p-4">
        {results?.length === 0 ? (
          <div className="text-center py-8">
            <Icon name="SearchX" size={48} className="text-muted-foreground mx-auto mb-3" />
            <p className="text-muted-foreground">No results found</p>
            <p className="text-sm text-muted-foreground mt-1">
              Try different keywords or check your spelling
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {results?.map((item) => (
              <div
                key={`${item?.type}-${item?.id}`}
                onClick={() => onLinkClick(item)}
                className="flex items-start space-x-3 p-3 rounded-lg hover:bg-muted/30 cursor-pointer transition-micro group"
              >
                {/* Thumbnail/Icon */}
                <div className="w-12 h-12 rounded-lg overflow-hidden bg-background border border-border flex-shrink-0">
                  {item?.type === 'link' ? (
                    <Image
                      src={item?.thumbnail}
                      alt={item?.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div 
                      className="w-full h-full flex items-center justify-center text-white"
                      style={{ backgroundColor: item?.color }}
                    >
                      <Icon name={item?.icon} size={20} />
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 mb-1">
                    <h3 className="font-medium text-foreground text-sm truncate">
                      {item?.title}
                    </h3>
                    <span className={`
                      inline-flex items-center px-2 py-0.5 rounded-full text-xs
                      ${item?.type === 'link' ?'bg-blue-100 text-blue-700' :'bg-green-100 text-green-700'
                      }
                    `}>
                      {item?.type === 'link' ? 'Link' : 'Category'}
                    </span>
                  </div>
                  
                  {item?.type === 'link' ? (
                    <>
                      <p className="text-xs text-muted-foreground truncate mb-1">
                        {item?.url}
                      </p>
                      <div className="flex items-center space-x-2">
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-primary/10 text-primary">
                          {item?.category}
                        </span>
                        {item?.isFavorite && (
                          <Icon name="Star" size={12} className="text-accent" />
                        )}
                      </div>
                    </>
                  ) : (
                    <>
                      <p className="text-xs text-muted-foreground mb-1">
                        {item?.linkCount} {item?.linkCount === 1 ? 'link' : 'links'}
                      </p>
                      {item?.description && (
                        <p className="text-xs text-muted-foreground line-clamp-1">
                          {item?.description}
                        </p>
                      )}
                    </>
                  )}
                </div>

                {/* Action */}
                <div className="flex items-center space-x-2 flex-shrink-0">
                  {item?.type === 'link' && (
                    <Icon name="ExternalLink" size={14} className="text-muted-foreground group-hover:text-primary transition-colors" />
                  )}
                  <Icon name="ChevronRight" size={16} className="text-muted-foreground" />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchResults;