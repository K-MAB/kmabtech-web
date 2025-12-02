'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import http from '@/lib/http'; // Axios instance'ımız
import { Lock, Mail, ArrowRight, AlertCircle } from 'lucide-react';
import Link from 'next/link';

export default function AdminLoginPage() {
    const router = useRouter();
    
    // Form State
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            // 1. Backend'e İstek At
            // Backend'deki LoginDto yapısına uygun veri gönderiyoruz
            const response = await http.post('/Auth/login', {
                email: email,
                password: password
            });

            // 2. Token'ı Yakala
            const { token } = response.data;

            if (token) {
                // 3. Token'ı Tarayıcıya Kaydet (localStorage)
                localStorage.setItem('jwtToken', token);
                
                // 4. Panele Yönlendir
                router.push('/admin/dashboard');
            }
        } catch (err: any) {
            console.error(err);
            // Hata mesajını göster
            if (err.response && err.response.status === 400) {
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
                
                {/* Header Kısmı */}
                <div className="bg-gray-750 p-8 text-center border-b border-gray-700">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-600/20 text-blue-500 mb-4">
                        <Lock size={32} />
                    </div>
                    <h2 className="text-2xl font-bold">Admin Girişi</h2>
                    <p className="text-gray-400 text-sm mt-2">Yönetim paneline erişmek için kimliğinizi doğrulayın.</p>
                </div>

                {/* Form Kısmı */}
                <div className="p-8">
                    <form onSubmit={handleLogin} className="space-y-6">
                        
                        {/* Hata Mesajı */}
                        {error && (
                            <div className="flex items-center p-4 bg-red-500/10 border border-red-500/50 rounded-lg text-red-400 text-sm">
                                <AlertCircle size={18} className="mr-2 flex-shrink-0" />
                                {error}
                            </div>
                        )}

                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-1">E-Posta Adresi</label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
                                <input 
                                    type="email" 
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="admin@kmabtech.com"
                                    className="w-full pl-10 pr-4 py-3 bg-gray-900 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all placeholder-gray-600 text-white"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-1">Şifre</label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
                                <input 
                                    type="password" 
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    className="w-full pl-10 pr-4 py-3 bg-gray-900 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all placeholder-gray-600 text-white"
                                />
                            </div>
                        </div>

                        <button 
                            type="submit" 
                            disabled={loading}
                            className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-lg shadow-blue-600/30 transition-all duration-300 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? 'Giriş Yapılıyor...' : (
                                <>
                                    Panele Gir <ArrowRight size={18} className="ml-2" />
                                </>
                            )}
                        </button>
                    </form>

                    <div className="mt-6 text-center">
                        <Link href="/" className="text-sm text-gray-500 hover:text-white transition-colors">
                            ← Siteye Geri Dön
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}