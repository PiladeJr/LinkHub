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
import { getCategories, getLinksByCategory, addLink, addCategory } from '../../data/linkStore';

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
  const [lastPreviewedUrl, setLastPreviewedUrl] = useState('');
  const [lastAutoTitle, setLastAutoTitle] = useState('');
  const [originalPreviewDescription, setOriginalPreviewDescription] = useState('');

  // Categories state from store with computed counts
  const [categories, setCategories] = useState([]);
  const computeCategoriesWithCounts = () => {
    return getCategories().map(cat => ({
      ...cat,
      linkCount: (getLinksByCategory(cat.id) || []).length
    }));
  };
  useEffect(() => {
    setCategories(computeCategoriesWithCounts());
  }, []);

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
    categoryId: 3,
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

  const normalizeUrl = (value) => {
    if (!value) return '';
    const trimmed = value.trim();
    const hasProtocol = /^[a-zA-Z][a-zA-Z\d+\-.]*:\/\//.test(trimmed);
    return hasProtocol ? trimmed : `https://${trimmed}`;
  };

  const isValidUrl = (value) => {
    if (!value) return false;
    try {
      new URL(normalizeUrl(value));
      return true;
    } catch (_) {
      return false;
    }
  };

  const generatePreview = async (url) => {
    const normalizedUrl = normalizeUrl(url);
    if (!normalizedUrl) return null;
    if (normalizedUrl === lastPreviewedUrl && previewData) return previewData;
    setPreviewLoading(true);
    setPreviewError(null);

    try {
      // Simulate API call for link preview
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const domain = new URL(normalizedUrl)?.hostname;
      const base = domain.replace('www.', '').split('.')[0];
      const mockPreview = {
        title: base ? base.charAt(0).toUpperCase() + base.slice(1) : domain,
        description: `Discover amazing content and resources on ${domain}. This website offers valuable information and tools for productivity and learning.`,
        image: `https://www.google.com/s2/favicons?domain=${domain}&sz=64`,
        domain: domain
      };

      setPreviewData(mockPreview);
      setLastPreviewedUrl(normalizedUrl);
      setOriginalPreviewDescription(mockPreview.description);
      return mockPreview;
    } catch (error) {
      setPreviewError('Failed to generate preview');
      return null;
    } finally {
      setPreviewLoading(false);
    }
  };

  // Generate link preview when URL changes
  useEffect(() => {
    if (!formData?.url || isEditing) return;

    const normalizedUrl = normalizeUrl(formData?.url);
    const handle = setTimeout(() => {
      generatePreview(normalizedUrl);
    }, 300);

    return () => clearTimeout(handle);
  }, [formData?.url, isEditing]);

  const handleUrlBlur = async () => {
    if (!formData?.url || isEditing) return;

    const normalizedUrl = normalizeUrl(formData?.url);
    let preview = previewData;

    if (!preview || normalizedUrl !== lastPreviewedUrl) {
      preview = await generatePreview(normalizedUrl);
    }

    const nextTitle = preview?.title;
    if (!nextTitle) return;

    const userEditedTitle = formData?.title && formData?.title !== lastAutoTitle;
    if (!formData?.title || !userEditedTitle) {
      setFormData(prev => ({
        ...prev,
        title: nextTitle
      }));
      setLastAutoTitle(nextTitle);
    }
  };

  // Update preview when title or description change
  useEffect(() => {
    if (previewData && !isEditing) {
      setPreviewData(prev => ({
        ...prev,
        title: formData?.title || prev?.title,
        description: formData?.description || originalPreviewDescription
      }));
    }
  }, [formData?.title, formData?.description, isEditing, originalPreviewDescription]);

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
      // Persist new link in local store
      const normalizedUrl = normalizeUrl(formData?.url);
      const payload = {
        title: formData?.title,
        url: normalizedUrl,
        description: formData?.description || previewData?.description || '',
        thumbnail: formData?.image,
        tags: formData?.tags,
        advancedOptions: formData?.advancedOptions
      };
      addLink(formData?.categoryId, payload);

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
    
    // Update preview when image changes
    if (field === 'image' && previewData && !isEditing) {
      setPreviewData(prev => ({
        ...prev,
        image: value || prev?.image
      }));
    }
    
    // Clear error when user starts typing
    if (errors?.[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const handleCreateCategory = (newCategory) => {
    const created = addCategory({ name: newCategory?.name, color: newCategory?.color });
    setCategories(computeCategoriesWithCounts());
    // Select the newly created category
    handleInputChange('categoryId', created?.id);
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
            onBlur={handleUrlBlur}
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
            onChange={(value) => handleInputChange('categoryId', Number(value))}
            categories={categories}
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