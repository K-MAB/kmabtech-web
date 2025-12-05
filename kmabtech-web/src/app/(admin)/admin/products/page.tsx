"use client";

import { useState, useEffect } from "react";
import { api } from "@/services/api"; // Dosya yolunu kontrol et
import { Trash2, Plus, Upload, X, Save, Package, Link as LinkIcon, Info } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";

export default function AdminProductsPage() {
  // --- STATE TANIMLARI ---
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  
  // Resim Yönetimi
  const [selectedFiles, setSelectedFiles] = useState([]); 
  const [imagePreviews, setImagePreviews] = useState([]);

  // Form Verisi (Backend Modeline Uygun)
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    categoryId: "",
    // Detay Özellikler
    color: "",
    material: "",
    weight: "",
    dimensions: "",
    // Linkler
    link1: "",
    link2: "",
    link3: "",
  });

  // --- SAYFA YÜKLENİNCE ---
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [catRes, prodRes] = await Promise.all([
        api.getCategories(),
        api.getProducts(),
      ]);
      setCategories(catRes);
      setProducts(prodRes);
    } catch (error) {
      console.error("Veri çekme hatası:", error);
      toast.error("Veriler yüklenemedi. Backend çalışıyor mu?");
    }
  };

  // --- HANDLERS (Olay Yönetimi) ---
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length + selectedFiles.length > 4) {
      toast.error("En fazla 4 resim ekleyebilirsiniz.");
      return;
    }

    const newPreviews = files.map((file) => URL.createObjectURL(file));
    setSelectedFiles((prev) => [...prev, ...files]);
    setImagePreviews((prev) => [...prev, ...newPreviews]);
  };

  const removeImage = (index) => {
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
    setImagePreviews((prev) => prev.filter((_, i) => i !== index));
  };

  // --- KAYDETME İŞLEMİ ---
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.categoryId) return toast.error("Lütfen bir kategori seçin!");

    setLoading(true);
    const toastId = toast.loading("Resimler yükleniyor ve ürün kaydediliyor...");

    try {
      // 1. Resimleri Sunucuya Yükle
      const uploadedUrls = [];
      for (const file of selectedFiles) {
        const url = await api.uploadImage(file);
        uploadedUrls.push(url);
      }

      // 2. Veriyi Hazırla
      const productToSave = {
        ...formData,
        price: parseFloat(formData.price),
        categoryId: parseInt(formData.categoryId),
        imageUrls: uploadedUrls, // Backend'e URL listesi gidiyor
      };

      // 3. API'ye Gönder
      await api.createProduct(productToSave);

      toast.success("Ürün başarıyla oluşturuldu!", { id: toastId });

      // 4. Formu Sıfırla
      setFormData({
        name: "", description: "", price: "", categoryId: "",
        color: "", material: "", weight: "", dimensions: "",
        link1: "", link2: "", link3: ""
      });
      setSelectedFiles([]);
      setImagePreviews([]);
      
      // 5. Listeyi Güncelle
      fetchData();

    } catch (error) {
      console.error(error);
      toast.error("Bir hata oluştu.", { id: toastId });
    } finally {
      setLoading(false);
    }
  };

  // --- SİLME İŞLEMİ ---
  const handleDelete = async (id) => {
    if (!confirm("Bu ürünü silmek istediğinize emin misiniz?")) return;
    try {
      await api.deleteProduct(id);
      toast.success("Ürün silindi.");
      setProducts((prev) => prev.filter((p) => p.id !== id));
    } catch (error) {
      toast.error("Silme başarısız.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8 font-sans">
      <Toaster position="top-right" />

      <h1 className="text-3xl font-bold mb-8 text-blue-400 border-b border-gray-700 pb-4">
        Admin Panel <span className="text-gray-500 text-lg font-normal">/ Ürün Yönetimi</span>
      </h1>

      {/* --- FORM BÖLÜMÜ --- */}
      <div className="bg-gray-800 p-6 rounded-xl shadow-2xl mb-10 border border-gray-700">
        <h2 className="text-xl font-semibold mb-6 flex items-center gap-2 text-blue-300">
          <Plus size={24} /> Yeni Ürün Ekle
        </h2>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* SOL KOLON: Temel Bilgiler */}
          <div className="space-y-5">
            <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider flex items-center gap-2">
              <Package size={16} /> Temel Bilgiler
            </h3>
            
            <div>
              <label className="block text-sm text-gray-400 mb-1">Ürün Adı</label>
              <input name="name" value={formData.name} onChange={handleChange} required 
                className="w-full bg-gray-700 border border-gray-600 rounded-lg p-3 focus:border-blue-500 outline-none transition" placeholder="Örn: Kablosuz Mouse" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-400 mb-1">Fiyat (₺)</label>
                <input type="number" name="price" value={formData.price} onChange={handleChange} required 
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg p-3 focus:border-blue-500 outline-none" placeholder="0.00" />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">Kategori</label>
                <select name="categoryId" value={formData.categoryId} onChange={handleChange} required 
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg p-3 focus:border-blue-500 outline-none">
                  <option value="">Seçiniz</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-1">Açıklama</label>
              <textarea name="description" value={formData.description} onChange={handleChange} rows="4" 
                className="w-full bg-gray-700 border border-gray-600 rounded-lg p-3 focus:border-blue-500 outline-none" placeholder="Ürün özelliklerini giriniz..." />
            </div>
          </div>

          {/* SAĞ KOLON: Detaylar & Linkler & Resim */}
          <div className="space-y-6">
            
            {/* Teknik Detaylar */}
            <div>
              <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-3 flex items-center gap-2">
                <Info size={16} /> Teknik Detaylar
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <input name="color" value={formData.color} onChange={handleChange} placeholder="Renk" className="bg-gray-700 border border-gray-600 rounded-lg p-3 outline-none focus:border-blue-500" />
                <input name="material" value={formData.material} onChange={handleChange} placeholder="Materyal" className="bg-gray-700 border border-gray-600 rounded-lg p-3 outline-none focus:border-blue-500" />
                <input name="weight" value={formData.weight} onChange={handleChange} placeholder="Ağırlık (örn: 1kg)" className="bg-gray-700 border border-gray-600 rounded-lg p-3 outline-none focus:border-blue-500" />
                <input name="dimensions" value={formData.dimensions} onChange={handleChange} placeholder="Boyut (örn: 10x20cm)" className="bg-gray-700 border border-gray-600 rounded-lg p-3 outline-none focus:border-blue-500" />
              </div>
            </div>

            {/* Linkler */}
            <div>
              <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-3 flex items-center gap-2">
                <LinkIcon size={16} /> Satış Linkleri
              </h3>
              <div className="space-y-3">
                <input name="link1" value={formData.link1} onChange={handleChange} placeholder="Link 1 (Örn: Trendyol)" className="w-full bg-gray-700 border border-gray-600 rounded-lg p-2 text-sm outline-none focus:border-blue-500" />
                <input name="link2" value={formData.link2} onChange={handleChange} placeholder="Link 2 (Örn: Hepsiburada)" className="w-full bg-gray-700 border border-gray-600 rounded-lg p-2 text-sm outline-none focus:border-blue-500" />
                <input name="link3" value={formData.link3} onChange={handleChange} placeholder="Link 3 (Örn: Amazon)" className="w-full bg-gray-700 border border-gray-600 rounded-lg p-2 text-sm outline-none focus:border-blue-500" />
              </div>
            </div>

            {/* Resim Yükleme */}
            <div className="bg-gray-750 p-4 rounded-lg border border-gray-600 border-dashed">
              <label className="block text-sm text-gray-400 mb-2">Ürün Resimleri (Maksimum 4)</label>
              <div className="flex gap-4 items-center flex-wrap">
                <label className="cursor-pointer flex flex-col items-center justify-center w-20 h-20 bg-gray-700 hover:bg-gray-600 rounded-lg transition border border-gray-500">
                  <Upload size={20} className="text-gray-300" />
                  <span className="text-[10px] text-gray-400 mt-1">Yükle</span>
                  <input type="file" multiple onChange={handleFileChange} className="hidden" accept="image/*" />
                </label>

                {imagePreviews.map((src, index) => (
                  <div key={index} className="relative w-20 h-20 group">
                    <img src={src} alt="preview" className="w-full h-full object-cover rounded-lg border border-gray-600" />
                    <button type="button" onClick={() => removeImage(index)} className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition shadow-lg">
                      <X size={12} />
                    </button>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Kaydet Butonu */}
          <div className="lg:col-span-2 pt-4">
            <button disabled={loading} type="submit" 
              className="w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-bold py-4 rounded-xl shadow-lg flex items-center justify-center gap-2 transition transform hover:scale-[1.01] disabled:opacity-50 disabled:cursor-not-allowed">
              {loading ? "İşleniyor..." : <><Save size={20} /> Ürünü ve Resimleri Kaydet</>}
            </button>
          </div>

        </form>
      </div>

      {/* --- LİSTE BÖLÜMÜ --- */}
      <div className="bg-gray-800 p-6 rounded-xl shadow-xl border border-gray-700">
        <h2 className="text-xl font-semibold mb-6 text-white flex items-center gap-2">
           Kayıtlı Ürünler <span className="text-sm bg-gray-700 px-2 py-1 rounded-full text-gray-300">{products.length}</span>
        </h2>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="text-gray-400 border-b border-gray-700 text-sm uppercase">
                <th className="p-4">Görsel</th>
                <th className="p-4">Ürün Adı</th>
                <th className="p-4">Kategori</th>
                <th className="p-4">Fiyat</th>
                <th className="p-4">Detaylar</th>
                <th className="p-4 text-right">İşlem</th>
              </tr>
            </thead>
            <tbody>
              {products.length === 0 ? (
                <tr><td colSpan="6" className="p-8 text-center text-gray-500 italic">Henüz ürün eklenmemiş.</td></tr>
              ) : (
                products.map((product) => (
                  <tr key={product.id} className="border-b border-gray-700 hover:bg-gray-750 transition duration-150">
                    <td className="p-4">
                      {product.imageUrls && product.imageUrls.length > 0 ? (
                        // GÖRSEL LİNKİ: 44322 Portuna bağlanır
                        <img 
                          src={`${api.baseUrl}${product.imageUrls[0]}`} 
                          alt={product.name} 
                          className="w-16 h-16 object-cover rounded-lg border border-gray-600 shadow-sm" 
                        />
                      ) : (
                        <div className="w-16 h-16 bg-gray-700 rounded-lg flex items-center justify-center text-xs text-gray-500">Resim Yok</div>
                      )}
                    </td>
                    <td className="p-4 font-semibold text-white">{product.name}</td>
                    <td className="p-4 text-sm text-gray-300 bg-gray-700/30 rounded inline-block my-4 mx-4">{product.categoryName}</td>
                    <td className="p-4 text-green-400 font-mono font-bold">{product.price} ₺</td>
                    <td className="p-4 text-xs text-gray-400 space-y-1">
                       {product.color && <div>Renk: {product.color}</div>}
                       {product.weight && <div>Ağırlık: {product.weight}</div>}
                    </td>
                    <td className="p-4 text-right">
                      <button onClick={() => handleDelete(product.id)} className="bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white p-3 rounded-lg transition duration-200">
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