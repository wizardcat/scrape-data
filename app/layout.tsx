import { ReactQueryProvider } from '@/providers/react-query.provider';
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: 'Scrape web data',
  description: 'Scrape web data app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ReactQueryProvider>{children}</ReactQueryProvider>
      </body>
    </html>
  );
}
