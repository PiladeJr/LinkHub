import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Icon from '../../components/AppIcon';
import Image from '../../components/AppImage';
import { getCategories, getLinksByCategory, toggleFavorite, deleteLink } from '../../data/linkStore';
import { formatRelativeTime } from '../../utils/dateUtils';

const CategoryDetail = () => {
  const { categoryId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [category, setCategory] = useState(null);
  const [links, setLinks] = useState([]);
  const [filteredLinks, setFilteredLinks] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  // Get category from navigation state or fetch by ID
  const categoryFromState = location.state?.category;

  useEffect(() => {
    const timer = setTimeout(() => {
      // Use category from navigation state if available, otherwise find by ID
      let foundCategory = categoryFromState;
      if (!foundCategory) {
        const cats = getCategories();
        foundCategory = cats?.find(cat => Number(cat?.id) === parseInt(categoryId));
      }
      
      if (foundCategory) {
        setCategory(foundCategory);
        const categoryLinks = getLinksByCategory(foundCategory?.id) || [];
        setLinks(categoryLinks);
        setFilteredLinks(categoryLinks);
      }
      
      setIsLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, [categoryId, categoryFromState]);

  // Filter links based on search
  useEffect(() => {
    if (searchQuery?.trim()) {
      const filtered = links?.filter(link =>
        link?.title?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
        link?.description?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
        link?.url?.toLowerCase()?.includes(searchQuery?.toLowerCase())
      );
      setFilteredLinks(filtered);
    } else {
      setFilteredLinks(links);
    }
  }, [searchQuery, links]);

  const handleLinkClick = (link) => {
    window.open(link?.url, '_blank', 'noopener,noreferrer');
  };

  const handleToggleFavorite = (linkId) => {
    toggleFavorite(category?.id, linkId);
    const refreshed = getLinksByCategory(category?.id) || [];
    setLinks(refreshed);
    setFilteredLinks(
      searchQuery?.trim()
        ? refreshed?.filter(link =>
            link?.title?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
            link?.description?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
            link?.url?.toLowerCase()?.includes(searchQuery?.toLowerCase())
          )
        : refreshed
    );
  };

  const handleDeleteLink = (linkId) => {
    if (confirm('Are you sure you want to delete this link?')) {
      deleteLink(category?.id, linkId);
      const refreshed = getLinksByCategory(category?.id) || [];
      setLinks(refreshed);
      setFilteredLinks(
        searchQuery?.trim()
          ? refreshed?.filter(link =>
              link?.title?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
              link?.description?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
              link?.url?.toLowerCase()?.includes(searchQuery?.toLowerCase())
            )
          : refreshed
      );
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) {
      const diffHours = Math.floor(diffTime / (1000 * 60 * 60));
      return diffHours === 0 ? 'Just now' : `${diffHours}h ago`;
    } else if (diffDays === 1) {
      return 'Yesterday';
    } else if (diffDays < 7) {
      return `${diffDays}d ago`;
    } else {
      return date?.toLocaleDateString();
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-16 px-4 lg:px-6">
          <div className="max-w-4xl mx-auto py-8">
            <div className="animate-pulse">
              <div className="h-8 bg-muted rounded w-1/3 mb-4"></div>
              <div className="h-4 bg-muted rounded w-2/3 mb-8"></div>
              <div className="space-y-4">
                {[1, 2, 3]?.map(i => (
                  <div key={i} className="h-20 bg-muted rounded"></div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (!category) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-16 px-4 lg:px-6">
          <div className="max-w-4xl mx-auto py-8 text-center">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon name="AlertTriangle" size={24} className="text-muted-foreground" />
            </div>
            <h1 className="text-2xl font-bold text-foreground mb-2">Category Not Found</h1>
            <p className="text-muted-foreground mb-6">The category you're looking for doesn't exist.</p>
            <Button onClick={() => navigate('/dashboard-home')} iconName="ArrowLeft" iconPosition="left">
              Back to Dashboard
            </Button>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1 overflow-y-auto mt-16 px-4 lg:px-6 pb-8">
        <div className="max-w-4xl mx-auto py-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <Button
              variant="ghost"
              onClick={() => navigate('/dashboard-home')}
              iconName="ArrowLeft"
              iconPosition="left"
              className="text-muted-foreground hover:text-foreground"
            >
              Back to Dashboard
            </Button>
            
            <Button
              variant="outline"
              onClick={() => navigate('/category-management')}
              iconName="Settings"
              iconPosition="left"
            >
              Manage Categories
            </Button>
          </div>

          {/* Category Info */}
          <div className="bg-card rounded-lg border border-border p-6 mb-8">
            <div className="flex items-start space-x-4">
              <div 
                className="w-16 h-16 rounded-lg flex items-center justify-center text-white flex-shrink-0"
                style={{ backgroundColor: category?.color }}
              >
                <Icon name={category?.icon} size={24} />
              </div>
              
              <div className="flex-1">
                <h1 className="text-2xl font-bold text-foreground mb-2">{category?.name}</h1>
                <p className="text-muted-foreground mb-4">{category?.description}</p>
                
                <div className="flex items-center space-x-6 text-sm text-muted-foreground">
                  <div className="flex items-center space-x-1">
                    <Icon name="Link" size={16} />
                    <span>{filteredLinks?.length} {filteredLinks?.length === 1 ? 'link' : 'links'}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Icon name="Clock" size={16} />
                    <span>
                      {(() => {
                        const dates = (links || [])?.map(l => new Date(l.addedAt).getTime());
                        const last = dates?.length ? new Date(Math.max(...dates)).toISOString() : null;
                        return last ? `Updated ${formatRelativeTime(last)}` : 'No updates yet';
                      })()}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Search */}
          <div className="mb-6">
            <Input
              type="search"
              placeholder="Search links in this category..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e?.target?.value)}
              className="max-w-md"
            />
          </div>

          {/* Links */}
          {filteredLinks?.length > 0 ? (
            <div className="space-y-4">
              {filteredLinks?.map((link) => (
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
                        <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                          {link?.title}
                        </h3>
                        
                        <div className="flex items-center space-x-2 flex-shrink-0 ml-4">
                          <button
                            onClick={(e) => {
                              e?.stopPropagation();
                              handleToggleFavorite(link?.id);
                            }}
                            className={`p-2 rounded-md transition-colors ${
                              link?.isFavorite 
                                ? 'text-accent hover:text-accent/80' :'text-muted-foreground hover:text-foreground'
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
                      
                      <div className="flex items-center justify-between">
                        <p className="text-xs text-muted-foreground font-mono truncate">
                          {link?.url}
                        </p>
                        
                        <span className="text-xs text-muted-foreground flex-shrink-0 ml-4">
                          Added {formatRelativeTime(link?.addedAt)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name={searchQuery ? 'Search' : 'Link'} size={24} className="text-muted-foreground" />
              </div>
              <h3 className="text-lg font-medium text-foreground mb-2">
                {searchQuery ? 'No links found' : 'No links yet'}
              </h3>
              <p className="text-muted-foreground mb-6">
                {searchQuery 
                  ? `No links match "${searchQuery}" in this category.`
                  : 'This category doesn\'t have any links yet. Start by adding your first link!'
                }
              </p>
              {!searchQuery && (
                <Button
                  onClick={() => navigate('/add-edit-link-modal')}
                  iconName="Plus"
                  iconPosition="left"
                >
                  Add Link
                </Button>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default CategoryDetail;