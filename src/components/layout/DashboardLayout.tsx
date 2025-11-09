import React, { ReactNode } from 'react';
import Sidebar from '../dashboard/sidebar';
import { Header } from '../dashboard/header';
import { Page } from '../../../App';

// Define a simple User type for props
interface User {
  name?: string | null;
  email?: string | null;
}

interface DashboardLayoutProps {
  children: ReactNode;
  user: User;
  onSignOut: () => void;
  navigate: (page: Page) => void;
  currentPage: Page;
}

export default function DashboardLayout({
  children,
  user,
  onSignOut,
  navigate,
  currentPage,
}: DashboardLayoutProps) {
  return (
    <div className="flex h-screen bg-gray-50" dir="rtl">
      <Sidebar navigate={navigate} currentPage={currentPage} onSignOut={onSignOut} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header user={user} onSignOut={onSignOut} />
        <main className="flex-1 overflow-x-hidden overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
