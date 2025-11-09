import React, { useState, useEffect } from 'react';
import DashboardLayout from './src/components/layout/DashboardLayout';
import SignInPage from './src/pages/SignInPage';
import { LoadingSpinner } from './src/components/ui/loading-spinner';
import DashboardPage from './src/pages/DashboardOverview';
import ProductsPage from './src/pages/ProductsDashboard';
import NewProductPage from './src/pages/NewProductPage';

export type Page = 'signin' | 'dashboard' | 'products' | 'new-product';

// Mock user data for the session
const mockUser = { name: 'عبدالعزيز', email: 'demo@yclep.com' };

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<Page>('dashboard');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate checking for an existing session
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 700);

    return () => clearTimeout(timer);
  }, []);

  const navigate = (page: Page) => {
    setCurrentPage(page);
  };

  const handleLogin = () => {
    setIsAuthenticated(true);
    setCurrentPage('dashboard');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    // No need to set page, conditional render will show SignInPage
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <DashboardPage navigate={navigate} />;
      case 'products':
        return <ProductsPage navigate={navigate} />;
      case 'new-product':
        return <NewProductPage navigate={navigate} />;
      default:
        return <DashboardPage navigate={navigate} />;
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="text-center">
          <LoadingSpinner size="lg" />
          <p className="mt-4 text-gray-600">جاري التحميل...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <SignInPage onLogin={handleLogin} />;
  }

  return (
    <DashboardLayout
      user={mockUser}
      onSignOut={handleLogout}
      navigate={navigate}
      currentPage={currentPage}
    >
      {renderPage()}
    </DashboardLayout>
  );
}
