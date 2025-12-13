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
  const mockCategories = [
    {
      id: 1,
      name: "AI Tools",
      description: "Collection of artificial intelligence and machine learning tools for productivity",
      icon: "Bot",
      color: "#2563EB",
      linkCount: 12,
      lastUpdated: "2 hours ago",
      previewLinks: [
        {
          id: 1,
          title: "ChatGPT",
          thumbnail: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=400&fit=crop"
        },
        {
          id: 2,
          title: "Midjourney",
          thumbnail: "https://images.unsplash.com/photo-1686191128892-3b4e8b8b8b8b?w=400&h=400&fit=crop"
        },
        {
          id: 3,
          title: "Claude AI",
          thumbnail: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=400&h=400&fit=crop"
        }
      ]
    },
    {
      id: 2,
      name: "Design Resources",
      description: "UI/UX design tools, inspiration, and resources",
      icon: "Palette",
      color: "#7C3AED",
      linkCount: 8,
      lastUpdated: "1 day ago",
      previewLinks: [
        {
          id: 4,
          title: "Figma",
          thumbnail: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400&h=400&fit=crop"
        },
        {
          id: 5,
          title: "Dribbble",
          thumbnail: "https://images.unsplash.com/photo-1626785774573-4b799315345d?w=400&h=400&fit=crop"
        }
      ]
    },
    {
      id: 3,
      name: "Development",
      description: "Programming tutorials, documentation, and development tools",
      icon: "Code",
      color: "#059669",
      linkCount: 15,
      lastUpdated: "3 hours ago",
      previewLinks: [
        {
          id: 6,
          title: "GitHub",
          thumbnail: "https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?w=400&h=400&fit=crop"
        },
        {
          id: 7,
          title: "Stack Overflow",
          thumbnail: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=400&fit=crop"
        },
        {
          id: 8,
          title: "MDN Docs",
          thumbnail: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=400&fit=crop"
        }
      ]
    },
    {
      id: 4,
      name: "Learning",
      description: "Online courses, tutorials, and educational content",
      icon: "GraduationCap",
      color: "#DC2626",
      linkCount: 6,
      lastUpdated: "5 days ago",
      previewLinks: [
        {
          id: 9,
          title: "Coursera",
          thumbnail: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=400&fit=crop"
        },
        {
          id: 10,
          title: "Udemy",
          thumbnail: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400&h=400&fit=crop"
        }
      ]
    },
    {
      id: 5,
      name: "Productivity",
      description: "Tools and apps to boost productivity and organization",
      icon: "Zap",
      color: "#F59E0B",
      linkCount: 9,
      lastUpdated: "1 week ago",
      previewLinks: [
        {
          id: 11,
          title: "Notion",
          thumbnail: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400&h=400&fit=crop"
        },
        {
          id: 12,
          title: "Trello",
          thumbnail: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400&h=400&fit=crop"
        }
      ]
    },
    {
      id: 6,
      name: "Entertainment",
      description: "Movies, music, games, and entertainment platforms",
      icon: "Play",
      color: "#EC4899",
      linkCount: 4,
      lastUpdated: "2 weeks ago",
      previewLinks: [
        {
          id: 13,
          title: "Netflix",
          thumbnail: "https://images.unsplash.com/photo-1489599735734-79b4169c4388?w=400&h=400&fit=crop"
        },
        {
          id: 14,
          title: "Spotify",
          thumbnail: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop"
        }
      ]
    }
  ];

  const mockRecentLinks = [
    {
      id: 1,
      title: "ChatGPT - OpenAI\'s Conversational AI",
      url: "https://chat.openai.com",
      thumbnail: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=400&fit=crop",
      category: "AI Tools",
      addedAt: "2 hours ago"
    },
    {
      id: 2,
      title: "Figma - Collaborative Design Tool",
      url: "https://figma.com",
      thumbnail: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400&h=400&fit=crop",
      category: "Design Resources",
      addedAt: "5 hours ago"
    },
    {
      id: 3,
      title: "React Documentation",
      url: "https://react.dev",
      thumbnail: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=400&fit=crop",
      category: "Development",
      addedAt: "1 day ago"
    },
    {
      id: 4,
      title: "Notion - All-in-one Workspace",
      url: "https://notion.so",
      thumbnail: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400&h=400&fit=crop",
      category: "Productivity",
      addedAt: "2 days ago"
    }
  ];

  const mockFavoriteLinks = [
    {
      id: 1,
      title: "ChatGPT",
      thumbnail: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=400&fit=crop"
    },
    {
      id: 2,
      title: "Figma",
      thumbnail: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400&h=400&fit=crop"
    },
    {
      id: 3,
      title: "GitHub",
      thumbnail: "https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?w=400&h=400&fit=crop"
    },
    {
      id: 4,
      title: "Notion",
      thumbnail: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400&h=400&fit=crop"
    },
    {
      id: 5,
      title: "Dribbble",
      thumbnail: "https://images.unsplash.com/photo-1626785774573-4b799315345d?w=400&h=400&fit=crop"
    }
  ];

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setCategories(mockCategories);
      setRecentLinks(mockRecentLinks);
      setFavoriteLinks(mockFavoriteLinks);
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
                  />

                  {/* Favorites Section */}
                  <FavoritesBar
                    favoriteLinks={favoriteLinks}
                    onLinkClick={handleLinkClick}
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