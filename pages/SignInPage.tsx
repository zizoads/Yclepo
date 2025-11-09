import React, { useState } from 'react'
import { Button } from '../src/components/ui/button';
import { Input } from '../src/components/ui/input';
import { Label } from '../src/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../src/components/ui/card';

interface SignInPageProps {
  onLogin: () => void;
}

export default function SignInPage({ onLogin }: SignInPageProps) {
  const [email, setEmail] = useState('demo@yclep.com')
  const [password, setPassword] = useState('password')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null);

    // Simulate API call
    setTimeout(() => {
      if (email === 'demo@yclep.com' && password === 'password') {
        onLogin();
      } else {
        setError('البريد الإلكتروني أو كلمة المرور غير صحيحة');
      }
      setLoading(false);
    }, 1000);
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Card className="max-w-md w-full">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold">تسجيل الدخول إلى Yclep</CardTitle>
          <CardDescription>مرحباً بعودتك! أدخل بياناتك للمتابعة.</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-6" onSubmit={handleSubmit}>
            {error && <p className="text-center text-red-500 text-sm bg-red-100 p-2 rounded-md">{error}</p>}
            <div className="space-y-2">
              <Label htmlFor="email">
                البريد الإلكتروني
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                placeholder="example@mail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">
                كلمة المرور
              </Label>
              <Input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                placeholder="********"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div>
              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-700"
              >
                {loading ? 'جاري التسجيل...' : 'تسجيل الدخول'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}