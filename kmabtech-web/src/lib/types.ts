// src/lib/types.ts

// Backend'deki Service modeline karşılık gelir
export interface Service {
    id: number;
    titleTr: string;
    descriptionTr: string; // Sadece Türkçe alanları kullanıyoruz
    iconUrl: string; 
}

// Backend'deki Reference modeline karşılık gelir
export interface Reference {
    id: number;
    companyName: string;
    logoUrl: string;
    order: number;
}

// API'den veri çeken hook'un yanıt tipini tanımlar
export interface ApiResponse<T> {
    data: T | null;
    loading: boolean;
    error: string | null;
    refetch: () => void;
}