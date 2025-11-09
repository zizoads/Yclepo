import React from 'react';
import { Button } from '../src/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../src/components/ui/card';
import { Badge } from '../src/components/ui/badge';
import { Page } from '../App';

interface ProductsPageProps {
  navigate: (page: Page) => void;
}

const mockProducts = [
  { id: '1', name: 'ساعة ذكية Pro X', description: 'أحدث إصدار مع تتبع اللياقة.', category: 'إلكترونيات', status: 'APPROVED', image: 'https://via.placeholder.com/40', _count: { landingPages: 2, tasks: 5 }, createdBy: { name: 'أحمد' } },
  { id: '2', name: 'سماعات لاسلكية AirSounds', description: 'صوت نقي وبطارية تدوم طويلاً.', category: 'إكسسوارات', status: 'IN_REVIEW', image: null, _count: { landingPages: 1, tasks: 3 }, createdBy: { name: 'فاطمة' } },
  { id: '3', name: 'كاميرا مراقبة منزلية', description: 'أمان لمنزلك بزاوية رؤية 360.', category: 'أجهزة منزلية', status: 'DRAFT', image: 'https://via.placeholder.com/40', _count: { landingPages: 0, tasks: 1 }, createdBy: { name: 'أحمد' } },
];

export default function ProductsPage({ navigate }: ProductsPageProps) {
  const getStatusConfig = (status: string) => {
    const config = {
      DRAFT: { label: 'مسودة', variant: 'secondary' as const, color: 'bg-gray-100 text-gray-800' },
      IN_REVIEW: { label: 'قيد المراجعة', variant: 'outline' as const, color: 'bg-yellow-100 text-yellow-800' },
      APPROVED: { label: 'معتمد', variant: 'default' as const, color: 'bg-green-100 text-green-800' },
      REJECTED: { label: 'مرفوض', variant: 'destructive' as const, color: 'bg-red-100 text-red-800' }
    };
    return config[status as keyof typeof config] || config.DRAFT;
  };

  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold tracking-tight">إدارة المنتجات</h1>
          <p className="text-gray-600">إدارة وعرض جميع المنتجات في النظام</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700" onClick={() => navigate('new-product')}>
          <span>➕ إضافة منتج جديد</span>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>قائمة المنتجات</CardTitle>
          <CardDescription>عرض {mockProducts.length} منتج في النظام</CardDescription>
        </CardHeader>
        <CardContent>
          {mockProducts.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">📦</div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">لا توجد منتجات</h3>
              <p className="text-gray-500 mb-6">ابدأ بإضافة أول منتج إلى النظام</p>
              <Button size="lg" onClick={() => navigate('new-product')}>إضافة أول منتج</Button>
            </div>
          ) : (
            <div className="space-y-4">
              {mockProducts.map((product) => {
                const statusConfig = getStatusConfig(product.status);
                return (
                  <div key={product.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg flex items-center justify-center">
                        {product.image ? (
                          <img src={product.image} alt={product.name} className="w-10 h-10 rounded object-cover" />
                        ) : (
                          <span className="text-lg">📦</span>
                        )}
                      </div>
                      <div className="space-y-1">
                        <h4 className="font-semibold text-gray-900">{product.name}</h4>
                        <p className="text-sm text-gray-600">{product.description || 'لا يوجد وصف'}</p>
                        <div className="flex items-center gap-2 flex-wrap">
                          <Badge variant={statusConfig.variant} className={statusConfig.color}>
                            {statusConfig.label}
                          </Badge>
                          <span className="text-xs text-gray-500">{product.category}</span>
                          <span className="text-xs text-gray-400">{product._count.landingPages} صفحة هبوط</span>
                          <span className="text-xs text-gray-400">{product._count.tasks} مهمة</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-500 hidden md:block">{product.createdBy.name}</span>
                      <Button variant="outline" size="sm">التفاصيل</Button>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}