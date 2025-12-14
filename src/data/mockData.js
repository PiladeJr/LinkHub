// Shared mock data for categories and their links

const mockCategoryLinks = {
  1: [
    {
      id: 1,
      title: "ChatGPT - OpenAI's Conversational AI",
      url: "https://chat.openai.com",
      description: "Advanced AI chatbot for conversations, writing, and problem-solving",
      thumbnail: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=400&fit=crop",
      category: "AI Tools",
      addedAt: "2024-08-01T10:30:00Z",
      isFavorite: true
    },
    {
      id: 2,
      title: "Midjourney - AI Art Generator",
      url: "https://midjourney.com",
      description: "Create stunning images from text descriptions using AI",
      thumbnail: "https://images.unsplash.com/photo-1686191128892-3b4e8b8b8b8b?w=400&h=400&fit=crop",
      category: "AI Tools",
      addedAt: "2024-08-01T09:15:00Z",
      isFavorite: false
    },
    {
      id: 3,
      title: "Claude AI - Anthropic's Assistant",
      url: "https://claude.ai",
      description: "Helpful, harmless, and honest AI assistant for various tasks",
      thumbnail: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=400&h=400&fit=crop",
      category: "AI Tools",
      addedAt: "2024-07-30T14:20:00Z",
      isFavorite: true
    },
    {
      id: 4,
      title: "GitHub Copilot",
      url: "https://github.com/features/copilot",
      description: "AI pair programmer that helps you write code faster",
      thumbnail: "https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?w=400&h=400&fit=crop",
      category: "AI Tools",
      addedAt: "2024-07-29T16:45:00Z",
      isFavorite: false
    }
  ],
  2: [
    {
      id: 5,
      title: "Figma - Collaborative Design Tool",
      url: "https://figma.com",
      description: "Design, prototype, and collaborate in real-time",
      thumbnail: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400&h=400&fit=crop",
      category: "Design Resources",
      addedAt: "2024-08-02T11:20:00Z",
      isFavorite: true
    },
    {
      id: 6,
      title: "Dribbble - Design Inspiration",
      url: "https://dribbble.com",
      description: "Discover and showcase creative design work",
      thumbnail: "https://images.unsplash.com/photo-1626785774573-4b799315345d?w=400&h=400&fit=crop",
      category: "Design Resources",
      addedAt: "2024-08-01T13:30:00Z",
      isFavorite: false
    }
  ],
  3: [
    {
      id: 7,
      title: "GitHub - Code Repository",
      url: "https://github.com",
      description: "Version control and collaboration platform for developers",
      thumbnail: "https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?w=400&h=400&fit=crop",
      category: "Development",
      addedAt: "2024-08-03T09:10:00Z",
      isFavorite: true
    },
    {
      id: 8,
      title: "Stack Overflow",
      url: "https://stackoverflow.com",
      description: "Q&A platform for programmers and developers",
      thumbnail: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=400&fit=crop",
      category: "Development",
      addedAt: "2024-08-02T15:25:00Z",
      isFavorite: false
    }
  ],
  4: [],
  5: [],
  6: []
};

const baseCategories = [
  {
    id: 1,
    name: "AI Tools",
    description: "Collection of artificial intelligence and machine learning tools for productivity",
    icon: "Bot",
    color: "#2563EB",
    lastUpdated: "2 hours ago"
  },
  {
    id: 2,
    name: "Design Resources",
    description: "UI/UX design tools, inspiration, and resources",
    icon: "Palette",
    color: "#7C3AED",
    lastUpdated: "1 day ago"
  },
  {
    id: 3,
    name: "Development",
    description: "Programming tutorials, documentation, and development tools",
    icon: "Code",
    color: "#059669",
    lastUpdated: "3 hours ago"
  },
  {
    id: 4,
    name: "Learning",
    description: "Online courses, tutorials, and educational content",
    icon: "GraduationCap",
    color: "#DC2626",
    lastUpdated: "5 days ago"
  },
  {
    id: 5,
    name: "Productivity",
    description: "Tools and apps to boost productivity and organization",
    icon: "Zap",
    color: "#F59E0B",
    lastUpdated: "1 week ago"
  },
  {
    id: 6,
    name: "Entertainment",
    description: "Movies, music, games, and entertainment platforms",
    icon: "Play",
    color: "#EC4899",
    lastUpdated: "2 weeks ago"
  }
];

const mapCategoriesWithLinks = (categories) =>
  categories.map((category) => {
    const links = mockCategoryLinks[category.id] || [];
    const previewLinks = links.slice(0, 3).map((link) => ({
      id: link.id,
      title: link.title,
      thumbnail: link.thumbnail
    }));

    return {
      ...category,
      linkCount: links.length,
      previewLinks
    };
  });

const categoriesWithLinks = mapCategoriesWithLinks(baseCategories);

export { categoriesWithLinks, mockCategoryLinks };
