import { redirect } from 'next/navigation'

export default function HomePage() {
  // توجيه مباشر إلى صفحة التسجيل
  redirect('/auth/signin')
}
