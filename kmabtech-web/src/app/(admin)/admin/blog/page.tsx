"use client";

import { useEffect, useState } from "react";
import { api } from "@/services/api";
import { Plus, Trash2, Save, Edit, UploadCloud, X } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";

type BlogPost = {
  id: number;
  titleTr: string;
  contentTr: string;
  imageUrl: string;
  createdAt: string;
};

export default function AdminBlogPostsPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);

  const [formData, setFormData] = useState({
    titleTr: "",
    contentTr: "",
  });

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState("");

  const [loading, setLoading] = useState(false);

  // ------------------------------------
  // GET BLOG LIST
  // ------------------------------------
  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const res = await api.getBlogPosts();
      setPosts(res);
    } catch (err) {
      toast.error("Blog yazıları alınamadı.");
    }
  };

  // ------------------------------------
  // INPUT CHANGE
  // ------------------------------------
  const handleChange = (e: any) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  // ------------------------------------
  // IMAGE SELECT
  // ------------------------------------
  const handleFileChange = (e: any) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setSelectedFile(file);
    setPreviewUrl(URL.createObjectURL(file));
  };

  const removeFile = () => {
    setSelectedFile(null);
    setPreviewUrl("");
  };

  // ------------------------------------
  // SUBMIT CREATE / UPDATE
  // ------------------------------------
  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!editingId && !selectedFile) {
      toast.error("Kapak görseli seçmelisiniz.");
      return;
    }

    const data = new FormData();
    data.append("titleTr", formData.titleTr);
    data.append("contentTr", formData.contentTr);

    // Backend artık sadece bunları istiyor
    if (selectedFile) data.append("imageFile", selectedFile);

    setLoading(true);
    const toastId = toast.loading(editingId ? "Güncelleniyor..." : "Oluşturuluyor...");

    try {
      if (editingId) {
        await api.updateBlogPost(editingId, data);
      } else {
        await api.createBlogPost(data);
      }

      toast.success("İşlem başarılı!", { id: toastId });
      resetForm();
      fetchPosts();
    } catch (err) {
      console.error(err);
      toast.error("Bir hata oluştu.", { id: toastId });
    } finally {
      setLoading(false);
    }
  };

  // ------------------------------------
  // RESET FORM
  // ------------------------------------
  const resetForm = () => {
    setFormData({ titleTr: "", contentTr: "" });
    setSelectedFile(null);
    setPreviewUrl("");
    setEditingId(null);
  };

  // ------------------------------------
  // EDIT MODE
  // ------------------------------------
  const handleEdit = (post: BlogPost) => {
    setEditingId(post.id);
    setFormData({
      titleTr: post.titleTr,
      contentTr: post.contentTr,
    });

    setPreviewUrl(
      post.imageUrl.startsWith("http")
        ? post.imageUrl
        : api.baseUrl + post.imageUrl
    );

    setSelectedFile(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // ------------------------------------
  // DELETE
  // ------------------------------------
  const handleDelete = async (id: number) => {
    if (!confirm("Silmek istediğinize emin misiniz?")) return;

    try {
      await api.deleteBlogPost(id);
      toast.success("Silindi");
      setPosts(posts.filter((x) => x.id !== id));
    } catch {
      toast.error("Silme hatası");
    }
  };

  // ------------------------------------
  // RENDER
  // ------------------------------------
  return (
    <div className="min-h-screen bg-gray-900 p-8 text-white">
      <Toaster />

      <h1 className="text-3xl mb-6 font-bold text-blue-400">Blog Yönetimi</h1>

      {/* ===================== FORM ===================== */}
      <form
        onSubmit={handleSubmit}
        className="bg-gray-800 p-6 rounded-xl mb-10 grid grid-cols-1 md:grid-cols-2 gap-8"
      >
        {/* LEFT */}
        <div>
          <label className="text-sm text-gray-400">Başlık</label>
          <input
            name="titleTr"
            value={formData.titleTr}
            onChange={handleChange}
            required
            className="w-full bg-gray-700 p-3 rounded-lg"
          />

          <label className="text-sm mt-5 block text-gray-400">İçerik</label>
          <textarea
            name="contentTr"
            value={formData.contentTr}
            onChange={handleChange}
            rows={8}
            required
            className="w-full bg-gray-700 p-3 rounded-lg"
          />
        </div>

        {/* RIGHT - IMAGE */}
        <div className="space-y-4">
          <label className="text-sm text-gray-400">Kapak Görseli</label>

          <div className="border-2 border-dashed border-gray-600 rounded-xl bg-gray-700/30 h-72 flex items-center justify-center relative">
            {previewUrl ? (
              <div className="relative w-full h-full flex justify-center items-center">
                <img src={previewUrl} className="max-h-full object-contain" />
                <button
                  type="button"
                  onClick={removeFile}
                  className="absolute top-1 right-1 bg-red-500 text-white px-2 rounded-full"
                >
                  <X size={16} />
                </button>
              </div>
            ) : (
              <label className="cursor-pointer flex flex-col items-center">
                <UploadCloud size={40} className="text-gray-400" />
                <span className="text-gray-400 text-sm mt-2">
                  Görsel seçmek için tıkla
                </span>
                <input type="file" className="hidden" onChange={handleFileChange} />
              </label>
            )}
          </div>
        </div>

        {/* SUBMIT */}
        <div className="md:col-span-2">
          <button
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 p-4 rounded-xl font-bold flex items-center justify-center gap-2"
          >
            <Save size={20} />
            {editingId ? "Güncelle" : "Kaydet"}
          </button>
        </div>
      </form>

      {/* ===================== LIST ===================== */}
      <div className="bg-gray-800 p-6 rounded-xl">
        <h2 className="text-xl mb-6 font-semibold flex items-center gap-2">
          Blog Yazıları
          <span className="bg-gray-700 px-2 py-1 rounded-lg">{posts.length}</span>
        </h2>

        <table className="w-full text-left">
          <thead>
            <tr className="text-gray-400 text-sm border-b border-gray-700">
              <th className="p-3">Görsel</th>
              <th className="p-3">Başlık</th>
              <th className="p-3">Tarih</th>
              <th className="p-3 text-right">İşlem</th>
            </tr>
          </thead>

          <tbody>
            {posts.map((post) => (
              <tr key={post.id} className="border-b border-gray-700">
                <td className="p-3">
                  <img
                    src={
                      post.imageUrl.startsWith("http")
                        ? post.imageUrl
                        : api.baseUrl + post.imageUrl
                    }
                    className="w-20 h-16 object-cover rounded-lg"
                  />
                </td>
                <td className="p-3">{post.titleTr}</td>
                <td className="p-3 text-gray-400">
                  {new Date(post.createdAt).toLocaleDateString("tr-TR")}
                </td>
                <td className="p-3 text-right flex justify-end gap-2">
                  <button
                    onClick={() => handleEdit(post)}
                    className="bg-yellow-500/20 text-yellow-400 px-3 py-2 rounded-lg hover:bg-yellow-500 hover:text-white"
                  >
                    <Edit size={16} />
                  </button>
                  <button
                    onClick={() => handleDelete(post.id)}
                    className="bg-red-500/20 text-red-400 px-3 py-2 rounded-lg hover:bg-red-500 hover:text-white"
                  >
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}

            {posts.length === 0 && (
              <tr>
                <td className="p-6 text-center text-gray-500" colSpan={4}>
                  Henüz blog yazısı eklenmemiş.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
