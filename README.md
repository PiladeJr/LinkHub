# LinkHub

A modern React-based project to manage all your links in one place

<p align="left">
  <!-- Last commit -->
  <a href="https://github.com/PiladeJr/LinkHub/commits/master">
    <img alt="Last commit" src="https://img.shields.io/github/last-commit/PiladeJr/LinkHub?logo=github&label=last%20commit" />
  </a>
  <!-- Languages count -->
  <a href="https://github.com/PiladeJr/LinkHub">
    <img alt="Languages count" src="https://img.shields.io/github/languages/count/PiladeJr/LinkHub?label=languages" />
  </a>
  <!-- Top language percentage (snapshot) -->
  <a href="https://github.com/PiladeJr/LinkHub">
    <img alt="Top language percentage" src="https://img.shields.io/badge/Top%20language-JavaScript%2098.6%25-F7DF1E?logo=javascript&logoColor=000" />
  </a>
  <!-- License -->
  <a href="https://github.com/PiladeJr/LinkHub/blob/master/LICENSE">
    <img alt="License" src="https://img.shields.io/github/license/PiladeJr/LinkHub?label=license" />
  </a>
</p>

Built with the following tools and technologies

[![JSON](https://img.shields.io/badge/JSON-5E5C5C?logo=json&logoColor=white)](https://www.json.org/)
[![npm](https://img.shields.io/badge/npm-CB3837?logo=npm&logoColor=white)](https://www.npmjs.com/)
[![D3.js](https://img.shields.io/badge/D3.js-F9A03C?logo=d3.js&logoColor=white)](https://d3js.org/)
[![Markdown](https://img.shields.io/badge/Markdown-000000?logo=markdown&logoColor=white)](https://daringfireball.net/projects/markdown/)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=000)](https://developer.mozilla.org/docs/Web/JavaScript)
[![React](https://img.shields.io/badge/React-20232A?logo=react&logoColor=61DAFB)](https://react.dev/)
[![React Router v6](https://img.shields.io/badge/React%20Router%20v6-CA4245?logo=reactrouter&logoColor=white)](https://reactrouter.com/)
[![Redux](https://img.shields.io/badge/Redux-764ABC?logo=redux&logoColor=white)](https://redux.js.org/)
[![Vite](https://img.shields.io/badge/Vite-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![PostCSS](https://img.shields.io/badge/PostCSS-DD3A0A?logo=postcss&logoColor=white)](https://postcss.org/)


## Table of Contents
- [Overview](#overview)
- [Features](#features)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Usage](#usage)
  - [Data Persistence](#data-persistence)
- [Project Structure](#project-structure)
- [Adding Routes](#adding-routes)
- [Styling](#styling)
- [Responsive Design](#responsive-design)
- [Deployment](#deployment)
- [License](#license)
- [Acknowledgments](#acknowledgments)

## Overview
Soo... this was my very first majour project. I'm still in the process of learning development tools/languages like react, javascript, node, etc. So the application may appear a bit junky and overrall a giant <abbr title="IT IS">spaghetti code</abbr>.</br>
The main idea and premise of this webapp is to get rid of all the favourite links filling your browser, or having to rely on group pages or notion files filled with barebone links. I wanted to make something more appealing to the human eye and easy to use.</br>
And that's what this application is all about. 
A versatile developer toolkit designed to facilitate the creation and management of scalable and maintainable link and categories.
</br></br> 
Built with modern technologies like React 18, Vite, Redux Toolkit, TailwindCSS, and React Router, it offers a rich library of reusable UI components and robust data handling features.

<strong>Why LinkHub?</strong>
<ul class="list-disc pl-4 my-0">
<li class="my-0"><strong>🌐 Advanced Link &amp; Category Management:</strong> Seamless add/edit, bulk actions, and detailed analytics.</li>
<li class="my-0"><strong>🧩 Customizable UI Components:</strong> Buttons, Modals, Headers, and more, designed for consistency and accessibility.</li>
<li class="my-0"><strong>🚀 Performance &amp; Developer Experience:</strong> Optimized workflows with Vite, error boundaries, and utility functions.</li>
<li class="my-0"><strong>🎨 Consistent Styling &amp; Theming:</strong> TailwindCSS configurations and utility helpers for scalable design.</li>
<li class="my-0"><strong>📊 Data Visualization &amp; Insights:</strong> Analytics components to monitor usage and trends.</li>
</ul>


## 🚀 Features

- **React 18** - React version with improved rendering and concurrent features
- **Vite** - Lightning-fast build tool and development server
- **Redux Toolkit** - State management with simplified Redux setup
- **TailwindCSS** - Utility-first CSS framework with extensive customization
- **React Router v6** - Declarative routing for React applications
- **Data Visualization** - Integrated D3.js and Recharts for powerful data visualization
- **Form Management** - React Hook Form for efficient form handling
- **Animation** - Framer Motion for smooth UI animations
- **Testing** - Jest and React Testing Library setup

## Getting Started

### 📋 Prerequisites

This program requires the following dependencies
- Node.js (v14.x or higher)
- <strong>Packate manager: </strong>npm or yarn
 
### 🛠️ Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/PiladeJr/LinkHub
   ```

2. Navigate the project directories
   ```bash
   cd linkhub
   ```

3. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```
   
### ▶️ Usage
 Run the project with:
   ```bash
   npm start
   # or
   yarn start
   ```

### 💾 Data Persistence

LinkHub offers two deployment modes to suit different use cases:

**Browser-Based Version (Default)**
- Data is stored locally in the browser using `localStorage`
- No server required - runs entirely client-side
- Changes persist across sessions on the same browser
- Ideal for personal use and quick deployment
- Main drawback of this method is the loss of data in case of browser memory wipe or switching browser

**Server-Based Version**
- Requires a backend server to handle data persistence
- Updates are saved to a local `links.json` file on the server
- Enables data sharing across multiple devices and browsers
- Suitable for team collaboration or multi-device access (or if you prefer something more local)
- Server implementation available in the `/server` directory

For both versions, there is a function built in the app that lets you export the json file with all your personal changes.
<br>
> **Note:** The main version deployed is browser-based. If you need server-side persistence, refer to the server setup instructions in my second branch `https://github.com/PiladeJr/LinkHub/tree/local-json-version`.

## 📁 Project Structure

```
linkhub/
├── build/                           # Production build output
│   ├── assets/                      # Compiled JS, CSS, and images
│   ├── index.html                   # Production HTML
│   ├── links.json                   # Links data
│   └── manifest.json                # PWA manifest
├── public/                          # Static assets
│   ├── assets/
│   │   └── images/                  # Public images
│   ├── links.json                   # Links data source
│   ├── manifest.json                # PWA manifest
│   └── robots.txt                   # SEO robots file
├── src/
│   ├── components/                  # Reusable UI components
│   │   ├── ui/                      # Base UI components
│   │   │   ├── Button.jsx           # Button component
│   │   │   ├── Checkbox.jsx         # Checkbox component
│   │   │   ├── FloatingActionButton.jsx
│   │   │   ├── Header.jsx           # App header/nav
│   │   │   ├── Input.jsx            # Input component
│   │   │   ├── Modal.jsx            # Modal dialog
│   │   │   └── Select.jsx           # Select dropdown
│   │   ├── AppIcon.jsx              # Icon wrapper component
│   │   ├── AppImage.jsx             # Image wrapper component
│   │   ├── ErrorBoundary.jsx        # Error boundary handler
│   │   └── ScrollToTop.jsx          # Scroll utility
│   ├── pages/                       # Page-level components
│   │   ├── dashboard-home/          # Dashboard page
│   │   │   ├── index.jsx
│   │   │   └── components/          # Dashboard-specific components
│   │   ├── all-links/               # All links page
│   │   │   └── index.jsx
│   │   ├── category-detail/         # Category detail page
│   │   │   └── index.jsx
│   │   ├── category-management/     # Category management
│   │   │   ├── index.jsx
│   │   │   └── components/          # Category-specific components
│   │   ├── add-edit-link-modal/     # Add/Edit link modal
│   │   │   ├── index.jsx
│   │   │   └── components/          # Modal-specific components
│   │   └── NotFound.jsx             # 404 page
│   ├── data/                        # Data management
│   │   └── linkStore.js             # Link state management
│   ├── styles/                      # Global styles
│   │   ├── index.css                # Global CSS
│   │   └── tailwind.css             # Tailwind configuration
│   ├── utils/                       # Utility functions
│   │   ├── cn.js                    # Class name utilities
│   │   └── dateUtils.js             # Date utilities
│   ├── App.jsx                      # Main application component
│   ├── Routes.jsx                   # Application routes
│   └── index.jsx                    # Application entry point
├── index.html                       # HTML template
├── package.json                     # Project dependencies and scripts
├── package-lock.json                # Dependency lock file
├── jsconfig.json                    # JavaScript config
├── tailwind.config.js               # Tailwind CSS configuration
├── postcss.config.js                # PostCSS configuration
├── vite.config.mjs                  # Vite configuration
└── README.md                        # Project documentation
```

## 🧩 Adding Routes

To add new routes to the application, update the `Routes.jsx` file:

```jsx
import { useRoutes } from "react-router-dom";
import HomePage from "pages/HomePage";
import AboutPage from "pages/AboutPage";

const ProjectRoutes = () => {
  let element = useRoutes([
    { path: "/", element: <HomePage /> },
    { path: "/about", element: <AboutPage /> },
    // Add more routes as needed
  ]);

  return element;
};
```

## 🎨 Styling

This project uses Tailwind CSS for styling. The configuration includes:

- Forms plugin for form styling
- Typography plugin for text styling
- Aspect ratio plugin for responsive elements
- Container queries for component-specific responsive design
- Fluid typography for responsive text
- Animation utilities

## 📱 Responsive Design

The app is built with responsive design using Tailwind CSS breakpoints. Making it suitable for most devices... At least i hope so


## 📦 Deployment

Build the application for production:

```bash
npm run build
```

## � License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## �🙏 Acknowledgments

- Built with [Rocket.new](https://rocket.new)
- Powered by React and Vite
- Styled with Tailwind CSS

Built with ❤️ on Rocket.new
