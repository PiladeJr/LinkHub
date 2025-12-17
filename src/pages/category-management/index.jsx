import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import FloatingActionButton from '../../components/ui/FloatingActionButton';
import { getCategories, getLinksByCategory, addCategory, updateCategory, deleteCategory } from '../../data/linkStore';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Select from '../../components/ui/Select';
import Icon from '../../components/AppIcon';

// Import all components
import CategoryCard from './components/CategoryCard';
import CreateCategoryModal from './components/CreateCategoryModal';
import BulkActionsToolbar from './components/BulkActionsToolbar';
import CategoryAnalytics from './components/CategoryAnalytics';
import ImportExportPanel from './components/ImportExportPanel';
import SmartSuggestions from './components/SmartSuggestions';

const CategoryManagement = () => {
  const navigate = useNavigate();
  
  // State management
  const [categories, setCategories] = useState([]);
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [filterBy, setFilterBy] = useState('all');
  const [viewMode, setViewMode] = useState('grid');
  
  // Modal states
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  
  // Panel visibility states
  const [showAnalytics, setShowAnalytics] = useState(false);
  const [showImportExport, setShowImportExport] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Derive categories from store with computed stats
  const computeCategories = () => {
    const cats = getCategories();
    return (cats || []).map(cat => {
      const links = getLinksByCategory(cat.id) || [];
      const dates = links.map(l => new Date(l.addedAt).getTime());
      const updatedAt = dates.length ? new Date(Math.max(...dates)).toISOString() : cat.updatedAt || cat.createdAt || new Date().toISOString();
      return {
        ...cat,
        linkCount: links.length,
        childCount: 0,
        isParent: false,
        recentActivity: links.length > 0,
        createdAt: cat.createdAt || new Date().toISOString(),
        updatedAt
      };
    });
  };

  // Filter and sort options
  const sortOptions = [
    { value: 'name', label: 'Name (A-Z)' },
    { value: 'name-desc', label: 'Name (Z-A)' },
    { value: 'created', label: 'Date Created' },
    { value: 'updated', label: 'Last Updated' },
    { value: 'links', label: 'Link Count' },
    { value: 'links-desc', label: 'Link Count (High to Low)' }
  ];

  const filterOptions = [
    { value: 'all', label: 'All Categories' },
    { value: 'parent', label: 'Parent Categories' },
    { value: 'child', label: 'Child Categories' },
    { value: 'recent', label: 'Recently Active' },
    { value: 'empty', label: 'Empty Categories' }
  ];

  // Initialize data
  useEffect(() => {
    const initial = computeCategories();
    setCategories(initial);
    setFilteredCategories(initial);
  }, []);

  // Filter and search logic
  useEffect(() => {
    let filtered = [...categories];

    // Apply search filter
    if (searchQuery?.trim()) {
      filtered = filtered?.filter(category =>
        category?.name?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
        category?.description?.toLowerCase()?.includes(searchQuery?.toLowerCase())
      );
    }

    // Apply category filter
    switch (filterBy) {
      case 'parent':
        filtered = filtered?.filter(cat => cat?.isParent);
        break;
      case 'child':
        filtered = filtered?.filter(cat => !cat?.isParent);
        break;
      case 'recent':
        filtered = filtered?.filter(cat => cat?.recentActivity);
        break;
      case 'empty':
        filtered = filtered?.filter(cat => cat?.linkCount === 0);
        break;
      default:
        break;
    }

    // Apply sorting
    switch (sortBy) {
      case 'name':
        filtered?.sort((a, b) => a?.name?.localeCompare(b?.name));
        break;
      case 'name-desc':
        filtered?.sort((a, b) => b?.name?.localeCompare(a?.name));
        break;
      case 'created':
        filtered?.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
      case 'updated':
        filtered?.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
        break;
      case 'links':
        filtered?.sort((a, b) => a?.linkCount - b?.linkCount);
        break;
      case 'links-desc':
        filtered?.sort((a, b) => b?.linkCount - a?.linkCount);
        break;
      default:
        break;
    }

    setFilteredCategories(filtered);
  }, [categories, searchQuery, sortBy, filterBy]);

  // Category management functions
  const handleCreateCategory = async (categoryData) => {
    addCategory({ name: categoryData?.name, color: categoryData?.color, description: categoryData?.description, icon: categoryData?.icon });
    const next = computeCategories();
    setCategories(next);
    setFilteredCategories(next);
    setIsCreateModalOpen(false);
  };

  const handleEditCategory = (category) => {
    setEditingCategory(category);
    setIsCreateModalOpen(true);
  };

  const handleUpdateCategory = async (categoryData) => {
    updateCategory(categoryData?.id, {
      name: categoryData?.name,
      description: categoryData?.description,
      color: categoryData?.color,
      icon: categoryData?.icon
    });
    const next = computeCategories();
    setCategories(next);
    setFilteredCategories(next);
    setEditingCategory(null);
    setIsCreateModalOpen(false);
  };

  const handleDeleteCategory = async (category) => {
    if (window.confirm(`Are you sure you want to delete "${category?.name}"? This action cannot be undone.`)) {
      deleteCategory(category?.id);
      const next = computeCategories();
      setCategories(next);
      setFilteredCategories(next);
      setSelectedCategories(prev => prev?.filter(id => id !== category?.id));
    }
  };

  const handleDuplicateCategory = async (category) => {
    addCategory({ name: `${category?.name} (Copy)`, color: category?.color, description: category?.description, icon: category?.icon });
    const next = computeCategories();
    setCategories(next);
    setFilteredCategories(next);
  };

  const handleMergeCategory = async (category) => {
    // This would open a merge dialog in a real implementation
    console.log('Merge category:', category);
  };

  // Selection management
  const handleSelectCategory = (categoryId, isSelected) => {
    setSelectedCategories(prev => 
      isSelected 
        ? [...prev, categoryId]
        : prev?.filter(id => id !== categoryId)
    );
  };

  const handleSelectAll = () => {
    if (selectedCategories?.length === filteredCategories?.length) {
      setSelectedCategories([]);
    } else {
      setSelectedCategories(filteredCategories?.map(cat => cat?.id));
    }
  };

  const handleClearSelection = () => {
    setSelectedCategories([]);
  };

  // Bulk operations
  const handleBulkDelete = async (categoryIds) => {
    if (window.confirm(`Are you sure you want to delete ${categoryIds?.length} categories? This action cannot be undone.`)) {
      categoryIds.forEach(id => deleteCategory(id));
      const next = computeCategories();
      setCategories(next);
      setFilteredCategories(next);
      setSelectedCategories([]);
    }
  };

  const handleBulkMerge = async (categoryIds, targetCategoryId) => {
    console.log('Bulk merge:', categoryIds, 'into', targetCategoryId);
    setSelectedCategories([]);
  };

  const handleBulkExport = async (categoryIds) => {
    const categoriesToExport = categories?.filter(cat => categoryIds?.includes(cat?.id));
    const exportData = {
      version: '1.0',
      exportDate: new Date()?.toISOString(),
      categories: categoriesToExport
    };

    const blob = new Blob([JSON.stringify(exportData, null, 2)], {
      type: 'application/json'
    });
    
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `selected-categories-${new Date()?.toISOString()?.split('T')?.[0]}.json`;
    document.body?.appendChild(a);
    a?.click();
    document.body?.removeChild(a);
    URL.revokeObjectURL(url);
    
    setSelectedCategories([]);
  };

  const handleBulkChangeColor = async (categoryIds, color) => {
    setCategories(prev => prev?.map(cat => 
      categoryIds?.includes(cat?.id) 
        ? { ...cat, color, updatedAt: new Date()?.toISOString() }
        : cat
    ));
    setSelectedCategories([]);
  };

  // Import/Export functions
  const handleImportCategories = async (importedCategories) => {
    setCategories(prev => [...prev, ...importedCategories]);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Page Header */}
          <div className="mb-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
              <div>
                <h1 className="text-2xl font-bold text-foreground mb-2">Category Management</h1>
                <p className="text-muted-foreground">
                  Organize and customize your link categorization system
                </p>
              </div>
              
              <div className="flex items-center space-x-3 mt-4 sm:mt-0">
                <Button
                  variant="outline"
                  onClick={() => navigate('/dashboard-home')}
                  iconName="ArrowLeft"
                  iconPosition="left"
                >
                  Back to Dashboard
                </Button>
                <Button
                  variant="default"
                  onClick={() => setIsCreateModalOpen(true)}
                  iconName="Plus"
                  iconPosition="left"
                >
                  Create Category
                </Button>
              </div>
            </div>

            {/* Stats Overview */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-card rounded-lg border border-border p-4">
                <div className="flex items-center space-x-2">
                  <Icon name="Folder" size={16} className="text-primary" />
                  <span className="text-sm font-medium text-muted-foreground">Total Categories</span>
                </div>
                <p className="text-2xl font-bold text-foreground mt-1">{categories?.length}</p>
              </div>
              
              <div className="bg-card rounded-lg border border-border p-4">
                <div className="flex items-center space-x-2">
                  <Icon name="Link" size={16} className="text-success" />
                  <span className="text-sm font-medium text-muted-foreground">Total Links</span>
                </div>
                <p className="text-2xl font-bold text-foreground mt-1">
                  {categories?.reduce((sum, cat) => sum + cat?.linkCount, 0)}
                </p>
              </div>
              
              <div className="bg-card rounded-lg border border-border p-4">
                <div className="flex items-center space-x-2">
                  <Icon name="Layers" size={16} className="text-warning" />
                  <span className="text-sm font-medium text-muted-foreground">Parent Categories</span>
                </div>
                <p className="text-2xl font-bold text-foreground mt-1">
                  {categories?.filter(cat => cat?.isParent)?.length}
                </p>
              </div>
              
              <div className="bg-card rounded-lg border border-border p-4">
                <div className="flex items-center space-x-2">
                  <Icon name="Activity" size={16} className="text-accent" />
                  <span className="text-sm font-medium text-muted-foreground">Recently Active</span>
                </div>
                <p className="text-2xl font-bold text-foreground mt-1">
                  {categories?.filter(cat => cat?.recentActivity)?.length}
                </p>
              </div>
            </div>
          </div>

          {/* Smart Suggestions */}
          <SmartSuggestions
            categories={categories}
            onCreateCategory={handleCreateCategory}
            isVisible={showSuggestions}
            onToggle={() => setShowSuggestions(!showSuggestions)}
          />

          {/* Analytics */}
          <CategoryAnalytics
            categories={categories}
            isVisible={showAnalytics}
            onToggle={() => setShowAnalytics(!showAnalytics)}
          />

          {/* Import/Export */}
          <ImportExportPanel
            categories={categories}
            onImport={handleImportCategories}
            isVisible={showImportExport}
            onToggle={() => setShowImportExport(!showImportExport)}
          />

          {/* Search and Filters */}
          <div className="bg-card rounded-lg border border-border p-6 mb-8">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0 lg:space-x-4">
              {/* Search */}
              <div className="flex-1 max-w-md">
                <Input
                  type="search"
                  placeholder="Search categories..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e?.target?.value)}
                  className="w-full"
                />
              </div>

              {/* Filters and Controls */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-3 sm:space-y-0 sm:space-x-3">
                <Select
                  placeholder="Sort by"
                  options={sortOptions}
                  value={sortBy}
                  onChange={setSortBy}
                  className="w-full sm:w-40"
                />
                
                <Select
                  placeholder="Filter by"
                  options={filterOptions}
                  value={filterBy}
                  onChange={setFilterBy}
                  className="w-full sm:w-40"
                />

                {/* View Mode Toggle */}
                <div className="flex items-center bg-muted rounded-md p-1">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded transition-colors ${
                      viewMode === 'grid' ?'bg-background text-foreground shadow-sm' :'text-muted-foreground hover:text-foreground'
                    }`}
                    title="Grid view"
                  >
                    <Icon name="Grid3X3" size={16} />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 rounded transition-colors ${
                      viewMode === 'list' ?'bg-background text-foreground shadow-sm' :'text-muted-foreground hover:text-foreground'
                    }`}
                    title="List view"
                  >
                    <Icon name="List" size={16} />
                  </button>
                </div>

                {/* Select All */}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleSelectAll}
                  iconName={selectedCategories?.length === filteredCategories?.length ? 'Square' : 'CheckSquare'}
                  iconPosition="left"
                >
                  {selectedCategories?.length === filteredCategories?.length ? 'Deselect All' : 'Select All'}
                </Button>
              </div>
            </div>

            {/* Results Info */}
            <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
              <p className="text-sm text-muted-foreground">
                Showing {filteredCategories?.length} of {categories?.length} categories
                {searchQuery && ` for "${searchQuery}"`}
              </p>
              
              {selectedCategories?.length > 0 && (
                <p className="text-sm font-medium text-primary">
                  {selectedCategories?.length} selected
                </p>
              )}
            </div>
          </div>

          {/* Categories Grid/List */}
          {filteredCategories?.length > 0 ? (
            <div className={`
              ${viewMode === 'grid' ?'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6' :'space-y-4'
              }
            `}>
              {filteredCategories?.map((category) => (
                <CategoryCard
                  key={category?.id}
                  category={category}
                  onEdit={handleEditCategory}
                  onDelete={handleDeleteCategory}
                  onDuplicate={handleDuplicateCategory}
                  onMerge={handleMergeCategory}
                  isSelected={selectedCategories?.includes(category?.id)}
                  onSelect={handleSelectCategory}
                  isDragging={false}
                  dragHandleProps={{}}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="Search" size={24} className="text-muted-foreground" />
              </div>
              <h3 className="text-lg font-medium text-foreground mb-2">No categories found</h3>
              <p className="text-muted-foreground mb-6">
                {searchQuery 
                  ? `No categories match "${searchQuery}". Try adjusting your search or filters.`
                  : 'Get started by creating your first category.'
                }
              </p>
              {!searchQuery && (
                <Button
                  variant="default"
                  onClick={() => setIsCreateModalOpen(true)}
                  iconName="Plus"
                  iconPosition="left"
                >
                  Create Your First Category
                </Button>
              )}
            </div>
          )}
        </div>
      </main>
      {/* Floating Action Button */}
      <FloatingActionButton
        onClick={() => setIsCreateModalOpen(true)}
      />
      {/* Bulk Actions Toolbar */}
      <BulkActionsToolbar
        selectedCategories={selectedCategories?.map(id => 
          categories?.find(cat => cat?.id === id)
        )?.filter(Boolean)}
        onClearSelection={handleClearSelection}
        onBulkDelete={handleBulkDelete}
        onBulkMerge={handleBulkMerge}
        onBulkExport={handleBulkExport}
        onBulkChangeColor={handleBulkChangeColor}
      />
      {/* Create/Edit Category Modal */}
      <CreateCategoryModal
        isOpen={isCreateModalOpen}
        onClose={() => {
          setIsCreateModalOpen(false);
          setEditingCategory(null);
        }}
        onSave={editingCategory ? handleUpdateCategory : handleCreateCategory}
        editingCategory={editingCategory}
      />
    </div>
  );
};

export default CategoryManagement;