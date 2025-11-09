import React from 'react';
import { ProductForm } from '../components/forms/product-form';
import { Page } from '../../App';

interface NewProductPageProps {
  navigate: (page: Page) => void;
}

export default function NewProductPage({ navigate }: NewProductPageProps) {
  return (
    <div className="flex flex-col gap-6 p-6">
      {/* FIX: Replaced non-existent DashboardHeader with inline JSX for page title, consistent with other pages. */}
      <div className="space-y-1">
        <h1 className="text-2xl font-bold tracking-tight">إضافة منتج جديد</h1>
        <p className="text-gray-600">أضف منتج جديد لبدء إنشاء صفحات الهبوط له</p>
      </div>
      <ProductForm navigate={navigate} />
    </div>
  )
}
