import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const EmptyState = ({ onCreateCategory, onAddLink }) => {
  return (
    <div className="text-center py-16 px-4">
      <div className="max-w-md mx-auto">
        {/* Illustration */}
        <div className="w-24 h-24 mx-auto mb-6 bg-muted/30 rounded-full flex items-center justify-center">
          <Icon name="FolderPlus" size={48} className="text-muted-foreground" />
        </div>

        {/* Content */}
        <h2 className="text-xl font-semibold text-foreground mb-2">
          Welcome to LinkHub
        </h2>
        <p className="text-muted-foreground mb-8">
          Start organizing your bookmarks by creating your first category or adding a link directly.
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button
            variant="default"
            onClick={onCreateCategory}
            iconName="FolderPlus"
            iconPosition="left"
          >
            Create Category
          </Button>
          <Button
            variant="outline"
            onClick={onAddLink}
            iconName="Plus"
            iconPosition="left"
          >
            Add Link
          </Button>
        </div>

        {/* Tips */}
        <div className="mt-12 text-left">
          <h3 className="font-medium text-foreground mb-4">Quick Tips:</h3>
          <div className="space-y-3">
            <div className="flex items-start space-x-3">
              <Icon name="Lightbulb" size={16} className="text-accent mt-0.5" />
              <p className="text-sm text-muted-foreground">
                Create categories like "Work Tools", "Learning Resources", or "Entertainment"
              </p>
            </div>
            <div className="flex items-start space-x-3">
              <Icon name="Search" size={16} className="text-accent mt-0.5" />
              <p className="text-sm text-muted-foreground">
                Use the search bar to quickly find any link across all categories
              </p>
            </div>
            <div className="flex items-start space-x-3">
              <Icon name="Star" size={16} className="text-accent mt-0.5" />
              <p className="text-sm text-muted-foreground">
                Mark important links as favorites for quick access
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmptyState;