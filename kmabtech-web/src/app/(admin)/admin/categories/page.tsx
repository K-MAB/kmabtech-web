"use client";

import { useEffect, useState } from "react";
import { api } from "@/services/api";
import { Plus, Trash2, Save } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";

type Category = {
  id: number;
  name: string;
};

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      const res = await api.getCategories();
      setCategories(res);
    } catch {
      toast.error("Kategoriler alınamadı!");
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!name.trim()) {
      toast.error("Kategori adı boş olamaz!");
      return;
    }

    setLoading(true);
    const toastId = toast.loading("Kaydediliyor...");

    try {
      await api.createCategory({ name });
      toast.success("Kategori oluşturuldu!", { id: toastId });

      setName("");
      loadCategories();
    } catch {
      toast.error("Kategori oluşturulamadı!", { id: toastId });
    }

    setLoading(false);
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Bu kategoriyi silmek istediğinize emin misiniz?")) return;

    try {
      await api.deleteCategory(id);
      toast.success("Kategori silindi!");
      setCategories(categories.filter((c) => c.id !== id));
    } catch {
      toast.error("Kategori silinemedi!");
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 p-8 text-white">

      <Toaster />

      <h1 className="text-3xl font-bold text-blue-400 mb-10 border-b border-gray-700 pb-3">
        Kategori Yönetimi
      </h1>

      {/* FORM */}
      <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 mb-10">
        <h2 className="text-xl font-semibold mb-6 flex items-center gap-2 text-blue-300">
          <Plus size={22} /> Yeni Kategori Ekle
        </h2>

        <form onSubmit={handleSubmit} className="flex gap-4">
          <input
            type="text"
            className="flex-1 bg-gray-700 border border-gray-600 rounded-lg p-3 outline-none"
            placeholder="Örn: Yazılım"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <button
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 p-4 rounded-lg flex items-center gap-2 font-bold"
          >
            {loading ? "Bekleyin..." : <><Save size={18}/> Ekle</>}
          </button>
        </form>
      </div>

      {/* LIST */}
      <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
        <h2 className="text-xl mb-6 font-semibold flex items-center gap-2">
          Kayıtlı Kategoriler
          <span className="bg-gray-700 px-2 py-1 rounded-lg text-sm">{categories.length}</span>
        </h2>

        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="text-gray-400 text-sm border-b border-gray-700 uppercase">
              <th className="p-4">ID</th>
              <th className="p-4">Ad</th>
              <th className="p-4 text-right">İşlem</th>
            </tr>
          </thead>

          <tbody>
            {categories.length === 0 ? (
              <tr>
                <td colSpan={3} className="p-6 text-center text-gray-500">
                  Henüz kategori eklenmemiş.
                </td>
              </tr>
            ) : (
              categories.map((c) => (
                <tr key={c.id} className="border-b border-gray-700 hover:bg-gray-850">
                  <td className="p-4">{c.id}</td>
                  <td className="p-4">{c.name}</td>
                  <td className="p-4 text-right">
                    <button
                      onClick={() => handleDelete(c.id)}
                      className="bg-red-500/20 text-red-400 hover:bg-red-600 hover:text-white p-3 rounded-lg"
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
  );
}
