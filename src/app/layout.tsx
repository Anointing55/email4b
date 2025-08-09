import './globals.css';
import { Inter } from 'next/font/google';
import { metadata as siteMetadata } from './metadata'; // Import central metadata
import { AuthProvider } from '@/context/AuthContext';

// ✅ Load Inter font
const inter = Inter({ subsets: ['latin'] });

// ✅ Re-export metadata for Next.js
export const metadata = siteMetadata;

// ✅ Client-only wrapper for providers
function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      {children}
    </AuthProvider>
  );
}

// ✅ Root layout (server component)
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gradient-to-br from-indigo-50 to-purple-50`}>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
