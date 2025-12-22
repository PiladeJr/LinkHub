import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Icon from '../../components/AppIcon';
import Image from '../../components/AppImage';
import { getCategories, getAllLinks, toggleFavorite, deleteLink } from '../../data/linkStore';
import { formatRelativeTime } from '../../utils/dateUtils';

const AllLinks = () => {
  const navigate = useNavigate();
  const [allLinks, setAllLinks] = useState([]);
  const [filteredLinks, setFilteredLinks] = useState([]);
  const [categories, setCategories] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [availableTags, setAvailableTags] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);

  // Load all links and categories
  useEffect(() => {
    const timer = setTimeout(() => {
      const cats = getCategories();
      setCategories(cats);

      const links = getAllLinks();
      // Sort alphabetically by title
      const sorted = links.sort((a, b) => a?.title?.localeCompare(b?.title));
      setAllLinks(sorted);
      setFilteredLinks(sorted);

      // Extract all unique tags
      const tagsSet = new Set();
      links.forEach(link => {
        if (link?.tags && Array.isArray(link.tags)) {
          link.tags.forEach(tag => tagsSet.add(tag));
        }
      });
      setAvailableTags(Array.from(tagsSet).sort());

      setIsLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  // Filter links based on search, categories, and tags
  useEffect(() => {
    let filtered = allLinks;

    // Search filter 
    if (searchQuery?.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(link =>
        link?.title?.toLowerCase()?.startsWith(query)
      );
    }

    // Category filter
    if (selectedCategories.length > 0) {
      filtered = filtered.filter(link =>
        selectedCategories.includes(Number(link?.categoryId))
      );
    }

    // Tags filter
    if (selectedTags.length > 0) {
      filtered = filtered.filter(link =>
        link?.tags && selectedTags.some(tag => link.tags.includes(tag))
      );
    }

    // Keep alphabetical order
    filtered.sort((a, b) => a?.title?.localeCompare(b?.title));
    setFilteredLinks(filtered);
  }, [searchQuery, selectedCategories, selectedTags, allLinks]);

  const handleLinkClick = (link) => {
    window.open(link?.url, '_blank', 'noopener,noreferrer');
  };

  const handleToggleFavorite = (linkId) => {
    const link = allLinks.find(l => l?.id === linkId);
    if (link) {
      toggleFavorite(link?.categoryId, linkId);
      const updated = getAllLinks();
      const sorted = updated.sort((a, b) => a?.title?.localeCompare(b?.title));
      setAllLinks(sorted);
    }
  };

  const handleDeleteLink = (linkId) => {
    const link = allLinks.find(l => l?.id === linkId);
    if (link && confirm('Are you sure you want to delete this link?')) {
      deleteLink(link?.categoryId, linkId);
      const updated = getAllLinks();
      const sorted = updated.sort((a, b) => a?.title?.localeCompare(b?.title));
      setAllLinks(sorted);
    }
  };

  const toggleCategoryFilter = (categoryId) => {
    setSelectedCategories(prev =>
      prev.includes(categoryId)
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const toggleTagFilter = (tag) => {
    setSelectedTags(prev =>
      prev.includes(tag)
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  const clearFilters = () => {
    setSelectedCategories([]);
    setSelectedTags([]);
    setSearchQuery('');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-16 px-4 lg:px-6">
          <div className="max-w-5xl mx-auto py-8">
            <div className="animate-pulse">
              <div className="h-8 bg-muted rounded w-1/3 mb-4"></div>
              <div className="h-4 bg-muted rounded w-2/3 mb-8"></div>
              <div className="space-y-4">
                {[1, 2, 3, 4, 5]?.map(i => (
                  <div key={i} className="h-20 bg-muted rounded"></div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16 px-4 lg:px-6 pb-8">
        <div className="max-w-5xl mx-auto py-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">All Links</h1>
              <p className="text-muted-foreground">Browse all your saved links</p>
            </div>
            
            <Button
              onClick={() => navigate('/add-edit-link-modal')}
              iconName="Plus"
              iconPosition="left"
            >
              Add Link
            </Button>
          </div>

          {/* Search */}
          <div className="mb-6 flex gap-3 items-center justify-between w-full">
            <div className="w-4/5">
              <Input
                type="search"
                placeholder="Search links by their title"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e?.target?.value)}
                className="w-full bg-white dark:bg-slate-950 border-border"
              />
            </div>
            <Button
              variant="default"
              onClick={() => setShowFilters(!showFilters)}
              iconName="Sliders"
              className="flex-shrink-0"
              title="Toggle filters"
            >
              <span className="hidden sm:inline">Filters</span>
            </Button>
          </div>

          {/* Filters Panel */}
          {showFilters && (
            <div className="bg-card rounded-lg border border-border p-6 mb-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-foreground">Filters</h3>
                {(selectedCategories.length > 0 || selectedTags.length > 0) && (
                  <Button
                    variant="ghost"
                    onClick={clearFilters}
                    size="sm"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Clear all
                  </Button>
                )}
              </div>

              {/* Category Filters */}
              {categories.length > 0 && (
                <div className="mb-6">
                  <h4 className="text-sm font-medium text-foreground mb-3">Categories</h4>
                  <div className="flex flex-wrap gap-2">
                    {categories?.map(category => (
                      <button
                        key={category?.id}
                        onClick={() => toggleCategoryFilter(category?.id)}
                        className={`px-3 py-2 rounded-md text-sm font-medium transition-micro flex items-center space-x-2 ${
                          selectedCategories.includes(category?.id)
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-muted text-foreground hover:bg-muted/80'
                        }`}
                      >
                        <div
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: category?.color }}
                        ></div>
                        <span>{category?.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Tag Filters */}
              {availableTags.length > 0 && (
                <div>
                  <h4 className="text-sm font-medium text-foreground mb-3">Tags</h4>
                  <div className="flex flex-wrap gap-2">
                    {availableTags?.map(tag => (
                      <button
                        key={tag}
                        onClick={() => toggleTagFilter(tag)}
                        className={`px-3 py-1 rounded-full text-xs font-medium transition-micro ${
                          selectedTags.includes(tag)
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-muted text-foreground hover:bg-muted/80'
                        }`}
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Links Count */}
          <div className="text-sm text-muted-foreground mb-4">
            {filteredLinks?.length} {filteredLinks?.length === 1 ? 'link' : 'links'}
            {(selectedCategories.length > 0 || selectedTags.length > 0 || searchQuery) && ' found'}
          </div>

          {/* Links List */}
          {filteredLinks?.length > 0 ? (
            <div className="space-y-4">
              {filteredLinks?.map((link) => {
                const category = categories?.find(c => Number(c?.id) === Number(link?.categoryId));
                return (
                  <div
                    key={link?.id}
                    className="bg-card rounded-lg border border-border p-4 hover:shadow-card transition-all duration-200 cursor-pointer group"
                    onClick={() => handleLinkClick(link)}
                  >
                    <div className="flex items-start space-x-4">
                      {/* Thumbnail */}
                      <div className="w-16 h-16 rounded-lg overflow-hidden bg-background border border-border flex-shrink-0">
                        <Image
                          src={link?.thumbnail}
                          alt={link?.title}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex-1">
                            <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                              {link?.title}
                            </h3>
                            {category && (
                              <div className="flex items-center space-x-2 mt-1">
                                <div
                                  className="w-2 h-2 rounded-full"
                                  style={{ backgroundColor: category?.color }}
                                ></div>
                                <span className="text-xs text-muted-foreground">{category?.name}</span>
                              </div>
                            )}
                          </div>

                          <div className="flex items-center space-x-2 flex-shrink-0 ml-4">
                            <button
                              onClick={(e) => {
                                e?.stopPropagation();
                                handleToggleFavorite(link?.id);
                              }}
                              className={`p-2 rounded-md transition-colors ${
                                link?.isFavorite
                                  ? 'text-accent hover:text-accent/80'
                                  : 'text-muted-foreground hover:text-foreground'
                              }`}
                              title={link?.isFavorite ? 'Remove from favorites' : 'Add to favorites'}
                            >
                              <Icon name={link?.isFavorite ? 'Star' : 'StarOff'} size={16} />
                            </button>

                            <button
                              onClick={(e) => {
                                e?.stopPropagation();
                                handleDeleteLink(link?.id);
                              }}
                              className="p-2 rounded-md transition-colors text-muted-foreground hover:text-destructive"
                              title="Delete link"
                            >
                              <Icon name="Trash2" size={16} />
                            </button>

                            <Icon name="ExternalLink" size={16} className="text-muted-foreground group-hover:text-primary transition-colors" />
                          </div>
                        </div>

                        <p className="text-sm text-muted-foreground mb-2 line-clamp-2">
                          {link?.description}
                        </p>

                        {/* Tags */}
                        {link?.tags && link.tags.length > 0 && (
                          <div className="flex flex-wrap gap-1 mb-2">
                            {link.tags.map(tag => (
                              <span key={tag} className="inline-flex items-center px-2 py-0.5 rounded-full text-xs bg-muted text-muted-foreground">
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}

                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                          <p className="font-mono truncate">
                            {link?.url}
                          </p>

                          <span className="flex-shrink-0 ml-4">
                            Added {formatRelativeTime(link?.addedAt)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon
                  name={
                    searchQuery || selectedCategories.length > 0 || selectedTags.length > 0
                      ? 'Search'
                      : 'Link'
                  }
                  size={24}
                  className="text-muted-foreground"
                />
              </div>
              <h3 className="text-lg font-medium text-foreground mb-2">
                {searchQuery || selectedCategories.length > 0 || selectedTags.length > 0
                  ? 'No links found'
                  : 'No links yet'}
              </h3>
              <p className="text-muted-foreground mb-6">
                {searchQuery
                  ? `No links match "${searchQuery}".`
                  : selectedCategories.length > 0 || selectedTags.length > 0
                  ? 'No links match your filters.'
                  : 'Start adding links to organize your web!'}
              </p>
              {!(searchQuery || selectedCategories.length > 0 || selectedTags.length > 0) && (
                <Button
                  onClick={() => navigate('/add-edit-link-modal')}
                  iconName="Plus"
                  iconPosition="left"
                >
                  Add Your First Link
                </Button>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default AllLinks;
