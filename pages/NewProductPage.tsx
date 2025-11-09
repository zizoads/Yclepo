import React from 'react';
import { DashboardHeader } from '../src/components/dashboard/header';
import { ProductForm } from '../src/components/forms/product-form';
import { Page } from '../App';

interface NewProductPageProps {
  navigate: (page: Page) => void;
}

export default function NewProductPage({ navigate }: NewProductPageProps) {
  return (
    <div className="flex flex-col gap-6 p-6">
      <DashboardHeader
        heading="إضافة منتج جديد"
        text="أضف منتج جديد لبدء إنشاء صفحات الهبوط له"
      />
      <ProductForm navigate={navigate} />
    </div>
  )
}