import React from 'react';

// Define a simple User type for props
interface User {
  name?: string | null;
  email?: string | null;
}

interface HeaderProps {
  user?: User;
  onSignOut: () => void;
}

export function Header({ user, onSignOut }: HeaderProps) {
  return (
    <header className="bg-white border-b border-gray-200 px-6 py-3 shrink-0">
      <div className="flex items-center justify-between">
        {/* Search Input */}
        <div className="flex items-center gap-4">
          <div className="relative">
            <input
              type="text"
              placeholder="بحث..."
              className="w-64 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            />
          </div>
        </div>

        {/* User Info and Sign Out */}
        <div className="flex items-center gap-4">
          <div className="text-right">
            <p className="text-sm font-medium text-gray-900">
              {user?.name || 'مستخدم'}
            </p>
            <p className="text-xs text-gray-500">
              {user?.email}
            </p>
          </div>
          
          <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
            <span className="text-white text-md font-medium">
              {user?.name?.[0]?.toUpperCase() || 'U'}
            </span>
          </div>

          <button
            onClick={onSignOut}
            className="px-3 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 border border-transparent rounded-lg transition-colors"
          >
            تسجيل الخروج
          </button>
        </div>
      </div>
    </header>
  );
}
