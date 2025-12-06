"use client";

import { useState, useEffect } from "react";
import { useApi } from "@/lib/useApi";
import { Service } from "@/lib/types";

import { Code, GitBranch, Zap, Shield } from "lucide-react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import VSCodeEditor from "@/components/VSCodeEditor";
import { useTheme } from "@/components/Theme/ThemeProvider";

// =============================
// Kod içerikleri
// =============================
const getCodeSnippet = (title: string) => {
  switch (title.toLowerCase()) {
    case "yapay zeka çözümleri":
      return `from sklearn.datasets import load_iris
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score

# Veri seti yükleme
data = load_iris()
X = data.data
y = data.target

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
model = RandomForestClassifier(n_estimators=100, random_state=42)
model.fit(X_train, y_train)
y_pred = model.predict(X_test)
accuracy = accuracy_score(y_test, y_pred)
print("Doğruluk oranı:", accuracy)
`;
    case "web geliştirme":
      return `using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Hosting;
using System.Collections.Generic;

var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();
var products = new List<Product> { new Product { Id=1, Name="Laptop", Price=25000 } };
app.MapGet("/", () => "API çalışıyor!");
app.MapGet("/products", () => products);
app.Run();
class Product { public int Id {get;set;} public string Name{get;set;} public decimal Price{get;set;} }`;
    case "yapay zeka entegrasyonu":
      return `from fastapi import FastAPI
from pydantic import BaseModel
import requests
app = FastAPI()
API_KEY = "OPENAI_API_KEY"
class UserMessage(BaseModel):
    text: str
@app.post("/ai")
def ai_reply(msg: UserMessage):
    payload = {"model":"gpt-4o-mini","messages":[{"role":"user","content":msg.text}]}
    headers={"Authorization":f"Bearer {API_KEY}","Content-Type":"application/json"}
    response = requests.post("https://api.openai.com/v1/chat/completions", json=payload, headers=headers)
    return response.json()`;
    case "siber güvenlik":
      return `import re
weak_patterns = ["1234","password","admin","qwerty","1111","abcd"]
def check_password_strength(password):
    issues=[]
    if len(password)<8: issues.append("En az 8 karakter")
    if not re.search(r"[A-Z]", password): issues.append("En az 1 büyük harf")
    if not re.search(r"[a-z]", password): issues.append("En az 1 küçük harf")
    if not re.search(r"\d", password): issues.append("En az 1 rakam")
    for p in weak_patterns:
        if re.search(p,password.lower()): issues.append(f"Zayıf desen: {p}")
    return issues
pwd=input("Parola: "); result=check_password_strength(pwd); print(result if result else "Güçlü")`;
    case "sızma testi":
      return `import requests
SEC_HEADERS=["Content-Security-Policy","X-Frame-Options","X-XSS-Protection","Strict-Transport-Security","X-Content-Type-Options"]
def passive_scan(url):
    try:
        resp=requests.get(url,timeout=5)
        print(resp.status_code)
        for h in SEC_HEADERS:
            print(h, "var" if h in resp.headers else "yok")
    except Exception as e: print("Hata:", e)
target=input("URL: "); passive_scan(target)`;
    case "masaüstü uygulama geliştirme":
      return `using System; using System.IO; using System.Windows.Forms;
namespace MiniApp {
    public partial class Form1:Form{
        TextBox box=new TextBox(); Button save=new Button();
        public Form1(){ box.Multiline=true; box.Dock=DockStyle.Fill; save.Text="Kaydet"; save.Dock=DockStyle.Bottom; save.Click+=SaveFile; Controls.Add(box); Controls.Add(save); }
        void SaveFile(object s,EventArgs e){ SaveFileDialog d=new SaveFileDialog(); d.Filter="Text|*.txt"; if(d.ShowDialog()==DialogResult.OK) File.WriteAllText(d.FileName,box.Text); }
    }
}`;
    default:
      return `// Kod bulunamadı`;
  }
};

// =============================
// Ana Component
// =============================
export default function ServicesTabs() {
  const { theme } = useTheme();
  const { data: services } = useApi<Service[]>("/Services");
  const [activeService, setActiveService] = useState<Service | null>(null);

  useEffect(() => {
    if (services && services.length > 0 && !activeService) setActiveService(services[0]);
  }, [services]);

  if (!services) return null;

  return (
    <section className="py-12 md:py-20">
      <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 md:mb-16 text-foreground">
        Geliştirme Alanlarımız
      </h2>

      <div className="max-w-[1600px] mx-auto rounded-2xl p-[3px] bg-gradient-to-r from-purple-600 via-indigo-500 to-blue-600 shadow-[0_0_60px_25px_rgba(88,28,135,0.45)]">
        <div className={`rounded-2xl p-6 md:p-10 border ${theme==="dark"?"bg-[#0d0f16] border-gray-700":"bg-white border-gray-300 shadow-xl"}`}>
          {/* Tabs */}
          <div className="flex flex-wrap md:flex-nowrap space-x-2 md:space-x-3 overflow-x-auto mb-6 md:mb-10 pb-2">
            {services.map((service) => (
              <motion.button
                key={service.id}
                layout
                onClick={() => setActiveService(service)}
                className={`flex items-center space-x-2 px-4 md:px-6 py-2 md:py-3 rounded-lg text-sm md:text-base transition-all ${
                  activeService?.id===service.id?"bg-blue-600 text-white shadow-lg shadow-blue-500/40":theme==="dark"?"bg-gray-800 text-gray-300 hover:bg-gray-700":"bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
                transition={{ duration: 0.5, ease: [0.22,1,0.36,1] }}
              >
                {service.titleTr.includes("Web") && <Code size={18}/>}
                {service.titleTr.includes("Yapay") && <Zap size={18}/>}
                {service.titleTr.includes("Siber") && <Shield size={18}/>}
                {service.titleTr.includes("Masaüstü") && <GitBranch size={18}/>}
                <span>{service.titleTr}</span>
              </motion.button>
            ))}
          </div>

          {/* Content + Editor */}
          <AnimatePresence mode="wait">
            {activeService && (
              <>
                <motion.div
                  key={activeService.titleTr+"-editor"}
                  initial={{ opacity:0, y:40 }}
                  animate={{ opacity:1, y:0 }}
                  exit={{ opacity:0, y:-30 }}
                  transition={{ duration:0.8, ease:[0.22,1,0.36,1] }}
                  className="mb-6 md:mb-12"
                >
                  <VSCodeEditor code={getCodeSnippet(activeService.titleTr)} fileName={activeService.titleTr+".ts"} />
                </motion.div>

                <motion.div
                  key={activeService.titleTr+"-content"}
                  initial={{ opacity:0, y:25 }}
                  animate={{ opacity:1, y:0 }}
                  exit={{ opacity:0, y:-20 }}
                  transition={{ duration:1, ease:[0.22,1,0.36,1] }}
                  className="text-center px-2 md:px-0"
                >
                  <h3 className="text-2xl md:text-4xl font-bold mb-2 md:mb-3 text-foreground">{activeService.titleTr}</h3>
                  <p className="text-muted-foreground text-sm md:text-lg leading-relaxed mb-4 md:mb-8 max-w-3xl mx-auto">{activeService.descriptionTr}</p>
                  <Link href="/contact" className="inline-block px-6 md:px-8 py-2 md:py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition text-sm md:text-lg">
                    Detaylı Teklif Al
                  </Link>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
