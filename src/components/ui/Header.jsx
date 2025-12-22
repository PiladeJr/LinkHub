import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';
import Input from './Input';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();
  const navigate = useNavigate();

  const navigationItems = [
    {
      label: 'Dashboard',
      path: '/dashboard-home',
      icon: 'Home',
      tooltip: 'View your organized link collections'
    },
    {
      label: 'All Links',
      path: '/all-links',
      icon: 'Link',
      tooltip: 'Browse all your saved links'
    },
    {
      label: 'Categories',
      path: '/category-management',
      icon: 'Folder',
      tooltip: 'Manage your link categories'
    }
  ];

  const handleNavigation = (path) => {
    navigate(path);
    setIsMobileMenuOpen(false);
  };

  const handleSearchSubmit = (e) => {
    e?.preventDefault();
    if (searchQuery?.trim()) {
      // Dispatch global search event for dashboard to listen
      const searchEvent = new CustomEvent('globalSearch', {
        detail: { query: searchQuery?.trim() }
      });
      window.dispatchEvent(searchEvent);
      
      // Navigate to dashboard if not already there
      if (location.pathname !== '/dashboard-home' && location.pathname !== '/') {
        navigate('/dashboard-home');
      }
    }
  };

  const handleSearchChange = (e) => {
    const newQuery = e?.target?.value;
    setSearchQuery(newQuery);
    
    // Real-time search - dispatch event as user types
    if (location.pathname === '/dashboard-home' || location.pathname === '/') {
      const searchEvent = new CustomEvent('globalSearch', {
        detail: { query: newQuery }
      });
      window.dispatchEvent(searchEvent);
    }
  };

  const handleSearchExpand = () => {
    setIsSearchExpanded(true);
  };

  const handleSearchCollapse = () => {
    setIsSearchExpanded(false);
    setSearchQuery('');
  };

  const isActivePath = (path) => {
    return location.pathname === path;
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-100 bg-card border-b border-border shadow-subtle">
      <div className="flex items-center justify-between h-16 px-4 lg:px-6">
        {/* Logo */}
        <div className="flex items-center">
          <button
            onClick={() => handleNavigation('/dashboard-home')}
            className="flex items-center space-x-2 transition-micro hover:opacity-80"
          >
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Icon name="Link" size={20} color="white" />
            </div>
            <span className="text-xl font-semibold text-foreground">LinkHub</span>
          </button>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1">
          {navigationItems?.map((item) => (
            <button
              key={item?.path}
              onClick={() => handleNavigation(item?.path)}
              className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-micro ${
                isActivePath(item?.path)
                  ? 'bg-primary text-primary-foreground hover:bg-primary'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted'
              }`}
              title={item?.tooltip}
            >
              <Icon name={item?.icon} size={16} />
              <span>{item?.label}</span>
            </button>
          ))}
        </nav>

        {/* Search and Actions */}
        <div className="flex items-center space-x-3">
          {/* Desktop Search */}
          <div className="hidden md:block">
            {!isSearchExpanded ? (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleSearchExpand}
                iconName="Search"
                className="text-muted-foreground hover:text-foreground"
              >
                Search
              </Button>
            ) : (
              <form onSubmit={handleSearchSubmit} className="flex items-center">
                <div className="relative">
                  <Input
                    type="search"
                    placeholder="Search links and categories..."
                    value={searchQuery}
                    onChange={handleSearchChange}
                    className="w-64 pr-8"
                    autoFocus
                  />
                  <button
                    type="button"
                    onClick={handleSearchCollapse}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    <Icon name="X" size={16} />
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Mobile Search */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden text-muted-foreground hover:text-foreground"
            iconName="Search"
          />

          {/* Mobile Menu Toggle */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden"
            iconName={isMobileMenuOpen ? 'X' : 'Menu'}
          />
        </div>
      </div>
      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-card border-t border-border shadow-card">
          <nav className="px-4 py-3 space-y-1">
            {navigationItems?.map((item) => (
              <button
                key={item?.path}
                onClick={() => handleNavigation(item?.path)}
                className={`flex items-center space-x-3 w-full px-3 py-3 rounded-md text-sm font-medium transition-micro ${
                  isActivePath(item?.path)
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                }`}
              >
                <Icon name={item?.icon} size={18} />
                <span>{item?.label}</span>
              </button>
            ))}
            
            {/* Mobile Search */}
            <div className="pt-3 border-t border-border">
              <form onSubmit={handleSearchSubmit}>
                <Input
                  type="search"
                  placeholder="Search links and categories..."
                  value={searchQuery}
                  onChange={handleSearchChange}
                  className="w-full"
                />
              </form>
            </div>
            {/* Mobile Add Link removed as per request */}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;