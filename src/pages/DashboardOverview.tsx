import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Page } from '../../App';

interface DashboardPageProps {
  navigate: (page: Page) => void;
}

// Mock Data
const mockSession = { user: { name: 'عبدالعزيز' } };
const recentTasks = [
  { id: '1', title: 'إنشاء محتوى لصفحة هبوط جديدة', status: 'IN_PROGRESS', product: { name: 'ساعة ذكية' } },
  { id: '2', title: 'مراجعة تصميم صفحة منتج', status: 'PENDING', product: { name: 'سماعات لاسلكية' } },
  { id: '3', title: 'نشر صفحة هبوط منتج جديد', status: 'COMPLETED', product: { name: 'كاميرا مراقبة' } },
];
const stats = [
  { title: 'المنتجات', value: 12, description: 'منتج في النظام', icon: '📦' },
  { title: 'صفحات الهبوط', value: 8, description: 'صفحة منشورة', icon: '🌐' },
  { title: 'المهام النشطة', value: 5, description: 'مهمة قيد التنفيذ', icon: '✅' },
  { title: 'الوكلاء', value: 3, description: 'وكيل نشط', icon: '👥' },
];

const getStatusColor = (status: string) => {
    const colors = {
      PENDING: 'bg-yellow-100 text-yellow-800',
      IN_PROGRESS: 'bg-blue-100 text-blue-800',
      COMPLETED: 'bg-green-100 text-green-800',
      BLOCKED: 'bg-red-100 text-red-800'
    };
    return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800';
};
const getStatusText = (status: string) => {
    const texts = { PENDING: 'معلقة', IN_PROGRESS: 'قيد التنفيذ', COMPLETED: 'مكتملة', BLOCKED: 'متوقفة' };
    return texts[status as keyof typeof texts] || status;
};


export default function DashboardPage({ navigate }: DashboardPageProps) {
  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight">لوحة التحكم</h1>
          <p className="text-gray-600">
            مرحباً بعودتك، {mockSession.user?.name || 'مستخدم'}
          </p>
        </div>
        <div className="text-sm text-gray-500">
          {new Date().toLocaleDateString('ar-EG', { 
            weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
          })}
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <span className="text-2xl">{stat.icon}</span>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-gray-500">{stat.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        <Card className="lg:col-span-4">
          <CardHeader>
            <CardTitle>المهام الأخيرة</CardTitle>
            <CardDescription>آخر المهام المسندة إليك</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentTasks.length === 0 ? (
                <div className="text-center py-8 text-gray-500">لا توجد مهام مسندة إليك حالياً</div>
              ) : (
                recentTasks.map((task) => (
                  <div key={task.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="space-y-1">
                      <p className="text-sm font-medium">{task.title}</p>
                      <p className="text-xs text-gray-500">{task.product?.name || 'منتج غير محدد'}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(task.status)}`}>
                        {getStatusText(task.status)}
                      </span>
                      <Button variant="outline" size="sm">عرض</Button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>الإجراءات السريعة</CardTitle>
            <CardDescription>الوصول السريع إلى المهام الشائعة</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3">
              <Button variant="outline" className="w-full h-auto p-4 flex flex-col gap-2" onClick={() => navigate('new-product')}>
                <span className="text-2xl">➕</span><span className="text-sm">إضافة منتج</span>
              </Button>
              <Button variant="outline" className="w-full h-auto p-4 flex flex-col gap-2">
                <span className="text-2xl">✅</span><span className="text-sm">إدارة المهام</span>
              </Button>
              <Button variant="outline" className="w-full h-auto p-4 flex flex-col gap-2" onClick={() => navigate('products')}>
                <span className="text-2xl">📦</span><span className="text-sm">عرض المنتجات</span>
              </Button>
              <Button variant="outline" className="w-full h-auto p-4 flex flex-col gap-2">
                <span className="text-2xl">👥</span><span className="text-sm">إدارة الوكلاء</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}