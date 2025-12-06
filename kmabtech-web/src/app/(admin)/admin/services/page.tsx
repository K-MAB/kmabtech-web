"use client";

import { useEffect, useState } from "react";
import { api } from "@/services/api";
import { Plus, Trash2, Save, Edit, Image as ImageIcon, Info } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";

type Service = {
  id: number;
  titleTr: string;
  descriptionTr: string;
  iconUrl: string;
};

export default function AdminServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);

  const [formData, setFormData] = useState({
    titleTr: "",
    descriptionTr: "",
    iconUrl: "",
  });

  // -----------------------------------
  // GET SERVICES
  // -----------------------------------
  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const res = await api.getServices();
      setServices(res);
    } catch (err) {
      toast.error("Hizmetler yüklenemedi!");
    }
  };

  // -----------------------------------
  // HANDLE INPUT
  // -----------------------------------
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
  };

  // -----------------------------------
  // CREATE OR UPDATE
  // -----------------------------------
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    const toastId = toast.loading(
      editingId ? "Hizmet güncelleniyor..." : "Hizmet ekleniyor..."
    );

    try {
      if (editingId) {
        // UPDATE
        await api.updateService(editingId, formData);
        toast.success("Hizmet güncellendi!", { id: toastId });
      } else {
        // CREATE
        await api.createService(formData);
        toast.success("Hizmet oluşturuldu!", { id: toastId });
      }

      setFormData({
        titleTr: "",
        descriptionTr: "",
        iconUrl: "",
      });

      setEditingId(null);
      fetchServices();
    } catch (error) {
      toast.error("Bir hata oluştu!", { id: toastId });
    } finally {
      setLoading(false);
    }
  };

  // -----------------------------------
  // DELETE
  // -----------------------------------
  const handleDelete = async (id: number) => {
    if (!confirm("Bu hizmet silinecek. Emin misiniz?")) return;

    try {
      await api.deleteService(id);
      toast.success("Hizmet silindi.");
      setServices((prev) => prev.filter((s) => s.id !== id));
    } catch {
      toast.error("Silme işlemi başarısız.");
    }
  };

  // -----------------------------------
  // EDIT (SET FORM)
  // -----------------------------------
  const handleEdit = (service: Service) => {
    setEditingId(service.id);
    setFormData({
      titleTr: service.titleTr,
      descriptionTr: service.descriptionTr ?? "",
      iconUrl: service.iconUrl ?? "",
    });
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8 font-sans">
      <Toaster position="top-right" />

      {/* PAGE TITLE */}
      <h1 className="text-3xl font-bold mb-8 text-blue-400 border-b border-gray-700 pb-4">
        Admin Panel <span className="text-gray-500">/ Hizmet Yönetimi</span>
      </h1>

      {/* FORM */}
      <div className="bg-gray-800 p-6 rounded-xl shadow-xl mb-10 border border-gray-700">
        <h2 className="text-xl font-semibold mb-6 flex items-center gap-2 text-blue-300">
          <Plus size={24} /> {editingId ? "Hizmeti Düzenle" : "Yeni Hizmet Ekle"}
        </h2>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-2 gap-8">

          {/* SOL TARAF */}
          <div className="space-y-5">
            <label className="block text-sm text-gray-400">Hizmet Başlığı</label>
            <input
              name="titleTr"
              value={formData.titleTr}
              onChange={handleChange}
              required
              className="w-full bg-gray-700 p-3 rounded-lg border border-gray-600 outline-none"
              placeholder="Örn: Yazılım Danışmanlığı"
            />

            <label className="block text-sm text-gray-400">Açıklama</label>
            <textarea
              name="descriptionTr"
              value={formData.descriptionTr}
              onChange={handleChange}
              rows={5}
              className="w-full bg-gray-700 p-3 rounded-lg border border-gray-600 outline-none"
              placeholder="Örn: Kurumsal yazılım geliştirme, proje mimarisi ve entegrasyon hizmetleri..."
            />
          </div>

          {/* SAĞ TARAF */}
          <div className="space-y-5">
            <label className="block text-sm text-gray-400 flex items-center gap-2">
              <ImageIcon size={14} /> İkon URL
            </label>
            <input
              name="iconUrl"
              value={formData.iconUrl}
              onChange={handleChange}
              className="w-full bg-gray-700 p-3 rounded-lg border border-gray-600 outline-none"
              placeholder="/icons/cloud-dev.svg"
            />
            <p className="text-xs text-gray-400 flex items-center gap-1">
              <Info size={12} /> Yazılım odaklı ikon tercih et:  
              <br /> Örn: cloud-dev, api-service, code-review vb.
            </p>
          </div>

          {/* SAVE BUTTON */}
          <div className="lg:col-span-2">
            <button
              disabled={loading}
              className="w-full mt-4 bg-blue-600 hover:bg-blue-700 transition p-4 rounded-xl font-bold flex justify-center items-center gap-2"
            >
              <Save size={20} />
              {editingId ? "Hizmeti Güncelle" : "Hizmeti Kaydet"}
            </button>
          </div>

        </form>
      </div>

      {/* LIST TABLE */}
      <div className="bg-gray-800 p-6 rounded-xl shadow-xl border border-gray-700">

        <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
          Kayıtlı Hizmetler
          <span className="text-sm bg-gray-700 px-2 py-1 rounded-full text-gray-300">
            {services.length}
          </span>
        </h2>

        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="text-gray-400 border-b border-gray-700 text-sm uppercase">
              <th className="p-4">İkon</th>
              <th className="p-4">Başlık</th>
              <th className="p-4">Açıklama</th>
              <th className="p-4 text-right">İşlem</th>
            </tr>
          </thead>

          <tbody>
            {services.length === 0 ? (
              <tr>
                <td colSpan={4} className="p-8 text-center text-gray-500 italic">
                  Henüz hizmet eklenmemiş.
                </td>
              </tr>
            ) : (
              services.map((s) => (
                <tr key={s.id} className="border-b border-gray-700 hover:bg-gray-750 transition">
                  <td className="p-4">
                    {s.iconUrl ? (
                      <img
                        src={s.iconUrl.startsWith("http") ? s.iconUrl : `${api.baseUrl}${s.iconUrl}`}
                        className="w-12 h-12 object-contain bg-gray-700 p-2 rounded-lg border border-gray-600"
                      />
                    ) : (
                      <div className="w-12 h-12 bg-gray-700 rounded-lg flex items-center justify-center text-gray-500 text-xs">
                        İkon Yok
                      </div>
                    )}
                  </td>

                  <td className="p-4 font-semibold">{s.titleTr}</td>
                  <td className="p-4 text-gray-300 text-sm max-w-xs">{s.descriptionTr}</td>

                  <td className="p-4 flex justify-end gap-3">
                    <button
                      onClick={() => handleEdit(s)}
                      className="bg-yellow-500/20 text-yellow-400 hover:bg-yellow-500 hover:text-white p-3 rounded-lg transition">
                      <Edit size={18} />
                    </button>

                    <button
                      onClick={() => handleDelete(s.id)}
                      className="bg-red-500/20 text-red-400 hover:bg-red-500 hover:text-white p-3 rounded-lg transition">
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
