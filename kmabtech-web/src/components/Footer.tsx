"use client";

import Link from 'next/link';
import { Github, Linkedin, Mail, Twitter, ArrowRight, MapPin, Phone } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const sections = [
    {
      title: "Hizmetler",
      links: [
        { name: "Web Geliştirme", href: "/services#web" },
        { name: "Yapay Zeka & ML", href: "/services#ai" },
        { name: "Siber Güvenlik", href: "/services#security" },
        { name: "Mobil Uygulama", href: "/services#mobile" },
        { name: "DevOps Çözümleri", href: "/services#devops" }
      ]
    },
    {
      title: "Kurumsal",
      links: [
        { name: "Hakkımızda", href: "/about" },
        { name: "Projelerimiz", href: "/products" },
        { name: "Blog & Haberler", href: "/blog" },
        { name: "Kariyer", href: "/career" },
        { name: "İletişim", href: "/contact" }
      ]
    },
  ];

  return (
    <footer className="relative bg-[#020205] border-t border-white/5 pt-20 pb-10 overflow-hidden">
      
      {/* Üst Dekoratif Çizgi (Gradient) */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />
      
      {/* Arka Plan Efekti */}
      <div className="absolute inset-0 pointer-events-none">
         <div className="absolute bottom-0 left-1/4 w-[500px] h-[300px] bg-blue-900/10 rounded-full blur-[100px]" />
         <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.02]" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-16">
          
          {/* 1. KOLON: MARKA & HAKKINDA */}
          <div className="lg:col-span-4 space-y-6">
            <Link href="/" className="inline-block">
               {/* Logo Resminiz */}
               <img
                 src="/logo.png"
                 alt="Commitra Logo"
                 className="h-12 w-auto brightness-200 contrast-125" // Logoyu dark modda parlatır
               />
               <span className="sr-only">Commitra</span>
            </Link>
            
            <p className="text-gray-400 leading-relaxed max-w-sm">
              Geleceği şekillendiren teknolojilerle, işletmenizin dijital potansiyelini en üst seviyeye çıkarıyoruz. İnovasyon ve güvenliğin buluşma noktası.
            </p>

            <div className="flex items-center gap-4">
               <SocialButton icon={Github} href="#" />
               <SocialButton icon={Linkedin} href="#" />
               <SocialButton icon={Twitter} href="#" />
               <SocialButton icon={Mail} href="#" />
            </div>
          </div>

          {/* 2. & 3. KOLON: LİNKLER */}
          <div className="lg:col-span-4 grid grid-cols-2 gap-8">
            {sections.map((section, index) => (
              <div key={index}>
                <h3 className="text-white font-semibold mb-6">{section.title}</h3>
                <ul className="space-y-4">
                  {section.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <Link 
                        href={link.href} 
                        className="text-gray-500 hover:text-blue-400 transition-colors flex items-center gap-2 group text-sm"
                      >
                        <span className="w-0 group-hover:w-2 h-[1px] bg-blue-400 transition-all duration-300" />
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* 4. KOLON: BÜLTEN & İLETİŞİM */}
          <div className="lg:col-span-4 space-y-6">
             <h3 className="text-white font-semibold">Bültenimize Abone Olun</h3>
             <p className="text-sm text-gray-500">
               En yeni teknoloji trendleri ve güncellemelerden haberdar olun. Spam yok, sadece değer.
             </p>
             
             <div className="relative">
                <input 
                  type="email" 
                  placeholder="E-posta adresiniz" 
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-gray-600 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 transition-all"
                />
                <button className="absolute right-1.5 top-1.5 p-2 bg-blue-600 hover:bg-blue-500 text-white rounded-md transition-colors">
                  <ArrowRight size={18} />
                </button>
             </div>

             <div className="pt-6 border-t border-white/5 space-y-3">
                <div className="flex items-center gap-3 text-sm text-gray-400">
                   <MapPin size={18} className="text-blue-500" />
                   <span>Ankara Yenimahalle</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-400">
                   <Phone size={18} className="text-blue-500" />
                   <span>+90 555 076 20 61</span>
                </div>
             </div>
          </div>

        </div>

        {/* ALT KISIM (COPYRIGHT) */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
           <p className="text-sm text-gray-500">
             &copy; {currentYear} Commitra Yazılım A.Ş. Tüm hakları saklıdır.
           </p>
           
           <div className="flex items-center gap-6 text-sm text-gray-600">
              <Link href="#" className="hover:text-gray-400 transition-colors">Gizlilik Politikası</Link>
              <Link href="#" className="hover:text-gray-400 transition-colors">Kullanım Şartları</Link>
              <Link href="#" className="hover:text-gray-400 transition-colors">Çerezler</Link>
           </div>
        </div>
      </div>
    </footer>
  );
}

// Yardımcı Bileşen: Sosyal Medya Butonu
function SocialButton({ icon: Icon, href }: { icon: any, href: string }) {
  return (
    <a 
      href={href}
      className="p-2.5 rounded-lg bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:bg-blue-600 hover:border-blue-500 transition-all duration-300"
    >
      <Icon size={18} />
    </a>
  );
}