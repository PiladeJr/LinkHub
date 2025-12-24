import React, { useState, useRef, useEffect } from 'react';
import Button from '../../../components/ui/Button';
import { formatRelativeTime } from '../../../utils/dateUtils';

import Icon from '../../../components/AppIcon';

const ImportExportPanel = ({ categories, onImport, isVisible, onToggle }) => {
  const [isImporting, setIsImporting] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [importError, setImportError] = useState('');
  const [lastExportDate, setLastExportDate] = useState(null);
  const [lastImportDate, setLastImportDate] = useState(null);
  const fileInputRef = useRef(null);

  // Load dates from localStorage on mount
  useEffect(() => {
    const savedExportDate = localStorage.getItem('lastExportDate');
    const savedImportDate = localStorage.getItem('lastImportDate');
    if (savedExportDate) setLastExportDate(savedExportDate);
    if (savedImportDate) setLastImportDate(savedImportDate);
  }, []);

  // Save export date to localStorage
  useEffect(() => {
    if (lastExportDate) {
      localStorage.setItem('lastExportDate', lastExportDate);
    }
  }, [lastExportDate]);

  // Save import date to localStorage
  useEffect(() => {
    if (lastImportDate) {
      localStorage.setItem('lastImportDate', lastImportDate);
    }
  }, [lastImportDate]);

  const handleExport = async () => {
    setIsExporting(true);
    
    try {
      const exportData = {
        version: '1.0',
        exportDate: new Date()?.toISOString(),
        categories: categories?.map(cat => ({
          id: cat?.id,
          name: cat?.name,
          description: cat?.description,
          color: cat?.color,
          icon: cat?.icon,
          parentId: cat?.parentId,
          linkCount: cat?.linkCount,
          createdAt: cat?.createdAt,
          updatedAt: cat?.updatedAt
        })),
      };
      setLastExportDate(new Date()?.toISOString());

      const blob = new Blob([JSON.stringify(exportData, null, 2)], {
        type: 'application/json'
      });
      
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `linkhub-categories-${new Date()?.toISOString()?.split('T')?.[0]}.json`;
      document.body?.appendChild(a);
      a?.click();
      document.body?.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Export failed:', error);
    } finally {
      setIsExporting(false);
    }
  };

  const handleImport = async (e) => {
    const file = e?.target?.files?.[0];
    if (!file) return;

    setIsImporting(true);
    setImportError('');

    try {
      const text = await file?.text();
      const data = JSON.parse(text);

      // Validate import data structure
      if (!data?.categories || !Array.isArray(data?.categories)) {
        throw new Error('Invalid file format: categories array not found');
      }

      // Validate each category
      const validCategories = data?.categories?.filter(cat => {
        return cat?.name && typeof cat?.name === 'string' && cat?.name?.trim()?.length > 0;
      });

      if (validCategories?.length === 0) {
        throw new Error('No valid categories found in the file');
      }

      // Process categories for import
      const processedCategories = validCategories?.map(cat => ({
        ...cat,
        id: `imported_${Date.now()}_${Math.random()?.toString(36)?.substr(2, 9)}`,
        importedAt: new Date()?.toISOString(),
        linkCount: 0 // Reset link count for imported categories
      }));

      await onImport(processedCategories);
      setLastImportDate(new Date()?.toISOString());
      
      // Reset file input
      if (fileInputRef?.current) {
        fileInputRef.current.value = '';
      }
    } catch (error) {
      setImportError(error?.message || 'Failed to import categories');
    } finally {
      setIsImporting(false);
    }
  };

  const handleExportTemplate = () => {
    const template = {
      version: '1.0',
      exportDate: new Date()?.toISOString(),
      categories: [
        {
          id: 'example-1',
          name: 'AI Tools',
          description: 'Artificial Intelligence and Machine Learning tools',
          color: '#2563EB',
          icon: null,
          parentId: null,
          linkCount: 0,
          createdAt: new Date()?.toISOString(),
          updatedAt: new Date()?.toISOString()
        },
        {
          id: 'example-2',
          name: 'Development',
          description: 'Software development resources and tools',
          color: '#16A34A',
          icon: null,
          parentId: null,
          linkCount: 0,
          createdAt: new Date()?.toISOString(),
          updatedAt: new Date()?.toISOString()
        }
      ]
    };

    const blob = new Blob([JSON.stringify(template, null, 2)], {
      type: 'application/json'
    });
    
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'linkhub-categories-template.json';
    document.body?.appendChild(a);
    a?.click();
    document.body?.removeChild(a);
    URL.revokeObjectURL(url);
  };

  if (!isVisible) {
    return (
      <div className="mb-6">
        <Button
          variant="outline"
          onClick={onToggle}
          iconName="Upload"
          iconPosition="left"
          className="w-full sm:w-auto"
        >
          Import/Export
        </Button>
      </div>
    );
  }

  return (
    <div className="mb-8 bg-card rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-foreground flex items-center space-x-2">
          <Icon name="Upload" size={20} />
          <span>Import/Export Categories</span>
        </h2>
        <Button
          variant="ghost"
          size="sm"
          onClick={onToggle}
          iconName="ChevronUp"
          title="Hide import/export"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Export Section */}
        <div className="space-y-4 flex flex-col">
          <div>
            <h3 className="text-sm font-semibold text-foreground">Export Categories</h3>
            <p className="text-sm text-muted-foreground mt-1">
              Download your categories as a JSON file for backup or sharing.
            </p>
          </div>
          
          <div className="space-y-3 flex-grow">
            <Button
              variant="default"
              onClick={handleExport}
              loading={isExporting}
              iconName="Download"
              iconPosition="left"
              fullWidth
            >
              Export All Categories ({categories?.length})
            </Button>
            
            <Button
              variant="outline"
              onClick={handleExportTemplate}
              iconName="FileText"
              iconPosition="left"
              fullWidth
            >
              Download Template
            </Button>
          </div>

          <div className="bg-muted rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <Icon name="Info" size={16} className="text-primary mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-xs font-medium text-foreground">Export includes:</p>
                <ul className="text-xs text-muted-foreground mt-1 space-y-1">
                  <li>• Category names and descriptions</li>
                  <li>• Colors and icons</li>
                  <li>• Hierarchy relationships</li>
                  <li>• Creation dates</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Import Section */}
        <div className="space-y-4 flex flex-col">
          <div>
            <h3 className="text-sm font-semibold text-foreground">Import Categories</h3>
            <p className="text-sm text-muted-foreground mt-1">
              Upload a JSON file to import categories into your collection.
            </p>
          </div>

          <div className="space-y-3 flex-grow">
            <input
              ref={fileInputRef}
              type="file"
              accept=".json"
              onChange={handleImport}
              className="hidden"
              id="category-import"
            />
            
            <Button
              variant="outline"
              onClick={() => fileInputRef?.current?.click()}
              loading={isImporting}
              iconName="Upload"
              iconPosition="left"
              fullWidth
            >
              Choose File to Import
            </Button>

            {importError && (
              <div className="p-3 bg-error/10 border border-error/20 rounded-md">
                <div className="flex items-start space-x-2">
                  <Icon name="AlertCircle" size={16} className="text-error mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-error">{importError}</p>
                </div>
              </div>
            )}
          </div>

          <div className="bg-muted rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <Icon name="AlertTriangle" size={16} className="text-warning mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-xs font-medium text-foreground">Import notes:</p>
                <ul className="text-xs text-muted-foreground mt-1 space-y-1">
                  <li>• Only JSON files are supported</li>
                  <li>• Imported categories get new IDs</li>
                  <li>• Link counts are reset to zero</li>
                  <li>• Invalid entries are skipped</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Recent Activity */}
      <div className="mt-6 pt-6 border-t border-border">
        <h3 className="text-sm font-semibold text-foreground mb-3">Recent Activity</h3>
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="text-muted-foreground">Last export:</span>
            <span className="text-foreground">{lastExportDate ? formatRelativeTime(lastExportDate) : "Never"}</span>
          </div>
          <div className="flex items-center justify-between text-xs">
            <span className="text-muted-foreground">Last import:</span>
            <span className="text-foreground">{lastImportDate ? formatRelativeTime(lastImportDate) : "Never"}</span>
          </div>
          <div className="flex items-center justify-between text-xs">
            <span className="text-muted-foreground">Total categories:</span>
            <span className="text-foreground">{categories?.length}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImportExportPanel;