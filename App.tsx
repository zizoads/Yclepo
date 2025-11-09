import React, { useState } from 'react';
import DashboardPage from './src/pages/DashboardOverview';
import ProductsPage from './src/pages/ProductsDashboard';
import NewProductPage from './src/pages/NewProductPage';
import SignInPage from './src/pages/SignInPage';
import Sidebar from './src/components/Sidebar';

export type Page = 'signin' | 'dashboard' | 'products' | 'new-product';

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('signin');
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  const navigate = (page: Page) => {
    setCurrentPage(page);
  };

  const handleLogin = () => {
    setIsAuthenticated(true);
    setCurrentPage('dashboard');
  }

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentPage('signin');
  }

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

  return (
    <>
      {isAuthenticated ? (
        <div className="flex min-h-screen" dir="rtl">
          <Sidebar navigate={navigate} onLogout={handleLogout} />
          <main className="flex-1 bg-gray-50">
            {renderPage()}
          </main>
        </div>
      ) : (
        <SignInPage onLogin={handleLogin} />
      )}
    </>
  );
}