import axios from 'axios';

const BASE_URL = "https://localhost:44322";
const API_URL = `${BASE_URL}/api`;

export const api = {
  baseUrl: BASE_URL,

  getCategories: async () => {
    const res = await axios.get(`${API_URL}/categories`);
    return res.data;
  },

  getProducts: async () => {
    const res = await axios.get(`${API_URL}/products`);
    return res.data;
  },

  getProductById: async (id) => {
    const res = await axios.get(`${API_URL}/products/${id}`);
    return res.data;
  },

  createProduct: async (productData) => {
    const res = await axios.post(`${API_URL}/products`, productData);
    return res.data;
  },

  deleteProduct: async (id) => {
    await axios.delete(`${API_URL}/products/${id}`);
  },

  uploadImage: async (file) => {
    const fd = new FormData();
    fd.append("file", file);

    const res = await axios.post(`${API_URL}/upload`, fd, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    return res.data.url;
  },
};
