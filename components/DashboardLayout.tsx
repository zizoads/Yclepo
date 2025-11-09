import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { Briefcase, ListTodo, Home } from 'lucide-react';

const DashboardLayout: React.FC = () => {
  const linkClass = "flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50";
  const activeLinkClass = "bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-50";

  return (
    <div className="max-w-7xl mx-auto">
       <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
        <p className="text-gray-500 dark:text-gray-400">Manage your AI agent jobs and tasks.</p>
       </div>
       <div className="grid md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr] gap-8 items-start">
         <nav className="hidden md:flex flex-col gap-1 text-sm font-medium" aria-label="Dashboard navigation">
            <NavLink to="/dashboard" end className={({ isActive }) => `${linkClass} ${isActive ? activeLinkClass : ''}`}>
                <Home className="h-4 w-4" />
                Overview
            </NavLink>
            <NavLink to="/dashboard/jobs" className={({ isActive }) => `${linkClass} ${isActive ? activeLinkClass : ''}`}>
                <Briefcase className="h-4 w-4" />
                Agent Jobs
            </NavLink>
            <NavLink to="/dashboard/tasks" className={({ isActive }) => `${linkClass} ${isActive ? activeLinkClass : ''}`}>
                <ListTodo className="h-4 w-4" />
                Tasks
            </NavLink>
         </nav>
          <main>
            <Outlet />
          </main>
       </div>
    </div>
  );
};

export default DashboardLayout;
