// src/components/Theme/ThemeProvider.tsx

"use client"; // Client Component olduğunu belirtir

import { useState, useEffect, createContext, useContext, ReactNode } from 'react';

// 1. Context Arayüzü Tanımı (TypeScript için gerekli)
interface ThemeContextProps {
  theme: string;
  setTheme: (theme: string) => void;
  toggleTheme: () => void;
}

// 2. Context Oluşturma
const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

interface Props {
    children: ReactNode;
}

// 3. Tema Sağlayıcı (Provider)
export function ThemeProvider({ children }: Props) {
  const [theme, setTheme] = useState('light'); // Varsayılan tema

  useEffect(() => {
    // LocalStorage'dan veya varsayılan olarak 'light' olarak yükle
    const storedTheme = localStorage.getItem('theme') || 'light';
    setTheme(storedTheme);
    document.documentElement.className = storedTheme;
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    
    // HTML root class'ını anında güncelle (Tailwind'in çalışması için)
    document.documentElement.classList.remove(theme);
    document.documentElement.classList.add(newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

// 4. Hook (Kullanım Kolaylığı İçin)
export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    // Hook'un Provider dışında kullanılması durumunda hata fırlatır
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}