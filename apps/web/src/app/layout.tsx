import type { Metadata, Viewport } from 'next';
import { fraunces, manrope, jetbrainsMono } from '@/lib/fonts';
import { LangProvider } from '@/components/lang-provider';
import './globals.css';

export const metadata: Metadata = {
  title: 'JobEnglish AI Brasil',
  description:
    'Treine o inglês que sua carreira precisa. Simule entrevistas, reuniões e apresentações em inglês com IA e receba feedback em português.',
  manifest: '/manifest.json',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  themeColor: '#C8553D',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="pt-BR"
      className={`${fraunces.variable} ${manrope.variable} ${jetbrainsMono.variable}`}
    >
      <body
        style={{
          minHeight: '100vh',
          background: '#F7F1E8',
          fontFamily: "var(--font-body), 'Manrope', 'Inter', system-ui, sans-serif",
        }}
      >
        <LangProvider>
          <div className="app-container">
            <div className="page-enter">{children}</div>
          </div>
        </LangProvider>
      </body>
    </html>
  );
}
