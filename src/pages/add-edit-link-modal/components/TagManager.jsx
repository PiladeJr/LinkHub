import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const TagManager = ({ selectedTags, onChange, availableTags }) => {
  const [inputValue, setInputValue] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);

  const filteredSuggestions = availableTags?.filter(tag =>
    tag?.toLowerCase()?.includes(inputValue?.toLowerCase()) &&
    !selectedTags?.includes(tag)
  );

  const handleInputChange = (e) => {
    const value = e?.target?.value;
    setInputValue(value);
    setShowSuggestions(value?.length > 0);
  };

  const handleInputKeyDown = (e) => {
    if (e?.key === 'Enter' || e?.key === ',') {
      e?.preventDefault();
      addTag(inputValue?.trim());
    } else if (e?.key === 'Backspace' && inputValue === '' && selectedTags?.length > 0) {
      removeTag(selectedTags?.[selectedTags?.length - 1]);
    }
  };

  const addTag = (tag) => {
    if (tag && !selectedTags?.includes(tag)) {
      onChange([...selectedTags, tag]);
      setInputValue('');
      setShowSuggestions(false);
    }
  };

  const removeTag = (tagToRemove) => {
    onChange(selectedTags?.filter(tag => tag !== tagToRemove));
  };

  const handleSuggestionClick = (tag) => {
    addTag(tag);
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-foreground">
        Tags
      </label>
      <p className="text-xs text-muted-foreground">
        Add tags to help organize and find your links. Press Enter or comma to add.
      </p>
      <div className="relative">
        <div className="min-h-[42px] w-full px-3 py-2 border border-border rounded-md bg-background focus-within:ring-2 focus-within:ring-primary focus-within:border-transparent">
          <div className="flex flex-wrap gap-1 items-center">
            {selectedTags?.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center gap-1 px-2 py-1 bg-primary/10 text-primary text-xs rounded-md"
              >
                {tag}
                <button
                  type="button"
                  onClick={() => removeTag(tag)}
                  className="hover:text-primary/80 transition-colors"
                >
                  <Icon name="X" size={12} />
                </button>
              </span>
            ))}
            <input
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              onKeyDown={handleInputKeyDown}
              onFocus={() => setShowSuggestions(inputValue?.length > 0)}
              onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
              placeholder={selectedTags?.length === 0 ? "Add tags..." : ""}
              className="flex-1 min-w-[120px] bg-transparent border-none outline-none text-foreground placeholder:text-muted-foreground"
            />
          </div>
        </div>

        {showSuggestions && filteredSuggestions?.length > 0 && (
          <div className="absolute top-full left-0 right-0 mt-1 bg-card border border-border rounded-md shadow-card max-h-40 overflow-y-auto z-10">
            {filteredSuggestions?.slice(0, 8)?.map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => handleSuggestionClick(tag)}
                className="w-full px-3 py-2 text-left text-sm text-foreground hover:bg-muted transition-colors"
              >
                {tag}
              </button>
            ))}
          </div>
        )}
      </div>
      {selectedTags?.length > 0 && (
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>{selectedTags?.length} tag{selectedTags?.length !== 1 ? 's' : ''} added</span>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onChange([])}
            className="text-xs h-auto p-1"
          >
            Clear all
          </Button>
        </div>
      )}
    </div>
  );
};

export default TagManager;