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
import { getCategoriesWithStats, getAllLinks, toggleFavorite } from '../../data/linkStore';

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

  // Helpers to derive data from the single source of truth (linkStore)
  const computeAllLinks = () => {
    return getAllLinks();
  };

  const computeRecentLinks = (limit = 6) => {
    return computeAllLinks()
      .slice() // copy
      .sort((a, b) => {
        // Primary sort: by date (most recent first)
        const dateA = new Date(a.addedAt);
        const dateB = new Date(b.addedAt);
        const dateDiff = dateB - dateA;

        if (dateDiff !== 0) {
          return dateDiff;
        }

        // Secondary sort: if same date, favorites first
        if (a.isFavorite !== b.isFavorite) {
          return a.isFavorite ? -1 : 1;
        }

        // Tertiary sort: if still tied, alphabetical by title
        return a.title.localeCompare(b.title);
      })
      .slice(0, limit);
  };

  const computeFavoriteLinks = () => {
    return computeAllLinks().filter(l => !!l.isFavorite);
  };

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(async () => {
      const cats = getCategoriesWithStats();
      setCategories(cats);
      setRecentLinks(computeRecentLinks());
      setFavoriteLinks(computeFavoriteLinks());
      setIsLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  // Search functionality
  useEffect(() => {
    if (searchQuery?.trim()) {
      const allItems = [
        ...categories?.map(cat => ({ ...cat, type: 'category' })),
        ...recentLinks?.map(link => ({ ...link, type: 'link' }))
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
  }, [searchQuery, categories, recentLinks]);

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

    // Persist toggle in store
    toggleFavorite(link.categoryId, linkId);

    // Refresh computed lists from store
    setRecentLinks(computeRecentLinks());
    setFavoriteLinks(computeFavoriteLinks());
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
    <div className="h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1 overflow-y-auto mt-16 px-4 lg:px-6 pb-20">
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