// src/lib/auth.d.ts
declare module '@/lib/auth' {
  import { ContextType } from 'react';
  export const AuthProvider: React.FC<{ children: React.ReactNode }>;
  export const useAuth: () => {
    user: any;
    login: (email: string, password: string) => Promise<void>;
    register: (email: string, password: string) => Promise<void>;
    logout: () => void;
    loading: boolean;
  };
}
