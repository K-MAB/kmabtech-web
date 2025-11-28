// src/lib/http.ts

import axios, { AxiosInstance } from 'axios';

// .env.local içindeki API Base URL alınır
const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;

if (!baseURL) {
    throw new Error("NEXT_PUBLIC_API_BASE_URL is not defined in .env.local");
}

// Axios instance oluşturma
const http: AxiosInstance = axios.create({
    baseURL: `${baseURL}/api`,   // <-- API path BURADA eklenir
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true, // Eğer cookie/token gerekirse
});

// -----------------------------
// JWT Token Interceptor
// -----------------------------
http.interceptors.request.use(
    (config) => {
        if (typeof window !== "undefined") {
            const token = localStorage.getItem('jwtToken');
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export default http;
