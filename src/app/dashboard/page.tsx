import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/db'
import DashboardStats from '@/components/dashboard/DashboardStats'
import RecentTasks from '@/components/dashboard/RecentTasks'
import QuickActions from '@/components/dashboard/QuickActions'
import type { Task } from '@prisma/client'

export default async function DashboardPage() {
  const session = await auth()

  if (!session) {
    redirect('/auth/signin')
  }

  // Fetch real statistics
  const [productsCount, publishedPagesCount, activeTasksCount, agentsCount] = await Promise.all([
    prisma.product.count({
      where: { createdById: session.user.id }
    }),
    prisma.landingPage.count({
      where: { 
        createdById: session.user.id,
        status: 'PUBLISHED' 
      }
    }),
    prisma.task.count({
      where: { 
        // NOTE: This might be different based on role. For now, showing tasks assigned to the user.
        assignedToId: session.user.id,
        status: { in: ['PENDING', 'IN_PROGRESS'] } 
      }
    }),
    prisma.user.count({
      where: { role: 'AGENT' }
    })
  ])

  const recentTasks = await prisma.task.findMany({
    where: {
      assignedToId: session.user.id
    },
    include: {
      landingPage: {
        include: {
          product: {
            select: { name: true }
          }
        }
      }
    },
    orderBy: { createdAt: 'desc' },
    take: 5
  })

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">لوحة التحكم</h1>
          <p className="text-gray-600 mt-2">مرحباً بعودتك، {session.user?.name || 'مستخدم'}</p>
        </div>
        <div className="text-sm text-gray-500">
          {new Date().toLocaleDateString('ar-EG', { 
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })}
        </div>
      </div>

      <DashboardStats stats={[
        productsCount,
        publishedPagesCount,
        activeTasksCount,
        agentsCount
      ]} />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RecentTasks tasks={recentTasks} />
        <QuickActions />
      </div>
    </div>
  )
}