import React, { useState, useRef } from 'react';
import Modal from '../../../components/ui/Modal';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const CreateCategoryModal = ({ isOpen, onClose, onSave, editingCategory = null }) => {
  const [formData, setFormData] = useState({
    name: editingCategory?.name || '',
    description: editingCategory?.description || '',
    color: editingCategory?.color || '#2563EB',
    icon: editingCategory?.icon || null,
    parentId: editingCategory?.parentId || null
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef(null);

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

  const parentCategoryOptions = [
    { value: null, label: 'No Parent (Root Category)' },
    { value: 'ai-tools', label: 'AI Tools' },
    { value: 'development', label: 'Development' },
    { value: 'design', label: 'Design' },
    { value: 'productivity', label: 'Productivity' }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors?.[field]) {
      setErrors(prev => ({ ...prev, [field]: null }));
    }
  };

  const handleIconUpload = (e) => {
    const file = e?.target?.files?.[0];
    if (file) {
      if (file?.size > 2 * 1024 * 1024) { // 2MB limit
        setErrors(prev => ({ ...prev, icon: 'Icon file size must be less than 2MB' }));
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        setFormData(prev => ({ ...prev, icon: e?.target?.result }));
        setErrors(prev => ({ ...prev, icon: null }));
      };
      reader?.readAsDataURL(file);
    }
  };

  const removeIcon = () => {
    setFormData(prev => ({ ...prev, icon: null }));
    if (fileInputRef?.current) {
      fileInputRef.current.value = '';
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData?.name?.trim()) {
      newErrors.name = 'Category name is required';
    } else if (formData?.name?.trim()?.length < 2) {
      newErrors.name = 'Category name must be at least 2 characters';
    }

    if (formData?.description && formData?.description?.length > 200) {
      newErrors.description = 'Description must be less than 200 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      const categoryData = {
        ...formData,
        id: editingCategory?.id || `cat_${Date.now()}`,
        createdAt: editingCategory?.createdAt || new Date()?.toISOString(),
        updatedAt: new Date()?.toISOString(),
        linkCount: editingCategory?.linkCount || 0
      };

      await onSave(categoryData);
      handleClose();
    } catch (error) {
      setErrors({ submit: 'Failed to save category. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setFormData({
      name: '',
      description: '',
      color: '#2563EB',
      icon: null,
      parentId: null
    });
    setErrors({});
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title={editingCategory ? 'Edit Category' : 'Create New Category'}
      size="default"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Category Name */}
        <Input
          label="Category Name"
          type="text"
          placeholder="Enter category name"
          value={formData?.name}
          onChange={(e) => handleInputChange('name', e?.target?.value)}
          error={errors?.name}
          required
        />

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Description
          </label>
          <textarea
            placeholder="Enter category description (optional)"
            value={formData?.description}
            onChange={(e) => handleInputChange('description', e?.target?.value)}
            className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
            rows={3}
            maxLength={200}
          />
          <div className="flex justify-between items-center mt-1">
            {errors?.description && (
              <span className="text-sm text-error">{errors?.description}</span>
            )}
            <span className="text-xs text-muted-foreground ml-auto">
              {formData?.description?.length}/200
            </span>
          </div>
        </div>

        {/* Color Selection */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-3">
            Category Color
          </label>
          <div className="flex flex-wrap gap-3">
            {colorOptions?.map((color) => (
              <button
                key={color?.value}
                type="button"
                onClick={() => handleInputChange('color', color?.value)}
                className={`
                  w-10 h-10 rounded-lg border-2 transition-all duration-200 flex items-center justify-center
                  ${formData?.color === color?.value 
                    ? 'border-foreground scale-110' 
                    : 'border-border hover:border-muted-foreground hover:scale-105'
                  }
                `}
                style={{ backgroundColor: color?.value }}
                title={color?.label}
              >
                {formData?.color === color?.value && (
                  <Icon name="Check" size={16} color="white" />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Icon Upload */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-3">
            Category Icon (Optional)
          </label>
          
          {formData?.icon ? (
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Image
                  src={formData?.icon}
                  alt="Category icon"
                  className="w-16 h-16 object-cover rounded-lg border border-border"
                />
                <button
                  type="button"
                  onClick={removeIcon}
                  className="absolute -top-2 -right-2 w-6 h-6 bg-error text-white rounded-full flex items-center justify-center hover:bg-error/80 transition-colors"
                >
                  <Icon name="X" size={12} />
                </button>
              </div>
              <div>
                <p className="text-sm text-foreground font-medium">Icon uploaded</p>
                <p className="text-xs text-muted-foreground">Click the X to remove</p>
              </div>
            </div>
          ) : (
            <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-muted-foreground transition-colors relative">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleIconUpload}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                id="icon-upload"
              />
              <div className="flex flex-col items-center space-y-2 pointer-events-none">
                <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center">
                  <Icon name="Upload" size={24} className="text-muted-foreground" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">Upload an icon</p>
                  <p className="text-xs text-muted-foreground">PNG, JPG up to 2MB</p>
                </div>
              </div>
            </div>
          )}
          {errors?.icon && (
            <p className="text-sm text-error mt-2">{errors?.icon}</p>
          )}
        </div>

        {/* Parent Category */}
        <Select
          label="Parent Category"
          placeholder="Select parent category"
          options={parentCategoryOptions}
          value={formData?.parentId}
          onChange={(value) => handleInputChange('parentId', value)}
          description="Choose a parent category to create a subcategory"
        />

        {/* Submit Error */}
        {errors?.submit && (
          <div className="p-3 bg-error/10 border border-error/20 rounded-md">
            <p className="text-sm text-error">{errors?.submit}</p>
          </div>
        )}

        {/* Actions */}
        <div className="flex justify-end space-x-3 pt-4 border-t border-border">
          <Button
            type="button"
            variant="outline"
            onClick={handleClose}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="default"
            loading={isLoading}
            iconName="Save"
            iconPosition="left"
          >
            {editingCategory ? 'Update Category' : 'Create Category'}
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default CreateCategoryModal;