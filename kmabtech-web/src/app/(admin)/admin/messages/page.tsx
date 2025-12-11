"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { api } from "@/services/api";

interface ContactMessage {
  id: number;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  sentAt: string;
}

export default function MessagesPage() {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null);
  const [error, setError] = useState("");

  const fetchMessages = async () => {
    try {
      const data = await api.getContactMessages();
      setMessages(data);
    } catch (err: any) {
      setError("Mesajlar yüklenirken hata oluştu veya yetkiniz yok.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("tr-TR", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Bu mesajı silmek istediğinize emin misiniz?")) return;

    await api.deleteContactMessage(id);

    setMessages((prev) => prev.filter((m) => m.id !== id));
  };

  return (
    <div className="p-6 min-h-screen bg-[#0B1120] text-gray-100">

      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white">Gelen Mesajlar</h1>
          <p className="text-sm text-gray-400 mt-1">
            İletişim formundan gönderilen mesajları buradan yönetebilirsiniz.
          </p>
        </div>

        <span className="bg-blue-900/40 text-blue-300 text-xs font-semibold px-4 py-2 rounded-full shadow">
          {messages.length} Mesaj
        </span>
      </div>

      {error && (
        <div className="bg-red-900/40 border border-red-700 text-red-300 px-4 py-3 rounded-lg mb-6">
          {error}
        </div>
      )}

      {isLoading ? (
        <div className="flex justify-center py-20">
          <div className="animate-spin w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full"></div>
        </div>
      ) : (
        <div className="bg-[#111827] rounded-2xl shadow-xl border border-gray-800 overflow-hidden">

          {/* HEADER */}
          <div className="grid grid-cols-12 px-6 py-4 bg-[#1F2937] border-b border-gray-800 text-gray-400 text-xs font-semibold uppercase tracking-wider">
            <div className="col-span-4">Gönderen</div>
            <div className="col-span-3">Konu</div>
            <div className="col-span-2">Telefon</div>
            <div className="col-span-2">Tarih</div>
            <div className="col-span-1 text-right">İşlem</div>
          </div>

          <div className="divide-y divide-gray-800">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className="grid grid-cols-12 px-6 py-5 hover:bg-[#1B2533] transition-all cursor-pointer"
              >
                {/* GÖNDEREN */}
                <div className="col-span-4 flex flex-col">
                  <span className="font-medium text-gray-200">{msg.name}</span>
                  <span className="text-xs text-gray-500">{msg.email}</span>
                </div>

                {/* KONU */}
                <div className="col-span-3 flex items-center text-gray-300">
                  {msg.subject}
                </div>

                {/* TELEFON */}
                <div className="col-span-2 flex items-center text-gray-400">
                  {msg.phone || "-"}
                </div>

                {/* TARİH */}
                <div className="col-span-2 flex items-center text-gray-500">
                  {formatDate(msg.sentAt)}
                </div>

                {/* İŞLEM BUTONLARI */}
                <div className="col-span-1 flex items-center justify-end gap-2">
                  {/* OKU */}
                  <button
                    onClick={() => setSelectedMessage(msg)}
                    className="px-3 py-1 text-blue-400 border border-blue-500/20 rounded-lg hover:bg-blue-600 hover:text-white transition"
                  >
                    Oku
                  </button>

                  {/* SİL */}
                  <button
                    onClick={() => handleDelete(msg.id)}
                    className="px-3 py-1 text-red-400 border border-red-500/20 rounded-lg hover:bg-red-600 hover:text-white transition"
                  >
                    Sil
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* MODAL */}
      <AnimatePresence>
        {selectedMessage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={() => setSelectedMessage(null)}
          >
            <motion.div
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 40, opacity: 0 }}
              className="bg-[#1F2937] max-w-xl w-full p-6 rounded-2xl shadow-xl border border-gray-700"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-xl font-bold text-white">{selectedMessage.subject}</h2>
                  <p className="text-sm text-gray-400 mt-1">{formatDate(selectedMessage.sentAt)}</p>
                </div>

                <button
                  className="text-gray-400 hover:text-white transition"
                  onClick={() => setSelectedMessage(null)}
                >
                  ✕
                </button>
              </div>

              <div className="mt-6 space-y-4 text-gray-300">
                <div className="bg-[#111827] p-4 rounded-xl border border-gray-700">
                  <p><strong>Gönderen:</strong> {selectedMessage.name}</p>
                  <p><strong>Email:</strong> {selectedMessage.email}</p>
                  <p><strong>Telefon:</strong> {selectedMessage.phone || "-"}</p>
                </div>

                <div className="bg-[#111827] p-4 rounded-xl border border-gray-700">
                  <p className="whitespace-pre-wrap leading-relaxed">{selectedMessage.message}</p>
                </div>
              </div>

              <div className="mt-6 flex justify-end">
                <button
                  onClick={() => setSelectedMessage(null)}
                  className="px-5 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold text-white"
                >
                  Kapat
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
