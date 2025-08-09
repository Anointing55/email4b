import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import ClientOnly from '@/components/ClientOnly';
import { AuthProvider } from '@/lib/auth';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Outreach Pilot',
  description: 'AI-powered email outreach platform',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gradient-to-br from-indigo-50 to-purple-50 min-h-screen`}>
        <ClientOnly>
          <AuthProvider>
            {children}
          </AuthProvider>
        </ClientOnly>
      </body>
    </html>
  );
}
