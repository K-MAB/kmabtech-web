"use client";

import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { api } from "@/services/api";
import {
  Trash2,
  Plus,
  Upload,
  X,
  Save,
  Package,
  Link as LinkIcon,
  Info,
  Edit,
} from "lucide-react";
import toast, { Toaster } from "react-hot-toast";

/* ------------------ TYPES ------------------ */
interface Category {
  id: number;
  name: string;
}

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  categoryId: number;
  categoryName?: string;

  color?: string;
  material?: string;
  weight?: string;
  dimensions?: string;

  link1?: string;
  link2?: string;
  link3?: string;

  imageUrls: string[];
}

/* ============================================================
                     ADMIN PRODUCT PAGE
============================================================ */
export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);

  /* ------------------ IMAGE STATES ------------------ */
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);

  /* ------------------ EDIT MODE ------------------ */
  const [editId, setEditId] = useState<number | null>(null);
  const isEdit = editId !== null;

  /* ------------------ FORM DATA ------------------ */
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
    imageUrls: [] as string[], // Eski resimler buradan gelir
  });

  /* ============================================================
                       STARTUP LOAD
  ============================================================ */
  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [catRes, prodRes] = await Promise.all([
        api.getCategories(),
        api.getProducts(),
      ]);

      setCategories(catRes);
      setProducts(prodRes);
    } catch (err) {
      toast.error("Veriler yüklenemedi!");
    }
  };

  /* ============================================================
                        FORM CHANGE
  ============================================================ */
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
  };

  /* ============================================================
                          IMAGE UPLOAD
  ============================================================ */
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files ? Array.from(e.target.files) : [];

    const previews = files.map((f) => URL.createObjectURL(f));

    setSelectedFiles((prev) => [...prev, ...files]);
    setImagePreviews((prev) => [...prev, ...previews]);
  };

  /* REMOVE OLD IMAGE */
  const removeOldImage = (url: string) => {
    setFormData((p) => ({
      ...p,
      imageUrls: p.imageUrls.filter((x) => x !== url),
    }));
  };

  /* REMOVE NEW UPLOADED IMAGE */
  const removeNewImage = (index: number) => {
    setSelectedFiles((p) => p.filter((_, i) => i !== index));
    setImagePreviews((p) => p.filter((_, i) => i !== index));
  };

  /* ============================================================
                        SELECT PRODUCT FOR EDIT
  ============================================================ */
  const selectProduct = (p: Product) => {
    setEditId(p.id);

    setFormData({
      name: p.name,
      description: p.description,
      price: p.price.toString(),
      categoryId: p.categoryId.toString(),

      color: p.color || "",
      material: p.material || "",
      weight: p.weight || "",
      dimensions: p.dimensions || "",

      link1: p.link1 || "",
      link2: p.link2 || "",
      link3: p.link3 || "",

      imageUrls: p.imageUrls || [],
    });

    setSelectedFiles([]);
    setImagePreviews([]);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  /* ============================================================
                        CREATE PRODUCT
  ============================================================ */
  const handleCreate = async () => {
    const toastId = toast.loading("Ürün kaydediliyor...");

    try {
      const uploadedUrls: string[] = [];

      // Yeni seçilen resimleri yükle
      for (const f of selectedFiles) {
        uploadedUrls.push(await api.uploadImage(f));
      }

      const payload = {
        ...formData,
        price: parseFloat(formData.price),
        categoryId: parseInt(formData.categoryId),
        imageUrls: uploadedUrls,
      };

      await api.createProduct(payload);

      toast.success("Ürün başarıyla eklendi!", { id: toastId });

      resetForm();
      loadData();
    } catch (err) {
      toast.error("Hata oluştu!", { id: toastId });
    }
  };

  /* ============================================================
                        UPDATE PRODUCT
  ============================================================ */
  const handleUpdate = async () => {
    if (!editId) return;

    const toastId = toast.loading("Ürün güncelleniyor...");

    try {
      const uploadedUrls: string[] = [];

      for (const file of selectedFiles) {
        uploadedUrls.push(await api.uploadImage(file));
      }

      const finalUrls = [...formData.imageUrls, ...uploadedUrls];

      const payload = {
        ...formData,
        price: parseFloat(formData.price),
        categoryId: parseInt(formData.categoryId),
        imageUrls: finalUrls,
      };

      await api.updateProduct(editId, payload);

      toast.success("Ürün başarıyla güncellendi", { id: toastId });
      resetForm();
      loadData();
    } catch (err) {
      toast.error("Güncelleme hatası!", { id: toastId });
    }
  };

  /* ============================================================
                        DELETE PRODUCT
  ============================================================ */
  const handleDelete = async (id: number) => {
    if (!confirm("Silmek istiyor musun?")) return;

    try {
      await api.deleteProduct(id);
      toast.success("Ürün silindi.");
      setProducts((p) => p.filter((x) => x.id !== id));
    } catch {
      toast.error("Silinemedi!");
    }
  };

  /* ============================================================
                        RESET FORM
  ============================================================ */
  const resetForm = () => {
    setEditId(null);
    setSelectedFiles([]);
    setImagePreviews([]);

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
      imageUrls: [],
    });
  };

  /* ============================================================
                        FORM SUBMIT HANDLER
  ============================================================ */
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    isEdit ? handleUpdate() : handleCreate();
  };

  /* ============================================================
                        PAGE RENDER STARTS
  ============================================================ */
  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <Toaster position="top-right" />

      <h1 className="text-3xl font-bold mb-8 text-blue-400">Ürün Yönetimi</h1>

      {/* --------------------- FORM --------------------- */}
      <div className="bg-gray-800 p-6 rounded-xl shadow-xl border border-gray-700 mb-10">
        <h2 className="text-xl font-semibold mb-6 flex items-center gap-2 text-blue-300">
          {isEdit ? (
            <>
              <Edit size={24} /> Ürünü Düzenle
            </>
          ) : (
            <>
              <Plus size={24} /> Yeni Ürün Ekle
            </>
          )}
        </h2>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* SOL KOLON */}
          <div className="space-y-5">
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg"
              placeholder="Ürün adı"
            />

            <div className="grid grid-cols-2 gap-4">
              <input
                name="price"
                type="number"
                value={formData.price}
                onChange={handleChange}
                className="p-3 bg-gray-700 border border-gray-600 rounded-lg"
                placeholder="Fiyat"
              />

              <select
                name="categoryId"
                value={formData.categoryId}
                onChange={handleChange}
                className="p-3 bg-gray-700 border border-gray-600 rounded-lg"
              >
                <option value="">Kategori Seç</option>
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg"
              placeholder="Açıklama"
            />
          </div>

          {/* SAĞ KOLON */}
          <div className="space-y-5">
            <input
              name="color"
              value={formData.color}
              onChange={handleChange}
              placeholder="Renk"
              className="p-3 w-full bg-gray-700 border border-gray-600 rounded-lg"
            />

            <input
              name="material"
              value={formData.material}
              onChange={handleChange}
              placeholder="Materyal"
              className="p-3 w-full bg-gray-700 border border-gray-600 rounded-lg"
            />

            <input
              name="weight"
              value={formData.weight}
              onChange={handleChange}
              placeholder="Ağırlık"
              className="p-3 w-full bg-gray-700 border border-gray-600 rounded-lg"
            />

            <input
              name="dimensions"
              value={formData.dimensions}
              onChange={handleChange}
              placeholder="Boyut"
              className="p-3 w-full bg-gray-700 border border-gray-600 rounded-lg"
            />

            {/* LINKLER */}
            <input
              name="link1"
              value={formData.link1}
              onChange={handleChange}
              placeholder="Link 1"
              className="p-2 w-full bg-gray-700 border border-gray-600 rounded-lg text-sm"
            />
            <input
              name="link2"
              value={formData.link2}
              onChange={handleChange}
              placeholder="Link 2"
              className="p-2 w-full bg-gray-700 border border-gray-600 rounded-lg text-sm"
            />
            <input
              name="link3"
              value={formData.link3}
              onChange={handleChange}
              placeholder="Link 3"
              className="p-2 w-full bg-gray-700 border border-gray-600 rounded-lg text-sm"
            />

            {/* OLD IMAGES */}
            {isEdit && formData.imageUrls.length > 0 && (
              <div className="flex flex-wrap gap-4">
                {formData.imageUrls.map((url) => (
                  <div key={url} className="relative w-20 h-20">
                    <img
                      src={`${api.baseUrl}${url}`}
                      className="w-full h-full rounded-lg object-cover border border-gray-600"
                    />

                    <button
                      type="button"
                      onClick={() => removeOldImage(url)}
                      className="absolute -top-2 -right-2 bg-red-600 rounded-full p-1"
                    >
                      <X size={14} />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* NEW IMAGES */}
            <div className="flex gap-4 flex-wrap">
              <label className="cursor-pointer w-20 h-20 flex flex-col justify-center items-center border border-gray-500 bg-gray-700 rounded-lg">
                <Upload size={20} />
                <input type="file" className="hidden" multiple onChange={handleFileChange} />
              </label>

              {imagePreviews.map((src, i) => (
                <div key={i} className="relative w-20 h-20">
                  <img src={src} className="w-full h-full rounded-lg border border-gray-600" />
                  <button
                    type="button"
                    onClick={() => removeNewImage(i)}
                    className="absolute -top-2 -right-2 bg-red-600 rounded-full p-1"
                  >
                    <X size={14} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* SUBMIT BUTTON */}
          <div className="lg:col-span-2">
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 p-4 rounded-xl flex items-center justify-center gap-2"
            >
              <Save size={20} />
              {isEdit ? "Ürünü Güncelle" : "Ürünü Kaydet"}
            </button>
          </div>
        </form>
      </div>

      {/* --------------------- PRODUCT LIST --------------------- */}
      <div className="bg-gray-800 p-6 rounded-xl shadow-xl border border-gray-700">
        <h2 className="text-xl font-semibold mb-6">Kayıtlı Ürünler</h2>

        <table className="w-full">
          <thead className="text-gray-400 text-sm border-b border-gray-700">
            <tr>
              <th className="p-4">Görsel</th>
              <th className="p-4">Ad</th>
              <th className="p-4">Kategori</th>
              <th className="p-4">Fiyat</th>
              <th className="p-4">İşlem</th>
            </tr>
          </thead>

          <tbody>
            {products.map((p) => (
              <tr key={p.id} className="border-b border-gray-700 hover:bg-gray-750">
                <td className="p-4">
                  {p.imageUrls?.length > 0 ? (
                    <img
                      src={`${api.baseUrl}${p.imageUrls[0]}`}
                      className="w-16 h-16 rounded-lg object-cover"
                    />
                  ) : (
                    <div className="w-16 h-16 bg-gray-700 rounded-lg flex items-center justify-center text-xs">
                      Yok
                    </div>
                  )}
                </td>

                <td className="p-4">{p.name}</td>
                <td className="p-4">{p.categoryName}</td>
                <td className="p-4 text-green-400 font-bold">{p.price} ₺</td>

                <td className="p-4 flex gap-3">
                  <button
                    onClick={() => selectProduct(p)}
                    className="bg-yellow-600 p-2 rounded-lg hover:bg-yellow-700"
                  >
                    <Edit size={18} />
                  </button>

                  <button
                    onClick={() => handleDelete(p.id)}
                    className="bg-red-600 p-2 rounded-lg hover:bg-red-700"
                  >
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
