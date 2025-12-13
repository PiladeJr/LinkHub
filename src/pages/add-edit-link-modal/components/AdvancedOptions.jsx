import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';
import { Checkbox } from '../../../components/ui/Checkbox';
import Select from '../../../components/ui/Select';

const AdvancedOptions = ({ options, onChange }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const priorityOptions = [
    { value: 'low', label: 'Low Priority' },
    { value: 'medium', label: 'Medium Priority' },
    { value: 'high', label: 'High Priority' }
  ];

  const privacyOptions = [
    { value: 'public', label: 'Public - Visible to everyone' },
    { value: 'private', label: 'Private - Only visible to you' },
    { value: 'shared', label: 'Shared - Visible to selected users' }
  ];

  const handleOptionChange = (key, value) => {
    onChange({
      ...options,
      [key]: value
    });
  };

  return (
    <div className="space-y-4">
      <button
        type="button"
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center justify-between w-full p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors"
      >
        <span className="text-sm font-medium text-foreground">Advanced Options</span>
        <Icon 
          name={isExpanded ? 'ChevronUp' : 'ChevronDown'} 
          size={16} 
          className="text-muted-foreground" 
        />
      </button>
      {isExpanded && (
        <div className="space-y-4 p-4 border border-border rounded-lg bg-card">
          {/* Priority Setting */}
          <Select
            label="Priority Level"
            description="Set the importance level for this link"
            options={priorityOptions}
            value={options?.priority || 'medium'}
            onChange={(value) => handleOptionChange('priority', value)}
          />

          {/* Privacy Settings */}
          <Select
            label="Privacy Setting"
            description="Control who can see this link"
            options={privacyOptions}
            value={options?.privacy || 'private'}
            onChange={(value) => handleOptionChange('privacy', value)}
          />

          {/* Custom Notes */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">
              Personal Notes
            </label>
            <p className="text-xs text-muted-foreground mb-2">
              Add private notes about this link (only visible to you)
            </p>
            <textarea
              value={options?.notes || ''}
              onChange={(e) => handleOptionChange('notes', e?.target?.value)}
              placeholder="Add your personal notes here..."
              rows={3}
              className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
            />
          </div>

          {/* Scheduled Publishing */}
          <Input
            type="datetime-local"
            label="Schedule for Later"
            description="Optionally schedule when this link becomes active"
            value={options?.scheduledDate || ''}
            onChange={(e) => handleOptionChange('scheduledDate', e?.target?.value)}
          />

          {/* Additional Options */}
          <div className="space-y-3 pt-2 border-t border-border">
            <Checkbox
              label="Mark as Favorite"
              description="Add this link to your favorites collection"
              checked={options?.isFavorite || false}
              onChange={(e) => handleOptionChange('isFavorite', e?.target?.checked)}
            />

            <Checkbox
              label="Enable Click Tracking"
              description="Track how often you visit this link"
              checked={options?.trackClicks !== false}
              onChange={(e) => handleOptionChange('trackClicks', e?.target?.checked)}
            />

            <Checkbox
              label="Send Notifications"
              description="Get notified about updates to this link"
              checked={options?.notifications || false}
              onChange={(e) => handleOptionChange('notifications', e?.target?.checked)}
            />

            <Checkbox
              label="Archive After 30 Days"
              description="Automatically move to archive after 30 days of inactivity"
              checked={options?.autoArchive || false}
              onChange={(e) => handleOptionChange('autoArchive', e?.target?.checked)}
            />
          </div>

          {/* Custom Expiry */}
          <Input
            type="date"
            label="Expiry Date (Optional)"
            description="Set when this link should be automatically archived"
            value={options?.expiryDate || ''}
            onChange={(e) => handleOptionChange('expiryDate', e?.target?.value)}
          />
        </div>
      )}
    </div>
  );
};

export default AdvancedOptions;