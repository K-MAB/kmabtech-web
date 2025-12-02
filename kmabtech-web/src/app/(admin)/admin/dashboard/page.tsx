'use client';

import { useApi } from '@/lib/useApi';
import { Users, FileText, Briefcase, MessageSquare, ArrowRight, Plus, Activity, ExternalLink } from 'lucide-react';
import Link from 'next/link';
import { motion, Variants } from 'framer-motion';

// --- Animasyon Ayarları ---
const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1
        }
    }
};

const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1,
        transition: {
            type: 'spring',
            stiffness: 100
        }
    }
};

// --- Şık İstatistik Kartı Bileşeni ---
const StatCard = ({ title, value, icon: Icon, color, link }: any) => (
    <motion.div
        variants={itemVariants}
        whileHover={{ y: -5, transition: { duration: 0.2 } }}
        className="relative group bg-gray-800/50 backdrop-blur-sm p-6 rounded-2xl border border-gray-700/50 hover:border-gray-600 shadow-xl overflow-hidden"
    >
        <div className={`absolute inset-0 bg-gradient-to-r ${color.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />

        <div className="relative z-10">
            <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-xl bg-gray-700/50 ring-1 ring-white/10 ${color.text} shadow-inner`}>
                    <Icon size={24} />
                </div>
                {link && (
                    <Link href={link} className="text-gray-400 hover:text-white transition-colors p-2 hover:bg-white/5 rounded-full">
                        <ArrowRight size={18} />
                    </Link>
                )}
            </div>
            <h3 className="text-4xl font-bold text-white mb-1 tracking-tight">{value}</h3>
            <p className="text-gray-400 text-sm font-medium uppercase tracking-wider">{title}</p>
        </div>
    </motion.div>
);

export default function AdminDashboard() {
    const stats = [
        {
            title: 'Aktif Hizmetler',
            value: '5',
            icon: Briefcase,
            color: { gradient: 'from-blue-500 to-cyan-500', text: 'text-blue-400' },
            link: '/admin/services'
        },
        {
            title: 'Referanslar',
            value: '12',
            icon: Users,
            color: { gradient: 'from-green-500 to-emerald-500', text: 'text-green-400' },
            link: '/admin/references'
        },
        {
            title: 'Blog Yazıları',
            value: '8',
            icon: FileText,
            color: { gradient: 'from-purple-500 to-pink-500', text: 'text-purple-400' },
            link: '/admin/blog'
        },
        {
            title: 'Okunmamış Mesajlar',
            value: '3',
            icon: MessageSquare,
            color: { gradient: 'from-red-500 to-orange-500', text: 'text-red-400' },
            link: '/admin/messages'
        },
    ];

    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-8"
        >
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-gray-800">
                <div>
                    <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">
                        Genel Bakış
                    </h1>
                    <p className="text-gray-400 mt-2 font-light">
                        Hoş geldiniz, sistem istatistikleriniz ve anlık durum raporunuz.
                    </p>
                </div>
                <div className="flex space-x-3">
                    <Link
                        href="/"
                        target="_blank"
                        className="px-5 py-2.5 bg-gray-800 hover:bg-gray-700 text-gray-200 border border-gray-700 rounded-xl text-sm font-medium transition-all flex items-center group"
                    >
                        <ExternalLink size={16} className="mr-2 group-hover:text-blue-400" />
                        Siteyi Görüntüle
                    </Link>
                    <Link
                        href="/admin/services/new"
                        className="px-5 py-2.5 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white border border-blue-500/20 rounded-xl text-sm font-medium transition-all shadow-lg shadow-blue-500/20 flex items-center"
                    >
                        <Plus size={16} className="mr-2" />
                        Hızlı Ekle
                    </Link>
                </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, index) => (
                    <StatCard key={index} {...stat} />
                ))}
            </div>

            {/* Sub Sections */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* Activities */}
                <motion.div
                    variants={itemVariants}
                    className="lg:col-span-2 bg-gray-800/30 backdrop-blur-sm rounded-2xl border border-gray-700/50 p-6"
                >
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-bold text-white flex items-center">
                            <Activity size={20} className="mr-2 text-blue-500" />
                            Son Aktiviteler
                        </h2>
                        <span className="text-xs text-gray-500 bg-gray-800 px-2 py-1 rounded-md border border-gray-700">
                            Canlı Akış
                        </span>
                    </div>

                    <div className="space-y-4">
                        {[
                            { text: 'Yeni referans eklendi:', bold: 'TechCorp', time: '2 saat önce', color: 'bg-green-500', icon: Plus },
                            { text: 'Hizmet güncellendi:', bold: 'Web Geliştirme', time: 'Dün', color: 'bg-blue-500', icon: Briefcase },
                            { text: 'Sistem güvenliği:', bold: 'Hatalı giriş engellendi', time: 'Dün', color: 'bg-red-500', icon: Activity },
                        ].map((activity, i) => (
                            <div key={i} className="flex items-center justify-between p-4 bg-gray-900/50 border border-gray-800 rounded-xl hover:bg-gray-800/50 transition-colors group">
                                <div className="flex items-center space-x-4">
                                    <div className={`w-8 h-8 rounded-full ${activity.color} bg-opacity-20 flex items-center justify-center`}>
                                        <div className={`w-2 h-2 rounded-full ${activity.color}`}></div>
                                    </div>
                                    <span className="text-gray-300 text-sm">
                                        {activity.text} <span className="text-white font-medium ml-1">{activity.bold}</span>
                                    </span>
                                </div>
                                <span className="text-xs text-gray-500 font-mono">{activity.time}</span>
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* Guide */}
                <motion.div
                    variants={itemVariants}
                    className="bg-gradient-to-b from-gray-800/40 to-gray-900/40 backdrop-blur-sm rounded-2xl border border-gray-700/50 p-6"
                >
                    <h2 className="text-xl font-bold text-white mb-6">Yönetici Kılavuzu</h2>

                    <div className="space-y-6">
                        {/* Hizmetler */}
                        <div className="flex gap-4">
                            <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-400">
                                <Briefcase size={20} />
                            </div>
                            <div>
                                <h4 className="text-white font-medium text-sm">Hizmetler</h4>
                                <p className="text-gray-400 text-xs mt-1 leading-relaxed">
                                    Kartları düzenleyin, yeni hizmetler ve ikonlar ekleyin.
                                </p>
                            </div>
                        </div>

                        {/* Referanslar */}
                        <div className="flex gap-4">
                            <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center text-green-400">
                                <Users size={20} />
                            </div>
                            <div>
                                <h4 className="text-white font-medium text-sm">Referanslar</h4>
                                <p className="text-gray-400 text-xs mt-1 leading-relaxed">
                                    Müşteri logoları ekleyin. PNG ve transparan önerilir.
                                </p>
                            </div>
                        </div>

                        {/* Blog */}
                        <div className="flex gap-4">
                            <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center text-purple-400">
                                <FileText size={20} />
                            </div>
                            <div>
                                <h4 className="text-white font-medium text-sm">Blog Yönetimi</h4>
                                <p className="text-gray-400 text-xs mt-1 leading-relaxed">
                                    SEO uyumlu makaleler yazın ve yayınlayın.
                                </p>
                            </div>
                        </div>
                    </div>
                </motion.div>

            </div>
        </motion.div>
    );
}
