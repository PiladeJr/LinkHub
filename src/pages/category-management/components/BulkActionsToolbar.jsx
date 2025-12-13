import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';


const BulkActionsToolbar = ({ 
  selectedCategories, 
  onClearSelection, 
  onBulkDelete, 
  onBulkMerge,
  onBulkExport,
  onBulkChangeColor 
}) => {
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [showMergeOptions, setShowMergeOptions] = useState(false);

  const colorOptions = [
    { value: '#2563EB', label: 'Blue' },
    { value: '#DC2626', label: 'Red' },
    { value: '#16A34A', label: 'Green' },
    { value: '#CA8A04', label: 'Yellow' },
    { value: '#9333EA', label: 'Purple' },
    { value: '#C2410C', label: 'Orange' },
    { value: '#0891B2', label: 'Cyan' },
    { value: '#BE185D', label: 'Pink' }
  ];

  const mergeTargetOptions = [
    { value: 'ai-tools', label: 'AI Tools' },
    { value: 'development', label: 'Development' },
    { value: 'design', label: 'Design' },
    { value: 'productivity', label: 'Productivity' }
  ];

  if (selectedCategories?.length === 0) {
    return null;
  }

  const handleColorChange = (color) => {
    onBulkChangeColor(selectedCategories, color);
    setShowColorPicker(false);
  };

  const handleMerge = (targetCategoryId) => {
    onBulkMerge(selectedCategories, targetCategoryId);
    setShowMergeOptions(false);
  };

  return (
    <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50">
      <div className="bg-card border border-border rounded-lg shadow-elevated p-4 min-w-96">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
              <span className="text-sm font-semibold text-primary-foreground">
                {selectedCategories?.length}
              </span>
            </div>
            <span className="text-sm font-medium text-foreground">
              {selectedCategories?.length} categor{selectedCategories?.length === 1 ? 'y' : 'ies'} selected
            </span>
          </div>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={onClearSelection}
            iconName="X"
            className="text-muted-foreground hover:text-foreground"
            title="Clear selection"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          {/* Export */}
          <Button
            variant="outline"
            size="sm"
            onClick={() => onBulkExport(selectedCategories)}
            iconName="Download"
            iconPosition="left"
          >
            Export
          </Button>

          {/* Change Color */}
          <div className="relative">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowColorPicker(!showColorPicker)}
              iconName="Palette"
              iconPosition="left"
            >
              Color
            </Button>
            
            {showColorPicker && (
              <div className="absolute bottom-full mb-2 left-0 bg-card border border-border rounded-lg shadow-elevated p-3 min-w-48">
                <p className="text-xs font-medium text-foreground mb-2">Choose Color</p>
                <div className="grid grid-cols-4 gap-2">
                  {colorOptions?.map((color) => (
                    <button
                      key={color?.value}
                      onClick={() => handleColorChange(color?.value)}
                      className="w-8 h-8 rounded-md border border-border hover:scale-110 transition-transform"
                      style={{ backgroundColor: color?.value }}
                      title={color?.label}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Merge */}
          {selectedCategories?.length > 1 && (
            <div className="relative">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowMergeOptions(!showMergeOptions)}
                iconName="Merge"
                iconPosition="left"
              >
                Merge
              </Button>
              
              {showMergeOptions && (
                <div className="absolute bottom-full mb-2 left-0 bg-card border border-border rounded-lg shadow-elevated p-3 min-w-56">
                  <p className="text-xs font-medium text-foreground mb-2">Merge into:</p>
                  <Select
                    placeholder="Select target category"
                    options={mergeTargetOptions}
                    value=""
                    onChange={handleMerge}
                  />
                </div>
              )}
            </div>
          )}

          {/* Delete */}
          <Button
            variant="destructive"
            size="sm"
            onClick={() => onBulkDelete(selectedCategories)}
            iconName="Trash2"
            iconPosition="left"
          >
            Delete
          </Button>
        </div>

        {/* Quick Stats */}
        <div className="mt-3 pt-3 border-t border-border">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>
              Total links: {selectedCategories?.reduce((sum, cat) => sum + (cat?.linkCount || 0), 0)}
            </span>
            <span>
              Created: {new Date(Math.min(...selectedCategories.map(cat => new Date(cat.createdAt))))?.toLocaleDateString()}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BulkActionsToolbar;