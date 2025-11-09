import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'

export default async function DashboardPage() {
  const session = await auth()

  if (!session) {
    redirect('/login')
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">لوحة التحكم - Yclep</h1>
        <p className="text-gray-600">مرحباً بك, {session.user?.name || 'مستخدم'}! 👋</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg border p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">المنتجات</p>
              <p className="text-2xl font-bold mt-2">0</p>
              <p className="text-xs text-gray-500 mt-1">منتج نشط</p>
            </div>
            <div className="text-2xl">📦</div>
          </div>
        </div>

        <div className="bg-white rounded-lg border p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">صفحات الهبوط</p>
              <p className="text-2xl font-bold mt-2">0</p>
              <p className="text-xs text-gray-500 mt-1">صفحة منشورة</p>
            </div>
            <div className="text-2xl">🌐</div>
          </div>
        </div>

        <div className="bg-white rounded-lg border p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">المهام</p>
              <p className="text-2xl font-bold mt-2">0</p>
              <p className="text-xs text-gray-500 mt-1">مهمة نشطة</p>
            </div>
            <div className="text-2xl">✅</div>
          </div>
        </div>

        <div className="bg-white rounded-lg border p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">الوكلاء</p>
              <p className="text-2xl font-bold mt-2">0</p>
              <p className="text-xs text-gray-500 mt-1">وكيل نشط</p>
            </div>
            <div className="text-2xl">👥</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg border p-6 shadow-sm">
          <h3 className="text-lg font-semibold mb-4">المهام الأخيرة</h3>
          <div className="space-y-3">
            <div className="text-center text-gray-500 py-8">
              لا توجد مهام حالياً
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border p-6 shadow-sm">
          <h3 className="text-lg font-semibold mb-4">إجراءات سريعة</h3>
          <div className="grid grid-cols-2 gap-3">
            <button className="p-3 border rounded-lg text-center hover:bg-gray-50 transition">
              <div className="text-xl mb-2">➕</div>
              <div className="text-sm">إضافة منتج</div>
            </button>
            <button className="p-3 border rounded-lg text-center hover:bg-gray-50 transition">
              <div className="text-xl mb-2">👥</div>
              <div className="text-sm">إدارة الوكلاء</div>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
