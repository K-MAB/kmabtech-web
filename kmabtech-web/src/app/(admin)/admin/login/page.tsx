'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { api } from '@/services/api';
import { Lock, Mail, ArrowRight, AlertCircle } from 'lucide-react';
import Link from 'next/link';

export default function AdminLoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // ===================================================
  // LOGIN
  // ===================================================
  const handleLogin = async () => {
    if (!email || !password) {
      setError('E-posta ve şifre zorunludur.');
      return;
    }

    setError('');
    setLoading(true);

    try {
      const res = await api.login(email, password);

      if (res?.token) {
        localStorage.setItem('jwtToken', res.token);

        // 🔥 Admin dashboard
        router.replace('/admin/dashboard');
      } else {
        setError('Giriş başarısız. Lütfen bilgilerinizi kontrol edin.');
      }
    } catch (err: any) {
      console.error(err);

      if (err?.response?.status === 400 || err?.response?.status === 401) {
        setError('E-posta veya şifre hatalı!');
      } else {
        setError('Sunucuya bağlanılamadı. Lütfen tekrar deneyin.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white px-4">
      <div className="max-w-md w-full bg-gray-800 rounded-2xl shadow-2xl overflow-hidden border border-gray-700">

        {/* HEADER */}
        <div className="p-8 text-center border-b border-gray-700">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-600/20 text-blue-500 mb-4">
            <Lock size={32} />
          </div>
          <h2 className="text-2xl font-bold">Admin Girişi</h2>
          <p className="text-gray-400 text-sm mt-2">
            Yönetim paneline erişmek için giriş yapın
          </p>
        </div>

        {/* BODY */}
        <div className="p-8 space-y-6">

          {/* ERROR */}
          {error && (
            <div className="flex items-center p-4 bg-red-500/10 border border-red-500/50 rounded-lg text-red-400 text-sm">
              <AlertCircle size={18} className="mr-2" />
              {error}
            </div>
          )}

          {/* EMAIL */}
          <div>
            <label className="block text-sm text-gray-400 mb-1">
              E-Posta
            </label>
            <div className="relative">
              <Mail
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
                size={20}
              />
              <input
                type="email"
                placeholder="admin@commitrasoft.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          {/* PASSWORD */}
          <div>
            <label className="block text-sm text-gray-400 mb-1">
              Şifre
            </label>
            <div className="relative">
              <Lock
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
                size={20}
              />
              <input
                type="password"
                placeholder="••••••••"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          {/* BUTTON */}
          <button
            type="button"
            onClick={handleLogin}
            disabled={loading}
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold flex items-center justify-center disabled:opacity-50 transition"
          >
            {loading ? (
              'Giriş Yapılıyor...'
            ) : (
              <>
                Panele Gir
                <ArrowRight className="ml-2" size={18} />
              </>
            )}
          </button>

          {/* BACK */}
          <div className="text-center mt-4">
            <Link
              href="/"
              className="text-sm text-gray-400 hover:text-white transition"
            >
              ← Siteye geri dön
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}
