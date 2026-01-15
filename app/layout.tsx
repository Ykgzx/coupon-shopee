import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'คูปองส่วนลด | Coupon Center',
  description: 'รวมคูปองส่วนลด อัปเดตทุกวัน',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="th">
      <body className="antialiased bg-gray-100">
        {children}
      </body>
    </html>
  );
}
