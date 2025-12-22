import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import CategoryManagement from './pages/category-management';
import AddEditLinkModal from './pages/add-edit-link-modal';
import DashboardHome from './pages/dashboard-home';
import CategoryDetail from './pages/category-detail';
import AllLinks from './pages/all-links';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<DashboardHome />} />
        <Route path="/dashboard-home" element={<DashboardHome />} />
        <Route path="/all-links" element={<AllLinks />} />
        <Route path="/category-management" element={<CategoryManagement />} />
        <Route path="/add-edit-link-modal" element={<AddEditLinkModal />} />
        <Route path="/category/:categoryId" element={<CategoryDetail />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;