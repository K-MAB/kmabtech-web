import axios from "axios";

// ===================================================
// BASE URL
// ===================================================
export const BASE_URL = "https://api.commitrasoft.com";
const API_URL = `${BASE_URL}/api`;

// ===================================================
// AXIOS INSTANCE
// ===================================================
const apiClient = axios.create({
  baseURL: API_URL,
});

// ===================================================
// INTERCEPTOR — TOKEN
// ===================================================
apiClient.interceptors.request.use(
  (config) => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("jwtToken");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ===================================================
// API EXPORT (TEK VE MERKEZİ)
// ===================================================
export const api = {
  // 🔥 Görsel path birleştirme için
  baseUrl: BASE_URL,

  // ====================== UPLOAD ======================
  uploadImage: async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);

    const res = await apiClient.post("/Upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    // backend: { url: "/uploads/xxx.jpg" }
    return res.data.url;
  },

  // ====================== CATEGORIES ======================
  getCategories: async () => {
    const res = await apiClient.get("/Categories");
    return res.data;
  },

  createCategory: async (data: { name: string }) => {
    const res = await apiClient.post("/Categories", data);
    return res.data;
  },

  deleteCategory: async (id: number) => {
    await apiClient.delete(`/Categories/${id}`);
  },

  // ====================== PRODUCTS ======================
  getProducts: async () => {
    const res = await apiClient.get("/Products");
    return res.data;
  },

  getProductById: async (id: number) => {
    const res = await apiClient.get(`/Products/${id}`);
    return res.data;
  },

  createProduct: async (data: any) => {
    const res = await apiClient.post("/Products", data);
    return res.data;
  },

  updateProduct: async (id: number, data: any) => {
    const res = await apiClient.put(`/Products/${id}`, data);
    return res.data;
  },

  deleteProduct: async (id: number) => {
    await apiClient.delete(`/Products/${id}`);
  },

  // ====================== SERVICES ======================
  getServices: async () => {
    const res = await apiClient.get("/Services");
    return res.data;
  },

  createService: async (data: any) => {
    const res = await apiClient.post("/Services", data);
    return res.data;
  },

  updateService: async (id: number, data: any) => {
    const res = await apiClient.put(`/Services/${id}`, data);
    return res.data;
  },

  deleteService: async (id: number) => {
    await apiClient.delete(`/Services/${id}`);
  },

  // ====================== REFERENCES ======================
  getReferences: async () => {
    const res = await apiClient.get("/References");
    return res.data;
  },

  createReference: async (formData: FormData) => {
    const res = await apiClient.post("/References", formData);
    return res.data;
  },

  updateReference: async (id: number, formData: FormData) => {
    const res = await apiClient.put(`/References/${id}`, formData);
    return res.data;
  },

  deleteReference: async (id: number) => {
    await apiClient.delete(`/References/${id}`);
  },

  // ====================== BLOG POSTS ======================
  getBlogPosts: async () => {
    const res = await apiClient.get("/BlogPosts");
    return res.data;
  },

  getBlogPostById: async (id: number) => {
    const res = await apiClient.get(`/BlogPosts/${id}`);
    return res.data;
  },

  createBlogPost: async (formData: FormData) => {
    const res = await apiClient.post("/BlogPosts", formData);
    return res.data;
  },

  updateBlogPost: async (id: number, formData: FormData) => {
    const res = await apiClient.put(`/BlogPosts/${id}`, formData);
    return res.data;
  },

  deleteBlogPost: async (id: number) => {
    await apiClient.delete(`/BlogPosts/${id}`);
  },

  // ====================== CONTACT ======================
  getContactMessages: async () => {
    const res = await apiClient.get("/ContactMessages");
    return res.data;
  },

  deleteContactMessage: async (id: number) => {
    await apiClient.delete(`/ContactMessages/${id}`);
  },

  // ====================== DASHBOARD ======================
  getDashboardStats: async () => {
    const res = await apiClient.get("/dashboard");
    return res.data;
  },
  login: async (email: string, password: string) => {
  const res = await apiClient.post("/Auth/login", {
    email,
    password,
  });
  return res.data; // { token: "..." }
},
};
