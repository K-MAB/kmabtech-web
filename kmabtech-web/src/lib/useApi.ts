// src/lib/useApi.ts

'use client';

import { useState, useEffect, useCallback } from 'react';
import http from '@/lib/http';
import { ApiResponse } from './types';

export function useApi<T>(endpoint: string, initialData: T | null = null): ApiResponse<T> {
  const [data, setData] = useState<T | null>(initialData);
  const [loading, setLoading] = useState(true);   // <-- DÜZELTİLDİ
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);   // <-- Yükleme başlat
      const response = await http.get<T>(endpoint);
      setData(response.data);
      setError(null);
    } catch (err: any) {
      setError(err.message || 'Veri çekilemedi. Bağlantı hatası.');
    } finally {
      setLoading(false);  // <-- Yükleme bitti
    }
  }, [endpoint]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, refetch: fetchData };
}
