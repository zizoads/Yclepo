import React from 'react';
import { Page } from '../../../App';
import {
  LayoutDashboard,
  Package,
  FileText,
  Users,
  Settings,
  BarChart3,
  LogOut
} from 'lucide-react';

const navigation = [
  { name: 'لوحة التحكم', icon: LayoutDashboard, page: 'dashboard' as Page },
  { name: 'المنتجات', icon: Package, page: 'products' as Page },
  { name: 'صفحات الهبوط', icon: FileText, page: 'dashboard' as Page }, // Placeholder
  { name: 'المهام', icon: BarChart3, page: 'dashboard' as Page }, // Placeholder
  { name: 'الوكلاء', icon: Users, page: 'dashboard' as Page }, // Placeholder
  { name: 'الإعدادات', icon: Settings, page: 'dashboard' as Page }, // Placeholder
];

interface SidebarProps {
  navigate: (page: Page) => void;
  currentPage: Page;
  onSignOut: () => void;
}

export default function Sidebar({ navigate, currentPage, onSignOut }: SidebarProps) {
  return (
    <div className="w-64 bg-white border-l border-gray-200 flex flex-col shrink-0">
      <div className="p-6 border-b border-gray-200 text-center">
        <h1 className="text-2xl font-bold text-blue-600">Yclep</h1>
        <p className="text-sm text-gray-500 mt-1">منصة صفحات الهبوط</p>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        {navigation.map((item) => {
          const Icon = item.icon;
          const isActive = currentPage === item.page;

          return (
            <button
              key={item.name}
              onClick={() => navigate(item.page)}
              className={`w-full flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg transition-colors text-right ${
                isActive
                  ? 'bg-blue-50 text-blue-700'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span>{item.name}</span>
            </button>
          );
        })}
      </nav>

      <div className="p-4 border-t border-gray-200">
         <button
            onClick={onSignOut}
            className="w-full flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg transition-colors text-gray-700 hover:bg-gray-100"
          >
            <LogOut className="w-5 h-5" />
            <span>تسجيل الخروج</span>
          </button>
      </div>
    </div>
  );
}
