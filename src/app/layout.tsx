import './globals.css';
import { Inter } from 'next/font/google';
import { metadata as siteMetadata } from './metadata';
import { AuthProvider } from '@/context/AuthContext';

// Load Inter font
const inter = Inter({ subsets: ['latin'] });

// ✅ Export metadata (server only)
export const metadata = siteMetadata;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} bg-gradient-to-br from-indigo-50 to-purple-50`}
      >
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
