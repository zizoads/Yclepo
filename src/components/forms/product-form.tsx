import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Page } from '../../../App';

interface ProductFormProps {
    navigate: (page: Page) => void;
}

export function ProductForm({ navigate }: ProductFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: '',
    affiliateUrl: '',
    image: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    console.log('Submitting product data:', formData);
    setTimeout(() => {
      alert('تمت إضافة المنتج بنجاح (محاكاة)');
      setIsLoading(false);
      navigate('products');
    }, 1500);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <Card className="max-w-2xl">
      <CardHeader>
        <CardTitle>تفاصيل المنتج</CardTitle>
        <CardDescription>
          ادخل المعلومات الأساسية عن المنتج لبدء إنشاء صفحات الهبوط
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">اسم المنتج *</Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="أدخل اسم المنتج"
                required
                disabled={isLoading}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">وصف المنتج</Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="وصف مختصر عن المنتج وميزاته الرئيسية"
                rows={4}
                disabled={isLoading}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="category">الفئة *</Label>
                <Input
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  placeholder="مثال: إلكترونيات, هواتف, أجهزة"
                  required
                  disabled={isLoading}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="image">رابط الصورة</Label>
                <Input
                  id="image"
                  name="image"
                  type="url"
                  value={formData.image}
                  onChange={handleChange}
                  placeholder="https://example.com/image.jpg"
                  disabled={isLoading}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="affiliateUrl">رابط الأفليت *</Label>
              <Input
                id="affiliateUrl"
                name="affiliateUrl"
                type="url"
                value={formData.affiliateUrl}
                onChange={handleChange}
                placeholder="https://example.com/affiliate-link"
                required
                disabled={isLoading}
              />
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <Button 
              type="submit" 
              disabled={isLoading}
              className="bg-blue-600 hover:bg-blue-700"
            >
              {isLoading ? (
                <>
                  <span className="animate-spin mr-2">⟳</span>
                  جاري الإضافة...
                </>
              ) : (
                'إضافة المنتج'
              )}
            </Button>
            <Button 
              type="button" 
              variant="outline"
              onClick={() => navigate('products')}
              disabled={isLoading}
            >
              إلغاء
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}