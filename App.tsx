import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import AdminDashboard from './pages/AdminDashboard';
import PublicHomepage from './pages/PublicHomepage';
import ProductLandingPage from './pages/ProductLandingPage';
import Header from './components/Header';
import DashboardLayout from './components/DashboardLayout';
import TasksDashboard from './pages/TasksDashboard';
import DashboardOverview from './pages/DashboardOverview';

const App: React.FC = () => {
  return (
    <HashRouter>
      <div className="min-h-screen text-gray-800 dark:text-gray-200">
        <Header />
        <main className="p-4 md:p-8">
          <Routes>
            <Route path="/" element={<PublicHomepage />} />
            <Route path="/dashboard" element={<DashboardLayout />}>
              <Route index element={<DashboardOverview />} />
              <Route path="jobs" element={<AdminDashboard />} />
              <Route path="tasks" element={<TasksDashboard />} />
            </Route>
            <Route path="/products/:slug" element={<ProductLandingPage />} />
          </Routes>
        </main>
      </div>
    </HashRouter>
  );
};

export default App;
