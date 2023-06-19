import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Aliento para el viaje",
  description: "Los audios Aliento para el viaje son un recordatorio de que la esperanza de Dios y su amor incomparable nos acompañan en cada tramo del camino.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className}`}>
        {children}
      </body>
    </html>
  );
}
