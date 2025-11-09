import React, { useState } from 'react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { LoadingSpinner } from '../components/ui/loading-spinner';

interface SignInPageProps {
  onLogin: () => void;
}

export default function SignInPage({ onLogin }: SignInPageProps) {
  const [email, setEmail] = useState('demo@yclep.com');
  const [password, setPassword] = useState('password');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Simulate API call
    setTimeout(() => {
      if (email === 'demo@yclep.com' && password === 'password') {
        onLogin();
      } else {
        setError('فشل تسجيل الدخول. تأكد من صحة البيانات.');
      }
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 px-4">
      <div className="max-w-md w-full space-y-8 bg-white rounded-2xl shadow-xl p-8">
        <div className="text-center">
          <div className="mx-auto w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mb-4">
            <span className="text-white text-2xl font-bold">Y</span>
          </div>
          <h2 className="text-3xl font-bold text-gray-900">مرحباً بعودتك</h2>
          <p className="mt-2 text-sm text-gray-600">
            سجل الدخول إلى حسابك في Yclep
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3">
              <p className="text-sm text-red-600 text-center">{error}</p>
            </div>
          )}

          <div className="space-y-4">
            <div>
              <Label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                البريد الإلكتروني
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 w-full px-3 py-3 border-gray-300 placeholder-gray-500"
                placeholder="ادخل بريدك الإلكتروني"
                disabled={isLoading}
              />
            </div>

            <div>
              <Label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                كلمة المرور
              </Label>
              <Input
                id="password"
                name="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 w-full px-3 py-3 border-gray-300 placeholder-gray-500"
                placeholder="ادخل كلمة المرور"
                disabled={isLoading}
              />
            </div>
          </div>

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full flex justify-center py-3 px-4 text-base font-medium rounded-lg disabled:opacity-60 transition duration-200"
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                <LoadingSpinner size="sm" />
                <span>جاري التسجيل...</span>
              </div>
            ) : (
              'تسجيل الدخول'
            )}
          </Button>
        </form>
      </div>
    </div>
  );
}
