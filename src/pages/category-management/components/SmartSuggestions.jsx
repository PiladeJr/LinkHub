import React, { useState, useEffect } from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const SmartSuggestions = ({ categories, onCreateCategory, isVisible, onToggle }) => {
  const [suggestions, setSuggestions] = useState([]);
  const [isGenerating, setIsGenerating] = useState(false);

  // Mock data for suggestions based on common patterns
  const suggestionTemplates = [
    {
      id: 'social-media',
      name: 'Social Media',
      description: 'Social networking and communication platforms',
      color: '#DC2626',
      reason: 'Popular category for organizing social platforms',
      confidence: 85
    },
    {
      id: 'news-media',
      name: 'News & Media',
      description: 'News websites and media sources',
      color: '#CA8A04',
      reason: 'Commonly used for news and information sources',
      confidence: 78
    },
    {
      id: 'entertainment',
      name: 'Entertainment',
      description: 'Movies, music, games, and entertainment content',
      color: '#9333EA',
      reason: 'Frequently needed for entertainment links',
      confidence: 72
    },
    {
      id: 'finance',
      name: 'Finance',
      description: 'Banking, investing, and financial tools',
      color: '#16A34A',
      reason: 'Essential for financial management links',
      confidence: 68
    },
    {
      id: 'health-fitness',
      name: 'Health & Fitness',
      description: 'Health information and fitness resources',
      color: '#0891B2',
      reason: 'Popular for health and wellness links',
      confidence: 65
    }
  ];

  useEffect(() => {
    if (isVisible) {
      generateSuggestions();
    }
  }, [isVisible, categories]);

  const generateSuggestions = async () => {
    setIsGenerating(true);
    
    // Simulate AI processing delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Filter out existing categories
    const existingNames = categories?.map(cat => cat?.name?.toLowerCase());
    const filteredSuggestions = suggestionTemplates?.filter(
      suggestion => !existingNames?.includes(suggestion?.name?.toLowerCase())
    );

    // Sort by confidence and take top 3
    const topSuggestions = filteredSuggestions?.sort((a, b) => b?.confidence - a?.confidence)?.slice(0, 3);

    setSuggestions(topSuggestions);
    setIsGenerating(false);
  };

  const handleCreateFromSuggestion = (suggestion) => {
    const categoryData = {
      id: `cat_${Date.now()}`,
      name: suggestion?.name,
      description: suggestion?.description,
      color: suggestion?.color,
      icon: null,
      parentId: null,
      linkCount: 0,
      createdAt: new Date()?.toISOString(),
      updatedAt: new Date()?.toISOString(),
      fromSuggestion: true
    };

    onCreateCategory(categoryData);
    
    // Remove the used suggestion
    setSuggestions(prev => prev?.filter(s => s?.id !== suggestion?.id));
  };

  const handleDismissSuggestion = (suggestionId) => {
    setSuggestions(prev => prev?.filter(s => s?.id !== suggestionId));
  };

  if (!isVisible) {
    return (
      <div className="mb-6">
        <Button
          variant="outline"
          onClick={onToggle}
          iconName="Lightbulb"
          iconPosition="left"
          className="w-full sm:w-auto"
        >
          Smart Suggestions
        </Button>
      </div>
    );
  }

  return (
    <div className="mb-8 bg-card rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-foreground flex items-center space-x-2">
          <Icon name="Lightbulb" size={20} />
          <span>Smart Suggestions</span>
        </h2>
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={generateSuggestions}
            loading={isGenerating}
            iconName="RefreshCw"
            title="Refresh suggestions"
          />
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggle}
            iconName="ChevronUp"
            title="Hide suggestions"
          />
        </div>
      </div>
      {isGenerating ? (
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-sm text-muted-foreground">Analyzing your patterns...</p>
          </div>
        </div>
      ) : suggestions?.length > 0 ? (
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Based on your current categories and common usage patterns, here are some suggestions:
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {suggestions?.map((suggestion) => (
              <div
                key={suggestion?.id}
                className="bg-muted rounded-lg p-4 border border-border hover:border-primary/50 transition-colors"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div 
                      className="w-8 h-8 rounded-lg flex items-center justify-center"
                      style={{ backgroundColor: suggestion?.color }}
                    >
                      <Icon name="Folder" size={16} color="white" />
                    </div>
                    <div>
                      <h3 className="font-medium text-foreground text-sm">
                        {suggestion?.name}
                      </h3>
                      <div className="flex items-center space-x-1 mt-1">
                        <Icon name="Zap" size={12} className="text-warning" />
                        <span className="text-xs text-muted-foreground">
                          {suggestion?.confidence}% match
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <Button
                    variant="ghost"
                    size="xs"
                    onClick={() => handleDismissSuggestion(suggestion?.id)}
                    iconName="X"
                    className="text-muted-foreground hover:text-foreground"
                  />
                </div>

                <p className="text-xs text-muted-foreground mb-3 line-clamp-2">
                  {suggestion?.description}
                </p>

                <div className="bg-background rounded-md p-2 mb-3">
                  <p className="text-xs text-muted-foreground">
                    <Icon name="Info" size={12} className="inline mr-1" />
                    {suggestion?.reason}
                  </p>
                </div>

                <Button
                  variant="default"
                  size="sm"
                  onClick={() => handleCreateFromSuggestion(suggestion)}
                  iconName="Plus"
                  iconPosition="left"
                  fullWidth
                >
                  Create Category
                </Button>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon name="CheckCircle" size={24} className="text-success" />
          </div>
          <h3 className="font-medium text-foreground mb-2">All Set!</h3>
          <p className="text-sm text-muted-foreground mb-4">
            You have a great category structure. No new suggestions at this time.
          </p>
          <Button
            variant="outline"
            size="sm"
            onClick={generateSuggestions}
            iconName="RefreshCw"
            iconPosition="left"
          >
            Check Again
          </Button>
        </div>
      )}
      {/* Tips */}
      <div className="mt-6 pt-6 border-t border-border">
        <h3 className="text-sm font-semibold text-foreground mb-3">Tips for Better Organization</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-start space-x-3">
            <Icon name="Target" size={16} className="text-primary mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-xs font-medium text-foreground">Keep it specific</p>
              <p className="text-xs text-muted-foreground">Create focused categories rather than broad ones</p>
            </div>
          </div>
          
          <div className="flex items-start space-x-3">
            <Icon name="Layers" size={16} className="text-success mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-xs font-medium text-foreground">Use subcategories</p>
              <p className="text-xs text-muted-foreground">Organize related categories under parent categories</p>
            </div>
          </div>
          
          <div className="flex items-start space-x-3">
            <Icon name="Palette" size={16} className="text-warning mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-xs font-medium text-foreground">Color code</p>
              <p className="text-xs text-muted-foreground">Use consistent colors for related categories</p>
            </div>
          </div>
          
          <div className="flex items-start space-x-3">
            <Icon name="Clock" size={16} className="text-accent mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-xs font-medium text-foreground">Regular cleanup</p>
              <p className="text-xs text-muted-foreground">Review and merge similar categories periodically</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SmartSuggestions;