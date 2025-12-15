import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import FloatingActionButton from '../../components/ui/FloatingActionButton';
import RecentlyAddedCarousel from './components/RecentlyAddedCarousel';
import FavoritesBar from './components/FavoritesBar';
import CategoryCard from './components/CategoryCard';
import EmptyState from './components/EmptyState';
import LoadingSkeleton from './components/LoadingSkeleton';
import SearchResults from './components/SearchResults';
import { categoriesWithLinks } from '../../data/mockData';

import Button from '../../components/ui/Button';

const DashboardHome = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [categories, setCategories] = useState([]);
  const [recentLinks, setRecentLinks] = useState([]);
  const [favoriteLinks, setFavoriteLinks] = useState([]);
  const [draggedCategory, setDraggedCategory] = useState(null);

  // Mock data
  const mockCategories = categoriesWithLinks;

  const mockRecentLinks = [
    {
      id: 1,
      title: "ChatGPT - OpenAI\'s Conversational AI",
      url: "https://chat.openai.com",
      thumbnail: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=400&fit=crop",
      category: "AI Tools",
      addedAt: "2 hours ago",
      isFavorite: true
    },
    {
      id: 2,
      title: "Figma - Collaborative Design Tool",
      url: "https://figma.com",
      thumbnail: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400&h=400&fit=crop",
      category: "Design Resources",
      addedAt: "5 hours ago",
      isFavorite: true
    },
    {
      id: 3,
      title: "React Documentation",
      url: "https://react.dev",
      thumbnail: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=400&fit=crop",
      category: "Development",
      addedAt: "1 day ago",
      isFavorite: false
    },
    {
      id: 4,
      title: "Notion - All-in-one Workspace",
      url: "https://notion.so",
      thumbnail: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400&h=400&fit=crop",
      category: "Productivity",
      addedAt: "2 days ago",
      isFavorite: false
    }
  ];

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setCategories(mockCategories);
      setRecentLinks(mockRecentLinks);
      // Derive favorites from recent links
      const favorites = mockRecentLinks?.filter(link => link?.isFavorite);
      setFavoriteLinks(favorites);
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  // Search functionality
  useEffect(() => {
    if (searchQuery?.trim()) {
      const allItems = [
        ...mockCategories?.map(cat => ({ ...cat, type: 'category' })),
        ...mockRecentLinks?.map(link => ({ ...link, type: 'link' }))
      ];

      const filtered = allItems?.filter(item =>
        item?.title?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
        item?.name?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
        item?.description?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
        item?.url?.toLowerCase()?.includes(searchQuery?.toLowerCase())
      );

      setSearchResults(filtered);
    } else {
      setSearchResults([]);
    }
  }, [searchQuery]);

  const handleCategoryClick = (category) => {
    navigate(`/category/${category?.id}`, { state: { category } });
  };

  const handleLinkClick = (link) => {
    if (link?.type === 'category') {
      handleCategoryClick(link);
    } else {
      window.open(link?.url, '_blank');
    }
  };

  const handleEditCategory = (category) => {
    console.log('Edit category:', category);
    // This would open a modal or navigate to edit page
  };

  const handleDeleteCategory = (category) => {
    console.log('Delete category:', category);
    // This would show a confirmation dialog
  };

  const handleDuplicateCategory = (category) => {
    console.log('Duplicate category:', category);
    // This would create a copy of the category
  };

  const handleToggleFavorite = (linkId) => {
    // Find the link and its current state
    const link = recentLinks?.find(l => l?.id === linkId);
    if (!link) return;

    const willBeFavorite = !link?.isFavorite;

    // Update recent links
    const updatedRecentLinks = recentLinks?.map(l =>
      l?.id === linkId ? { ...l, isFavorite: willBeFavorite } : l
    );
    setRecentLinks(updatedRecentLinks);

    // Update favorite links based on the NEW state
    if (willBeFavorite) {
      // Add to favorites
      setFavoriteLinks([...favoriteLinks, { ...link, isFavorite: true }]);
    } else {
      // Remove from favorites
      setFavoriteLinks(favoriteLinks?.filter(l => l?.id !== linkId));
    }
  };

  const handleCreateCategory = () => {
    navigate('/category-management');
  };

  const handleAddLink = () => {
    navigate('/add-edit-link-modal');
  };

  const handleClearSearch = () => {
    setSearchQuery('');
  };

  // Global search handler - connect to Header component properly
  useEffect(() => {
    const handleGlobalSearch = (event) => {
      setSearchQuery(event?.detail?.query || '');
    };

    window.addEventListener('globalSearch', handleGlobalSearch);
    return () => window.removeEventListener('globalSearch', handleGlobalSearch);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-16 px-4 lg:px-6 pb-20">
          <div className="max-w-7xl mx-auto py-6">
            <LoadingSkeleton />
          </div>
        </main>
      </div>
    );
  }

  const hasData = categories?.length > 0 || recentLinks?.length > 0;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16 px-4 lg:px-6 pb-20">
        <div className="max-w-7xl mx-auto py-6">
          {/* Search Results */}
          {searchQuery && (
            <div className="mb-6">
              <SearchResults
                searchQuery={searchQuery}
                results={searchResults}
                onLinkClick={handleLinkClick}
                onClearSearch={handleClearSearch}
              />
            </div>
          )}

          {/* Main Content */}
          {!searchQuery && (
            <>
              {hasData ? (
                <div className="space-y-6">
                  {/* Recently Added Section */}
                  <RecentlyAddedCarousel
                    recentLinks={recentLinks}
                    onLinkClick={handleLinkClick}
                    onToggleFavorite={handleToggleFavorite}
                  />

                  {/* Favorites Section */}
                  <FavoritesBar
                    favoriteLinks={favoriteLinks}
                    onLinkClick={handleLinkClick}
                    onToggleFavorite={handleToggleFavorite}
                  />

                  {/* Categories Section */}
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="text-xl font-semibold text-foreground">
                        Categories
                      </h2>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={handleCreateCategory}
                        iconName="Plus"
                        iconPosition="left"
                      >
                        New Category
                      </Button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                      {categories?.map((category) => (
                        <CategoryCard
                          key={category?.id}
                          category={category}
                          onCategoryClick={handleCategoryClick}
                          onEditCategory={handleEditCategory}
                          onDeleteCategory={handleDeleteCategory}
                          onDuplicateCategory={handleDuplicateCategory}
                          isDragging={draggedCategory === category?.id}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <EmptyState
                  onCreateCategory={handleCreateCategory}
                  onAddLink={handleAddLink}
                />
              )}
            </>
          )}
        </div>
      </main>
      {/* Floating Action Button */}
      <FloatingActionButton onClick={handleAddLink} />
    </div>
  );
};

export default DashboardHome;