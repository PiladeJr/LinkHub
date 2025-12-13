import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Modal from '../../components/ui/Modal';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import Header from '../../components/ui/Header';
import LinkPreview from './components/LinkPreview';
import CategorySelector from './components/CategorySelector';
import TagManager from './components/TagManager';
import ImageUploader from './components/ImageUploader';
import AdvancedOptions from './components/AdvancedOptions';

const AddEditLinkModal = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const editId = searchParams?.get('edit');
  const isEditing = Boolean(editId);

  // Form state
  const [formData, setFormData] = useState({
    url: '',
    title: '',
    description: '',
    categoryId: '',
    tags: [],
    image: null,
    advancedOptions: {
      priority: 'medium',
      privacy: 'private',
      notes: '',
      scheduledDate: '',
      isFavorite: false,
      trackClicks: true,
      notifications: false,
      autoArchive: false,
      expiryDate: ''
    }
  });

  // UI state
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [previewData, setPreviewData] = useState(null);
  const [previewLoading, setPreviewLoading] = useState(false);
  const [previewError, setPreviewError] = useState(null);
  const [errors, setErrors] = useState({});

  // Mock data
  const mockCategories = [
    { id: 'cat_1', name: 'AI Tools', color: '#2563EB', linkCount: 12 },
    { id: 'cat_2', name: 'Design Resources', color: '#10B981', linkCount: 8 },
    { id: 'cat_3', name: 'Development', color: '#F59E0B', linkCount: 15 },
    { id: 'cat_4', name: 'Learning', color: '#EF4444', linkCount: 6 },
    { id: 'cat_5', name: 'Productivity', color: '#8B5CF6', linkCount: 10 }
  ];

  const mockAvailableTags = [
    'react', 'javascript', 'design', 'ai', 'productivity', 'tutorial', 
    'documentation', 'tool', 'resource', 'inspiration', 'learning',
    'frontend', 'backend', 'api', 'framework', 'library'
  ];

  const mockExistingLink = {
    id: 'link_123',
    url: 'https://react.dev',
    title: 'React - The library for web and native user interfaces',
    description: 'React lets you build user interfaces out of individual pieces called components. Create your own React components like Thumbnail, LikeButton, and Video.',
    categoryId: 'cat_3',
    tags: ['react', 'javascript', 'frontend', 'documentation'],
    image: 'https://react.dev/favicon-32x32.png',
    advancedOptions: {
      priority: 'high',
      privacy: 'public',
      notes: 'Official React documentation - very useful for reference',
      scheduledDate: '',
      isFavorite: true,
      trackClicks: true,
      notifications: false,
      autoArchive: false,
      expiryDate: ''
    }
  };

  // Load existing link data if editing
  useEffect(() => {
    if (isEditing && editId) {
      setIsLoading(true);
      // Simulate API call
      setTimeout(() => {
        setFormData(mockExistingLink);
        setPreviewData({
          title: mockExistingLink?.title,
          description: mockExistingLink?.description,
          image: mockExistingLink?.image,
          domain: 'react.dev'
        });
        setIsLoading(false);
      }, 500);
    }
  }, [isEditing, editId]);

  // Generate link preview when URL changes
  useEffect(() => {
    if (formData?.url && isValidUrl(formData?.url) && !isEditing) {
      generatePreview(formData?.url);
    }
  }, [formData?.url, isEditing]);

  const isValidUrl = (string) => {
    try {
      new URL(string);
      return true;
    } catch (_) {
      return false;
    }
  };

  const generatePreview = async (url) => {
    setPreviewLoading(true);
    setPreviewError(null);

    try {
      // Simulate API call for link preview
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const domain = new URL(url)?.hostname;
      const mockPreview = {
        title: `${domain?.charAt(0)?.toUpperCase() + domain?.slice(1)} - Web Application`,
        description: `Discover amazing content and resources on ${domain}. This website offers valuable information and tools for productivity and learning.`,
        image: `https://www.google.com/s2/favicons?domain=${domain}&sz=64`,
        domain: domain
      };

      setPreviewData(mockPreview);
      
      // Auto-populate title if empty
      if (!formData?.title) {
        setFormData(prev => ({
          ...prev,
          title: mockPreview?.title
        }));
      }
    } catch (error) {
      setPreviewError('Failed to generate preview');
    } finally {
      setPreviewLoading(false);
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData?.url) {
      newErrors.url = 'URL is required';
    } else if (!isValidUrl(formData?.url)) {
      newErrors.url = 'Please enter a valid URL';
    }

    if (!formData?.title) {
      newErrors.title = 'Title is required';
    }

    if (!formData?.categoryId) {
      newErrors.categoryId = 'Please select a category';
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSaving(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      console.log('Saving link:', formData);
      
      // Navigate back to dashboard
      navigate('/dashboard-home', { 
        state: { 
          message: isEditing ? 'Link updated successfully!' : 'Link added successfully!' 
        }
      });
    } catch (error) {
      console.error('Error saving link:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleClose = () => {
    navigate('/dashboard-home');
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user starts typing
    if (errors?.[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const handleCreateCategory = (newCategory) => {
    // In a real app, this would make an API call
    console.log('Creating new category:', newCategory);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="pt-16 flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
            <p className="mt-2 text-muted-foreground">Loading link data...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Modal
        isOpen={true}
        onClose={handleClose}
        title={isEditing ? 'Edit Link' : 'Add New Link'}
        size="lg"
        className="max-h-[90vh] overflow-y-auto"
      >
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* URL Input */}
          <Input
            type="url"
            label="URL"
            placeholder="https://example.com"
            value={formData?.url}
            onChange={(e) => handleInputChange('url', e?.target?.value)}
            error={errors?.url}
            required
            disabled={isEditing}
          />

          {/* Link Preview */}
          {(previewData || previewLoading || previewError) && (
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Link Preview
              </label>
              <LinkPreview
                previewData={previewData}
                isLoading={previewLoading}
                error={previewError}
              />
            </div>
          )}

          {/* Title and Description */}
          <div className="grid grid-cols-1 gap-4">
            <Input
              type="text"
              label="Title"
              placeholder="Enter a custom title for this link"
              value={formData?.title}
              onChange={(e) => handleInputChange('title', e?.target?.value)}
              error={errors?.title}
              required
            />

            <div>
              <label className="block text-sm font-medium text-foreground mb-1">
                Description
              </label>
              <textarea
                value={formData?.description}
                onChange={(e) => handleInputChange('description', e?.target?.value)}
                placeholder="Add a description to help you remember what this link is about..."
                rows={3}
                className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
              />
            </div>
          </div>

          {/* Category Selection */}
          <CategorySelector
            value={formData?.categoryId}
            onChange={(value) => handleInputChange('categoryId', value)}
            categories={mockCategories}
            onCreateCategory={handleCreateCategory}
          />

          {/* Tag Management */}
          <TagManager
            selectedTags={formData?.tags}
            onChange={(tags) => handleInputChange('tags', tags)}
            availableTags={mockAvailableTags}
          />

          {/* Image Upload */}
          <ImageUploader
            currentImage={formData?.image}
            onImageChange={(image) => handleInputChange('image', image)}
            linkUrl={formData?.url}
          />

          {/* Advanced Options */}
          <AdvancedOptions
            options={formData?.advancedOptions}
            onChange={(options) => handleInputChange('advancedOptions', options)}
          />

          {/* Form Actions */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-border">
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              disabled={isSaving}
              className="sm:order-1"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="default"
              loading={isSaving}
              iconName={isEditing ? 'Save' : 'Plus'}
              iconPosition="left"
              className="sm:order-2 flex-1"
            >
              {isSaving 
                ? (isEditing ? 'Updating...' : 'Adding...') 
                : (isEditing ? 'Update Link' : 'Add Link')
              }
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default AddEditLinkModal;