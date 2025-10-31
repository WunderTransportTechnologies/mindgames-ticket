import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "mindgames - チケット販売",
  description: "mindgames団体のイベントチケット販売サイト",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  );
}
