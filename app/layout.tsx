import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'FaceSwap Live — Transformation Faciale en Temps Réel',
  description: 'Changez de visage et de corps entier en temps réel pendant vos streams, appels WhatsApp, Telegram, Zoom et autres plateformes vidéo.',
  keywords: 'faceswap, transformation faciale, temps réel, deepfake, avatar virtuel, stream',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className="dark">
      <body className={`${inter.className} bg-[#0a0a0a] text-white antialiased`}>
        {children}
      </body>
    </html>
  );
}
