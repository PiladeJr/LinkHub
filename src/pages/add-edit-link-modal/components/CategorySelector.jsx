import React, { useState } from 'react';
import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';


const CategorySelector = ({ value, onChange, categories, onCreateCategory }) => {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [newCategoryColor, setNewCategoryColor] = useState('#2563EB');

  const categoryOptions = categories?.map(category => ({
    value: category?.id,
    label: category?.name,
    description: `${category?.linkCount} links`
  }));

  const colorOptions = [
    { value: '#2563EB', label: 'Blue' },
    { value: '#10B981', label: 'Green' },
    { value: '#F59E0B', label: 'Amber' },
    { value: '#EF4444', label: 'Red' },
    { value: '#8B5CF6', label: 'Purple' },
    { value: '#06B6D4', label: 'Cyan' },
    { value: '#F97316', label: 'Orange' },
    { value: '#84CC16', label: 'Lime' }
  ];

  const handleCreateCategory = () => {
    if (newCategoryName?.trim()) {
      const newCategory = {
        id: `category_${Date.now()}`,
        name: newCategoryName?.trim(),
        color: newCategoryColor,
        linkCount: 0,
        createdAt: new Date()?.toISOString()
      };
      
      onCreateCategory(newCategory);
      onChange(newCategory?.id);
      setNewCategoryName('');
      setNewCategoryColor('#2563EB');
      setShowCreateForm(false);
    }
  };

  const handleCancelCreate = () => {
    setNewCategoryName('');
    setNewCategoryColor('#2563EB');
    setShowCreateForm(false);
  };

  return (
    <div className="space-y-4">
      <Select
        label="Category"
        description="Choose a category for this link"
        placeholder="Select category..."
        options={categoryOptions}
        value={value}
        onChange={onChange}
        searchable
        required
      />
      {!showCreateForm ? (
        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowCreateForm(true)}
          iconName="Plus"
          iconPosition="left"
          className="w-full"
        >
          Create New Category
        </Button>
      ) : (
        <div className="border border-border rounded-lg p-4 bg-muted/50">
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">
                Category Name
              </label>
              <input
                type="text"
                value={newCategoryName}
                onChange={(e) => setNewCategoryName(e?.target?.value)}
                placeholder="Enter category name..."
                className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                autoFocus
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Category Color
              </label>
              <div className="flex flex-wrap gap-2">
                {colorOptions?.map((color) => (
                  <button
                    key={color?.value}
                    type="button"
                    onClick={() => setNewCategoryColor(color?.value)}
                    className={`w-8 h-8 rounded-full border-2 transition-all ${
                      newCategoryColor === color?.value
                        ? 'border-foreground scale-110'
                        : 'border-border hover:scale-105'
                    }`}
                    style={{ backgroundColor: color?.value }}
                    title={color?.label}
                  />
                ))}
              </div>
            </div>

            <div className="flex space-x-2 pt-2">
              <Button
                variant="default"
                size="sm"
                onClick={handleCreateCategory}
                disabled={!newCategoryName?.trim()}
                iconName="Check"
                iconPosition="left"
                className="flex-1"
              >
                Create
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleCancelCreate}
                iconName="X"
                iconPosition="left"
                className="flex-1"
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CategorySelector;