import axios from "axios";

// ===================================================
// BASE URL
// ===================================================
const BASE_URL = "http://91.98.199.146:5000";
const API_URL = `${BASE_URL}/api`;

// ===================================================
// AXIOS INSTANCE
// ===================================================
const apiClient = axios.create({
  baseURL: API_URL,
});

// ===================================================
// INTERCEPTOR — TOKEN EKLEME
// ===================================================
apiClient.interceptors.request.use(
  (config) => {
    if (typeof window !== "undefined") {

      // 🔥 DÜZELTİLMİŞ SATIR — Artık doğru token key okunuyor
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
// EXPORT EDİLEN API FONKSİYONLARI
// ===================================================
export const api = {
  baseUrl: BASE_URL,

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


  createProduct: async (productData: any) => {
    const res = await apiClient.post("/Products", productData);
    return res.data;
  },

  deleteProduct: async (id: number) => {
    await apiClient.delete(`/Products/${id}`);
  },

  uploadImage: async (file: File) => {
    const fd = new FormData();
    fd.append("file", file);

    const res = await apiClient.post("/Upload", fd);
    return res.data.url;
  },
  updateProduct: async (id: number, data: any) => {
  const res = await apiClient.put(`/Products/${id}`, data);
  return res.data;
},

  // ====================== SERVICES ======================
  getServices: async () => {
    const res = await apiClient.get("/Services");
    return res.data;
  },

  createService: async (serviceData: any) => {
    const res = await apiClient.post("/Services", serviceData);
    return res.data;
  },

  updateService: async (id: number, serviceData: any) => {
    const res = await apiClient.put(`/Services/${id}`, serviceData);
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

  // ====================== CONTACT MESSAGES ======================
  getContactMessages: async () => {
    const res = await apiClient.get("/ContactMessages");
    return res.data;
  },
  deleteContactMessage: async (id: number) => {
    const res = await apiClient.delete(`/ContactMessages/${id}`);
    return res.data;
  },
getDashboardStats: async () => {
  const res = await apiClient.get("/dashboard");
  return res.data;
},

  
};
