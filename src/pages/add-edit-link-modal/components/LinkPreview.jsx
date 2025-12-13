import React from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';

const LinkPreview = ({ previewData, isLoading, error }) => {
  if (isLoading) {
    return (
      <div className="border border-border rounded-lg p-4 bg-muted animate-pulse">
        <div className="flex items-start space-x-3">
          <div className="w-16 h-16 bg-border rounded-lg"></div>
          <div className="flex-1 space-y-2">
            <div className="h-4 bg-border rounded w-3/4"></div>
            <div className="h-3 bg-border rounded w-full"></div>
            <div className="h-3 bg-border rounded w-2/3"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="border border-error/20 rounded-lg p-4 bg-error/5">
        <div className="flex items-center space-x-2 text-error">
          <Icon name="AlertCircle" size={16} />
          <span className="text-sm">Unable to preview this link</span>
        </div>
      </div>
    );
  }

  if (!previewData) {
    return null;
  }

  return (
    <div className="border border-border rounded-lg p-4 bg-card">
      <div className="flex items-start space-x-3">
        <div className="w-16 h-16 rounded-lg overflow-hidden bg-muted flex-shrink-0">
          {previewData?.image ? (
            <Image
              src={previewData?.image}
              alt={previewData?.title || 'Link preview'}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <Icon name="Globe" size={24} className="text-muted-foreground" />
            </div>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="font-medium text-foreground truncate">
            {previewData?.title || 'Untitled'}
          </h4>
          <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
            {previewData?.description || 'No description available'}
          </p>
          <p className="text-xs text-muted-foreground mt-2 truncate">
            {previewData?.domain}
          </p>
        </div>
      </div>
    </div>
  );
};

export default LinkPreview;