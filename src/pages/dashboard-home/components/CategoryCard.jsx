import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const CategoryCard = ({ 
  category, 
  onCategoryClick, 
  onEditCategory, 
  onDeleteCategory, 
  onDuplicateCategory,
  isDragging = false 
}) => {
  const [showActions, setShowActions] = useState(false);
  const [longPressTimer, setLongPressTimer] = useState(null);

  const handleMouseDown = () => {
    const timer = setTimeout(() => {
      setShowActions(true);
    }, 500);
    setLongPressTimer(timer);
  };

  const handleMouseUp = () => {
    if (longPressTimer) {
      clearTimeout(longPressTimer);
      setLongPressTimer(null);
    }
  };

  const handleClick = () => {
    if (!showActions) {
      onCategoryClick(category);
    }
  };

  const handleActionClick = (action, e) => {
    e?.stopPropagation();
    setShowActions(false);
    
    switch (action) {
      case 'edit':
        onEditCategory(category);
        break;
      case 'delete':
        onDeleteCategory(category);
        break;
      case 'duplicate':
        onDuplicateCategory(category);
        break;
      default:
        break;
    }
  };

  return (
    <div
      className={`
        relative bg-card rounded-lg border border-border transition-all duration-200
        ${isDragging ? 'shadow-elevated scale-105 rotate-2' : 'hover:shadow-card hover:-translate-y-1'}
        ${showActions ? 'ring-2 ring-primary/20' : ''}
        cursor-pointer
      `}
      onClick={handleClick}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      {/* Category Color Bar */}
      <div 
        className="h-1 rounded-t-lg"
        style={{ backgroundColor: category?.color }}
      />
      {/* Card Content */}
      <div className="p-4">
        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center space-x-3">
            <div 
              className="w-10 h-10 rounded-lg flex items-center justify-center text-white"
              style={{ backgroundColor: category?.color }}
            >
              <Icon name={category?.icon} size={20} />
            </div>
            <div>
              <h3 className="font-semibold text-foreground text-sm">
                {category?.name}
              </h3>
              <p className="text-xs text-muted-foreground">
                {category?.linkCount} {category?.linkCount === 1 ? 'link' : 'links'}
              </p>
            </div>
          </div>
          
          {!showActions && (
            <Button
              variant="ghost"
              size="sm"
              iconName="MoreVertical"
              className="text-muted-foreground hover:text-foreground opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={(e) => {
                e?.stopPropagation();
                setShowActions(true);
              }}
            />
          )}
        </div>

        {/* Preview Thumbnails */}
        {category?.previewLinks && category?.previewLinks?.length > 0 && (
          <div className="flex space-x-2 mb-3">
            {category?.previewLinks?.slice(0, 3)?.map((link, index) => (
              <div
                key={link?.id}
                className="w-8 h-8 rounded border border-border overflow-hidden bg-background"
              >
                <Image
                  src={link?.thumbnail}
                  alt={link?.title}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
            {category?.linkCount > 3 && (
              <div className="w-8 h-8 rounded border border-border bg-muted flex items-center justify-center">
                <span className="text-xs text-muted-foreground font-medium">
                  +{category?.linkCount - 3}
                </span>
              </div>
            )}
          </div>
        )}

        {/* Description */}
        {category?.description && (
          <p className="text-xs text-muted-foreground line-clamp-2">
            {category?.description}
          </p>
        )}

        {/* Last Updated */}
        <div className="flex items-center justify-between mt-3 pt-3 border-t border-border">
          <span className="text-xs text-muted-foreground">
            Updated {category?.lastUpdated}
          </span>
          <Icon name="ChevronRight" size={14} className="text-muted-foreground" />
        </div>
      </div>
      {/* Action Menu Overlay */}
      {showActions && (
        <div className="absolute inset-0 bg-card/95 backdrop-blur-sm rounded-lg flex items-center justify-center">
          <div className="flex space-x-2">
            <Button
              variant="outline"
              size="sm"
              iconName="Edit"
              onClick={(e) => handleActionClick('edit', e)}
            >
              Edit
            </Button>
            <Button
              variant="outline"
              size="sm"
              iconName="Copy"
              onClick={(e) => handleActionClick('duplicate', e)}
            >
              Duplicate
            </Button>
            <Button
              variant="destructive"
              size="sm"
              iconName="Trash2"
              onClick={(e) => handleActionClick('delete', e)}
            >
              Delete
            </Button>
          </div>
          <Button
            variant="ghost"
            size="sm"
            iconName="X"
            className="absolute top-2 right-2"
            onClick={(e) => {
              e?.stopPropagation();
              setShowActions(false);
            }}
          />
        </div>
      )}
    </div>
  );
};

export default CategoryCard;