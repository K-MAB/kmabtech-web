"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, Variants } from "framer-motion";

import {
    Users,
    FileText,
    Briefcase,
    MessageSquare,
    Package,
    ArrowRight,
    Activity,
    Plus,
    ExternalLink
} from "lucide-react";

import { api } from "@/services/api";

// ------------------ Animasyon Ayarları ------------------
const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.1 }
    }
};

const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { type: "spring", stiffness: 120 }
    }
};

// ------------------ Kart Bileşeni ------------------
const StatCard = ({ title, value, icon: Icon, color, link }: any) => (
    <motion.div
        variants={itemVariants}
        whileHover={{ y: -5 }}
        className="relative group bg-gray-800/50 backdrop-blur-sm p-6 rounded-2xl border border-gray-700/50 hover:border-gray-600 shadow-xl overflow-hidden"
    >
        <div className={`absolute inset-0 bg-gradient-to-r ${color.gradient} opacity-0 group-hover:opacity-10 transition duration-500`} />

        <div className="relative z-10">
            <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-xl bg-gray-700/50 ring-1 ring-white/10 ${color.text}`}>
                    <Icon size={24} />
                </div>

                {link && (
                    <Link href={link} className="text-gray-400 hover:text-white p-2 rounded-full hover:bg-white/10 transition">
                        <ArrowRight size={18} />
                    </Link>
                )}
            </div>

            <h3 className="text-4xl font-bold text-white">{value}</h3>
            <p className="text-gray-400 text-sm mt-1">{title}</p>
        </div>
    </motion.div>
);

export default function AdminDashboard() {
    const [stats, setStats] = useState<any>(null);

    useEffect(() => {
        api.getDashboardStats().then(setStats).catch(console.error);
    }, []);

    if (!stats)
        return <p className="text-gray-400 p-10">Yükleniyor...</p>;

    const cards = [
        {
            title: "Aktif Hizmetler",
            value: stats.serviceCount,
            icon: Briefcase,
            color: { gradient: "from-blue-500 to-cyan-500", text: "text-blue-400" },
            link: "/admin/services"
        },
        {
            title: "Referanslar",
            value: stats.referenceCount,
            icon: Users,
            color: { gradient: "from-green-500 to-emerald-500", text: "text-green-400" },
            link: "/admin/references"
        },
        {
            title: "Blog Yazıları",
            value: stats.blogCount,
            icon: FileText,
            color: { gradient: "from-purple-500 to-pink-500", text: "text-purple-400" },
            link: "/admin/blog"
        },
        {
            title: "Gelen Mesajlar",
            value: stats.messageCount,
            icon: MessageSquare,
            color: { gradient: "from-red-500 to-orange-500", text: "text-red-400" },
            link: "/admin/messages"
        },
        {
            title: "Ürünler",
            value: stats.productCount,
            icon: Package,
            color: { gradient: "from-yellow-500 to-orange-500", text: "text-yellow-400" },
            link: "/admin/products"
        }
    ];

    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-10"
        >
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end pb-6 border-b border-gray-800">
                <div>
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-white to-gray-500 bg-clip-text text-transparent">
                        Yönetim Paneli
                    </h1>
                    <p className="text-gray-400 mt-2">Gerçek zamanlı istatistikler</p>
                </div>

                <div className="flex gap-3 mt-4 md:mt-0">
                    <Link
                        href="/"
                        target="_blank"
                        className="px-5 py-2.5 bg-gray-800 border border-gray-700 hover:bg-gray-700 rounded-xl flex items-center gap-2 text-gray-300"
                    >
                        <ExternalLink size={16} />
                        Siteyi Gör
                    </Link>

                    <Link
                        href="/admin/services/new"
                        className="px-5 py-2.5 bg-blue-600 text-white rounded-xl flex items-center gap-2 shadow-lg shadow-blue-600/20"
                    >
                        <Plus size={16} />
                        Yeni Ekle
                    </Link>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
                {cards.map((card, i) => (
                    <StatCard key={i} {...card} />
                ))}
            </div>
        </motion.div>
    );
}
