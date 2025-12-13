import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const CategoryCard = ({ 
  category, 
  onEdit, 
  onDelete, 
  onDuplicate, 
  onMerge,
  isSelected,
  onSelect,
  isDragging,
  dragHandleProps 
}) => {
  const [showActions, setShowActions] = useState(false);

  const handleCardClick = (e) => {
    if (e?.target?.closest('.action-button') || e?.target?.closest('.drag-handle')) {
      return;
    }
    // Navigate to category view or expand details
  };

  const formatDate = (dateString) => {
    return new Date(dateString)?.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div 
      className={`
        relative bg-card rounded-lg border border-border shadow-subtle hover:shadow-card
        transition-all duration-300 ease-out cursor-pointer group
        ${isDragging ? 'opacity-50 scale-95' : 'hover:scale-102'}
        ${isSelected ? 'ring-2 ring-primary ring-offset-2' : ''}
      `}
      onClick={handleCardClick}
      onMouseEnter={() => setShowActions(true)}
      onMouseLeave={() => setShowActions(false)}
    >
      {/* Selection Checkbox */}
      <div className="absolute top-3 left-3 z-10">
        <input
          type="checkbox"
          checked={isSelected}
          onChange={(e) => onSelect(category?.id, e?.target?.checked)}
          className="w-4 h-4 text-primary bg-background border-border rounded focus:ring-primary focus:ring-2"
          onClick={(e) => e?.stopPropagation()}
        />
      </div>
      {/* Drag Handle */}
      <div 
        {...dragHandleProps}
        className="drag-handle absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity cursor-grab active:cursor-grabbing"
      >
        <Icon name="GripVertical" size={16} className="text-muted-foreground" />
      </div>
      {/* Category Header */}
      <div className="p-4 pb-3">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center space-x-3 flex-1 min-w-0">
            {/* Category Icon/Color */}
            <div 
              className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
              style={{ backgroundColor: category?.color }}
            >
              {category?.icon ? (
                <Image 
                  src={category?.icon} 
                  alt={category?.name}
                  className="w-6 h-6 object-cover rounded"
                />
              ) : (
                <Icon name="Folder" size={20} color="white" />
              )}
            </div>

            {/* Category Info */}
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-foreground text-sm truncate">
                {category?.name}
              </h3>
              <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                {category?.description || 'No description'}
              </p>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <div className="flex items-center space-x-4">
            <span className="flex items-center space-x-1">
              <Icon name="Link" size={12} />
              <span>{category?.linkCount} links</span>
            </span>
            <span className="flex items-center space-x-1">
              <Icon name="Calendar" size={12} />
              <span>{formatDate(category?.createdAt)}</span>
            </span>
          </div>
          
          {category?.isParent && (
            <div className="flex items-center space-x-1">
              <Icon name="Layers" size={12} />
              <span>{category?.childCount}</span>
            </div>
          )}
        </div>
      </div>
      {/* Quick Actions */}
      <div className={`
        absolute inset-x-0 bottom-0 bg-card border-t border-border rounded-b-lg
        transition-all duration-200 ease-out
        ${showActions ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 pointer-events-none'}
      `}>
        <div className="flex items-center justify-between p-3">
          <div className="flex items-center space-x-1">
            <Button
              variant="ghost"
              size="xs"
              onClick={(e) => {
                e?.stopPropagation();
                onEdit(category);
              }}
              iconName="Edit"
              className="action-button text-muted-foreground hover:text-foreground"
              title="Edit category"
            />
            <Button
              variant="ghost"
              size="xs"
              onClick={(e) => {
                e?.stopPropagation();
                onDuplicate(category);
              }}
              iconName="Copy"
              className="action-button text-muted-foreground hover:text-foreground"
              title="Duplicate category"
            />
            <Button
              variant="ghost"
              size="xs"
              onClick={(e) => {
                e?.stopPropagation();
                onMerge(category);
              }}
              iconName="Merge"
              className="action-button text-muted-foreground hover:text-foreground"
              title="Merge category"
            />
          </div>
          
          <Button
            variant="ghost"
            size="xs"
            onClick={(e) => {
              e?.stopPropagation();
              onDelete(category);
            }}
            iconName="Trash2"
            className="action-button text-error hover:text-error hover:bg-error/10"
            title="Delete category"
          />
        </div>
      </div>
      {/* Usage Indicator */}
      {category?.recentActivity && (
        <div className="absolute top-2 right-8">
          <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
        </div>
      )}
    </div>
  );
};

export default CategoryCard;