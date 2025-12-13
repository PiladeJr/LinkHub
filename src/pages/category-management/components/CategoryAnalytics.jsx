import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';


const CategoryAnalytics = ({ categories, isVisible, onToggle }) => {
  // Mock analytics data
  const usageData = [
    { name: 'AI Tools', links: 24, views: 156 },
    { name: 'Development', links: 18, views: 134 },
    { name: 'Design', links: 15, views: 98 },
    { name: 'Productivity', links: 12, views: 87 },
    { name: 'Learning', links: 9, views: 65 }
  ];

  const growthData = [
    { month: 'Jan', categories: 8, links: 45 },
    { month: 'Feb', categories: 12, links: 67 },
    { month: 'Mar', categories: 15, links: 89 },
    { month: 'Apr', categories: 18, links: 112 },
    { month: 'May', categories: 22, links: 134 },
    { month: 'Jun', categories: 25, links: 156 }
  ];

  const distributionData = [
    { name: 'AI Tools', value: 30, color: '#2563EB' },
    { name: 'Development', value: 25, color: '#16A34A' },
    { name: 'Design', value: 20, color: '#DC2626' },
    { name: 'Productivity', value: 15, color: '#CA8A04' },
    { name: 'Others', value: 10, color: '#9333EA' }
  ];

  const totalCategories = categories?.length;
  const totalLinks = categories?.reduce((sum, cat) => sum + (cat?.linkCount || 0), 0);
  const avgLinksPerCategory = totalCategories > 0 ? Math.round(totalLinks / totalCategories) : 0;
  const mostPopularCategory = usageData?.[0];

  if (!isVisible) {
    return (
      <div className="mb-6">
        <Button
          variant="outline"
          onClick={onToggle}
          iconName="BarChart3"
          iconPosition="left"
          className="w-full sm:w-auto"
        >
          Show Analytics
        </Button>
      </div>
    );
  }

  return (
    <div className="mb-8 bg-card rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-foreground flex items-center space-x-2">
          <Icon name="BarChart3" size={20} />
          <span>Category Analytics</span>
        </h2>
        <Button
          variant="ghost"
          size="sm"
          onClick={onToggle}
          iconName="ChevronUp"
          title="Hide analytics"
        />
      </div>
      {/* Key Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-muted rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="Folder" size={16} className="text-primary" />
            <span className="text-sm font-medium text-muted-foreground">Total Categories</span>
          </div>
          <p className="text-2xl font-bold text-foreground">{totalCategories}</p>
        </div>

        <div className="bg-muted rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="Link" size={16} className="text-success" />
            <span className="text-sm font-medium text-muted-foreground">Total Links</span>
          </div>
          <p className="text-2xl font-bold text-foreground">{totalLinks}</p>
        </div>

        <div className="bg-muted rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="TrendingUp" size={16} className="text-warning" />
            <span className="text-sm font-medium text-muted-foreground">Avg per Category</span>
          </div>
          <p className="text-2xl font-bold text-foreground">{avgLinksPerCategory}</p>
        </div>

        <div className="bg-muted rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="Star" size={16} className="text-accent" />
            <span className="text-sm font-medium text-muted-foreground">Most Popular</span>
          </div>
          <p className="text-sm font-bold text-foreground truncate">{mostPopularCategory?.name}</p>
          <p className="text-xs text-muted-foreground">{mostPopularCategory?.views} views</p>
        </div>
      </div>
      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Usage Chart */}
        <div>
          <h3 className="text-sm font-semibold text-foreground mb-4">Category Usage</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={usageData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis 
                  dataKey="name" 
                  tick={{ fontSize: 12, fill: 'var(--color-muted-foreground)' }}
                  axisLine={{ stroke: 'var(--color-border)' }}
                />
                <YAxis 
                  tick={{ fontSize: 12, fill: 'var(--color-muted-foreground)' }}
                  axisLine={{ stroke: 'var(--color-border)' }}
                />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'var(--color-card)',
                    border: '1px solid var(--color-border)',
                    borderRadius: '6px',
                    fontSize: '12px'
                  }}
                />
                <Bar dataKey="links" fill="var(--color-primary)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Distribution Chart */}
        <div>
          <h3 className="text-sm font-semibold text-foreground mb-4">Link Distribution</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={distributionData}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={80}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {distributionData?.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry?.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'var(--color-card)',
                    border: '1px solid var(--color-border)',
                    borderRadius: '6px',
                    fontSize: '12px'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          
          {/* Legend */}
          <div className="flex flex-wrap gap-3 mt-4">
            {distributionData?.map((item, index) => (
              <div key={index} className="flex items-center space-x-2">
                <div 
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: item?.color }}
                />
                <span className="text-xs text-muted-foreground">{item?.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Growth Trend */}
      <div className="mt-8">
        <h3 className="text-sm font-semibold text-foreground mb-4">Growth Trend</h3>
        <div className="h-48">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={growthData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis 
                dataKey="month" 
                tick={{ fontSize: 12, fill: 'var(--color-muted-foreground)' }}
                axisLine={{ stroke: 'var(--color-border)' }}
              />
              <YAxis 
                tick={{ fontSize: 12, fill: 'var(--color-muted-foreground)' }}
                axisLine={{ stroke: 'var(--color-border)' }}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'var(--color-card)',
                  border: '1px solid var(--color-border)',
                  borderRadius: '6px',
                  fontSize: '12px'
                }}
              />
              <Bar dataKey="categories" fill="var(--color-primary)" radius={[2, 2, 0, 0]} />
              <Bar dataKey="links" fill="var(--color-success)" radius={[2, 2, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default CategoryAnalytics;