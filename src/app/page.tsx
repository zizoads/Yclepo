import { redirect } from 'next/navigation';

export default function HomePage() {
  // The core of the app is the dashboard, which requires authentication.
  // Redirect users from the root to the login page.
  redirect('/login');
}
