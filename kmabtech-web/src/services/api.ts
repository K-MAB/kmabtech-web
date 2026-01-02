import axios from "axios";

// ===================================================
// BASE URL (ENV'DEN OKUNUR)
// ===================================================
const BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "https://api.commitrasoft.com";

// ===================================================
// AXIOS INSTANCE
// ===================================================
const apiClient = axios.create({
  baseURL: `${BASE_URL}/api`,
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
// API EXPORT
// ===================================================
export const api = {
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

  uploadImage: async (file: File) => {
    const fd = new FormData();
    fd.append("file", file);

    const res = await apiClient.post("/Upload", fd);
    return res.data.url;
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

  createReference: async (data: FormData) => {
    const res = await apiClient.post("/References", data);
    return res.data;
  },

  updateReference: async (id: number, data: FormData) => {
    const res = await apiClient.put(`/References/${id}`, data);
    return res.data;
  },

  deleteReference: async (id: number) => {
    await apiClient.delete(`/References/${id}`);
  },

  // ====================== BLOG ======================
  getBlogPosts: async () => {
    const res = await apiClient.get("/BlogPosts");
    return res.data;
  },

  getBlogPostById: async (id: number) => {
    const res = await apiClient.get(`/BlogPosts/${id}`);
    return res.data;
  },

  createBlogPost: async (data: FormData) => {
    const res = await apiClient.post("/BlogPosts", data);
    return res.data;
  },

  updateBlogPost: async (id: number, data: FormData) => {
    const res = await apiClient.put(`/BlogPosts/${id}`, data);
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
};
