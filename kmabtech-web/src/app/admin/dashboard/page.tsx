'use client';

import { useState } from 'react';
import http from '@/lib/http';

export default function AdminDashboard() {
    const [companyName, setCompanyName] = useState('');
    const [order, setOrder] = useState(0);
    const [file, setFile] = useState<File | null>(null);
    const [status, setStatus] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('Yükleniyor...');

        try {
            const formData = new FormData();
            formData.append('companyName', companyName);
            formData.append('order', order.toString());

            if (file) {
                formData.append('file', file);
            }

            await http.post('/References', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            setStatus('✅ Başarıyla eklendi!');
            setCompanyName('');
            setOrder(0);
            setFile(null);

        } catch (err) {
            console.error(err);
            setStatus('❌ Hata oluştu.');
        }
    };

    return (
        <div className="min-h-screen bg-gray-900 text-white p-10">
            <h1 className="text-3xl font-bold mb-8">Admin Paneli - Referans Ekle</h1>

            <div className="bg-gray-800 p-6 rounded-xl max-w-md">
                <form onSubmit={handleSubmit} className="space-y-4">
                    
                    <div>
                        <label className="block mb-1">Firma Adı</label>
                        <input
                            type="text"
                            value={companyName}
                            onChange={(e) => setCompanyName(e.target.value)}
                            className="w-full p-2 bg-gray-700 rounded border border-gray-600"
                            required
                        />
                    </div>

                    <div>
                        <label className="block mb-1">Sıralama</label>
                        <input
                            type="number"
                            value={order}
                            onChange={(e) => setOrder(Number(e.target.value))}
                            className="w-full p-2 bg-gray-700 rounded border border-gray-600"
                        />
                    </div>

                    <div>
                        <label className="block mb-1">Logo Yükle</label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => setFile(e.target.files?.[0] || null)}
                            className="w-full p-2 bg-gray-700 rounded"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full py-2 bg-green-600 hover:bg-green-700 rounded font-bold"
                    >
                        Ekle
                    </button>

                    {status && (
                        <p className="mt-4 text-center font-bold">{status}</p>
                    )}
                </form>
            </div>
        </div>
    );
}
