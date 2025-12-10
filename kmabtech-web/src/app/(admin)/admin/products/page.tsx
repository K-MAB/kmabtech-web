"use client";

import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { api } from "@/services/api";
import { Trash2, Plus, Upload, X, Save, Package, Link as LinkIcon, Info } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";

/* ----------------------------- TYPE DEFINITIONS ----------------------------- */
interface Category {
  id: number;
  name: string;
}

interface Product {
  id: number;
  name: string;
  categoryName?: string;
  price: number;
  imageUrls: string[];
  color?: string;
  weight?: string;
}

/* -------------------------------------------------------------------------- */
/*                               ADMIN PAGE                                   */
/* -------------------------------------------------------------------------- */
export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);

  // Resim işlemleri
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);

  // Form Data
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    categoryId: "",
    color: "",
    material: "",
    weight: "",
    dimensions: "",
    link1: "",
    link2: "",
    link3: "",
  });

  /* ----------------------------- VERİYİ YÜKLE ----------------------------- */
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
      toast.error("Veriler yüklenemedi!");
    }
  };

  /* ----------------------------- FORM DEĞİŞİMİ ---------------------------- */
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  /* ----------------------------- RESİM YÜKLEME ---------------------------- */
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files ? Array.from(e.target.files) : [];

    if (files.length + selectedFiles.length > 4) {
      toast.error("En fazla 4 resim ekleyebilirsiniz.");
      return;
    }

    const newPreviews = files.map((file) => URL.createObjectURL(file));

    setSelectedFiles((prev) => [...prev, ...files]);
    setImagePreviews((prev) => [...prev, ...newPreviews]);
  };

  const removeImage = (index: number) => {
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
    setImagePreviews((prev) => prev.filter((_, i) => i !== index));
  };

  /* ----------------------------- ÜRÜN KAYDET ------------------------------ */
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!formData.categoryId) return toast.error("Lütfen kategori seçin!");

    setLoading(true);
    const toastId = toast.loading("Ürün kaydediliyor...");

    try {
      // 1. Resimleri yükle
      const uploadedUrls: string[] = [];

      for (const file of selectedFiles) {
        const url = await api.uploadImage(file);
        uploadedUrls.push(url);
      }

      // 2. Veriyi hazırla
      const payload = {
        ...formData,
        price: parseFloat(formData.price),
        categoryId: parseInt(formData.categoryId),
        imageUrls: uploadedUrls,
      };

      await api.createProduct(payload);

      toast.success("Ürün başarıyla kaydedildi!", { id: toastId });

      // Form sıfırla
      setFormData({
        name: "",
        description: "",
        price: "",
        categoryId: "",
        color: "",
        material: "",
        weight: "",
        dimensions: "",
        link1: "",
        link2: "",
        link3: "",
      });

      setSelectedFiles([]);
      setImagePreviews([]);

      fetchData();
    } catch (error) {
      console.error(error);
      toast.error("Bir hata oluştu!", { id: toastId });
    } finally {
      setLoading(false);
    }
  };

  /* ----------------------------- SİLME ---------------------------- */
  const handleDelete = async (id: number) => {
    if (!confirm("Bu ürünü silmek istediğinize emin misiniz?")) return;

    try {
      await api.deleteProduct(id);
      toast.success("Ürün silindi.");
      setProducts((prev) => prev.filter((p) => p.id !== id));
    } catch {
      toast.error("Silme işlemi başarısız.");
    }
  };

  /* -------------------------------------------------------------------------- */
  /*                               TASARIM BAŞLIYOR                              */
  /* -------------------------------------------------------------------------- */

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8 font-sans">
      <Toaster position="top-right" />

      <h1 className="text-3xl font-bold mb-8 text-blue-400 border-b border-gray-700 pb-4">
        Admin Panel <span className="text-gray-500 text-lg font-normal">/ Ürün Yönetimi</span>
      </h1>

      {/* FORM */}
      <div className="bg-gray-800 p-6 rounded-xl shadow-2xl mb-10 border border-gray-700">
        <h2 className="text-xl font-semibold mb-6 flex items-center gap-2 text-blue-300">
          <Plus size={24} /> Yeni Ürün Ekle
        </h2>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-2 gap-8">

          {/* SOL KOLON */}
          <div className="space-y-5">
            <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider flex items-center gap-2">
              <Package size={16} /> Temel Bilgiler
            </h3>

            <div>
              <label className="block text-sm text-gray-400 mb-1">Ürün Adı</label>
              <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full bg-gray-700 border border-gray-600 rounded-lg p-3 focus:border-blue-500 outline-none"
                placeholder="Örn: Kablosuz Mouse"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-400 mb-1">Fiyat (₺)</label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  required
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg p-3 focus:border-blue-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-1">Kategori</label>
                <select
                  name="categoryId"
                  value={formData.categoryId}
                  onChange={handleChange}
                  required
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg p-3 focus:border-blue-500 outline-none"
                >
                  <option value="">Seçiniz</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-1">Açıklama</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={4}
                className="w-full bg-gray-700 border border-gray-600 rounded-lg p-3 focus:border-blue-500 outline-none"
              />
            </div>
          </div>

          {/* SAĞ KOLON */}
          <div className="space-y-6">
            {/* Teknik Bilgiler */}
            <div>
              <h3 className="text-sm font-bold text-gray-500 uppercase mb-3 flex items-center gap-2">
                <Info size={16} /> Teknik Detaylar
              </h3>

              <div className="grid grid-cols-2 gap-4">
                <input name="color" value={formData.color} onChange={handleChange} placeholder="Renk" className="bg-gray-700 border border-gray-600 rounded-lg p-3" />
                <input name="material" value={formData.material} onChange={handleChange} placeholder="Materyal" className="bg-gray-700 border border-gray-600 rounded-lg p-3" />
                <input name="weight" value={formData.weight} onChange={handleChange} placeholder="Ağırlık" className="bg-gray-700 border border-gray-600 rounded-lg p-3" />
                <input name="dimensions" value={formData.dimensions} onChange={handleChange} placeholder="Boyut" className="bg-gray-700 border border-gray-600 rounded-lg p-3" />
              </div>
            </div>

            {/* Linkler */}
            <div>
              <h3 className="text-sm font-bold text-gray-500 uppercase mb-3 flex items-center gap-2">
                <LinkIcon size={16} /> Satış Linkleri
              </h3>

              <div className="space-y-3">
                <input name="link1" value={formData.link1} onChange={handleChange} placeholder="Link 1" className="w-full bg-gray-700 border border-gray-600 rounded-lg p-2 text-sm" />
                <input name="link2" value={formData.link2} onChange={handleChange} placeholder="Link 2" className="w-full bg-gray-700 border border-gray-600 rounded-lg p-2 text-sm" />
                <input name="link3" value={formData.link3} onChange={handleChange} placeholder="Link 3" className="w-full bg-gray-700 border border-gray-600 rounded-lg p-2 text-sm" />
              </div>
            </div>

            {/* Resim */}
            <div className="bg-gray-750 p-4 rounded-lg border border-gray-600 border-dashed">
              <label className="block text-sm text-gray-400 mb-2">Ürün Resimleri (Maksimum 4)</label>

              <div className="flex gap-4 items-center flex-wrap">
                <label className="cursor-pointer flex flex-col items-center justify-center w-20 h-20 bg-gray-700 hover:bg-gray-600 rounded-lg border border-gray-500 transition">
                  <Upload size={20} className="text-gray-300" />
                  <span className="text-[10px] text-gray-400 mt-1">Yükle</span>
                  <input type="file" multiple accept="image/*" className="hidden" onChange={handleFileChange} />
                </label>

                {imagePreviews.map((src, index) => (
                  <div key={index} className="relative w-20 h-20 group">
                    <img src={src} className="w-full h-full object-cover rounded-lg border border-gray-600" />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition"
                    >
                      <X size={12} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* KAYDET */}
          <div className="lg:col-span-2 pt-4">
            <button
              disabled={loading}
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-bold py-4 rounded-xl shadow-lg flex items-center justify-center gap-2 transition disabled:opacity-50"
            >
              {loading ? "İşleniyor..." : <><Save size={20} /> Ürünü ve Resimleri Kaydet</>}
            </button>
          </div>
        </form>
      </div>

      {/* ÜRÜN LİSTESİ */}
      <div className="bg-gray-800 p-6 rounded-xl shadow-xl border border-gray-700">
        <h2 className="text-xl font-semibold mb-6 flex items-center gap-2 text-white">
          Kayıtlı Ürünler
          <span className="text-sm bg-gray-700 px-2 py-1 rounded-full text-gray-300">
            {products.length}
          </span>
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
                <tr><td colSpan={6} className="p-8 text-center text-gray-500 italic">Henüz ürün eklenmemiş.</td></tr>
              ) : (
                products.map((product) => (
                  <tr key={product.id} className="border-b border-gray-700 hover:bg-gray-750 transition">
                    <td className="p-4">
                      {product.imageUrls?.length > 0 ? (
                        <img
                          src={`${api.baseUrl}${product.imageUrls[0]}`}
                          className="w-16 h-16 object-cover rounded-lg border border-gray-600"
                        />
                      ) : (
                        <div className="w-16 h-16 bg-gray-700 rounded-lg flex items-center justify-center text-xs text-gray-500">
                          Resim Yok
                        </div>
                      )}
                    </td>

                    <td className="p-4 font-semibold text-white">{product.name}</td>

                    <td className="p-4 text-sm text-gray-300 bg-gray-700/30 rounded inline-block my-4 mx-4">
                      {product.categoryName}
                    </td>

                    <td className="p-4 text-green-400 font-mono font-bold">{product.price} ₺</td>

                    <td className="p-4 text-xs text-gray-400 space-y-1">
                      {product.color && <div>Renk: {product.color}</div>}
                      {product.weight && <div>Ağırlık: {product.weight}</div>}
                    </td>

                    <td className="p-4 text-right">
                      <button
                        onClick={() => handleDelete(product.id)}
                        className="bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white p-3 rounded-lg transition"
                      >
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
