import React from 'react';
import { Home, Package, CheckSquare, Users, LogOut } from 'lucide-react';
import { Page } from '../../App';
import { Button } from './ui/button';

interface SidebarProps {
  navigate: (page: Page) => void;
  onLogout: () => void;
}

const navItems = [
  { name: 'لوحة التحكم', icon: Home, page: 'dashboard' as Page },
  { name: 'المنتجات', icon: Package, page: 'products' as Page },
  { name: 'المهام', icon: CheckSquare, page: 'dashboard' as Page }, // Placeholder
  { name: 'الوكلاء', icon: Users, page: 'dashboard' as Page }, // Placeholder
];

export default function Sidebar({ navigate, onLogout }: SidebarProps) {
  return (
    <aside className="w-64 bg-white border-l border-gray-200 flex flex-col p-4">
      <div className="text-2xl font-bold text-center py-4 text-blue-600">Yclep</div>
      <nav className="flex-1 mt-8 space-y-2">
        {navItems.map(item => (
          <Button
            key={item.name}
            variant="ghost"
            className="w-full flex items-center justify-start gap-3 px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-gray-900"
            onClick={() => navigate(item.page)}
          >
            <item.icon className="w-5 h-5" />
            <span>{item.name}</span>
          </Button>
        ))}
      </nav>
      <div className="mt-auto">
        <Button
          variant="ghost"
          className="w-full flex items-center justify-start gap-3 px-4 py-2 text-red-500 hover:bg-red-50"
          onClick={onLogout}
        >
          <LogOut className="w-5 h-5" />
          <span>تسجيل الخروج</span>
        </Button>
      </div>
    </aside>
  );
}