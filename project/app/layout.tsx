import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Ace Automotive — Premium Car Service & Repair Jaipur',
  description:
    'Veteran-owned automobile service center in Jaipur. 3M+ cars serviced. Car servicing, AC repair, denting & painting, car spa, tyres, batteries & more. Free pickup & drop, real-time tracking.',
  keywords: 'car service jaipur, auto repair jaipur, car maintenance, AC repair car, ceramic coating jaipur',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
