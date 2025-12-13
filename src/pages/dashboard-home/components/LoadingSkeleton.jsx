import React from 'react';

const LoadingSkeleton = () => {
  return (
    <div className="space-y-6">
      {/* Recently Added Skeleton */}
      <div className="bg-card rounded-lg p-6 border border-border">
        <div className="flex items-center justify-between mb-4">
          <div className="h-6 bg-muted rounded w-32 animate-pulse" />
          <div className="flex space-x-2">
            <div className="w-8 h-8 bg-muted rounded animate-pulse" />
            <div className="w-8 h-8 bg-muted rounded animate-pulse" />
          </div>
        </div>
        <div className="flex space-x-4 overflow-hidden">
          {[...Array(3)]?.map((_, index) => (
            <div key={index} className="flex-shrink-0 w-64 bg-muted/30 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <div className="w-12 h-12 bg-muted rounded-lg animate-pulse" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-muted rounded animate-pulse" />
                  <div className="h-3 bg-muted rounded w-3/4 animate-pulse" />
                  <div className="flex space-x-2">
                    <div className="h-5 bg-muted rounded-full w-16 animate-pulse" />
                    <div className="h-3 bg-muted rounded w-12 animate-pulse" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Favorites Skeleton */}
      <div className="bg-card rounded-lg p-4 border border-border">
        <div className="flex items-center space-x-2 mb-3">
          <div className="w-4 h-4 bg-muted rounded animate-pulse" />
          <div className="h-5 bg-muted rounded w-20 animate-pulse" />
        </div>
        <div className="flex space-x-3">
          {[...Array(6)]?.map((_, index) => (
            <div key={index} className="flex-shrink-0">
              <div className="w-12 h-12 bg-muted rounded-lg animate-pulse" />
              <div className="h-3 bg-muted rounded w-12 mt-1 animate-pulse" />
            </div>
          ))}
        </div>
      </div>
      {/* Categories Grid Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {[...Array(8)]?.map((_, index) => (
          <div key={index} className="bg-card rounded-lg border border-border">
            <div className="h-1 bg-muted rounded-t-lg animate-pulse" />
            <div className="p-4">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-muted rounded-lg animate-pulse" />
                  <div className="space-y-1">
                    <div className="h-4 bg-muted rounded w-24 animate-pulse" />
                    <div className="h-3 bg-muted rounded w-16 animate-pulse" />
                  </div>
                </div>
              </div>
              <div className="flex space-x-2 mb-3">
                {[...Array(3)]?.map((_, i) => (
                  <div key={i} className="w-8 h-8 bg-muted rounded animate-pulse" />
                ))}
              </div>
              <div className="space-y-2">
                <div className="h-3 bg-muted rounded animate-pulse" />
                <div className="h-3 bg-muted rounded w-3/4 animate-pulse" />
              </div>
              <div className="flex items-center justify-between mt-3 pt-3 border-t border-border">
                <div className="h-3 bg-muted rounded w-20 animate-pulse" />
                <div className="w-3 h-3 bg-muted rounded animate-pulse" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LoadingSkeleton;