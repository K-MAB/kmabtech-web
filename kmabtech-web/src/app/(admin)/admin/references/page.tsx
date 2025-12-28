"use client";

import { useEffect, useState } from "react";
import { api } from "@/services/api";
import { 
  Plus, Trash2, Save, Edit, Building2, 
  UploadCloud, X, Hash, Link as LinkIcon, ExternalLink, Loader2 
} from "lucide-react";
import toast, { Toaster } from "react-hot-toast";

// Backend'den gelen veri tipi
type Reference = {
  id: number;
  companyName: string;
  websiteUrl?: string; // Backend'den null gelebilir
  logoUrl: string; 
  order: number;
};

export default function AdminReferencesPage() {
  const [references, setReferences] = useState<Reference[]>([]);
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);

  // Dosya Seçimi State'leri
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>("");

  // Form State (CompanyName, WebsiteUrl, Order)
  const [formData, setFormData] = useState({
    companyName: "",
    websiteUrl: "",
    order: 0,
  });

  // -----------------------------------
  // VERİLERİ ÇEK
  // -----------------------------------
  useEffect(() => {
    fetchReferences();
  }, []);

  const fetchReferences = async () => {
    try {
      const res = await api.getReferences();
      // Order'a göre sırala
      const sorted = res.sort((a: Reference, b: Reference) => a.order - b.order);
      setReferences(sorted);
    } catch (err) {
      toast.error("Referanslar yüklenemedi.");
    }
  };

  // -----------------------------------
  // DOSYA İŞLEMLERİ
  // -----------------------------------
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setSelectedFile(file);
    const objectUrl = URL.createObjectURL(file);
    setPreviewUrl(objectUrl);
  };

  const removeFile = () => {
    setSelectedFile(null);
    setPreviewUrl("");
  };

  // -----------------------------------
  // INPUT DEĞİŞİKLİĞİ
  // -----------------------------------
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
  };

  // -----------------------------------
  // KAYDET (FORMDATA)
  // -----------------------------------
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Yeni eklerken resim zorunlu
    if (!editingId && !selectedFile) {
      toast.error("Lütfen bir logo seçiniz.");
      return;
    }

    setLoading(true);
    const toastId = toast.loading(editingId ? "Güncelleniyor..." : "Kaydediliyor...");

    try {
      const data = new FormData();
      data.append("CompanyName", formData.companyName);
      data.append("Order", formData.order.toString());
      
      // WebsiteUrl varsa ekle, yoksa boş gönder
      data.append("WebsiteUrl", formData.websiteUrl || "");

      if (selectedFile) {
        data.append("LogoFile", selectedFile);
      }

      if (editingId) {
        await api.updateReference(editingId, data);
        toast.success("Referans güncellendi!", { id: toastId });
      } else {
        await api.createReference(data);
        toast.success("Referans oluşturuldu!", { id: toastId });
      }

      resetForm();
      fetchReferences();

    } catch (error) {
      console.error(error);
      toast.error("Bir hata oluştu!", { id: toastId });
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({ companyName: "", websiteUrl: "", order: 0 });
    setSelectedFile(null);
    setPreviewUrl("");
    setEditingId(null);
  };

  // -----------------------------------
  // DÜZENLEME MODU
  // -----------------------------------
  const handleEdit = (ref: Reference) => {
    setEditingId(ref.id);
    setFormData({
      companyName: ref.companyName,
      websiteUrl: ref.websiteUrl ?? "", // Null gelirse boş string yap
      order: ref.order,
    });
    
    // Resim önizlemesi
    const fullLogoUrl = ref.logoUrl.startsWith("http") 
      ? ref.logoUrl 
      : `${api.baseUrl}${ref.logoUrl}`;
    setPreviewUrl(fullLogoUrl);
    
    setSelectedFile(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // -----------------------------------
  // SİLME
  // -----------------------------------
  const handleDelete = async (id: number) => {
    if (!confirm("Silmek istediğinize emin misiniz?")) return;
    try {
      await api.deleteReference(id);
      toast.success("Silindi.");
      setReferences((prev) => prev.filter((r) => r.id !== id));
    } catch {
      toast.error("Silme başarısız.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8 font-sans">
      <Toaster position="top-right" />

      <h1 className="text-3xl font-bold mb-8 text-blue-400 border-b border-gray-700 pb-4">
        Admin Panel <span className="text-gray-500">/ Referans Yönetimi</span>
      </h1>

      {/* FORM ALANI */}
      <div className="bg-gray-800 p-6 rounded-xl shadow-xl mb-10 border border-gray-700">
        <h2 className="text-xl font-semibold mb-6 flex items-center gap-2 text-blue-300">
          <Plus size={24} /> {editingId ? "Referansı Düzenle" : "Yeni Referans Ekle"}
        </h2>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* SOL TARAFTAKİ INPUTLAR */}
          <div className="space-y-5">
            
            {/* Firma Adı */}
            <div>
              <label className="text-sm text-gray-400 flex items-center gap-2 mb-1">
                <Building2 size={16} /> Firma Adı
              </label>
              <input
                name="companyName"
                value={formData.companyName}
                onChange={handleChange}
                required
                className="w-full bg-gray-700 p-3 rounded-lg border border-gray-600 outline-none focus:border-blue-500 transition"
                placeholder="Örn: Commitra Yazılım A.Ş."
              />
            </div>

            {/* Website URL */}
            <div>
              <label className="text-sm text-gray-400 flex items-center gap-2 mb-1">
                <LinkIcon size={16} /> Web Sitesi Linki
              </label>
              <input
                name="websiteUrl"
                value={formData.websiteUrl}
                onChange={handleChange}
                className="w-full bg-gray-700 p-3 rounded-lg border border-gray-600 outline-none focus:border-blue-500 transition"
                placeholder="https://www.ornekfirma.com"
              />
            </div>

            {/* Sıralama */}
            <div>
              <label className="text-sm text-gray-400 flex items-center gap-2 mb-1">
                <Hash size={16} /> Sıralama (Order)
              </label>
              <input
                name="order"
                type="number"
                value={formData.order}
                onChange={handleChange}
                className="w-full bg-gray-700 p-3 rounded-lg border border-gray-600 outline-none focus:border-blue-500 transition"
                placeholder="0"
              />
            </div>
          </div>

          {/* SAĞ TARAF: Dosya Yükleme */}
          <div>
            <label className="text-sm text-gray-400 flex items-center gap-2 mb-1">
              <UploadCloud size={16} /> Firma Logosu
            </label>
            
            <div className="border-2 border-dashed border-gray-600 rounded-xl p-4 flex flex-col items-center justify-center bg-gray-700/30 hover:bg-gray-700/50 transition h-56 relative group">
              
              {previewUrl ? (
                <div className="relative w-full h-full flex items-center justify-center">
                  <img 
                    src={previewUrl} 
                    alt="Preview" 
                    className="max-h-full max-w-full object-contain p-2" 
                  />
                  <button
                    type="button"
                    onClick={removeFile}
                    className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full shadow hover:bg-red-600 transition"
                  >
                    <X size={16} />
                  </button>
                  {selectedFile && (
                    <span className="absolute bottom-1 bg-black/60 text-xs px-2 py-1 rounded text-green-400">
                      Yeni dosya seçildi
                    </span>
                  )}
                </div>
              ) : (
                <label className="cursor-pointer w-full h-full flex flex-col items-center justify-center">
                  <UploadCloud size={40} className="text-gray-400 mb-3 group-hover:text-blue-400 transition" />
                  <span className="text-sm font-medium text-gray-300 group-hover:text-white transition">
                    Logo Seçmek İçin Tıkla
                  </span>
                  <input 
                    type="file" 
                    accept="image/*" 
                    className="hidden" 
                    onChange={handleFileChange}
                  />
                </label>
              )}
            </div>
          </div>

          {/* BUTONLAR */}
          <div className="md:col-span-2 mt-2">
            <button
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 transition p-4 rounded-xl font-bold flex justify-center items-center gap-2 shadow-lg shadow-blue-900/20 disabled:opacity-50"
            >
              {loading ? <Loader2 className="animate-spin" /> : <Save size={20} />}
              {editingId ? "Değişiklikleri Kaydet" : "Referansı Kaydet"}
            </button>
            
            {editingId && (
              <button
                type="button"
                onClick={resetForm}
                className="w-full mt-3 bg-gray-700 hover:bg-gray-600 transition p-3 rounded-xl text-sm text-gray-300"
              >
                Vazgeç
              </button>
            )}
          </div>
        </form>
      </div>

      {/* LISTE */}
      <div className="bg-gray-800 p-6 rounded-xl shadow-xl border border-gray-700">
        <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
          Referans Listesi 
          <span className="bg-gray-700 text-sm px-2 py-0.5 rounded-full text-gray-300">{references.length}</span>
        </h2>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[700px]">
            <thead>
              <tr className="text-gray-400 border-b border-gray-700 text-sm uppercase">
                <th className="p-4 w-16">#</th>
                <th className="p-4 w-32">Logo</th>
                <th className="p-4">Firma & Link</th>
                <th className="p-4 text-right">İşlem</th>
              </tr>
            </thead>
            <tbody>
              {references.length === 0 ? (
                 <tr><td colSpan={4} className="p-8 text-center text-gray-500 italic">Kayıt yok.</td></tr>
              ) : (
                references.map((ref) => (
                  <tr key={ref.id} className="border-b border-gray-700 hover:bg-gray-750 transition">
                    <td className="p-4 text-gray-500 font-mono">{ref.order}</td>
                    
                    <td className="p-4">
                      <div className="w-16 h-16 bg-white rounded-lg p-1 flex items-center justify-center border border-gray-600">
                         <img 
                            src={ref.logoUrl?.startsWith("http") ? ref.logoUrl : `${api.baseUrl}${ref.logoUrl}`} 
                            className="max-w-full max-h-full object-contain"
                         />
                      </div>
                    </td>
                    
                    <td className="p-4">
                      <div className="font-semibold text-lg text-white">{ref.companyName}</div>
                      {ref.websiteUrl ? (
                        <a 
                          href={ref.websiteUrl} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 text-blue-400 text-sm mt-1 hover:underline"
                        >
                          <LinkIcon size={12} /> {ref.websiteUrl} <ExternalLink size={10} />
                        </a>
                      ) : (
                        <span className="text-gray-500 text-xs italic">Link yok</span>
                      )}
                    </td>
                    
                    <td className="p-4 flex justify-end gap-2 items-center">
                      <button onClick={() => handleEdit(ref)} className="bg-yellow-500/20 text-yellow-400 p-3 rounded-lg hover:bg-yellow-500 hover:text-white transition">
                        <Edit size={18} />
                      </button>
                      <button onClick={() => handleDelete(ref.id)} className="bg-red-500/20 text-red-400 p-3 rounded-lg hover:bg-red-500 hover:text-white transition">
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}