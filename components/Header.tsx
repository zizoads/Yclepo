
import React from 'react';
import { NavLink } from 'react-router-dom';
import { BotMessageSquare } from 'lucide-react';

const Header: React.FC = () => {
  const linkClass = "px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white transition-colors";
  const activeLinkClass = "bg-gray-900 text-white";

  return (
    <header className="bg-gray-800 shadow-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <NavLink to="/" className="flex-shrink-0 flex items-center gap-2 text-white">
              <BotMessageSquare className="h-8 w-8 text-primary-400" />
              <span className="text-xl font-bold">yclep</span>
            </NavLink>
          </div>
          <nav className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <NavLink to="/" className={({ isActive }) => `${linkClass} ${isActive ? activeLinkClass : ''}`}>
                Home
              </NavLink>
              <NavLink to="/dashboard" className={({ isActive }) => `${linkClass} ${isActive ? activeLinkClass : ''}`}>
                Dashboard
              </NavLink>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
