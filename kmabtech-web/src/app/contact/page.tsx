"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, Mail, MapPin, Phone, CheckCircle, Loader2, Terminal } from "lucide-react";

// Form verisi için Tip Tanımı
type FormData = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

export default function ContactPage() {
  // State Yönetimi
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  // Input Değişikliklerini Yakala
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Form Gönderme İşlemi
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      // API İsteği
      const response = await fetch("http://localhost:5000/api/ContactMessages", { // BURAYA KENDİ API URL'İNİ YAZ (Localhost portuna dikkat et)
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus("success");
        setFormData({ name: "", email: "", subject: "", message: "" }); // Formu temizle
      } else {
        setStatus("error");
      }
    } catch (error) {
      console.error("Hata:", error);
      setStatus("error");
    }
  };

  return (
    <div
      className="min-h-screen pt-32 pb-20 px-4 sm:px-8 relative overflow-hidden text-white flex items-center justify-center"
      style={{
        background: "radial-gradient(circle, rgba(2,0,36,1) 0%, rgba(0,0,43,1) 35%, rgba(0,14,18,1) 100%)",
      }}
    >
      {/* Arka Plan Dekorasyon (Cyber Grid) */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none" />
      
      <div className="max-w-6xl w-full mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 relative z-10">
        
        {/* SOL TARAF: İLETİŞİM BİLGİLERİ & METİN */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col justify-center"
        >
     

          <h1 className="text-5xl md:text-6xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-200 to-gray-500">
            Bir Projeniz <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">
              mi Var?
            </span>
          </h1>

          <p className="text-gray-400 text-lg mb-10 leading-relaxed">
            Dijital dünyada iz bırakmak için hazırsanız, biz de hazırız. 
            Aşağıdaki formu doldurun veya iletişim kanallarımızdan bize ulaşın.
            Ekibimiz 24 saat içinde dönüş yapacaktır.
          </p>

          <div className="space-y-6">
            <ContactItem icon={<Mail />} title="E-posta" value="info@kmabtech.com" />
            <ContactItem icon={<Phone />} title="Telefon" value="+90 (555) 076 20 61" />
            <ContactItem icon={<MapPin />} title="Ofis" value="Teknopark İstanbul, Türkiye" />
          </div>
        </motion.div>

        {/* SAĞ TARAF: FORM PANELİ */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="relative group">
            {/* Neon Border Effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 via-purple-500 to-blue-500 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
            
            <div className="relative bg-[#0a0a16]/80 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl">
              
              <div className="flex items-center gap-3 mb-8 pb-4 border-b border-white/5">
                <Terminal className="text-cyan-400" />
                <h3 className="text-xl font-semibold">İletişim Formu</h3>
              </div>

              {status === "success" ? (
                <div className="text-center py-12">
                  <motion.div 
                    initial={{ scale: 0 }} 
                    animate={{ scale: 1 }} 
                    className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4"
                  >
                    <CheckCircle size={40} className="text-green-400" />
                  </motion.div>
                  <h3 className="text-2xl font-bold text-white mb-2">Mesaj Gönderildi!</h3>
                  <p className="text-gray-400">En kısa sürede size geri dönüş yapacağız.</p>
                  <button 
                    onClick={() => setStatus("idle")} 
                    className="mt-6 text-cyan-400 hover:text-cyan-300 underline"
                  >
                    Yeni mesaj gönder
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <InputGroup 
                      label="Adınız Soyadınız" 
                      name="name" 
                      placeholder="yücel kandaş" 
                      value={formData.name} 
                      onChange={handleChange} 
                    />
                    <InputGroup 
                      label="E-posta Adresi" 
                      name="email" 
                      type="email"
                      placeholder="ornek@sirket.com" 
                      value={formData.email} 
                      onChange={handleChange} 
                    />
                  </div>

                  <InputGroup 
                    label="Konu" 
                    name="subject" 
                    placeholder="Proje Teklifi Hakkında" 
                    value={formData.subject} 
                    onChange={handleChange} 
                  />

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-400 ml-1">Mesajınız</label>
                    <textarea
                      name="message"
                      required
                      rows={4}
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Projenizden bahsedin..."
                      className="
                        w-full bg-[#050510] border border-white/10 rounded-lg px-4 py-3 text-white 
                        focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 
                        transition-all resize-none placeholder-gray-600
                      "
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="
                      w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500
                      text-white font-bold py-4 rounded-lg shadow-lg shadow-cyan-500/20
                      transform transition hover:-translate-y-1 active:scale-95
                      flex items-center justify-center gap-2
                    "
                  >
                    {status === "loading" ? (
                      <>
                        <Loader2 className="animate-spin" /> Gönderiliyor...
                      </>
                    ) : (
                      <>
                        Mesajı Gönder <Send size={18} />
                      </>
                    )}
                  </button>
                  
                  {status === "error" && (
                    <p className="text-red-400 text-sm text-center mt-2">
                      Bir hata oluştu. Lütfen tekrar deneyin.
                    </p>
                  )}
                </form>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

// --- YARDIMCI BİLEŞENLER ---

function InputGroup({ label, name, type = "text", placeholder, value, onChange }: any) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-gray-400 ml-1">{label}</label>
      <input
        type={type}
        name={name}
        required
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="
          w-full bg-[#050510] border border-white/10 rounded-lg px-4 py-3 text-white 
          focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 
          transition-all placeholder-gray-600
        "
      />
    </div>
  );
}

function ContactItem({ icon, title, value }: any) {
  return (
    <div className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/5 hover:border-cyan-500/30 transition-colors group cursor-default">
      <div className="p-3 bg-black/30 rounded-lg text-cyan-400 group-hover:text-cyan-300 transition-colors">
        {icon}
      </div>
      <div>
        <p className="text-sm text-gray-400">{title}</p>
        <p className="text-white font-medium text-lg">{value}</p>
      </div>
    </div>
  );
}