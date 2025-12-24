



# <img src="public/LinkHub.ico" alt="LinkHub logo" width="42" height="42" style="vertical-align: middle;" /> LinkHub

A modern React-based project to manage all your links in one place

<p align="left">
  <!-- Last commit --><a href="https://github.com/PiladeJr/LinkHub/commits/master"><img alt="Last commit" src="https://img.shields.io/github/last-commit/PiladeJr/LinkHub?logo=github&label=last%20commit" /></a>
  <!-- Languages count --><a href="https://github.com/PiladeJr/LinkHub"><img alt="Languages count" src="https://img.shields.io/github/languages/count/PiladeJr/LinkHub?label=languages" /></a>
  <!-- Top language percentage (snapshot) --><a href="https://github.com/PiladeJr/LinkHub"><img alt="Top language percentage" src="https://img.shields.io/badge/Top%20language-JavaScript%2097.3%25-F7DF1E?logo=javascript&logoColor=000" /></a>
  <!-- License --><a href="https://github.com/PiladeJr/LinkHub/blob/master/LICENSE"><img alt="License" src="https://img.shields.io/github/license/PiladeJr/LinkHub?label=license" /></a>
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
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Usage](#usage)
  - [Deployment](#deployment)
  - [Data Persistence](#data-persistence)
- [Project Structure](#project-structure)
- [Adding Routes](#adding-routes)
- [Styling](#styling)
- [Responsive Design](#responsive-design)
- [License](#license)
- [Acknowledgments](#acknowledgments)

## Overview
Surprised you made it this far! you deserve a reward, here's a [cookie🍪](https://www.youtube.com/watch?v=dQw4w9WgXcQ "you can trust me 😊")
Like I mentioned before, this branch is for the local json version. It utilizes a server in order to read the changes stored in the browser and overwrite the file saved in the src/data directory.  
</br>
For the main version refer to the Master branch
## Getting Started

### 📋 Prerequisites <a id="prerequisites"></a>

This program requires the following dependencies
- Node.js (v14.x or higher)
- <strong>Packate manager: </strong>npm or yarn
 
### 🛠️ Installation <a id="installation"></a>

1. Clone the repository:
   ```bash
   git clone https://github.com/PiladeJr/LinkHub
   ```

2. Navigate to the project directories
   ```bash
   cd linkhub
   ```

3. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```
   
### ▶️ Usage <a id="usage"></a>
 Run the project with:
   ```bash
   npm start
   # or
   yarn start
   ```
### 📦 Deployment <a id="deployment"></a>

Build the application for production:

```bash
npm run build
```

### 💾 Data Persistence <a id="data-persistence"></a>

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

## 📁 Project Structure <a id="project-structure"></a>

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

following the first commit of the project you can clearly see that i also pushed the .env file...
**WOOPS**.
Well... it only countains mock api keys, so i'm gonna leave it as a guideline for possible api keys implementations and server/database setup. 

## 🧩 Adding Routes <a id="adding-routes"></a>

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

## 🎨 Styling <a id="styling"></a>

This project uses Tailwind CSS for styling. The configuration includes:

- Forms plugin for form styling
- Typography plugin for text styling
- Aspect ratio plugin for responsive elements
- Container queries for component-specific responsive design
- Fluid typography for responsive text
- Animation utilities

## 📱 Responsive Design <a id="responsive-design"></a>

The app is built with responsive design using Tailwind CSS breakpoints. Making it suitable for most devices... At least i hope so

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments <a id="acknowledgments"></a>

- Framework built with [Rocket.new](https://rocket.new)
- Powered by React and Vite
- Styled with Tailwind CSS
- Usage of Copilot throughout the development

